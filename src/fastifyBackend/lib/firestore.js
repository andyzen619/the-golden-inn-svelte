import { Firestore } from '@google-cloud/firestore';

import { readFileSync } from 'fs';

// @ts-ignore
const serviceAccount = JSON.parse(readFileSync('./firebaseCredentials.json'));

export const firestore = new Firestore({
	projectId: serviceAccount.project_id,
	credentials: {
		client_email: serviceAccount.client_email,
		private_key: serviceAccount.private_key
	}
});
