// this is a static class
require('isomorphic-fetch');
const SharedApi = require('../../server/api/SharedApi');
const ClickHandler = {
    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
    addClickListeners: function() {
        const body = document.querySelector('body');
        const vendorSelector = document.getElementById('vendor-selector');
        body.addEventListener('click', this.handleClicked);
        vendorSelector.addEventListener('change', this.changedVendorSelector);
    },
    changedVendorSelector: function(e) {
        const vendorSelector = document.getElementById('vendor-selector');
        const selected = vendorSelector.options[vendorSelector.selectedIndex].value;
        if (selected === 'create-new-vendor') {
            $('#vendorName').toggleClass('hidden').addAttr('required');
        } else {
            if (!$('#vendorName').hasClass('hidden')) {
                $('#vendorName').toggleClass('hidden').removeAttr('required');
            }
        }
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
    toggleRequestCardMenu: function(element) {
        const reqId = element.getAttribute('data-reqId');
        const iconElement = $(`[data-clickable="toggleRequestCardMenu"][data-reqId="${reqId}"`);
        const navElement = iconElement.parent();
        navElement.toggleClass('menu-open');
        if (navElement.hasClass('menu-open')) {
            iconElement.html('close');
        } else {
            iconElement.html('menu');
        }
    },
    toggleRequestListView: function(element) {
        const reqId = element.getAttribute('data-reqId');
        const iconElement = $(`[data-clickable="toggleRequestListView"][data-reqId="${reqId}"`);
        const listElement = iconElement.parent();
        listElement.toggleClass('list-open');
        if (listElement.hasClass('list-open')) {
            iconElement.html('close');
        } else {
            iconElement.html('list');
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
        let search = window.location.search;
        let queryLoc = search.indexOf('user=');

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
    viewRequest: function(element) {
        const requestId = element.getAttribute('data-reqId');
        window.location.href = `${window.location.origin}/requests/${requestId}`;
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
        console.log('submit');
        this.updateRequest(element, 'submitted');
    },
    unsubmit: function(element) {
        console.log('unsubmit');
        this.updateRequest(element, 'created');
    },
    approveRequest: function(element) {
        console.log('approve request');
        this.updateRequest(element, 'approved');
    },
    denyRequest: function(element) {
        console.log('deny request');
        this.updateRequest(element, 'denied');
    },
    markOrdered: function(element) {
        console.log('mark ordered');
        this.updateRequest(element, 'ordered');
    },
    markComplete: function(element) {
        console.log('mark complete');
        this.updateRequest(element, 'complete');
    },
    updateRequest: function(element, status) {
        const refreshOnUpdate = element.getAttribute('data-refresh-on-update');
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
                if (refreshOnUpdate) {
                    location.reload(true);
                } else {
                    const redirectUrl = window.location.origin + '/requests/' + requestId;
                    window.location.href = redirectUrl;
                }
            })
            .catch(error => console.error('Fetch Error: ', error));
    },
}

module.exports = ClickHandler;