const ClientFunctions = require('./classes/ClientFunctions');

// when document is ready, add necessary client click listeners
document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        ClientFunctions.eventListeners.add('general');
        if (pageContext === 'requestDashboard') {
            ClientFunctions.renderer.initializeDashboardPage();
        }
    }
}