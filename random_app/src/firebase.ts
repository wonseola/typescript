import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "bom-random2.firebaseapp.com",
    projectId: "bom-random2",
    storageBucket: "bom-random2.appspot.com",
    messagingSenderId: "580584953155",
    appId: "1:580584953155:web:42b6ea277621b66bf40bf6"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const rtdb = getDatabase();


