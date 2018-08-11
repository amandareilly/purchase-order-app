const ClickHandler = require('./ClickHandler');

// when document is ready, add necessary client click listeners
document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        ClickHandler.addClickListeners();
    }
}