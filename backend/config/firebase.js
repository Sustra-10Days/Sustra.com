import dotenv from "dotenv";

dotenv.config();

import admin from "firebase-admin";
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  console.log("FIREBASE_SERVICE_ACCOUNT:", process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}
export default admin;

