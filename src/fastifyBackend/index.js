import Fastify from 'fastify';
import OrdersService from './features/orders/services/OrdersService.js';
import moment from 'moment-timezone';

/**
 * Request body object representing an order.
 * @typedef {Object} OrderRequestBody
 * @property {Array<{ id: string, count: number }>} menuItems - An array of menu items with their IDs and counts.
 * @property {string} [notes] - Additional notes for the order.
 * @property {string} phoneNumber - The phone number associated with the order.
 * @property {string} pickUpTime - The pick-up time for the order in ISO 8601 format.
 */

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
	/**
	 * Handles creating an order.
	 * @param {import('fastify').FastifyRequest<{ Body: OrderRequestBody }>} request - The request object with a body property representing an order.
	 * @returns {Promise<{ order: any }>} A promise that resolves to an object containing the created order.
	 */
	async (request) => {
		const { menuItems, notes, phoneNumber, pickUpTime } = request.body;

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
