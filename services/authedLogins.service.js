'use strict';

const { MoleculerClientError } = require('moleculer').Errors;
const { prisma } = require('../prisma/generated/prisma-client');
const { OAuth2Client } = require('google-auth-library');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slug = require('slug');

const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {
	name: 'authed',
	settings: {
		JWT_SECRET: process.env.JWT_SECRET || 'jwt-valpa-secret' // Secret for JWT
	},
	actions: {
		/**
         * Create / Use Add only if you are in ROOL ROOT
         * 
         */
		isIn: {
			params: {
				tokenGoogle: 'string'
			},
			async handler(ctx) {
				const { tokenGoogle } = ctx.params;

				const ticket = await client
					.verifyIdToken({
						idToken: tokenGoogle,
						audience: process.env.CLIENT_ID
					})
					.catch((res) => {
						return Promise.reject({ err: 'Invalid Token' });
					});

				const payload = ticket.getPayload();
				const userid = payload['sub'];

				const authedEmail = `query isIn($where: AuthedWhereUniqueInput!){
						authed(where: $where){
							id
						}}`;
				const emailData = { where: { idGoogle: userid } };

				return await prisma.$graphql(authedEmail, emailData).then((authedChecked) => {
					if (!authedChecked.authed) {
						return Promise.reject(
							new MoleculerClientError('Not authorized!', 422, '', [
								{ field: 'idGoogle', message: 'Not authorized' }
							])
						);
					}
					return Promise.resolve(authedChecked.authed);
				});
			}
		},
		/**
         * Add a new User that could Login by Google +
         */
		add: {
			auth: 'required',
			params: {
				idGoogle: 'string'
			},
			async handler(ctx) {
				const checkEmail = `query authedVerify($where: AuthedWhereUniqueInput!){
                                        authed(where: $where){
							                idGoogle
						                }}`;
				const authedChecked = await prisma.$graphql(checkEmail, idGoogle);
				if (authedChecked.authed) {
					return authedChecked.authed;
				}
				const insetAuthed = `mutation createAuthed($data: AuthedCreateInput!){
                                        createAuthed(data: $data){
                                            idGoogle
                                        }}`;
				const authedData = {
					data: {}
				};
				return await prisma.$graphql(insetAuthed, authedData);
			}
		}
	},
	/**
	 * Methods
	 */
	methods: {},
	events: {
		'cache.clean.users'() {
			if (this.broker.cacher) this.broker.cacher.clean(`${this.name}.*`);
		},
		'cache.clean.follows'() {
			if (this.broker.cacher) this.broker.cacher.clean(`${this.name}.*`);
		}
	}
};
