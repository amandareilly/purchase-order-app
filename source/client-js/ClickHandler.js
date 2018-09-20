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
            if (!clicked.hasAttribute('data-allow-default')) {
                e.preventDefault();
            }
            ClickHandler[clicked.getAttribute('data-clickable')](clicked);
        }
    },
    toggleAllRequests: function(element) {
        const userId = element.getAttribute('data-user-id');
        let swap;

        const links = document.querySelectorAll("[data-toggleable]");
        links.forEach(function(link) {
            swap = link.dataset.toggleable;
            link.dataset.toggleable = link.attributes.href.nodeValue;
            link.attributes.href.nodeValue = swap;
        });
        console.log(window.location);
        let search = window.location.search;
        let queryLoc = search.indexOf('user=');
        console.log("queryLoc", queryLoc)

        let redirect = window.location.origin + window.location.pathname;
        let updated;
        if (search) {
            if (queryLoc == -1) {
                redirect += `${search}&user=${userId}`
            } else if (queryLoc != 1) {
                redirect += `${search.substring(0,queryLoc-1)}`
            }
        } else {
            redirect += `?user=${userId}`;
        }

        window.location.href = redirect;
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