function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 4000);
    });
  }
var MFid;
var PriceStock=0; var StockName;var Stockcd;
function AddtoDB(AmtInv,CurInv,Profit,Stockcd,NoStocks){
    var user = firebase.auth().currentUser;
    console.log(user.uid)
        if (user) {
          
                  db.collection('users').doc(user.uid).collection('Stocks').doc().set({
                           AmountInv:AmtInv,
                           NameStock:StockName,
                           Profit:Profit,
                           CurrentInvestment:CurInv,
                           StockCode:Stockcd,
                           NoStocks:NoStocks
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        }); 
              
               
            
        
        } else {
            alert('user not logged in');
        }
    
}
$(function() {
    searchText = null;
    $( "#search" ).autocomplete({
       search:function (event, ui) {
           searchText =  encodeURIComponent(document.getElementById("search").value);
           console.log(searchText);
       },
        source: async function(req,res){
           // console.log(searchText  + "  in Making Ajax Call");
            await $.ajax({
                dataType: "json",
                url: 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+searchText+'&apikey=%api_key_stock%',
                success: function(data) {
                    $('#search').removeClass('ui-autocomplete-loading');
                },
                error: function(data) {
                    
                    $('#search').removeClass('ui-autocomplete-loading');
                }
            }).done(async function(data) {
                var wantedData = data.bestMatches.filter(function(i) {
                    return i["8. currency"] === 'INR';   
                  });
                await res(wantedData);
            });
        },
        select:  async function (event, ui) {
            if(ui){
                console.log(ui.item["1. symbol"]);
                StockName = ui.item["2. name"];
                Stockcd = ui.item["1. symbol"];
                var urlStock = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+ui.item["1. symbol"]+'&apikey=%api_key_stock%'
             
                  await $.ajax({
                    dataType: "json",
                    url: urlStock,
                    success: async function(data){
                        console.log(data);
                        if (data) {
                            PriceStock =  await data["Global Quote"]["05. price"];
                             console.log(PriceStock);
                            changes(PriceStock);
                             }
                    },
                    error: function(data) {
                        
                    }});
                                   
            function changes(PriceStock){
                document.getElementById("match-list").value =ui.item["2. name"];
                document.getElementById("match-list").innerHTML='';
                var MFn = document.createElement("P");
                MFn.style.fontFamily = "Microsoft YaHei";
                MFn.style.marginTop = "0.5em";
                MFn.style.color = "#5D2B5F";
                MFn.innerHTML = ''+ui.item["2. name"]+'<br>'+"Current Price = ₹ "+PriceStock;
                document.getElementById("match-list").append(MFn);
                MFid = ui.item["1. symbol"];
                };
            }
         

        }

    }).data("ui-autocomplete")._renderItem = function (ul, item) {
          
        return $("<li>")
            .data("ui-autocomplete-item", item["1. symbol"])
            .append(item["1. symbol"])
            .attr("schemeCode", item["1. symbol"])
            .appendTo(ul);
            
    }
    
    
});

  
document.querySelector('#StockBtn').addEventListener('click',function (){
    document.getElementById('ProfBOX').innerHTML="";
    let ShareRate =  document.getElementById('ShareRate').value;
    let ShareNo =  document.getElementById('ShareNo').value;

    if(ShareRate == '' || ShareNo == ''){
        alert("Fields Empty");
    }
    else{
        var AmtInv = ShareNo * ShareRate;
        var CurInv = PriceStock * ShareNo;
        var Profit = CurInv - AmtInv;
    }

    if(Profit){
        let ProfBox = document.createElement('input');
        ProfBox.setAttribute('type','text');
        ProfBox.value = "Profit Gained is " + Profit; 
        ProfBox.style.cssText = "width: 250px;background-color: rgba(0,0,0,0.043);height: 38px;padding-left: 2%;";
        document.getElementById('ProfBOX').appendChild(ProfBox);
        AddtoDB(AmtInv,CurInv,Profit,Stockcd,ShareNo);
    }



});





