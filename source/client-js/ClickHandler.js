// this is a static class
require('isomorphic-fetch');
const SharedApi = require('../../server/api/SharedApi');
const ClickHandler = {
    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
    addClickListeners: function() {
        const body = document.querySelector('body');
        body.addEventListener('click', this.handleClicked);
    },
    handleClicked: function(e) {
        const clicked = e.target;
        if (clicked.hasAttribute('data-clickable')) {
            e.preventDefault();
            ClickHandler[clicked.getAttribute('data-clickable')](clicked);
        }
    },
    deleteRequest: function(element) {
        const requestId = element.getAttribute('data-reqId');
        if (confirm("Are you sure you want to delete this request?  This action CANNOT be undone!")) {
            const url = this.apiUrl + 'requests/' + requestId;
            fetch(url, {
                    method: 'delete',
                    headers: SharedApi.getHeadersWithToken(null, false, document.cookie)
                })
                .then((response) => {
                    const redirectUrl = window.location.origin + '/requests';
                    window.location.href = redirectUrl;
                })
                .catch(error => console.error('Fetch Error: ', error));
        }
    },
    submitRequest: function(element) {
        this.updateRequest(element, 'submitted');
    },
    unsubmit: function(element) {
        this.updateRequest(element, 'created');
    },
    approveRequest: function(element) {
        this.updateRequest(element, 'approved');
    },
    denyRequest: function(element) {
        this.updateRequest(element, 'denied');
    },
    updateRequest: function(element, status) {
        const requestId = element.getAttribute('data-reqId');
        const url = this.apiUrl + 'requests/' + requestId;
        const updateData = {
            id: requestId,
            status: status
        };
        const headers = SharedApi.getHeadersWithToken(null, true, document.cookie);
        fetch(url, {
                method: 'put',
                headers: headers,
                body: JSON.stringify(updateData)
            })
            .then((response) => {
                const redirectUrl = window.location.origin + '/requests/' + requestId;
                window.location.href = redirectUrl;
            })
            .catch(error => console.error('Fetch Error: ', error));
    },
}

module.exports = ClickHandler;