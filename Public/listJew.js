let listGold=document.querySelector('#Goldcont');
let listSilver=document.querySelector('#Silvercont');
function CreateListElementJ(Jweight,Jrate){
  let div = document.createElement('div');
  div.innerHTML = "Weight: "+Jweight+"grams<br> Rate: "+Jrate+"<hr>";
  div.setAttribute('class','listEleGold');
  listGold.appendChild(div);

}
function CreateListElementS(Jweight,Jrate){
  let div = document.createElement('div');
  div.innerHTML = "Weight: "+Jweight+"grams<br> Rate: "+Jrate+"<hr>";
  div.setAttribute('class','listEleGold');
  listSilver.appendChild(div);

}
var TotalG = [];
var TotalS = [];
var sumG;
var sumS;
var sum;
var RatepertenGM;
var urlS = 'https://metals-api.com/api/latest?access_key=ni7adgep9x3s49i8cmymwhtc7ps8pf77hy02g15sh7180lm1obb257ad46xj&base=INR&symbols=XAU%2CXAG';
$.ajax({
   url: urlS,
   dataType: 'json',
   success: function(json) {
       console.log(json.rates.XAU);
       RatepertenGMG=json.rates.XAU/28.35;
}});

var urlS = 'https://metals-api.com/api/latest?access_key=ni7adgep9x3s49i8cmymwhtc7ps8pf77hy02g15sh7180lm1obb257ad46xj&base=INR&symbols=XAU%2CXAG';
$.ajax({
   url: urlS,
   dataType: 'json',
   success: function(json) {
       console.log(json.rates.XAG);
       RatepertenGMS=json.rates.XAG/28.35;
}});
setTimeout(async function() {

 
    var user = firebase.auth().currentUser;
    if (user) {
      var docRef =  db.collection('users').doc(user.uid);
     await docRef.collection('gold').get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
               
          
                   var NewAMT =  doc.data().Gweight * RatepertenGMG;
             
                       TotalG.push(NewAMT);
                       
  
                       CreateListElementJ(
                        doc.data().Gweight,
                        doc.data().Grate
                       )
               
 
                     });
                    
                      
              }
             
    );
    console.log(TotalG);
  sumG = TotalG.reduce(function(a, b){
      return a + b;
  }, 0);
console.log(sumG)
   

await docRef.collection('Silver').get().then(function(querySnapshot) {
  querySnapshot.forEach(async function(doc) {
         
    
             var NewAMT =  doc.data().Sweight * RatepertenGMS;
       
                 TotalS.push(NewAMT);
                 

                 CreateListElementS(
                  doc.data().Sweight,
                  doc.data().Srate
                 )
         

               });
              
                

              });
    
    
      console.log(TotalS);
      sumS = TotalS.reduce(function(a, b){
          return a + b;
      }, 0);
    console.log(sumS)
    sum = sumS+ sumG;
    await docRef.update({
      ValJew:sum
    });
  document.querySelector('#totbb').innerHTML="₹ " +sum;
  }  

  else{

  }


}, 5000);








