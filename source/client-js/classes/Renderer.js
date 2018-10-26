const Renderer = {
    clearRequestsDashboard: function() {
        $('.request-grid-container').empty();
        $('.spinner-container').removeClass('hidden');
    },
    addRequestToDashboard: function(data) {
        const template = Handlebars.partials['partials_request_requestSummary'];
        $('.request-grid-container').append(template(data));
    },
    renderFilterPanel: function(data) {
        const template = Handlebars.partials['partials_dashboard_filterPanel'];
        $('.filter-panel').html(template(data));
    },
    renderRequestHtml: function(data) {
        return Handlebars.partials['partials_request_requestSummary'](data);
    },
    renderNoRequestsFound: function() {
        $('.spinner-container').addClass('hidden');
        $('.request-grid-container').append('<h2 class="no-requests-found">No matching requests were found.  Please change your filters and try again.</h2>');
        $('.filter-form').removeClass('hidden');
    }
};
module.exports = Renderer;