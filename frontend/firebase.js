import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv_fDujHhCrcMOPO1zZVupwna_jNRSq9w",
  authDomain: "test-express-firebase-5e515.firebaseapp.com",
  projectId: "test-express-firebase-5e515",
  storageBucket: "test-express-firebase-5e515.firebasestorage.app",
  messagingSenderId: "906771104713",
  appId: "1:906771104713:web:dcf365edead98d3d9ede18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };