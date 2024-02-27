const BASE_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const formCurr=document.querySelector(".from select ");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD") {
            newOption.selected="selected";
        }
        else if (select.name==="to" && currCode==="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag= (element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
let img= element.parentElement.querySelector("img");
img.src = newSrc;
};
const updateExcangeRate= async ()=>{
    let amount= document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    };
const URL=`${BASE_url}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response=await fetch(URL);
let data= await response.json();
let rate= data[toCurr.value.toLowerCase()];

let finalAmount=amtVal*rate;
msg.innerText=`${amtVal}${formCurr.value}=${finalAmount}${toCurr.value}`;
}
btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
   updateExcangeRate();
});
//to load the fuction from te start 
window.addEventListener("load",()=>{
updateExcangeRate();
});
