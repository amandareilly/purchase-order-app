const Handlebars = require('handlebars');

const constructAction = function(actionObject, requestId) {
    return `<li class="action-menu-item"><i class="material-icons action-icon">${actionObject.iconName}</i><a href="#" class="action ${actionObject.class}" data-clickable="${actionObject.clickable}" data-reqId="${requestId}" data-refresh-on-update="true">${actionObject.actionText}</a></li>`;
}

const setViewActions = function(status, options) {

    const requestId = options.hash.request;

    const userIsApprover = (options.data.root.user.role.toUpperCase() == 'APPROVER');
    const userIsRequestor = (options.data.root.user._id == options.hash.requestor);

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
    }

    let string = `<nav class="action-box"><i class="material-icons menu-toggle" data-clickable="toggleRequestCardMenu" data-reqId="${requestId}" data-toggleStatus="closed">menu</i><ul class="action-menu">`;
    switch (status) {
        case 'created':
            // status created
            // -- View More
            // -- Submit (if user = requestor)
            // -- Edit (if user = requestor)
            // -- Delete (if user = requestor)
            if (userIsRequestor) {
                string += constructAction(actionOptions.editOrView, requestId) + constructAction(actionOptions.submit, requestId) + constructAction(actionOptions.deleteRequest, requestId);
            } else {
                string += constructAction(actionOptions.viewMore, requestId);
            }
            break;
        case 'submitted':
            // status submitted
            // -- View More
            // -- Undo Submit (if user = requestor)
            // -- Approve (if user is approver)
            // -- Deny (if user is approver)
            string += constructAction(actionOptions.viewMore, requestId);
            if (userIsRequestor) {
                string += constructAction(actionOptions.undoSubmit, requestId);
            }
            if (userIsApprover) {
                string += constructAction(actionOptions.approve, requestId) + constructAction(actionOptions.deny, requestId);
            }
            break;
        case 'approved':
            // status approved
            // -- View More
            // -- Deny (if user is approver)
            // -- Mark as Ordered
            string += constructAction(actionOptions.viewMore, requestId) + constructAction(actionOptions.markOrdered, requestId);
            if (userIsApprover) {
                string += constructAction(actionOptions.deny, requestId);
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
                string += constructAction(actionOptions.editOrView, requestId) + constructAction(actionOptions.resubmit, requestId) + constructAction(actionOptions.deleteRequest, requestId);
            } else {
                string += constructAction(actionOptions.viewMore, requestId);
            }

            if (userIsApprover) {
                string += constructAction(actionOptions.approve, requestId);
            }
            break;
        case 'ordered':
            // status ordered
            // -- View More
            // -- Mark Complete
            string += constructAction(actionOptions.viewMore, requestId) + constructAction(actionOptions.markComplete, requestId);
            break;
        case 'complete':
            // status complete
            // -- View More
            string += constructAction(actionOptions.viewMore, requestId);
            break;
        default:
            throw new Error(`Status "${status}" is not valid.`);
    }
    string += '</ul></nav>'
    return new Handlebars.SafeString(string);
};

module.exports = setViewActions;