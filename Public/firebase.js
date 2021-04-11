var firebaseConfig = {
    apiKey: "AIzaSyB7p8yqmlPLN7KjjQsbYGdtPn-AjHdEM1s",
    authDomain: "myval-f479a.firebaseapp.com",
    projectId: "myval-f479a",
    storageBucket: "myval-f479a.appspot.com",
    messagingSenderId: "766870714718",
    appId: "1:766870714718:web:c4198457ccb935521e77cf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  function logout(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert("Signed out");
      window.location.href="index.js";
    }).catch((error) => {
      // An error happened.
    });
    }
    
