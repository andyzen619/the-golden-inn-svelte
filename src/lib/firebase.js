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

export async function getMenu() {
	const reference = doc(db, 'menu-items', '8rlkNqMBTIK3TU6SdEgh');

	const snapshot = await getDoc(reference);

	const { combinations, dinners, dishes } = snapshot.data();

	const { Rice, appetizers, canadian, cantonese, chowMein, eggFooYoung, soups, vA } = dishes;

	return {
		combinations: { list: applyMenuItemToAll(combinations), name: combinations.name },
		dinners: { list: applyMenuItemToAll(dinners), name: dinners.name },
		rice: { list: applyMenuItemToAll(Rice), name: Rice.name },
		appetizers: { list: applyMenuItemToAll(appetizers), name: appetizers.name },
		canadian: { list: applyMenuItemToAll(canadian), name: canadian.name },
		cantonese: { list: applyMenuItemToAll(cantonese), name: cantonese.name },
		chowMein: { list: applyMenuItemToAll(chowMein), name: chowMein.name },
		eggFooYoung: { list: applyMenuItemToAll(eggFooYoung), name: eggFooYoung.name },
		soups: { list: applyMenuItemToAll(soups), name: soups.name },
		vegetablesAndAlmonds: { list: applyMenuItemToAll(vA), name: vA.name },
		sweetAndSour: {
			list: applyMenuItemToAll(dishes['sweet&Sour']),
			name: dishes['sweet&Sour'].name
		}
	};
}

/**
 * A menu item
 * @param {{ price: string; description: string; image: URL; name: string; }} params
 */
function MenuItem(params) {
	return {
		price: params.price,
		description: params.description || '',
		image: params.image || '',
		name: params.name
	};
}

/**
 * @param {{ [s: string]: any; } | ArrayLike<any>} all
 */
function applyMenuItemToAll(all) {
	const { name, ...restOfValues } = all;

	return Object.values(restOfValues).map((value) => {
		return MenuItem(value);
	});
}
