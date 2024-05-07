import { auditLog } from '../../../lib/logging.js';
import OrdersModel from '../models/OrdersModel.js';

export default {
	async createOrder({ orderParams }) {
		const { newDocument: newOrder } = await OrdersModel.add({ params: orderParams });

		OrdersModel.custom({ message: 'In between add order and audit logging' });

		const { success = false } = auditLog({ message: 'New order created', newOrder });

		return { newOrder, auditLogged: success };
	}
};
