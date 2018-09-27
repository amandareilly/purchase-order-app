const Handlebars = require('handlebars');
const prettyMoreListText = function(array, limit, reqId) {
    if (array.length > limit) {
        return new Handlebars.SafeString(`<li><a href="#" class="item-list-more-items" data-clickable="viewRequest" data-reqId="${reqId}">... and ${array.length-limit} more.</a></li>`)
    }
}

module.exports = prettyMoreListText;