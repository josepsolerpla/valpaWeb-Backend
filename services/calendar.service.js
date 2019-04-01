'use strict';

const { MoleculerError } = require('moleculer').Errors;
const { prisma } = require('../prisma/generated/prisma-client');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'AllowedCalendar',
	actions: {
		/**
         * Use this Action to check if the database
		 * 
		 * Is mainly focused to be used by the api, if you want to use it on other action just use the method insted.
         */
		isIn: {
			params: {
				idCalendar: 'string'
			},
			handler(ctx) {
				const { idCalendar } = ctx.params;
				return new Promise((resolve, reject) => {
					if (!idCalendar) {
						reject(
							new MoleculerError('you must provide idCalendar', 422, '', {
								field: 'idCalendar',
								message: 'you must provide idCalendar'
							})
						);
					}
					const query = `query isIn($where: AllowedCalendarWhereUniqueInput!){
									allowedCalendar(where: $where){
										idCalendar
									}}`;
					const where = { where: { idCalendar: idCalendar } };
					prisma
						.$graphql(query, where)
						.then((res) => {
							resolve(res);
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
			params: {
				idCalendar: 'string'
			},
			handler(ctx) {
				const { idCalendar } = ctx.params;
				return new Promise((resolve, reject) => {
					if (!idCalendar) {
						reject(
							new MoleculerError('you must provide idCalendar', 422, '', {
								field: 'idCalendar',
								message: 'you must provide idCalendar'
							})
						);
					}
					const query = `query add($where: AllowedCalendarCreateInput!){
									allowedCalendar(data: $where){
										idCalendar
									}}`;
					const where = { where: { idCalendar: idCalendar } };
					prisma
						.$graphql(query, where)
						.then((res) => {
							resolve(res);
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
		isInDatabase(idCalendar) {
			return new Promise((resolve, reject) => {
				if (!idCalendar) {
					reject(
						new MoleculerError('you must provide idCalendar', 422, '', {
							field: 'idCalendar',
							message: 'you must provide idCalendar'
						})
					);
				}
				const query = `query isIn($where: AuthedWhereUniqueInput!){
				authed(where: $where){
					id
				}}`;
				const where = { where: { idCalendar: idCalendar } };
				prisma
					.$graphql(query, where)
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
