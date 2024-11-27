import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB33IjZYOILeS7rhNP8MjotvRyhTE0U9OE",
  authDomain: "dreammap-6e53b.firebaseapp.com",
  projectId: "dreammap-6e53b",
  storageBucket: "dreammap-6e53b.firebasestorage.app",
  messagingSenderId: "714509163746",
  appId: "1:714509163746:web:2754dfbb72be4211f352bb",
  measurementId: "G-S3FVVCN2E9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);