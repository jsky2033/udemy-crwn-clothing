import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmqDjIL5anmLG-xSRYlC0Q52FXG61Hiqw",
  authDomain: "udemy-crwn-clothing-db-96378.firebaseapp.com",
  projectId: "udemy-crwn-clothing-db-96378",
  storageBucket: "udemy-crwn-clothing-db-96378.appspot.com",
  messagingSenderId: "131528361520",
  appId: "1:131528361520:web:4eab1f70bd8eacfcdbcff5",
};

initializeApp(firebaseConfig);

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
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign out user
export const signOutUser = () => signOut(auth);

// authstatechange
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
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

// create collection and documents

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // create collection reference
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  // add objects to collection
  objectsToAdd.forEach((object) => {
    // create document reference by using collection ref
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // set value in batch
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // get array of all categories
  const querySnapshot = await getDocs(q);
  // create map of categories with the key being the cat title and the value being the cat body
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {}); // we set the accumulator to be an object


  return categoryMap;
};

// ITEM OBJECT SCHEMA

// <categories> // collection of categories
// [
//    <category> // document with a collection in one of the fields
//   {
//     title: "Hats",
//     items: [
//       {
//         id: 1,
//         name: "Brown Brim",
//         imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
//         price: 25,
//       },
//     ]
//   }
// ]
