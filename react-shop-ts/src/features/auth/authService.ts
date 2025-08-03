import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
    type Auth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0e3yv5FqmhIH8g0Rhz37EL2R1uz8jUag",
    authDomain: "myshop-fb2a0.firebaseapp.com",
    projectId: "myshop-fb2a0",
    storageBucket: "myshop-fb2a0.appspot.com",
    messagingSenderId: "959008539141",
    appId: "1:959008539141:web:00f03accb4bc13988fd26c",
    measurementId: "G-VQ0822JHPK"
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => signOut(auth);

export const subscribeToAuth = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};