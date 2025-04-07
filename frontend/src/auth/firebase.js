import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4Mc-x2DmOStVfwfede92p5OjspxWYon8",
  authDomain: "creatives-c19cf.firebaseapp.com",
  projectId: "creatives-c19cf",
  storageBucket: "creatives-c19cf.firebasestorage.app",
  messagingSenderId: "380518269905",
  appId: "1:380518269905:web:1fa15c411085a9eb7516f0",
  measurementId: "G-GXTVE5M25X"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);