let listLB=document.querySelector('#LBcont');

function CreateListElement(amt,amtToBePaid){
  let div = document.createElement('div');
  div.innerHTML = "Amount Taken: "+amt+"<br> Amount To be Returned: "+amtToBePaid+"<hr>";
  div.setAttribute('class','listEleLB');
  listLB.appendChild(div);

}


var Total = [];

setTimeout(async function() {
 
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      var docRef =  db.collection('users').doc(user.uid);
     await docRef.collection('LB').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
         
                     console.log(doc.data().amtToBePaid)
                    
                     Total.push(doc.data().amtToBePaid);
                     

                     CreateListElement(
                      doc.data().amtB,
                      doc.data().amtToBePaid
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
      ValLB:sum
    });

    document.querySelector('#totbb').innerHTML="₹ "+sum;

      }
      
    
    
    else{

    }


}, 5000);