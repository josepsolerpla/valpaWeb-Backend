'use strict';

const { MoleculerError } = require('moleculer').Errors;
const { prisma } = require('../prisma/generated/prisma-client');
const { OAuth2Client } = require('google-auth-library');

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
         * Use this Action to check if the database
		 * 
		 * Is mainly focused to be used by the api, if you want to use it on other action just use the method insted.
         */
		isIn: {
			auth: 'required',
			handler(ctx) {
				return new Promise((resolve, reject) => {
					if (!ctx.meta.userid) {
						reject(
							new MoleculerError('Not authorized!', 422, '', {
								field: 'tokenGoogle',
								message: 'No Token'
							})
						);
					}
					this.isInDatabase(ctx.meta.userid)
						.then((res) => {
							if (!res.authed) {
								reject(
									new MoleculerError('Not authorized!', 422, '', {
										field: 'tokenGoogle',
										message: 'Not authorized'
									})
								);
							}
							resolve(res.authed);
						})
						.catch((err) => {
							reject(err);
						});
				});
			}
		},
		/**
         * Add a new Authorized account of google + to the database
         */
		add: {
			auth: 'required',
			handler(ctx) {
				return new Promise((resolve, reject) => {
					if (!ctx.meta.userid) {
						reject(
							new MoleculerError('Not authorized!', 422, '', {
								field: 'tokenGoogle',
								message: 'No Token'
							})
						);
					}
					this.isInDatabase(ctx.meta.userid)
						.then((res) => {
							if (!res.authed) {
								const insetAuthed = `mutation createAuthed($data: AuthedCreateInput!){
									createAuthed(data: $data){
										idGoogle
									}}`;
								const authedData = {
									data: {}
								};
								resolve('We cant add yet but you could');
							} else {
								reject(
									new MoleculerError('Is already registered!', 422, '', {
										field: 'idGoogle',
										message: 'Is already registered'
									})
								);
							}
						})
						.catch((err) => {
							reject(err);
						});
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
				return new Promise((resolve, reject) => {
					client
						.verifyIdToken({
							idToken: tokenGoogle,
							audience: process.env.CLIENT_ID
						})
						.then((ticket) => {
							const payload = ticket.getPayload();
							const userid = payload['sub'];
							resolve(userid);
						})
						.catch((err) => {
							reject(err);
						});
				});
			}
		}
	},
	/**
	 * Methods
	 */
	methods: {
		isInDatabase(tokenGoogle) {
			return new Promise((resolve, reject) => {
				if (!tokenGoogle) {
					reject(
						new MoleculerError('you must provide tokenGoogle', 422, '', {
							field: 'tokenGoogle',
							message: 'you must provide tokenGoogle'
						})
					);
				}
				const authedAcc = `query isIn($where: AuthedWhereUniqueInput!){
				authed(where: $where){
					id
				}}`;
				const where = { where: { tokenGoogle: tokenGoogle } };
				prisma
					.$graphql(authedAcc, where)
					.then((res) => {
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		}
	}
};
