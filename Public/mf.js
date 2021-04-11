function StoreFB(AmtInv,MFname,Profit,CurInv,Units,MFcode){
    var user = firebase.auth().currentUser;
    console.log(user.uid)
        if (user) {
                  db.collection('users').doc(user.uid).collection('MF').doc().set({
                           AmountInv:AmtInv,
                           NameMF:MFname,
                           Profit:Profit,
                           CurrentVal:CurInv,
                           Units:Units,
                           MFcode:MFcode
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        window.location = "listMF.html";
                        }); 
        } else {
            alert('user not logged in');
        }
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datefield").setAttribute("max", today);
function truncate(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
}
var MFid;
$(function() {
    searchText = null;
    $( "#mfsearch" ).autocomplete({
       search:function (event, ui) {
           searchText =  encodeURIComponent(document.getElementById("mfsearch").value);
           console.log(searchText);


       },
        source:function(req,res){
           // console.log(searchText  + "  in Making Ajax Call");
            $.ajax({
                dataType: "json",
                type : 'GET',
                url: 'https://api.mfapi.in/mf/search?q='+searchText,
                success: function(data) {
                    $('#mfsearch').removeClass('ui-autocomplete-loading');
                    res(data);
                },
                error: function(data) {
                    $('#mfsearch').removeClass('ui-autocomplete-loading');
                }
            });

        },
        select:function (event, ui) {
           document.getElementById("mf").innerHTML='';
           var MFn = document.createElement("P");
           MFn.style.fontFamily = "Microsoft YaHei";
           MFn.style.color = "#5D2B5F";
           MFn.innerHTML = ''+ui.item.schemeName;
           document.getElementById("mf").append(MFn);
           console.log(ui.item.schemeName);
           MFid = ui.item.schemeCode;
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {

            return $("<li>")
            .data("ui-autocomplete-item", item)
            .append(item.schemeName)
            .attr("schemeCode", item.schemeCode)
            .appendTo(ul);

           
        }
       
          
    
});
function formattedDate(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}-${month}-${year}`;
  }

let DateArr=[];
function S(days,ele){
 
    var Ud = new Date(ele);
    var ddU = Ud.getDate();
    var mmU = Ud.getMonth() + 1;
    var yyyyU = Ud.getFullYear();
    if (ddU < 10) {
     ddU = '0' + ddU;
 }
 if (mmU < 10) {
     mmU = '0' + mmU;
 }
 var Ud = yyyyU+ddU+mmU;
    let RealDates=[];
   for(var j=0;j<days.length;++j){
       let ThisDate = days[j].date;
       var Td = new Date(ThisDate);
       var dd = Td.getDate();
       var mm = Td.getMonth() + 1;
       var yyyy = Td.getFullYear();
       if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var Td = yyyy+dd+mm;
    if(Td>10000000){
        RealDates.push(Td);
    }
      
   }
   console.log(RealDates);
   console.log(Ud);

   var closest = RealDates.reduce(function(prev, curr) {
    return (Math.abs(curr - Ud) < Math.abs(prev - Ud) ? curr : prev);
  });
  
  var Temp = closest;
  console.log(Temp);
  var year        = Temp.substring(0,4);
    var month       = Temp.substring(4,6);
    var day         = Temp.substring(6,8);

    var date        = new Date(year, month-1, day);
    console.log(date)
    temp = formattedDate(date);
    console.log(temp);
    function check(temp){
        return temp;
    }
    arrayDates =  [];
    var index;
    for(var i=0;i<days.length;i++){
        arrayDates.push(days[i].date);
        if(days[i].date===temp){
            index = i;
        }
    }
    return (days[index].nav);
}
   

document.querySelector("#MFbtn").addEventListener('click', function(){
   let TransDate = document.querySelector("#datefield").value;
   TransDate = TransDate.split("-").reverse().join("-");
   console.log(TransDate);


var urlS = 'https://api.mfapi.in/mf/'+MFid;
$.ajax({
   url: urlS,
   dataType: 'json',
   success: async function(json) {
      DateArr =  json.data;
      let CurPrice = DateArr[0].nav;
      console.log(CurPrice)
      var AmtMF = document.querySelector('#AmtMF').value;
      var Profit = 0;
          var OldP;
           OldP = S(DateArr,TransDate);
           console.log(OldP);
           var temp1 = AmtMF/OldP;
           var temp2 = temp1 * CurPrice;
           console.log(temp2)
           Profit = (temp2 - AmtMF);
            document.querySelector('#ResMF').value='Bal G/L '+Profit;
           await StoreFB(AmtMF,json.meta.scheme_name,Profit,temp2,temp1,json.meta.scheme_code);
           }
   });
});
 
