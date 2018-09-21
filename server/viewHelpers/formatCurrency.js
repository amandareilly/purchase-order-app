const formatCurrency = function(context) {
    const parts = parseFloat(context).toFixed(2).toString().split('.');
    let currencyString = '$';
    const extraChars = parts[0].length % 3;
    if (extraChars) {
        currencyString += parts[0].substr(0, extraChars);
        parts[0] = parts[0].substr(extraChars);
    }

    const sections = parts[0].length / 3;
    for (let i = 0; i < sections; i++) {
        if (extraChars || i > 0) {
            currencyString += ',';
        }
        currencyString += parts[0].substr(i * 3, 3);
    }
    currencyString += '.' + parts[1].toString();

    return currencyString;
};

module.exports = formatCurrency;