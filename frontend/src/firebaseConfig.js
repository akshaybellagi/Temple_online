// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAbK2WpPQEonNZa4C3Vkl_gbbc7tQ53Hi4",
  authDomain: "temple.firebaseapp.com",
  projectId: "temple",
  storageBucket: "temple.firebasestorage.app",
  messagingSenderId: "32286703885",
  appId: "1:32286703885:web:c57d3096d07d6baecef044",
  measurementId: "G-H6NMQX65Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only if supported
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch((error) => {
  console.log('Analytics not supported:', error);
});

export { analytics };
export default app;
