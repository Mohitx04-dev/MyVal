let silverW = document.getElementById('Sweight');
let ScurRate = document.getElementById('Scurrentrate');

function AddtoFB(Sweight,ScurRate){
    var user = firebase.auth().currentUser;
    console.log(user.uid)
        if (user) {
            Sweight=parseInt(Sweight);
            ScurRate=parseInt(ScurRate);
            console.log(Sweight);
            console.log(ScurRate)
          
          
            if(
               Sweight === ''   ||
               ScurRate ===''    
              
                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('Silver').doc().set({
                           Sweight:Sweight,
                           Srate:ScurRate
                          
                         
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

document.querySelector('#Ssubbtn').addEventListener('click',function(){
    var urlS = 'https://metals-api.com/api/latest?access_key=ni7adgep9x3s49i8cmymwhtc7ps8pf77hy02g15sh7180lm1obb257ad46xj&base=INR&symbols=XAU%2CXAG';
    $.ajax({
       url: urlS,
       dataType: 'json',
       success: function(json) {
           console.log(json.rates.XAG);
           let RatepertenGM=json.rates.XAG/28.35;
           ScurRate.value = silverW.value * RatepertenGM;
           if(ScurRate.value){
            AddtoFB(silverW.value,ScurRate.value);
        }
       }
       });

       
     
})