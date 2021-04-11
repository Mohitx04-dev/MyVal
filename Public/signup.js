window.onload = function(){
    document.getElementById('Div2Signup').style.display = 'none';
}
document.querySelector('#SignupBtn1').addEventListener('click',function(event){
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value; 
  
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          document.getElementById("Div2Signup").style.display = "block";
          document.getElementById("Div1Signup").style.visibility = "hidden";
          document.getElementById("Div1Signup").style.maxHeight = 0; 
          // ...
        })
        .catch((error) => {
            alert("Error occured due to invalid or duplicate entry");
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    })
});

function formReset(){
    document.querySelector('#name').value = "";
    document.querySelector('#age').value = "";
}

document.querySelector('#SignupBtn2').addEventListener('click',function(){

    let Name = document.querySelector('#name').value;
    let Age = document.querySelector('#age').value;
    var user = firebase.auth().currentUser;

if (user) {
    const id = user.uid;
    console.log(user.uid);
    if(
        Name === ''    ||
        Age===''   
        ){
            alert('Fields Empty');
        }
        else{
          db.collection('users').doc(id).collection('PersonalDetails').doc(id).set({
                    Name:Name,
                    Age:Age,
                    NetVal:0
            }).then(() => {
                console.log("Success");
                
                formReset();
                window.location.href = 'index.html';
                }); 
                db.collection('users').doc(id).set({
                    ValBankBal: 0,
                    ValFD: 0,
                    ValJew: 0,
                    ValLA: 0,
                    ValLB: 0,
                    ValProp: 0,
                    ValStocks: 0,
                    ValMF: 0
                })
       
    }

} else {
    alert('user not logged in');
}
   
        


});
  
