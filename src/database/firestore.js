import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyBcSmdXDinuQ5ufXKthmoiIMqqyD6CnSLE",
  authDomain: "test-aee23.firebaseapp.com",
  projectId: "test-aee23",
  storageBucket: "test-aee23.appspot.com",
  messagingSenderId: "190844310249",
  appId: "1:190844310249:web:df85f8a10e51ae9f4e5678",
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const expenseRef = collection(db, "expenses");
