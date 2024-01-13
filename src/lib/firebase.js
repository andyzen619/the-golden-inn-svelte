import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCEjL7ZIpn9SUG8raac9BtH18ZONAD_3hc',
	projectId: 'the-golden-inn-restaurant'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function getBannerMessage() {
	const reference = doc(db, 'messages', 'bannerMessage');

	const snapshot = await getDoc(reference);

	const { message, title, visible } = snapshot.data();

	return { message, title, visible };
}

export async function getHoursOfOperation() {
	const reference = doc(db, 'messages', 'frontPageMessages');

	const snapshot = await getDoc(reference);

	const { hoursOfOperation } = snapshot.data();

	return hoursOfOperation;
}
