'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

var prisma_lib_1 = require('prisma-client-lib');
var typeDefs = require('./prisma-schema').typeDefs;

var models = [
	{
		name: 'Role',
		embedded: false
	},
	{
		name: 'User',
		embedded: false
	},
	{
		name: 'Authed',
		embedded: false
	},
	{
		name: 'AllowedCalendar',
		embedded: false
	}
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
	typeDefs,
	models,
	endpoint: `http://yuse.ga:4465`
});
exports.prisma = new exports.Prisma();
