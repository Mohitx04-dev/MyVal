let listLA=document.querySelector('#LAcont');

function CreateListElement(amt,profit){
  let div = document.createElement('div');
  div.innerHTML = "Amount Given: "+amt+"<br>Returned Value: "+profit+"<hr>";
  div.setAttribute('class','listEleLA');
  listLA.appendChild(div);

}
var Total = [];

setTimeout(async function() {
 
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      var docRef =  db.collection('users').doc(user.uid);
     await docRef.collection('LA').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
         
                     console.log(doc.data().profit)
                    
                     Total.push(doc.data().profit);
                     

                     CreateListElement(
                      doc.data().amount,
                      doc.data().profit
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
      ValLA:sum
    });

    document.querySelector('#totbb').innerHTML="₹ "+sum;

      }
      
    
    
    else{

    }


}, 5000);








