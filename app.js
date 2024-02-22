const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for(currCode in countryCurrencyCodes){
        let newOption = document.createElement("option");
        newOption.innerText = countryCurrencyCodes[currCode];
        newOption.value = countryCurrencyCodes[currCode];
        if(select.name === "from" && countryCurrencyCodes[currCode]=== "USD"){
            newOption.selected = "selected";            
        }
        else if(select.name === "to" && countryCurrencyCodes[currCode]=== "INR"){
            newOption.selected = "selected";            
        }

        select.append(newOption);
    }

    select.addEventListener("click",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag = (element)=>{
    let currCd = element.value;
    let contCd = getCountry(countryCurrencyCodes,currCd);
    let newSrc = `https://flagsapi.com/${contCd}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

function getCountry(ccountryCurrencyCodes, currency){
    return Object.keys(ccountryCurrencyCodes).find(key=>ccountryCurrencyCodes[key]=== currency);
}

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchange();
})

window.addEventListener("load",()=>{
    updateExchange();
})


const updateExchange = async()=>{
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval === " " || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = rate * amtval;
    console.log(finalAmt);
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}





