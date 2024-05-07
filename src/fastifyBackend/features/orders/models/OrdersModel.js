import moment from 'moment-timezone';
import { firestore } from '../../../lib/firestore.js';
import initBaseFirestoreDocumentModel from './utils/initBaseFirestoreDocumentModel.js';

export default {
	...initBaseFirestoreDocumentModel({
		getCollection,
		fromSnapshot,
		toAddDocument,
		toUpdateDocument
	}),
	/**
	 * Logs a custom message to the console and returns the formatted message.
	 * @param {Object} options - The options object.
	 * @param {string} options.message - The message to log.
	 * @returns {Object} An object containing the formatted custom message.
	 * @property {string} customMessage - The formatted custom message.
	 */
	custom({ message }) {
		/**
		 * The formatted custom message.
		 * @type {string}
		 */
		const customMessage = `CUSTOM: ${message}`;

		console.log(customMessage);

		return { customMessage };
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
