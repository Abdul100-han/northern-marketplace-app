import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCIqHPJl752FZ6Ta9Xshbe4DSoTJGBwboI",
   authDomain: "northern-marketplace.firebaseapp.com",
   projectId: "northern-marketplace",
   storageBucket: "northern-marketplace.firebasestorage.app",
   messagingSenderId: "716887971657",
   appId: "1:716887971657:web:b4af2992f0cb325d572c98",
   measurementId: "G-PQX68265PS"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Default export
// export default { auth: getAuth(app), db: getFirestore(app) };
// Initialize Auth and Firestore


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);