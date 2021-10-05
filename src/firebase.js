import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

var firebaseConfig = {
    apiKey: "AIzaSyDNxZm1T5Bc88fSBA1y3gR-6sWJQ8dKleQ",
    authDomain: "mss-project-e15ef.firebaseapp.com",
    projectId: "mss-project-e15ef",
    storageBucket: "mss-project-e15ef.appspot.com",
    messagingSenderId: "61147106260",
    appId: "1:61147106260:web:84eba36cb273e824e22441"
  };
  // Initialize Firebase
  var fireDb=firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();