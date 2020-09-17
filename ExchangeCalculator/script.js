
// api url
const url = "https://api.exchangeratesapi.io/"

const currency_one = document.getElementById('currency_one');
const currency_two = document.getElementById('currency_two');
const el_amount = document.getElementById('amount')
const btn_calculate = document.getElementById('btn_calculate')
const result = document.getElementById('result')

// load symbol

fetch('./currencies.json')
    .then(res => res.json())
    .then(data => {
        const keys = Object.keys(data)
        const values = Object.values(data)
        let options ;
        for (let i = 0; i < keys.length; i++) {
            options +=`
            <option value=${keys[i]}> ${values[i]} </option>
            `
        }
        currency_one.innerHTML += options
        currency_two.innerHTML += options
    })

btn_calculate.addEventListener('click',function(){

    const base_currency = currency_one.value;
    const to = currency_two.value;
    const amount = el_amount.value;

    fetch(`${url}latest?base=${base_currency}`)
    .then(res => res.json())
    .then(data => {
        if (data.rates) {
            let price = data.rates[to]*amount
            price = price.toFixed(4);
            if (price > 0) {
                result.innerHTML = ""
                result.innerHTML += `${amount} ${base_currency} = ${price} ${to}`
            }else{
                result.innerHTML = 'Please enter a valid amount'
            }
        }else{
            result.innerHTML = 'Please select currency!'
        }

    }).catch()
})