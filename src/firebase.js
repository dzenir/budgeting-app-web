// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDragZ-skp2HNi_PcmvX2g_eTZdQoGb_f8',
  authDomain: 'budgetingapp-3b66f.firebaseapp.com',
  projectId: 'budgetingapp-3b66f',
  storageBucket: 'budgetingapp-3b66f.appspot.com',
  messagingSenderId: '304711069665',
  appId: '1:304711069665:web:a0fe98f3f2be27d63f6ca0',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
