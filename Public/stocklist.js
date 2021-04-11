let Stockcont=document.querySelector('#Stockcont');

function CreateListElement(Name,current,profit){
  let div = document.createElement('div');
  div.innerHTML = "Name: "+Name+"<br>Current Value: "+current+"<br>Unrealised G/L: "+profit+"<hr>";
  div.setAttribute('class','listStocks');
  Stockcont.appendChild(div);
}

var Sum=[];

function SumTOT(arr){
  var sum =   arr.reduce(function(a, b){
    return a + b;
}, 0);
return sum;
}
setTimeout(async function() {

  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
     
      db.collection('users').doc(user.uid).collection('Stocks').get().then(async function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
              var NoofStocks= doc.data().NoStocks;
              var AmountInv = doc.data().AmountInv;
         
                var Stockcd = doc.data().StockCode;
                var urlStock = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+Stockcd+'&apikey=%api_key_stock%';
                await  $.ajax({
                    dataType: "json",
                    url: urlStock,
                    success: async function(data){
                   
                    },
                    error: function(data) {
                        
                    }}).done(async function(data){
                      if (data) {
                        PriceStock = await data["Global Quote"]["05. price"];
                         console.log(PriceStock);
                         if(PriceStock){
                           var CurInv = PriceStock*NoofStocks;
                           Sum.push(CurInv);
                           var Profit = CurInv-AmountInv;
                           console.log(CurInv);
                           console.log(Profit);
                           doc.ref.update({
                               Profit: Profit,
                               CurrentInvestment:CurInv
                           });
                           console.log('success');
                         }
                         CreateListElement(
                          doc.data().NameStock,
                          doc.data().CurrentInvestment,
                          doc.data().Profit)
                         }
                        
                          
                  })

                   
                    });
                 
        })
          console.log(Sum);

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
  sum = parseFloat(sum);
  docRef.update({
  ValStocks:sum
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
