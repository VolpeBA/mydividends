async function getStockData() {
    const symbol = document.getElementById('symbolInput').value;
    const url = `http://localhost:3000/api/stock?symbol=${symbol}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            showError(data.error);
        } else {
            showStockData(data);
        }
    } catch (error) {
        showError('Erro ao buscar os dados da ação: ' + error.message);
    }
}

function showStockData(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
    const timeSeries = data["Time Series (Daily)"];
    const mostRecent = timeSeries[lastRefreshed];

    const html = `
        <h2>Dados da ação</h2>
        <p><strong>Última atualização:</strong> ${lastRefreshed}</p>
        <p><strong>Preço de abertura:</strong> ${mostRecent["1. open"]}</p>
        <p><strong>Preço de fechamento:</strong> ${mostRecent["4. close"]}</p>
        <p><strong>Maior preço:</strong> ${mostRecent["2. high"]}</p>
        <p><strong>Menor preço:</strong> ${mostRecent["3. low"]}</p>
    `;

    resultDiv.innerHTML = html;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p id="error">${message}</p>`;
}
