let goldW = document.getElementById('weight');
let curRate = document.getElementById('currentrate');
let GoldVal = document.getElementById('GoldVal');
function GoldCalc(){
    var urlS = 'https://metals-api.com/api/latest?access_key=vl84t4hve39382ibuye52qf78riqx9mbt1gejdduginujw2jne32iks8yw3k&base=INR&symbols=XAU%2CXAG';
$.ajax({
   url: urlS,
   dataType: 'json',
   success: function(json) {
       console.log(json.rates.XAU);
       let RatepertenGM=json.rates.XAU/28.35;
       curRate.value = RatepertenGM;
       GoldVal.value = goldW.value * curRate.value;
   }
   });
 
 }
   

