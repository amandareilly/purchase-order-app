const Handlebars = require('handlebars');
const sectionToggleButton = function(section, selected, requestId) {
    const string = `<li class="tab ${section}"`;
    if (selected) {
        string += ' id="selected-tab"';
    }
    string += `><a href="#" data-clickable="switchTabs" data-tab="${section}" data-reqId="${requestId}">${section.charAt(0).toUpperCase() + section.slice(1)}</a></li>`;

    return new Handlebars.SafeString(string);
};

module.exports = sectionToggleButton;