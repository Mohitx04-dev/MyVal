
     var Sum=[];

let HeadName = document.getElementById('HeadName');
let total = document.getElementById('total');
    setTimeout(function() {
        const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
        var user = firebase.auth().currentUser;
        console.log('first 10 secs');
    console.log('page loaded');
 function verify(){
    console.log('called');
    if (user) {

   
        var PostRef =  db.collection('users').doc(user.uid);
        PostRef.get().then((doc) =>{
            if (doc.exists){
                var Tot = doc.data().ValBankBal + doc.data().ValFD+ doc.data().ValJew + doc.data().ValLA+ doc.data().ValLB+ doc.data().ValProp+ doc.data().ValStocks+doc.data().ValMF;
                Sum.push(Tot);
            }
        }
        )


        let HeadName = document.querySelector('#HeadName');
        var docRef =     db.collection('users').doc(user.uid).collection('PersonalDetails').doc(user.uid);
                docRef.get().then((doc) => {
            if (doc.exists) {

                docRef.update({
                    NetVal:Sum[0]
                  }).then(function() {
                    console.log(doc.data().Name);
                     Display();
                  })

             
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   
    } 
    
    else {
       
    }
    async function Display(){
        var docRef =     db.collection('users').doc(user.uid).collection('PersonalDetails').doc(user.uid);
        docRef.get().then((doc) => {
    if (doc.exists) {
        var Net = doc.data().NetVal;
        Net = parseFloat(Net).toFixed(2);
    HeadName.innerHTML=''+doc.data().Name;
    total.innerHTML='₹'+Net;
    }
    else{
    
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   
    
    
    
    
    
    
    
    }
}
console.log(Sum);
verify();
}, 5000);

