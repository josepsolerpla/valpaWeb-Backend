'use strict';

const { MoleculerClientError } = require('moleculer').Errors;
const { prisma } = require('../prisma/generated/prisma-client');
const { OAuth2Client } = require('google-auth-library');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slug = require('slug');

const client = new OAuth2Client(process.env.CLIENT_ID);

const dotenv = require('dotenv');
dotenv.config();

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
		test: {
			async handler(ctx) {
				console.log;
				return await ctx.broker
					.call('authed.isIn', { tokenGoogle: process.env.TOKEN_GOOGLE })
					.then((res) => {
						return Promise.resolve(res);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}
		},
		isIn: {
			auth: 'required',
			async handler(ctx) {
				return await this.isInDatabase(ctx.meta.userid).then((authedChecked) => {
					if (!authedChecked.authed) {
						return Promise.reject(
							new MoleculerClientError('Not authorized!', 422, '', [
								{ field: 'tokenGoogle', message: 'Not authorized' }
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
			async handler(ctx) {
				return await this.isInDatabase(ctx.meta.userid).then((authedChecked) => {
					if (!authedChecked.authed) {
						const insetAuthed = `mutation createAuthed($data: AuthedCreateInput!){
											createAuthed(data: $data){
												idGoogle
											}}`;
						const authedData = {
							data: {}
						};
						return Promise.resolve('We cant add yet but you could');
						// return prisma.$graphql(insetAuthed, authedData);
					} else {
						return Promise.reject(
							new MoleculerClientError('Is already registered!', 422, '', [
								{ field: 'idGoogle', message: 'Is already registered' }
							])
						);
					}
				});
			}
		},
		resolveTokenGoogle: {
			cache: {
				keys: [ 'tokenGoogle' ]
				// ttl: 60 * 60 // 1 hour
			},
			params: {
				tokenGoogle: 'string'
			},
			handler(ctx) {
				const { tokenGoogle } = ctx.params;
				return new this.Promise((resolve, reject) => {
					client
						.verifyIdToken({
							idToken: tokenGoogle,
							audience: process.env.CLIENT_ID
						})
						.then((ticket) => {
							resolve(ticket);
						});
				}).then((ticket) => {
					const payload = ticket.getPayload();
					const userid = payload['sub'];
					return userid;
				});
			}
		}
	},
	/**
	 * Methods
	 */
	methods: {
		isInDatabase(tokenGoogle) {
			const authedAcc = `query isIn($where: AuthedWhereUniqueInput!){
				authed(where: $where){
					id
				}}`;
			const where = { where: { tokenGoogle: tokenGoogle } };
			return prisma.$graphql(authedAcc, where);
		}
	},
	events: {
		'cache.clean.users'() {
			if (this.broker.cacher) this.broker.cacher.clean(`${this.name}.*`);
		},
		'cache.clean.follows'() {
			if (this.broker.cacher) this.broker.cacher.clean(`${this.name}.*`);
		}
	}
};
