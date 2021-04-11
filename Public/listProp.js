let listProp=document.querySelector('#propcont');

function CreateListElement(Puramt,appreciation){
  let div = document.createElement('div');
  div.innerHTML = "Amount of Purchase: "+Puramt+"<br>Appreciated Value: "+appreciation+"<hr>";
  div.setAttribute('class','listEleProp');
  listProp.appendChild(div);

}


var Total = [];

setTimeout(async function() {
 
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      var docRef =  db.collection('users').doc(user.uid);
     await docRef.collection('Prop').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
         
                     console.log(doc.data().CurrentRate)
                    
                     Total.push(doc.data().CurrentRate);
                     

                     CreateListElement(
                      doc.data().PurchaseAmt,
                      doc.data().CurrentRate
                     )
                     });
                    
                      
              }
             
    );
    console.log(Total);
    var sum = Total.reduce(function(a, b){
      return a + b;
  }, 0);
  console.log(sum)
   await docRef.update({
      ValProp:sum
    });

    document.querySelector('#totbb').innerHTML="₹ "+sum;

      }
      
    
    
    else{

    }


}, 5000);