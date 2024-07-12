const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const dropdowns=document.querySelectorAll(".dropdown select");
  const btn= document.querySelector(".btn-1");
  const fromCurr=document.querySelector(".from select");
  const ToCurr=document.querySelector(".to select");
  const message=document.querySelector(".msg");

  for(let select of dropdowns){
    for(let currcode in countryList){    //it will return all the codes
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        
       

        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
       else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        });

    }
  

  const updateFlag=(element)=>{
     let code=element.value ;// element is 'select'(as event listner is added on select) and its value is the currency code (the key in countryList)
     let countrycode=countryList[code]; // we will get the country code.( the value corr. to key in the countryList)

     let newimgSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
     
     //to access the old img

     let oldimg= element.parentElement.querySelector("img"); // where element is the select and the image is inside select's parent div...see html

     oldimg.src=newimgSrc;
  }

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let val=amount.value;
    if(val===" "|| val<1){
        val=1;
        amount.value="1";
    }

    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
 let data=await  response.json();
 let rate=data[ToCurr.value.toLowerCase()];
 console.log(rate);

 let totalamt=val*rate;
 message.innerText=`${val}${fromCurr.value}=${totalamt}${ToCurr.value}`;




});
