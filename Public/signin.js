


document.querySelector('#Login').addEventListener('click',function(event){
  var email  = document.querySelector('#UserNameSign').value;
  var password = document.querySelector("#PasswordSign").value;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("signed");
    // Signed in
    var user = userCredential.user;

    // ...
  }).then(() => {
    window.location.href = 'main.html';
    })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});


});
  