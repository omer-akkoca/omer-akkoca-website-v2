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

// Fail with the missing variable names (e.g. on a Vercel build without them) instead of an
// opaque Firestore error later.
const missing = Object.entries({
  FIREBASE_API_KEY: firebaseConfig.apiKey,
  FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
  FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
  FIREBASE_APP_ID: firebaseConfig.appId,
})
  .filter(([, value]) => !value)
  .map(([name]) => name);
if (missing.length > 0) {
  throw new Error(`Missing Firebase env vars: ${missing.join(", ")} (see .env.example)`);
}

const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const db = getFirestore(app);
