require('isomorphic-fetch');
const SharedApi = require('../../../server/api/SharedApi');
const ClientFunctions = {
    helpers: {
        general: {
            userIsApprover: function() {
                return userData.role.toUpperCase() === 'APPROVER';
            },
        },
        data: {
            getApiUrl: function(append = null) {
                let apiUrl = process.env.API_URL || 'http://localhost:8080/api/';
                if (append) {
                    apiUrl += append;
                }
                return apiUrl;
            },
            constructArrayParameter: function(array, name) {

                const count = array.length;
                let parameter = `${name}=`;
                for (let i = 0; i < count; i++) {
                    if (i !== 0) {
                        parameter += '+'
                    }
                    parameter += array[i];
                }
                return parameter;
            },
            makeServerRequest: function(url, method, data = null) {
                return fetch(url, ClientFunctions.helpers.data.getFetchObject(method, data))
                    .then(returned => returned.json());
            },
            getFetchObject: function(method, data) {
                const fetchObject = {
                    method: method,
                    headers: SharedApi.getHeadersWithToken(null, (data ? true : false), document.cookie),
                };
                if (data) {
                    fetchObject.body = JSON.stringify(data);
                }
                return fetchObject;
            },
        },
        view: {
            capitalizeFirstLetter: function(string) {
                return string[0].toUpperCase() + string.slice(1);
            },
            formatCurrency: function(amount) {
                const parts = ClientFunctions.helpers.view.splitIntoParts(amount);
                let currencyString = '$';
                const extraChars = parts[0].length % 3;
                if (extraChars) {
                    currencyString += parts[0].substr(0, extraChars);
                    parts[0] = parts[0].substr(extraChars);
                }

                const sections = parts[0].length / 3;
                for (let i = 0; i < sections; i++) {
                    if (extraChars || i > 0) {
                        currencyString += ',';
                    }
                    currencyString += parts[0].substr(i * 3, 3);
                }
                currencyString += '.' + parts[1].toString();

                return currencyString;

            },
            splitIntoParts: function(string) {
                return parseFloat(string).toFixed(2).toString().split('.');
            },
            getViewActions: function(status, requestId, requestorId) {
                const userIsApprover = userData.role.toUpperCase() === 'APPROVER';
                const userIsRequestor = userData._id === requestorId;

                const actionOptions = {
                    viewMore: {
                        class: 'view-request',
                        clickable: 'viewRequest',
                        iconName: 'remove_red_eye',
                        actionText: 'View'
                    },
                    submit: {
                        class: 'submit-request',
                        clickable: 'submitRequest',
                        iconName: 'send',
                        actionText: 'Submit'
                    },
                    editOrView: {
                        class: 'edit-request',
                        clickable: 'viewRequest',
                        iconName: 'edit',
                        actionText: 'View or Edit'
                    },
                    deleteRequest: {
                        class: 'delete-request',
                        clickable: 'deleteRequest',
                        iconName: 'delete',
                        actionText: 'Delete'
                    },
                    undoSubmit: {
                        class: 'unsubmit-request',
                        clickable: 'unsubmit',
                        iconName: 'undo',
                        actionText: 'Unsubmit'
                    },
                    approve: {
                        class: 'approve-request',
                        clickable: 'approveRequest',
                        iconName: 'thumb_up',
                        actionText: 'Approve'
                    },
                    deny: {
                        class: 'deny-request',
                        clickable: 'denyRequest',
                        iconName: 'thumb_down',
                        actionText: 'Deny'
                    },
                    markOrdered: {
                        class: 'mark-request-ordered',
                        clickable: 'markOrdered',
                        iconName: 'shopping_cart',
                        actionText: 'Mark Ordered'
                    },
                    resubmit: {
                        class: 'resubmit-request',
                        clickable: 'submitRequest',
                        iconName: 'send',
                        actionText: 'Resubmit'
                    },
                    markComplete: {
                        class: 'mark-request-complete',
                        clickable: 'markComplete',
                        iconName: 'done_all',
                        actionText: 'Mark Complete'
                    },
                };
                let string = `<nav class="action-box"><i class="material-icons menu-toggle" data-clickable="toggleRequestCardMenu" data-reqId="${requestId}" data-toggleStatus="closed">menu</i><ul class="action-menu">`;
                switch (status) {
                    case 'created':
                        // status created
                        // -- View More
                        // -- Submit (if user = requestor)
                        // -- Edit (if user = requestor)
                        // -- Delete (if user = requestor)
                        if (userIsRequestor) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.editOrView, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.submit, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.deleteRequest, requestId);
                        } else {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId);
                        }
                        break;
                    case 'submitted':
                        // status submitted
                        // -- View More
                        // -- Undo Submit (if user = requestor)
                        // -- Approve (if user is approver)
                        // -- Deny (if user is approver)
                        string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId);
                        if (userIsRequestor) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.undoSubmit, requestId);
                        }
                        if (userIsApprover) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.approve, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.deny, requestId);
                        }
                        break;
                    case 'approved':
                        // status approved
                        // -- View More
                        // -- Deny (if user is approver)
                        // -- Mark as Ordered
                        string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.markOrdered, requestId);
                        if (userIsApprover) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.deny, requestId);
                        }
                        break;
                    case 'denied':
                        // status denied
                        // -- View More
                        // -- Approve (if user is approver)
                        // -- Edit (if user = requestor)
                        // -- Resubmit (if user = requestor)
                        // -- Delete (if user = requestor)
                        if (userIsRequestor) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.editOrView, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.resubmit, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.deleteRequest, requestId);
                        } else {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId);
                        }

                        if (userIsApprover) {
                            string += ClientFunctions.helpers.view.constructViewAction(actionOptions.approve, requestId);
                        }
                        break;
                    case 'ordered':
                        // status ordered
                        // -- View More
                        // -- Mark Complete
                        string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId) + ClientFunctions.helpers.view.constructViewAction(actionOptions.markComplete, requestId);
                        break;
                    case 'complete':
                        // status complete
                        // -- View More
                        string += ClientFunctions.helpers.view.constructViewAction(actionOptions.viewMore, requestId);
                        break;
                    default:
                        throw new Error(`Status "${status}" is not valid.`);
                }
                string += '</ul></nav>'
                return new Handlebars.SafeString(string);
            },
            constructViewAction: function(actionObject, requestId) {
                return `<li class="action-menu-item"><i class="material-icons action-icon">${actionObject.iconName}</i><a href="#" class="action ${actionObject.class}" data-clickable="${actionObject.clickable}" data-reqId="${requestId}" data-refresh-on-update="true">${actionObject.actionText}</a></li>`;
            },
            createRequestSummary: function(requestData) {
                return {
                    status: {
                        forDisplay: ClientFunctions.helpers.view.capitalizeFirstLetter(requestData.status),
                        forCode: requestData.status.toLowerCase(),
                        upperCase: requestData.status.toUpperCase()
                    },
                    id: requestData.id,
                    viewActions: ClientFunctions.helpers.view.getViewActions(requestData.status, requestData.id, requestData.requestor.id),
                    requestTotal: ClientFunctions.helpers.view.formatCurrency(requestData.requestTotal),
                    vendorName: requestData.vendor.name,
                    requestorHtml: ClientFunctions.helpers.view.getRequestorHtml(requestData.requestor.name),
                    items: ClientFunctions.helpers.view.getLimitedItems(5, requestData.items).map(item => ClientFunctions.helpers.view.processItemForSummaryDisplay(item)),
                    getAdditionalItemsHtml: ClientFunctions.helpers.view.getAdditionalItemsHtml(requestData.id, requestData.items.length, 5)
                }
            },
            getRequestorHtml: function(requestorName) {
                let requestorHtml = '';
                if (userData.role.toUpperCase === 'APPROVER') {
                    requestorHtml = `<p class="requestor-name"><span class="requestor-label">Requestor:  </span>${requestorName}</p>`
                }
                return new Handlebars.SafeString(requestorHtml);
            },
            getLimitedItems: function(limit, items) {
                if (items.length <= limit) {
                    return items;
                } else {
                    return items.slice(0, limit);
                }
            },
            processItemForSummaryDisplay: function(item) {
                return {
                    name: item.name,
                    qty: item.qty,
                    pricePer: item.pricePer
                }
            },
            getAdditionalItemsHtml: function(reqId, numItems, limit) {
                if (numItems > limit) {
                    return new Handlebars.SafeString(`<li><a href="#" class="item-list-more-items" data-clickable="viewRequest" data-reqId="${reqId}">... and ${numItems - limit} more.</a></li>`);
                } else {
                    return '';
                }
            },
        }
    },
    renderer: {
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
            ClientFunctions.eventListeners.add('filterPanel');

        },
        renderRequestHtml: function(data) {
            return Handlebars.partials['partials_request_requestSummary'](data);
        },
        renderNoRequestsFound: function() {
            $('.spinner-container').addClass('hidden');
            $('.request-grid-container').append('<h2 class="no-requests-found">No matching requests were found.  Please change your filters and try again.</h2>');
            $('.filter-form').removeClass('hidden');
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
                const requestHtml = ClientFunctions.renderer.renderRequestHtml(await ClientFunctions.data.getSingleRequest(reqId));
                requestSummary.replaceWith(requestHtml);
            } else {
                requestSummary.remove();
            }

        },
        initializeDashboardPage: async function() {
            const selectedStatuses = [];
            const selectedUsers = [];
            if (ClientFunctions.helpers.general.userIsApprover()) {
                selectedStatuses.push('submitted');
            } else {
                selectedStatuses.push('denied', 'created');
                selectedUsers.push(userData._id);
            }
            const filterPanelData = await ClientFunctions.data.getFilterPanelData(selectedStatuses, selectedUsers);
            ClientFunctions.renderer.renderFilterPanel(filterPanelData);
            ClientFunctions.data.getRequests(selectedStatuses, selectedUsers);
        }
    },
    data: {
        getRequests: function(statuses, users) {
            let url = ClientFunctions.helpers.data.getApiUrl('requests?');
            url = `${url}${ClientFunctions.helpers.data.constructArrayParameter(statuses, 'status')}`
            if (users.length > 0) {
                url = `${url}&${ClientFunctions.helpers.data.constructArrayParameter(users, 'user')}`;
            }
            return ClientFunctions.helpers.data.makeServerRequest(url, 'get')
                .then((returnedData) => {
                    if (returnedData.requests.length == 0) {
                        ClientFunctions.renderer.renderNoRequestsFound()
                    } else {
                        returnedData.requests.forEach(request => ClientFunctions.renderer.addRequestToDashboard(ClientFunctions.helpers.view.createRequestSummary(request)));
                        $('.spinner-container').addClass('hidden');
                    }
                })
                .catch(err => console.error(err));
        },
        getSingleRequest: function(reqId) {
            let url = ClientFunctions.helpers.data.getApiUrl('requests/' + reqId);
            return ClientFunctions.helpers.data.makeServerRequest(url, 'get')
                .then((request) => {
                    return ClientFunctions.helpers.view.createRequestSummary(request);
                });
        },
        getFilterPanelData: function(selectedStatuses = [], selectedUsers = [], ownSelected = false, mySelectedStatuses = []) {
            const url = ClientFunctions.helpers.data.getApiUrl('users');
            const panelOptions = {
                userIsApprover: ClientFunctions.helpers.general.userIsApprover(),
                myFilterSelected: ownSelected,
                myStatuses: [],
                generalStatuses: [],
                users: []
            };

            const myStatusArray = ['created', 'denied', 'submitted', 'approved', 'ordered', 'complete'];
            const generalStatusArray = ['submitted', 'denied', 'approved', 'ordered', 'complete'];
            myStatusArray.forEach(status => {
                const statusObject = {
                    name: status,
                    selected: (ownSelected ? mySelectedStatuses.includes(status) : (ClientFunctions.helpers.general.userIsApprover() ? false : selectedStatuses.includes(status))),
                    displayText: ClientFunctions.helpers.view.capitalizeFirstLetter(status)
                };
                panelOptions.myStatuses.push(statusObject);
            });
            generalStatusArray.forEach(status => {
                const statusObject = {
                    name: status,
                    selected: selectedStatuses.includes(status),
                    displayText: ClientFunctions.helpers.view.capitalizeFirstLetter(status)
                };
                panelOptions.generalStatuses.push(statusObject);
            });

            return ClientFunctions.helpers.data.makeServerRequest(url, 'get')
                .then((returnedUsers) => {
                    returnedUsers.users.forEach(user => {
                        if (user.id !== userData._id) {
                            panelOptions.users.push({
                                name: user.name,
                                id: user.id,
                                selected: selectedUsers.includes(user.id)
                            });
                        }
                    });
                    return panelOptions;
                });
        },
        updateRequest: function(element, status) {
            const refreshOnUpdate = element.getAttribute('data-refresh-on-update');
            const requestId = element.getAttribute('data-reqId');
            const url = ClientFunctions.helpers.data.getApiUrl('requests/' + requestId);
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
                        ClientFunctions.renderer.updateDashBoardStatus(requestId, status);
                    } else {
                        const redirectUrl = window.location.origin + '/requests/' + requestId;
                        window.location.href = redirectUrl;
                    }
                })
                .catch(error => console.error('Fetch Error: ', error));
        },
    },
    eventListeners: {
        add: function(type) {
            ClientFunctions.eventListeners[type]();
        },
        general: function() {
            const body = document.querySelector('body');
            const vendorSelector = document.getElementById('vendor-selector');

            body.addEventListener('click', ClientFunctions.eventHandlers.handleClicked);

            if (vendorSelector) {
                vendorSelector.addEventListener('change', ClientFunctions.eventHandlers.changedVendorSelector);
            }
        },
        filterPanel: function() {
            $('#filter-form').on('submit', ClientFunctions.eventHandlers.handleFormFilterSubmit);
            $('#yes').click(ClientFunctions.eventHandlers.toggleOwnFilter);
            $('#no').click(ClientFunctions.eventHandlers.toggleOwnFilter);
        }
    },
    eventHandlers: {
        handleClicked: function(e) {
            const clicked = e.target;

            if (clicked.hasAttribute('data-clickable')) {
                if (!clicked.hasAttribute('data-allow-default')) {
                    e.preventDefault();
                }
                if (clicked.hasAttribute('data-form-submit')) {
                    ClientFunctions.eventHandlers[clicked.getAttribute('data-clickable')](e);
                } else {
                    ClientFunctions.eventHandlers[clicked.getAttribute('data-clickable')](clicked);
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
                    redirect += `${search.substring(0, queryLoc - 1)}`
                }
            } else {
                redirect += `?user=${userId}`;
            }

            window.location.href = redirect;
        },
        toggleOwnFilter: function(e) {
            const yes = $('#yes');
            const ownFilters = $('.own-filters');
            const genFilters = $('.general-filters');
            const ownChildren = $('.filter-own-filters');
            const genChildren = $('.filter-gen-filters');

            if (yes.prop('checked')) {
                ownFilters.removeClass('hidden');
                genFilters.addClass('hidden');
                genChildren.prop('checked', false);
            } else {
                ownFilters.addClass('hidden');
                genFilters.removeClass('hidden');
                ownChildren.prop('checked', false);
            }
        },
        viewRequest: function(element) {
            const requestId = element.getAttribute('data-reqId');
            window.location.href = `${window.location.origin}/requests/${requestId}`;
        },
        deleteRequest: function(element) {
            const requestId = element.getAttribute('data-reqId');
            if (confirm("Are you sure you want to delete this request?  This action CANNOT be undone!")) {
                const url = ClientFunctions.helpers.data.getApiUrl('requests/' + requestId);
                fetch(url, {
                        method: 'delete',
                        headers: SharedApi.getHeadersWithToken(null, false, document.cookie)
                    })
                    .then((response) => {
                        if (response.status == 204) {
                            ClientFunctions.renderer.updateDashBoardStatus(requestId, 'deleted');
                        }
                    })
                    .catch(error => console.error('Fetch Error: ', error));
            }
        },
        submitRequest: function(element) {
            ClientFunctions.data.updateRequest(element, 'submitted');
        },
        unsubmit: function(element) {
            ClientFunctions.data.updateRequest(element, 'created');
        },
        approveRequest: function(element) {
            ClientFunctions.data.updateRequest(element, 'approved');
        },
        denyRequest: function(element) {
            ClientFunctions.data.updateRequest(element, 'denied');
        },
        markOrdered: function(element) {
            ClientFunctions.data.updateRequest(element, 'ordered');
        },
        markComplete: function(element) {
            ClientFunctions.data.updateRequest(element, 'complete');
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
        handleFormFilterSubmit: async function(e) {
            e.preventDefault();
            const users = [];
            let genStatuses = [];
            let myStatuses = [];
            let filterByLoggedIn = false;

            const stringData = $(this).serializeArray();
            stringData.forEach(data => {
                switch (data.name) {
                    case 'filter-by-loggedInUser':
                        if (data.value == 'yes') {
                            filterByLoggedIn = true;
                        }
                        break;
                    case 'gen-statuses':
                        genStatuses.push(data.value);
                        break;
                    case 'my-statuses':
                        myStatuses.push(data.value);
                        break;
                    case 'users':
                        users.push(data.value);
                        break;
                    default:
                        break;
                }
            });

            if (!ClientFunctions.helpers.general.userIsApprover()) {
                users.length = 0;
                filterByLoggedIn = false;
                users.push(userData._id);
                const temp = genStatuses;
                genStatuses = myStatuses;
                myStatuses = temp;
            }

            if (filterByLoggedIn) {
                users.length = 0;
                users.push(userData._id);
            }


            const filterData = await ClientFunctions.data.getFilterPanelData(genStatuses, users, filterByLoggedIn, myStatuses);
            ClientFunctions.renderer.renderFilterPanel(filterData);
            myStatuses.forEach(status => {
                if (!genStatuses.includes(status)) {
                    genStatuses.push(status);
                }
            })
            ClientFunctions.renderer.clearRequestsDashboard();
            ClientFunctions.data.getRequests(genStatuses, users);

        },
    }
};

module.exports = ClientFunctions;