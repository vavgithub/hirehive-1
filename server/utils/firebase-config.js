import admin from "firebase-admin";

let serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CRED);

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const messagingFCM = admin.messaging(adminApp)
