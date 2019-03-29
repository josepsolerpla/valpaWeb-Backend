'use strict';

const { ServiceBroker } = require('moleculer');
const { ValidationError, MoleculerError } = require('moleculer').Errors;

const BrokerApp = require('./mockConfigMoleculer');

const dotenv = require('dotenv');
dotenv.config();

console.warn = jest.fn();

describe("Test 'authed' service", () => {
	let broker = new ServiceBroker(BrokerApp);
	// let broker = new ServiceBroker({ logger: false });
	broker.loadService('./services/authedLogins.service');

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Broker is working and configured', () => {
		it('Broker is started', () => {
			expect(broker.started).toBe(true);
		});
		it('Broker is connected by TCP', () => {
			expect(broker.options.transporter).toBe('TCP');
		});
		it('Broker has my configuration', () => {
			expect(broker.options).toBe(BrokerApp);
		});
	});
	describe('Test for ADD action', () => {
		broker.loadService('./services/authedLogins.service.js');
		it('Call with valid meta', () => {
			let ctx = {
				meta: {
					userid: process.env.TOKEN_GOOGLE
				}
			};
			broker
				.call('authed.add', ctx)
				.then((res) => {
					expect(res).toBe('We cant add yet but you could');
				})
				.catch((err) => {
					console.log(err.data);
				});
		});
		it('Call without valid meta', () => {
			broker.call('authed.add', { meta: { userid: 'testing' } }).then().catch((err) => {
				expect(err).toBeInstanceOf(MoleculerError);
				expect(err.data.field).toBe('tokenGoogle');
				expect(err.data.message).toBe('you must provide tokenGoogle');
			});
		});
		it('Call without params', () => {
			broker
				.call('authed.add')
				.then()
				.catch((err) => {
					expect(err).toBeInstanceOf(MoleculerError);
				})
				.catch((err) => {
					console.log(err.data);
				});
		});
	});
	describe('Test for isIn action', () => {
		broker.loadService('./services/authedLogins.service.js');
		it('Call with valid meta', () => {
			let ctx = {
				meta: {
					userid: process.env.TOKEN_GOOGLE
				}
			};
			broker
				.call('authed.isIn', ctx)
				.then((res) => {
					expect(res).toBe('We cant add yet but you could');
				})
				.catch((err) => {
					console.log(err.data);
				});
		});
		it('Call without valid meta', () => {
			broker.call('authed.isIn', { meta: { userid: 'testing' } }).then().catch((err) => {
				expect(err).toBeInstanceOf(MoleculerError);
				expect(err.data.field).toBe('tokenGoogle');
				expect(err.data.message).toBe('you must provide tokenGoogle');
			});
		});
		it('Call without params', () => {
			broker
				.call('authed.isIn')
				.then()
				.catch((err) => {
					expect(err).toBeInstanceOf(MoleculerError);
				})
				.catch((err) => {
					console.log(err.data);
				});
		});
	});
});
