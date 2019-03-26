'use strict';

const { MoleculerClientError } = require('moleculer').Errors;
const { prisma } = require('../prisma/generated/prisma-client');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slug = require('slug');

module.exports = {
	name: 'users',
	settings: {
		JWT_SECRET: process.env.JWT_SECRET || 'jwt-valpa-secret', // Secret for JWT
		fields: [ '_id', 'name', 'email', 'image' ], //Public fields
		entityValidator: {
			name: { type: 'string', min: 2, pattern: /^[a-zA-Z0-9]+$/ },
			password: { type: 'string', min: 6 },
			email: { type: 'email' },
			image: { type: 'string', optional: true }
		} //Validator schema for entity
	},
	actions: {
		/**
		 * Login
		 * 
		 * @actions
		 * @param {Object} user - User entity
		 * 
		 * @returns {Object} Created entity & token
		 */
		login: {
			params: {
				user: {
					type: 'string'
				},
				password: {
					type: 'string'
				}
			},
			async handler(ctx) {
				const query = `
                  query user($data: UserWhereUniqueInput!) {
                    user(where: $data) {
                      id
                      name
                      email
                      role
                      password
                    }
                  }
                `;
				const data = {
					data: {
						name: ctx.params.user
					}
				};

				return await prisma
					.$graphql(query, data)
					.then((user) => {
						if (user.user) {
							return bcrypt.compare(ctx.params.password, user.user.password).then((res) => {
								if (!res) {
									return Promise.reject(
										new MoleculerClientError('Wrong password!', 422, '', [
											{ field: 'Password', message: 'invalid!' }
										])
									);
								} else {
									// return this.transformDocuments(ctx, {}, user.user);
									return user.user;
								}
							});
						} else {
							return Promise.reject(
								new MoleculerClientError('Email not exist!', 422, '', [
									{ field: 'Email', message: 'not exist!' }
								])
							);
						}
					})
					.then((user) => this.transformEntity(user, true, ctx.meta.token));
			}
		},
		/**
		 * Register a new user
		 * 
		 * @actions
		 * @param {Object} user - User entity
		 * 
		 * @returns {Object} Created entity & token
		 */
		create: {
			// auth: 'required',
			params: {
				user: { type: 'object' }
			},
			async handler(ctx) {
				const entity = ctx.params.user;
				/**
				 * Check name
				 */
				const checkUser = ` 
					query user($where: UserWhereUniqueInput!){
						user(where: $where){
							id
						}
					}
				`;
				const name = { where: { name: entity.name } };
				const user = await prisma.$graphql(checkUser, name);
				if (user.user) {
					return Promise.reject(
						new MoleculerClientError('name is exist!', 422, '', [ { field: 'name', message: 'is exist' } ])
					);
				}

				/**
				 * Check Email
				 */
				const checkEmail = `
					query user($where: UserWhereUniqueInput!){
						user(where: $where){
							id
						}
					}
				`;
				const email = { where: { email: entity.email } };
				const userChecked = await prisma.$graphql(checkEmail, email);
				if (userChecked.user) {
					return Promise.reject(
						new MoleculerClientError('Email is exist!', 422, '', [
							{ field: 'Email', message: 'is exist' }
						])
					);
				}
				/**
				 * Inesert User
				 */
				const insetUser = `
					mutation createUser($data: UserCreateInput!){
						createUser(data: $data){
							id
							name
							password
							slug
							email
						}
					}
				`;
				entity.password = bcrypt.hashSync(entity.password, 10); // Generate password encrypted
				entity.slug =
					slug(entity.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36); // Generate Slug
				const userComplete = {
					data: {
						name: entity.name,
						email: entity.email,
						password: entity.password,
						slug: entity.slug
					}
				};
				return await prisma
					.$graphql(insetUser, userComplete)
					//.then((res) => this.transformDocuments(ctx, {}, res))
					.then((user) => this.transformEntity(user, true, ctx.meta.token));
				//.then((json) => this.entityChanged('created', json, ctx).then(() => json));
			}
		},
		/**
		 * Get user by JWT token (for API GW authentication)
		 *
		 * @actions
		 * @param {String} token - JWT token
		 *
		 * @returns {Object} Resolved user
		 */
		resolveToken: {
			cache: {
				keys: [ 'token' ],
				ttl: 60 * 60 // 1 hour
			},
			params: {
				token: { type: 'string', optional: false }
			},
			handler(ctx) {
				return new this.Promise((resolve, reject) => {
					jwt.verify(ctx.params.token, this.settings.JWT_SECRET, (err, decoded) => {
						resolve(decoded);
					});
				}).then((decoded) => {
					if (decoded.id) return this.getById(decoded.id);
				});
			}
		}
	},
	/**
	 * Methods
	 */
	methods: {
		/**
		 * Generate a JWT token from user entity
		 * 
		 * @param {Object} user 
		 */
		generateJWT(user) {
			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 60);

			return jwt.sign(
				{
					id: user._id,
					name: user.name,
					exp: Math.floor(exp.getTime() / 1000)
				},
				this.settings.JWT_SECRET
			);
		},

		/**
		 * Transform returned user entity. Generate JWT token if neccessary.
		 * 
		 * @param {Object} user 
		 * @param {Boolean} withToken 
		 */
		transformEntity(user, withToken, token) {
			if (user) {
				user.image = user.image || '';
				if (withToken) user.token = token || this.generateJWT(user);
			}
			return {
				user: {
					name: user.name,
					email: user.email,
					id: user.id,
					image: user.image,
					role: user.role,
					token: user.token
				}
			};
			// return user;
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
