import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmqDjIL5anmLG-xSRYlC0Q52FXG61Hiqw",
  authDomain: "udemy-crwn-clothing-db-96378.firebaseapp.com",
  projectId: "udemy-crwn-clothing-db-96378",
  storageBucket: "udemy-crwn-clothing-db-96378.appspot.com",
  messagingSenderId: "131528361520",
  appId: "1:131528361520:web:4eab1f70bd8eacfcdbcff5",
};

const firebaseApp = initializeApp(firebaseConfig);

// AUTHENTICATION
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
// get auth instance
export const auth = getAuth();

// sign in methods
export const signInWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// authenticate user creation
export const createAuthUserWithEmailAndPassword = async (
  auth,
  email,
  password
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// DATABASE

// get database instance
export const db = getFirestore();

// create user after authentication
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation // not all user info can be found in userAuth!
) => {
  // get user reference
  const userDocRef = doc(db, "users", userAuth.uid);

  // try and get this doc with the usr reference
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(err.code);
    }
  }
};
