let goldW = document.getElementById('Gweight');
let GcurRate = document.getElementById('Gcurrentrate');

function AddtoFB(Gweight,GcurRate){
    var user = firebase.auth().currentUser;
    console.log(user.uid)
        if (user) {
            Gweight=parseInt(Gweight);
            GcurRate=parseInt(GcurRate);
            console.log(Gweight);
            console.log(GcurRate)
          
          
            if(
               Gweight === ''   ||
               GcurRate ===''    
              
                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('gold').doc().set({
                           Gweight:Gweight,
                           Grate:GcurRate
                          
                         
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        window.location = "listjewel.html";
                      
                        }); 
              
               
            }
        
        } else {
            alert('user not logged in');
        }
}


 document.querySelector('#Gsubbtn').addEventListener('click', async  function(){
    
        var urlS = 'https://metals-api.com/api/latest?access_key=ni7adgep9x3s49i8cmymwhtc7ps8pf77hy02g15sh7180lm1obb257ad46xj&base=INR&symbols=XAU%2CXAG';
  await   $.ajax({
       url: urlS,
       dataType: 'json',
       success: function(json) {
           console.log(json)
           console.log(json.rates.XAU);
           let RatepertenGM=json.rates.XAU/28.35;
           GcurRate.value 
            = goldW.value * RatepertenGM;
            if(GcurRate.value){
                AddtoFB(goldW.value,GcurRate.value);
            }
           
       }
       })
     

      
       })
     
 

 




   


