import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

// authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // get user reference
  const userDocRef = doc(db, "users", userAuth.uid);

  // try and get this doc with the usr reference
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log(err);
    }
  }
};
