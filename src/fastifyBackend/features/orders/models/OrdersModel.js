import moment from 'moment-timezone';
import { firestore } from '../../../lib/firestore.js';

export default {
	async add({ params }) {
		const { collection } = getCollection();

		const docRef = await collection.add(toAddDocument({ params }));

		const snapshot = await docRef.get();

		const newDocument = fromSnapshot({ snapshot });

		return { newDocument };
	},
	async update({ params, id }) {
		const { collection } = getCollection();

		const docRef = await collection.doc(id);

		await docRef.update(toUpdateDocument(params));

		const snapshot = await docRef.get();

		const updatedDocument = fromSnapshot({ snapshot });

		return { updatedDocument };
	}
};

function getCollection() {
	const collection = firestore.collection('orders');

	return { collection };
}

function fromSnapshot({ snapshot }) {
	const { menuItems, notes, phoneNumber, pickUpTime } = snapshot.data();

	return {
		menuItems,
		notes,
		phoneNumber,
		pickUpTime
	};
}

function toAddDocument({ params }) {
	return {
		createdAt: moment().toDate(),
		updatedAt: moment().toDate(),
		menuItems: params.menuItems || [],
		notes: params.notes || '',
		phoneNumber: params.phoneNumber || '',
		pickUpTime: params.pickUpTime
	};
}

function toUpdateDocument({ params }) {
	return {
		updatedAt: moment().toDate(),
		menuItems: params.menuItems,
		notes: params.notes,
		phoneNumber: params.phoneNumber,
		pickUpTime: params.pickUpTime
	};
}
