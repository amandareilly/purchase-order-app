// this is a static class
require('isomorphic-fetch');
const SharedApi = require('../../../server/api/SharedApi');
const DataHandler = require('./DataHandler');
const Renderer = require('./Renderer');
const ClickHandler = {
    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
    addClickListeners: function() {
        const body = document.querySelector('body');
        const vendorSelector = document.getElementById('vendor-selector');
        body.addEventListener('click', this.handleClicked);
        if (vendorSelector) {
            vendorSelector.addEventListener('change', this.changedVendorSelector);
        }

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
        console.log(clicked);

        if (clicked.hasAttribute('data-clickable')) {
            if (!clicked.hasAttribute('data-allow-default')) {
                e.preventDefault();
            }
            if (clicked.hasAttribute('data-form-submit')) {
                ClickHandler[clicked.getAttribute('data-clickable')](e);
            } else {
                ClickHandler[clicked.getAttribute('data-clickable')](clicked);
            }
        }
    },
    toggleNewRequestForm: function(element) {
        $('#new-request-form').toggleClass('hidden');
        $('.create-form-toggle-open').toggleClass('hidden');
        $('.request-form-wrapper').toggleClass('hidden');
    },
    toggleFilterForm: function(element) {
        $('#filter-form').toggleClass('hidden');
    },
    toggleItemDetailView: function(element) {
        const itemId = element.getAttribute('data-item');
        const itemToToggle = $(`[data-item-targeted|='${itemId}'`);
        itemToToggle.toggleClass('hidden');
        if (element.textContent == 'expand_more') {
            element.textContent = 'expand_less';
        } else {
            element.textContent = 'expand_more';
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
    toggleAddItemForm: function(element) {
        element.classList.add('hidden');
        $('#add-item-form').toggleClass('hidden');
    },
    cancelAddItem: function(element) {
        $('#add-item-form').toggleClass('hidden');
        $('#toggle-add-item-form').toggleClass('hidden');
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
            console.log(url);
            fetch(url, {
                    method: 'delete',
                    headers: SharedApi.getHeadersWithToken(null, false, document.cookie)
                })
                .then((response) => {
                    if (response.status == 204) {
                        this.updateDashBoardStatus(requestId, 'deleted');
                    } else {
                        console.log(response);
                    }
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
    markOrdered: function(element) {
        this.updateRequest(element, 'ordered');
    },
    markComplete: function(element) {
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
                    this.updateDashBoardStatus(requestId, status);
                } else {
                    const redirectUrl = window.location.origin + '/requests/' + requestId;
                    window.location.href = redirectUrl;
                }
            })
            .catch(error => console.error('Fetch Error: ', error));
    },
    updateDashBoardStatus: async function(reqId, newStatus) {
        const requestSummary = $(`[data-reqId="${reqId}"]`);

        const userIsApprover = userData.role.toUpperCase() === 'APPROVER';
        const filterByLoggedIn = (userIsApprover ? $('input[name="filter-by-loggedInUser"]')[0].checked : undefined);
        let filters;

        if (filterByLoggedIn || !userIsApprover) {
            filters = $('.filter-own-filters');
        } else {
            filters = $('.filter-gen-status');
        }
        const visibleFilters = [];
        for (i = 0; i < filters.length; i++) {
            if (filters[i].checked) {
                visibleFilters.push(filters[i].value);
            }
        }

        if (visibleFilters.length > 0 && visibleFilters.includes(newStatus)) {
            const requestHtml = Renderer.renderRequestHtml(await DataHandler.getSingleRequest(reqId));
            requestSummary.replaceWith(requestHtml);
        } else {
            requestSummary.remove();
        }

    }
}

module.exports = ClickHandler;