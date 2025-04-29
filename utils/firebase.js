// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; 
// const firebaseConfig = {
//   apiKey: "AIzaSyCDLwdv5tzLZ0OE7WQbKfRbqdCwBrYMmlQ",
//   authDomain: "wellilab.firebaseapp.com",
//   projectId: "wellilab",
//   storageBucket: "wellilab.firebasestorage.app",
//   messagingSenderId: "150212748452",
//   appId: "1:150212748452:web:4a49b7eac6037ebd2bb231",
//   measurementId: "G-ZEGLE380DG"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };  



import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDLwdv5tzLZ0OE7WQbKfRbqdCwBrYMmlQ",
  authDomain: "wellilab.firebaseapp.com",
  projectId: "wellilab",
  storageBucket: "wellilab.firebasestorage.app",
  messagingSenderId: "150212748452",
  appId: "1:150212748452:web:4a49b7eac6037ebd2bb231",
  measurementId: "G-ZEGLE380DG"
  };


  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };