import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCt8Jkb4A9V2lWf__Mk1uDIQW6oN9ytzGg",
    authDomain: "test-react-e7d91.firebaseapp.com",
    projectId: "test-react-e7d91",
    storageBucket: "test-react-e7d91.appspot.com",
    messagingSenderId: "896688390674",
    appId: "1:896688390674:web:f89a3e5b23dba4ec5e4ecb",
    measurementId: "G-2NWSRLS2ET"
  };
  // Initialize Firebase
 const fireb = firebase.initializeApp(firebaseConfig);
 const store = fireb.firestore()

export { store } 
