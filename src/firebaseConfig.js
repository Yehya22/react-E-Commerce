import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: "e-commerce-a47fe.firebaseapp.com",
  projectId: "e-commerce-a47fe",
  storageBucket: "e-commerce-a47fe.appspot.com",
  messagingSenderId: "247225404061",
  appId: "1:247225404061:web:9b805a6649eef0425ba274",
  measurementId: "G-EM55483P8P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { firebaseConfig, auth };
