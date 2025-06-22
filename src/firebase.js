// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// ⚠️ Compat import to support RecaptchaVerifier
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAe7TdDKneyj7N0pk9YcnScHN2JCBnp4mA",
  authDomain: "todo-list13.firebaseapp.com",
  projectId: "todo-list13",
  storageBucket: "todo-list13.appspot.com",
  messagingSenderId: "329425660043",
  appId: "1:329425660043:web:dbee059c89b706d09fcc8e",
  measurementId: "G-MW678NMJ18"
};

// ✅ Initialize modular app (used for functions like `getAuth`)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Initialize compat app (used for RecaptchaVerifier)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ✅ Export both
export { app, auth, firebase };
