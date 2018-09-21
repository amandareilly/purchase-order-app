const Handlebars = require('handlebars');

const setViewActions = function(status, options) {

    const requestId = options.hash.request;

    const userIsApprover = (options.data.root.user.role.toUpperCase() == 'APPROVER');
    const userIsRequestor = (options.data.root.user._id == options.hash.requestor);

    const viewMore = `<button class="action view-request" data-clickable="viewRequest" data-reqId="${requestId}">View Request Detail</button>`;

    const submit = `<button class="action submit-request" data-clickable="submitRequest" data-reqId="${requestId}">Submit Request</button>`;

    const edit = `<button class="action edit-request" data-clickable="editRequest" data-reqId="${requestId}">Edit Request</button>`;

    const deleteRequest = `<button class="action delete-request" data-clickable=deleteRequest" data-reqId="${requestId}">Delete Request</button>`;

    const undoSubmit = `<button class="action unsubmit-request" data-clickable="unsubmit" data-reqId="${requestId}">Unsubmit Request</button>`;

    const approve = `<button class="action approve-request" data-clickable="approveRequest" data-reqId="${requestId}">Approve</button>`;

    const deny = `<button class="action deny-request" data-clickable="denyRequest" data-reqId="${requestId}">Deny</button>`;

    const markOrdered = `<button class="action mark-request-ordered" data-clickable="markOrdered" data-reqId="${requestId}">Mark Request as Ordered</button>`;

    const resubmit = `<button class="action resubmit-request" data-clickable="submitRequest" data-reqId="${requestId}">Resubmit Request</button>`;

    const markComplete = `<button class="action mark-request-complete" data-clickable="markComplete" data-reqId="${requestId}">Mark Request as Complete</button>`;

    let string = '<div class="action-box">' + viewMore;
    switch (status) {
        case 'created':
            // status created
            // -- View More
            // -- Submit (if user = requestor)
            // -- Edit (if user = requestor)
            // -- Delete (if user = requestor)
            if (userIsRequestor) {
                string += edit + submit + deleteRequest;
            }
            break;
        case 'submitted':
            // status submitted
            // -- View More
            // -- Undo Submit (if user = requestor)
            // -- Approve (if user is approver)
            // -- Deny (if user is approver)
            if (userIsRequestor) {
                string += undoSubmit;
            }
            if (userIsApprover) {
                string += approve + deny;
            }
            break;
        case 'approved':
            // status approved
            // -- View More
            // -- Deny (if user is approver)
            // -- Mark as Ordered
            string += markOrdered;
            if (userIsApprover) {
                string += deny;
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
                string += edit + resubmit + deleteRequest;
            }

            if (userIsApprover) {
                string += approve;
            }
            break;
        case 'ordered':
            // status ordered
            // -- View More
            // -- Mark Complete
            string += markComplete;
            break;
        case 'complete':
            // status complete
            // -- View More
            break;
        default:
            throw new Error('Invalid status');
    }
    string += '</div>'
    return new Handlebars.SafeString(string);
};

module.exports = setViewActions;