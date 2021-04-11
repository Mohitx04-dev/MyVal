function formReset(){
    document.querySelector("#amtTaken").value = '' ;  
    document.querySelector("#LBIntRate").value ='';    
    document.querySelector("#tenureLB").value = '';
}
function total(p,i,t){
    let x=p+(p*t*i/100);
    return x;

}
setTimeout(function() {
    const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    console.log(user.uid)
    document.querySelector('#LBsubbtn').addEventListener('click',function(){
        if (user) {
            var LBamt  = document.getElementById('amtTaken').value;
            var LBint = document.getElementById('LBIntRate').value;
            var LBtenure = document.getElementById('tenureLB').value;
            LBamt = parseInt(LBamt);
            LBint = parseInt(LBint);
            LBtenure = parseInt(LBtenure);
            var amtToBePaid=total(LBamt,LBint,LBtenure);
            amtToBePaid = parseInt(amtToBePaid);
            if(
               LBamt === ''   ||
               LBint ===''    ||
               LBtenure ===''
                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('LB').doc().set({
                           amtB:LBamt,
                           intB:LBint,
                           tenureB:LBtenure,
                           amtToBePaid:amtToBePaid
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        formReset();
                        window.location = "listLB.html"
                        }); 
              
               
            }
        
        } else {
            alert('user not logged in');
        }
    })
   
    }, 1000);