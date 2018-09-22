const Handlebars = require('handlebars');

const setViewActions = function(status) {

    let string = '<i class="material-icons">';
    switch (status) {
        case 'created':
            string += 'new_releases';
            break;
        case 'submitted':
            string += 'thumbs_up_down';
            break;
        case 'approved':
            string += 'thumb_up';
            break;
        case 'denied':
            string += 'thumb_down';
            break;
        case 'ordered':
            string += 'shopping_cart';
            break;
        case 'complete':
            string += 'done_outline';
            break;
        default:
            throw new Error('Invalid status');
    }
    string += '</i>'
    return new Handlebars.SafeString(string);
};

module.exports = setViewActions;