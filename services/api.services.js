'use strict';

const _ = require('lodash');
const ApiGateway = require('moleculer-web');
const { UnAuthorizedError } = ApiGateway.Errors;

module.exports = {
	name: 'api',
	mixins: [ ApiGateway ],
	settings: {
		port: process.env.PORT || 3000,
		routes: [
			{
				path: '/api',
				authorization: true,
				aliases: {
					// Check if this email from Google + is valid to enter on the app
					'POST /authed/isIn': 'authed.isIn',
					// Add an email valid for app from Google +
					'POST /authed/add': 'authed.add'
				},
				cors: true,
				bodyParsers: {
					json: {
						strict: false
					},
					urlencoded: {
						extended: false
					}
				}
			}
		],
		assets: {
			folder: './public'
		},
		onError(req, res, err) {
			// Return with the error as JSON object
			res.setHeader('Content-type', 'application/json; charset=utf-8');
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach((e) => {
					let field = e.field.split('.').pop();
					o[field] = e.message;
				});
				res.end(JSON.stringify({ errors: o }, null, 2));
			} else {
				const errObj = _.pick(err, [ 'name', 'message', 'code', 'type', 'data' ]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err ? err.ctx : null);
		}
	},
	methods: {
		authorize(ctx, route, req) {
			let tokenGoogle;
			if (req.headers.authorization) {
				let type = req.headers.authorization.split(' ')[0];
				if (type === 'Token' || type === 'Bearer' || type == 'JWT')
					tokenGoogle = req.headers.authorization.split(' ')[1];
			}
			return this.Promise
				.resolve(tokenGoogle)
				.then((tokenGoogle) => {
					if (tokenGoogle) {
						// Verify tokenGoogle bya GAuth2
						return ctx
							.call('authed.resolveTokenGoogle', { tokenGoogle })
							.then((userid) => {
								if (userid) {
									this.logger.info('Authenticated via Google: ', userid);
									ctx.meta.userid = userid;
									ctx.meta.tokenGoogle = tokenGoogle;
								}
								return userid;
							})
							.catch((err) => {
								return null;
							});
					}
				})
				.then((userid) => {
					if (req.$endpoint.action.auth == 'required' && !userid)
						return this.Promise.reject(new UnAuthorizedError());
				});
		}
	},

	created() {}
};
