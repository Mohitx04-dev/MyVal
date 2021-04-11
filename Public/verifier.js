function logout(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    }

    window.onload = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        } else {
            window.location.href = 'index.html'; 
        }
      });
    }