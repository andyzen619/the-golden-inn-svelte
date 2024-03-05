/**
 * Creates a Firestore document model with add and update methods.
 * @param {Object} options - The options object.
 * @param {Function} options.getCollection - A function that returns the Firestore collection reference.
 * @param {Function} options.fromSnapshot - A function to convert a Firestore snapshot to a document object.
 * @param {Function} options.toAddDocument - A function to convert parameters to a document object for adding.
 * @param {Function} options.toUpdateDocument - A function to convert parameters to a document object for updating.
 * @returns {Object} A Firestore document model object with add and update methods.
 * @property {Function} add - An asynchronous method to add a new document to the Firestore collection.
 * @property {Function} update - An asynchronous method to update an existing document in the Firestore collection.
 */
export default function getFirestoreDocumentModel({
	getCollection,
	fromSnapshot,
	toAddDocument,
	toUpdateDocument
}) {
	return {
		/**
		 * Adds a new document to the Firestore collection.
		 * @param {Object} options - The options object.
		 * @param {Object} options.params - The parameters for creating the new document.
		 * @returns {Promise<Object>} An object containing the newly added document.
		 * @property {Object} newDocument - The newly added document.
		 */
		async add({ params }) {
			const { collection } = getCollection();

			const docRef = await collection.add(toAddDocument({ params }));

			const snapshot = await docRef.get();

			const newDocument = fromSnapshot({ snapshot });

			return { newDocument };
		},
		/**
		 * Updates an existing document in the Firestore collection.
		 * @param {Object} options - The options object.
		 * @param {string} options.id - The ID of the document to update.
		 * @param {Object} options.params - The parameters for updating the document.
		 * @returns {Promise<Object>} An object containing the updated document.
		 * @property {Object} updatedDocument - The updated document.
		 */
		async update({ params, id }) {
			const { collection } = getCollection();

			const docRef = await collection.doc(id);

			await docRef.update(toUpdateDocument(params));

			const snapshot = await docRef.get();

			const updatedDocument = fromSnapshot({ snapshot });

			return { updatedDocument };
		}
	};
}
