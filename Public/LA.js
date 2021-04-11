function formReset(){
    document.querySelector("#amtgiven").value = '' ;  
    document.querySelector("#LAIntRate").value ='';    
    document.querySelector("#tenureLA").value = '';
}
function total(p,i,t){
    x=p+(p*t*i/100);
    return x;

}

setTimeout(function() {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    console.log(user.uid)
    document.querySelector('#LAsubbtn').addEventListener('click',function(){
        if (user) {
        var amt = document.querySelector('#amtgiven').value;
            var int = document.querySelector('#LAIntRate').value;
            var tenure = document.querySelector('#tenureLA').value;
            amt=parseInt(amt);
            int=parseInt(int);
            tenure=parseInt(tenure);
           var profit=total(amt,int,tenure);
            if(
               amt === ''   ||
               int ===''    ||
               tenure ===''
                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('LA').doc().set({
                           amount:amt,
                           interest:int,
                           tenure:tenure,
                           profit:profit
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        window.location = "listLA.html";
                        formReset();
                        }); 
              
               
            }
        
        } else {
            alert('user not logged in');
        }
    })
    }, 1000);