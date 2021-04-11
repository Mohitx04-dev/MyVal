function formReset(){
    document.querySelector("#cashinhand").value = '' ; }
setTimeout(function() {
var user = firebase.auth().currentUser;
console.log(user.uid)
let totbb = document.getElementById('totbb');

if (user) {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    var docRef =     db.collection('users').doc(user.uid).collection('BankBal').doc(user.uid);
            docRef.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data().totbb);
          
            totbb.innerHTML='₹'+doc.data().Bal;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   
} 

document.querySelector('#cash').addEventListener('click', async function(){
    if (user) {
        let CashT = document.querySelector('#cashinhand').value;
        CashT = parseInt(CashT);
        if(
            CashT === ''   
            ){
                alert('Fields Empty');
            }
            else{
                docRef = db.collection('users').doc(user.uid);
            await docRef.collection('BankBal').doc(user.uid).set({
                        Bal:CashT
                }).then(() => {
                    console.log("Success");
                    formReset();
                    totbb.innerHTML='₹'+CashT;
                    
                    }); 
                    docRef.update({
                        ValBankBal:CashT
                    })
          
           
        }
    
    } else { 
        alert('user not logged in');
    }
})
}, 1000);