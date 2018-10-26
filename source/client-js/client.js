const ClickHandler = require('./classes/ClickHandler');
const DataHandler = require('./classes/DataHandler');

// when document is ready, add necessary client click listeners
document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        ClickHandler.addClickListeners();
        if (pageContext === 'requestDashboard') {
            DataHandler.initializeDashboardPage();
        }
    }
}