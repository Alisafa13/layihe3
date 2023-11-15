const apiKey = 'a9256b83300fb9058e7cb910';

const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const fromCurrencyAmountInput = document.querySelector(".fromCurrencyAmount");
const toCurrencyAmountInput = document.querySelector(".toCurrencyAmount");
const curToCur1 = document.getElementById("curToCur1");
const curToCur2 = document.getElementById("curToCur2");

fromCurrencySelect.addEventListener("change", convertCurrency);
fromCurrencyAmountInput.addEventListener("input", convertCurrency);
toCurrencySelect.addEventListener("change", convertCurrency);
toCurrencyAmountInput.addEventListener("input", convertCurrency);

function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    if (this === fromCurrencyAmountInput) {
        const amount = fromCurrencyAmountInput.value;
        if (!isNaN(amount)) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const exchangeRate1 = data.conversion_rates[toCurrency];
                    const convertedAmount1 = amount * exchangeRate1;
                    toCurrencyAmountInput.value = convertedAmount1.toFixed(4);
                    curToCur1.textContent = `1 ${fromCurrency} = ${exchangeRate1} ${toCurrency}`;
                })
                .catch(error => {
                    console.error('Error fetching exchange rate:', error);
                });
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${toCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const exchangeRate2 = data.conversion_rates[fromCurrency];
                    curToCur2.textContent = `1 ${toCurrency} = ${exchangeRate2} ${fromCurrency}`;
                })
        }
    }
    else if (this === toCurrencyAmountInput) {
        const amount = toCurrencyAmountInput.value;
        if (!isNaN(amount)) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${toCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const exchangeRate2 = data.conversion_rates[fromCurrency];
                    const convertedAmount2 = amount * exchangeRate2;
                    fromCurrencyAmountInput.value = convertedAmount2.toFixed(4);
                    curToCur2.textContent = `1 ${toCurrency} = ${exchangeRate2} ${fromCurrency}`;
                })
                .catch(error => {
                    console.error('Error fetching exchange rate:', error);
                });
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    const exchangeRate1 = data.conversion_rates[toCurrency];
                    curToCur1.textContent = `1 ${fromCurrency} = ${exchangeRate1} ${toCurrency}`;
                })
                .catch(error => {
                    console.error('Error fetching exchange rate:', error);
                });
        }
    }
    fromCurrencySelect.addEventListener("change", () => {
        toCurrencyAmountInput.value = "";
        fromCurrencyAmountInput.value = "";
        curToCur1.textContent = "";
        curToCur2.textContent = "";
    });
    toCurrencySelect.addEventListener("change", () => {
        toCurrencyAmountInput.value = "";
        fromCurrencyAmountInput.value = "";
        curToCur1.textContent = "";
        curToCur2.textContent = "";
    });
};








