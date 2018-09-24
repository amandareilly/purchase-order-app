const Handlebars = require('handlebars');
const prettyMoreListText = function(array, limit, reqId) {
    if (array.length > limit) {
        return new Handlebars.SafeString(`<a href="#" class="item-list-more-items" data-clickable="viewRequest" data-reqId="${reqId}">... and ${array.length-limit} more.</a>`)
    }
}

module.exports = prettyMoreListText;