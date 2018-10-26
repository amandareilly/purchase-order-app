// this is a static class
require('isomorphic-fetch');
const SharedApi = require('../../../server/api/SharedApi');
const Renderer = require('./Renderer');
const DataHandler = {
    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
    initializeDashboardPage: function() {
        const selectedStatuses = [];
        const selectedUsers = [];
        if (this.userIsApprover()) {
            selectedStatuses.push('submitted');
        } else {
            selectedStatuses.push('denied', 'created');
            selectedUsers.push(userData._id);
        }
        this.getFilterPanel(selectedStatuses, selectedUsers);
        this.getRequests(selectedStatuses, selectedUsers);
    },
    getRequests: function(statuses, users) {
        let url = this.apiUrl + 'requests?';
        url = `${url}${this.constructArrayParameter(statuses, 'status')}`
        if (users.length > 0) {
            url = `${url}&${this.constructArrayParameter(users, 'user')}`;
        }
        return this.makeServerRequest(url, 'get')
            .then((returnedData) => {
                if (returnedData.requests.length == 0) {
                    Renderer.renderNoRequestsFound()
                } else {
                    returnedData.requests.forEach(request => Renderer.addRequestToDashboard(this.createRequestSummary(request)));
                    $('.spinner-container').addClass('hidden');
                }
            })
            .catch(err => console.error(err));
    },
    getSingleRequest: function(reqId) {
        let url = this.apiUrl + 'requests/' + reqId;
        return this.makeServerRequest(url, 'get')
            .then((request) => {
                return this.createRequestSummary(request);
            });
    },
    getFilterPanel: function(selectedStatuses = [], selectedUsers = [], ownSelected = false, mySelectedStatuses = []) {

        const url = this.apiUrl + 'users';
        const panelOptions = {
            userIsApprover: this.userIsApprover(),
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
                selected: (ownSelected ? mySelectedStatuses.includes(status) : (this.userIsApprover() ? false : selectedStatuses.includes(status))),
                displayText: this.capitalizeFirstLetter(status)
            };
            panelOptions.myStatuses.push(statusObject);
        });
        generalStatusArray.forEach(status => {
            const statusObject = {
                name: status,
                selected: selectedStatuses.includes(status),
                displayText: this.capitalizeFirstLetter(status)
            };
            panelOptions.generalStatuses.push(statusObject);
        });

        return this.makeServerRequest(url, 'get')
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
            })
            .then((panelOptions) => {
                Renderer.renderFilterPanel(panelOptions);
                $('#filter-form').on('submit', this.handleFormFilter);
                $('#yes').click(this.toggleOwnFilter);
                $('#no').click(this.toggleOwnFilter);
            });
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
    handleFormFilter: function(e) {
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

        if (!DataHandler.userIsApprover()) {
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


        DataHandler.getFilterPanel(genStatuses, users, filterByLoggedIn, myStatuses);
        myStatuses.forEach(status => {
            if (!genStatuses.includes(status)) {
                genStatuses.push(status);
            }
        })
        Renderer.clearRequestsDashboard();
        DataHandler.getRequests(genStatuses, users);

    },
    userIsApprover: function() {
        return userData.role.toUpperCase() === 'APPROVER';
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
    getDocumentCounts: function() {

    },
    makeServerRequest: function(url, method, data = null) {
        return fetch(url, this.getFetchObject(method, data))
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
    createRequestSummary: function(requestData) {
        return {
            status: {
                forDisplay: this.capitalizeFirstLetter(requestData.status),
                forCode: requestData.status.toLowerCase(),
                upperCase: requestData.status.toUpperCase()
            },
            id: requestData.id,
            viewActions: this.getViewActions(requestData.status, requestData.id, requestData.requestor.id),
            requestTotal: this.formatCurrency(requestData.requestTotal),
            vendorName: requestData.vendor.name,
            requestorHtml: this.getRequestorHtml(requestData.requestor.name),
            items: this.getLimitedItems(5, requestData.items).map(item => this.processItemForSummaryDisplay(item)),
            getAdditionalItemsHtml: this.getAdditionalItemsHtml(requestData.id, requestData.items.length, 5)
        }
    },
    capitalizeFirstLetter: function(string) {
        return string[0].toUpperCase() + string.slice(1);
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
                    string += this.constructViewAction(actionOptions.editOrView, requestId) + this.constructViewAction(actionOptions.submit, requestId) + this.constructViewAction(actionOptions.deleteRequest, requestId);
                } else {
                    string += this.constructViewAction(actionOptions.viewMore, requestId);
                }
                break;
            case 'submitted':
                // status submitted
                // -- View More
                // -- Undo Submit (if user = requestor)
                // -- Approve (if user is approver)
                // -- Deny (if user is approver)
                string += this.constructViewAction(actionOptions.viewMore, requestId);
                if (userIsRequestor) {
                    string += this.constructViewAction(actionOptions.undoSubmit, requestId);
                }
                if (userIsApprover) {
                    string += this.constructViewAction(actionOptions.approve, requestId) + this.constructViewAction(actionOptions.deny, requestId);
                }
                break;
            case 'approved':
                // status approved
                // -- View More
                // -- Deny (if user is approver)
                // -- Mark as Ordered
                string += this.constructViewAction(actionOptions.viewMore, requestId) + this.constructViewAction(actionOptions.markOrdered, requestId);
                if (userIsApprover) {
                    string += this.constructViewAction(actionOptions.deny, requestId);
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
                    string += this.constructViewAction(actionOptions.editOrView, requestId) + this.constructViewAction(actionOptions.resubmit, requestId) + this.constructViewAction(actionOptions.deleteRequest, requestId);
                } else {
                    string += this.constructViewAction(actionOptions.viewMore, requestId);
                }

                if (userIsApprover) {
                    string += this.constructViewAction(actionOptions.approve, requestId);
                }
                break;
            case 'ordered':
                // status ordered
                // -- View More
                // -- Mark Complete
                string += this.constructViewAction(actionOptions.viewMore, requestId) + this.constructViewAction(actionOptions.markComplete, requestId);
                break;
            case 'complete':
                // status complete
                // -- View More
                string += this.constructViewAction(actionOptions.viewMore, requestId);
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
    formatCurrency: function(amount) {
        const parts = this.splitIntoParts(amount);
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
    }

}

module.exports = DataHandler;