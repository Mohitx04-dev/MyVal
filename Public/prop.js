
    $( '#date' ).datepicker({
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yy',
        onClose: function(dateText, inst) { 
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, 1));
        }
    });
$('#date').focus(function () {
        $(".ui-datepicker-month").hide();
    });

    function formReset(){
        document.querySelector("#amtPur").value = '' ;  
        document.querySelector("#date").value ='';    
      
    }
 
setTimeout(function() {
    const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    console.log(user.uid)
    document.querySelector('#subbtnProp').addEventListener('click',function(){
        if (user) {
            let PurAmt = document.querySelector('#amtPur').value;
            let yearPur = document.querySelector('#date').value;
            let CurYear = new Date().getFullYear();
            let X = CurYear-yearPur;
            PurAmt=parseInt(PurAmt);
            yearPur=parseInt(yearPur);
            CurYear=parseInt(CurYear);
            X=parseInt(X);
            var NewAmt = (0.05*PurAmt)*X + PurAmt;
            if(
                PurAmt === ''  ||
                yearPur===''

                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('Prop').doc().set({
                          PurchaseAmt:PurAmt,
                          PurchaseYear:yearPur,
                          CurrentRate:NewAmt
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                        formReset();
                        window.location = "listProp.html"

                        }); 
              document.getElementById('NewValProp').value = NewAmt;
               
            }
        
        } else {
            alert('user not logged in');
        }
    })
    }, 1000);