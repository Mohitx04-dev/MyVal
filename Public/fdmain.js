

//FD Starts here
function comb(n,r)
{
    var ans=1;
    for(var i=1;i<=r;i++)
    {
       ans=ans*(n-i+1)/i;
    }
    return ans;
}
function fd_comp(p,i ,t,n)
{
    ///compounded monthly, n=12
    ///compounded bimonthly, n=24
    ///compounded every 2 monthl, n=6
    ///compounded yearly, n=1
    ///compounded monthly, n=12
    ///compounded daily, n=1

    let a=1;
    let temp1=t*n;
    let temp2=i/(100*n),temp3=temp2;
    for (var i=1;i<=5;i++)/*can change the 5 to lower number to save time i guess
        and lose some accuracy, with 5 its accurate to 1 rupees*/
    {
    a+=comb(temp1 ,i )*(temp2);
    temp2=temp2*temp3;
    }
    return p*a;
}
function fd_fixed(p,i,d,t){
    return p*(i/1200)*(d);

}
var FD;
const checked = document.querySelector('input[name=type]:checked');
document.querySelector('#FDbutton').addEventListener('click', function(){
let fdprincipalamt = document.getElementById('fdprincipalamt');
let fdIntRate = document.getElementById('fdIntRate');
let tenureFD = document.getElementById('tenureFD');
var DurationSel = document.getElementById('DurationSel').value;
let FDres = document.getElementById('FDres');
let IntT = document.getElementById('IntT');
const checked = document.querySelector('input[name=type]:checked');
if(checked.value=='Fixed'){
    document.getElementById('IntT').style.display='inline-block';
     FD = fd_fixed(fdprincipalamt.value,fdIntRate.value,DurationSel,tenureFD.value);
    FDres.value='Interest/Payout: '+FD;
    let intT=FD*(tenureFD.value*12/DurationSel);
    document.querySelector('#IntT').value = 'Interest/Tenure: '+intT;
    FD=intT;
}
else if(checked.value=='Recurring'){

 FD = fd_comp(fdprincipalamt.value,fdIntRate.value,tenureFD.value,DurationSel);
FDres.value = FD;
}


console.log(DurationSel);

var user = firebase.auth().currentUser;
        if (user) {
            let value = FD.toFixed(2);
            value = parseInt(value);
            if(
               value === ''   
              
                ){
                    alert('Fields Empty');
                }
                else{
                  db.collection('users').doc(user.uid).collection('FD').doc().set({
                      PRamt:fdprincipalamt.value,
                           Value:value,
                           Type:checked.value
                          
                    }).then(() => {
                        alert("Successfully Entered")
                        console.log("Success");
                       window.location = 'listFD.html';
                        }); 
              
               
            }
        
        } else {
            alert('user not logged in');
        }
    });
    