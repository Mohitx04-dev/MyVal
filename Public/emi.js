let EMIprincipalamt = document.getElementById('EMIprincipalamt');
let EMIIntRate = document.getElementById('EMIIntRate');
let EMIperiod = document.getElementById('EMIperiod');
function emi(p,r,n)
{
    r=r/100;
    r=r/12;
    n=12*n;
    let temp1=1.00;
    for(let i=1;i<=n;i++)
    {
        temp1=temp1*(1+r);
    }
    return p*r*temp1/(temp1-1);
}
function emi_total(emi, n)
{
    n=12*n;
    return emi*n;
}
function EMIsub(){
    let e = emi(EMIprincipalamt.value,EMIIntRate.value,EMIperiod.value);
    let ResEMI = emi_total(e,EMIperiod.value);
    document.getElementById('EMIres').value = ResEMI;
}

