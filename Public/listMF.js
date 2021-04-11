let MFcont=document.querySelector('#MFcont');

function CreateListElement(Name,current,profit,Units,Inv){
  let div = document.createElement('div');
  div.innerHTML = "Name: "+Name+"<br>Current Value: "+current+"<br>Unrealised G/L: "+profit+"<br>"+"Invested Value: "+Inv+"<br> Units Owned: "+Units+"<hr>";
  div.setAttribute('class','listStocks');
  MFcont.appendChild(div);
}

var Sum=[];

function SumTOT(arr){
  var sum =   arr.reduce(function(a, b){
    return a + b;
}, 0);
return sum;
}

setTimeout(function() {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      db.collection('users').doc(user.uid).collection('MF').get().then(async function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
              var Units= doc.data().Units;
              var AmountInv = doc.data().AmountInv;
         
                var MFcode = doc.data().MFcode;
                var urlStock = 'https://api.mfapi.in/mf/'+MFcode;
                await  $.ajax({
                    dataType: "json",
                    url: urlStock,
                    success: async function(data){
                   
                    },
                    error: function(data) {
                        
                    }}).done(async function(data){
                      if (data) {
                          console.log(data.data[0].nav)
                        CurrentMFPrice =  data.data[0].nav;
                         console.log(CurrentMFPrice);
                         Sum.push(CurrentMFPrice*Units);
                         if(CurrentMFPrice){
                          
                           var Profit = (Units*CurrentMFPrice)-AmountInv;
                        await   doc.ref.update({
                               Profit: Profit,
                               CurrentVal:(Units*CurrentMFPrice)
                           }).then(function () {
                            CreateListElement(
                                doc.data().NameMF,
                                doc.data().CurrentVal,
                                doc.data().Profit,
                                doc.data().Units,
                                doc.data().AmountInv)
                           }
);
                           console.log('success');
                          
                         }
                        
                       
                         }
                        
                          
                  })

                   
                    });
        });
      }
    else{

    }
}
, 5000);

setTimeout(function () {
  var user = firebase.auth().currentUser;
  if (user) {
  var docRef = db.collection('users').doc(user.uid);
  var sum = SumTOT(Sum);
  sum = parseInt(sum);
  docRef.update({
  ValMF:sum
});
  }
  else{
 
  }

console.log(sum)

k = parseFloat(sum).toFixed(2);
const loader = document.querySelector(".loader");
loader.className += " hidden"; // class "loader hidden"
document.querySelector('#totbb').innerHTML="₹ "+k;

}, 10000);
