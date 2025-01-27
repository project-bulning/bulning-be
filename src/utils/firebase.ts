import admin from "firebase-admin";
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_JSON as string).toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const messaging = admin.messaging();
