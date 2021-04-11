let listFD1=document.querySelector('#FDlist1');
let listFD2=document.querySelector('#FDlist2');

function CreateListElement(PRamt,Value,Type){
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  div2.setAttribute('class','listEleFD');
  div1.setAttribute('class','listEleFD');
  if(Type=='Recurring'){
  div1.innerHTML = "Amount Given: "+PRamt+"<br>Interest Earned: "+Value+"<hr>";
  listFD1.appendChild(div1);
  }
else{
  div2.innerHTML = "Amount Given: "+PRamt+"<br>Interest Earned: "+Value+"<hr>";
  listFD2.appendChild(div2);
}
 
  

}


var Total = [];

setTimeout(async function() {
 
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      var docRef =  db.collection('users').doc(user.uid);
     await docRef.collection('FD').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
         
                     console.log(doc.data().Value)
                    
                     Total.push(doc.data().Value);
                     

                     CreateListElement(
                      doc.data().PRamt,
                      doc.data().Value,
                      doc.data().Type
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
      ValFD:sum
    });

    document.querySelector('#totbb').innerHTML="₹ "+sum;

      }
      
    
    
    else{

    }


}, 5000);