"use strict"

document.getElementById('convert').addEventListener("click", () => {
    let amount = document.getElementById('amount').value;
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let convert = `${from}_${to}`;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${convert}&compact=ultra`;

    document.getElementById('result').innerHTML = "Converting Values...";
    fetch(url).then((response) => {
        return response.json();
    }).catch((err) => {
        document.getElementById('result').innerHTML = "Click convert button again"; 
    })
    .then((myJson) => {
        let converted = myJson[convert] * amount;
        document.getElementById('result').innerHTML = Math.round(converted);
        console.log(Math.round(converted));
    });

});


