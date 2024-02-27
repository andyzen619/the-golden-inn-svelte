import Fastify from 'fastify';
import OrdersService from './features/orders/services/OrdersService.js';
import moment from 'moment-timezone';

const PinoPrettyLoggingConfig = {
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'HH:MM:ss Z',
			ignore: 'pid,hostname'
		}
	}
};

export const fastify = Fastify({
	logger: PinoPrettyLoggingConfig
});

fastify.get('/orders', async (request, reply) => {
	return { orders: [] };
});

fastify.post(
	'/orders',
	{
		schema: {
			body: {
				type: 'object',
				properties: {
					menuItems: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: {
									type: 'string'
								},
								count: {
									type: 'integer'
								}
							},
							required: ['id', 'count']
						}
					},
					notes: {
						type: 'string'
					},
					phoneNumber: {
						type: 'string',
						pattern: '^\\+\\d{11,}$'
					},
					pickUpTime: {
						type: 'string',
						format: 'date-time'
					}
				},
				required: ['menuItems', 'phoneNumber', 'pickUpTime']
			}
		}
	},
	async (request) => {
		const { body } = request;

		const { menuItems, notes, phoneNumber, pickUpTime } = body;

		const orderParams = { menuItems, notes, phoneNumber, pickUpTime: moment(pickUpTime).toDate() };

		const { newOrder } = await OrdersService.createOrder({ orderParams });

		return {
			order: newOrder
		};
	}
);

fastify.put('/orders', (request, reply) => {
	return {
		order: {}
	};
});

fastify.delete('/orders', (request, reply) => {
	return {
		order: {}
	};
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);

		process.exit(1);
	}
};

start();
