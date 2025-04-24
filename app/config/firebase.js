
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCIqHPJl752FZ6Ta9Xshbe4DSoTJGBwboI",
//   authDomain: "northern-marketplace.firebaseapp.com",
//   projectId: "northern-marketplace",
//   storageBucket: "northern-marketplace.firebasestorage.app",
//   messagingSenderId: "716887971657",
//   appId: "1:716887971657:web:b4af2992f0cb325d572c98",
//   measurementId: "G-PQX68265PS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);