import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Server-only Firebase setup. The config comes from non-public env vars (see .env.example),
// so it never ends up in the client bundle.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const db = getFirestore(app);
