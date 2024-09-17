document.getElementById('from-currency').addEventListener('change', convertirMoneda);
document.getElementById('to-currency').addEventListener('change', convertirMoneda);
document.getElementById('amount').addEventListener('input', convertirMoneda);

function convertirMoneda() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (amount === '' || amount <= 0) {
        document.getElementById('result').textContent = 'Por favor, ingresa una cantidad válida.';
        return;
    }

    const apiKey = '011a433445a8defc5bca0b7f';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById('result').textContent = 
                    `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
            } else {
                document.getElementById('result').textContent = 
                    'Error al obtener los tipos de cambio. Intenta de nuevo más tarde.';
            }
        })
        .catch(error => {
            document.getElementById('result').textContent = 
                'Hubo un problema con la solicitud. Verifica tu conexión a internet.';
        });
}
