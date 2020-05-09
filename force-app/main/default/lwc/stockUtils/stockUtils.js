const getStock = (apiKey, symbol) => {
    

    return fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bqo6gpnrh5reqlm35oog`
    )
        .then((response) => {            
            console.log(response) 
            return response.json();
        })
        .then((stock) => {
            
            const s = {
                symbol: symbol,
                open: stock['o'],
                high: stock['h'],
                low: stock['l'],
                price: stock['c'],
            };            
            console.log(S)
            return s;
        });
};

export { getStock };