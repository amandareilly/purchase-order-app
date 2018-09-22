const Handlebars = require('handlebars');

const setViewActions = function(status, options) {

    const requestId = options.hash.request;

    const userIsApprover = (options.data.root.user.role.toUpperCase() == 'APPROVER');
    const userIsRequestor = (options.data.root.user._id == options.hash.requestor);

    const viewMore = `<a href="#" class="action view-request" data-clickable="viewRequest" data-reqId="${requestId}"><i class="material-icons action-icon">remove_red_eye</i><span class="action-text"> View Request Detail</span></a>`;

    const submit = `<a href="#" class="action submit-request" data-clickable="submitRequest" data-reqId="${requestId}"><i class="material-icons action-icon">send</i><span class="action-text"> Submit Request</span></a>`;

    const editOrView = `<a href="#" class="action edit-request" data-clickable="viewRequest" data-reqId="${requestId}"><i class="material-icons action-icon">edit</i><span class="action-text"> View or Edit Request</span></a>`;

    const deleteRequest = `<a href="#" class="action delete-request" data-clickable=deleteRequest" data-reqId="${requestId}"><i class="material-icons action-icon">delete</i><span class="action-text"> Delete Request</span></a>`;

    const undoSubmit = `<a href="#" class="action unsubmit-request" data-clickable="unsubmit" data-reqId="${requestId}"><i class="material-icons action-icon">undo</i><span class="action-text"> Unsubmit Request</span></a>`;

    const approve = `<a href="#" class="action approve-request" data-clickable="approveRequest" data-reqId="${requestId}"><i class="material-icons action-icon">thumb_up</i><span class="action-text"> Approve</span></a>`;

    const deny = `<a href="#" class="action deny-request" data-clickable="denyRequest" data-reqId="${requestId}"><i class="material-icons action-icon">thumb_down</i> Deny</a>`;

    const markOrdered = `<a href="#" class="action mark-request-ordered" data-clickable="markOrdered" data-reqId="${requestId}"><i class="material-icons action-icon">shopping_cart</i><span class="action-text"> Mark Request as Ordered</span></a>`;

    const resubmit = `<a href="#" class="action resubmit-request" data-clickable="submitRequest" data-reqId="${requestId}"><i class="material-icons action-icon">send</i><span class="action-text> Resubmit Request</span></a>`;

    const markComplete = `<a href="#" class="action mark-request-complete" data-clickable="markComplete" data-reqId="${requestId}"><i class="material-icons action-icon">done_all</i><span class="action-text"> Mark Request as Complete</span></a>`;

    let string = '<footer class="action-box">';
    switch (status) {
        case 'created':
            // status created
            // -- View More
            // -- Submit (if user = requestor)
            // -- Edit (if user = requestor)
            // -- Delete (if user = requestor)
            if (userIsRequestor) {
                string += editOrView + submit + deleteRequest;
            } else {
                string += viewMore;
            }
            break;
        case 'submitted':
            // status submitted
            // -- View More
            // -- Undo Submit (if user = requestor)
            // -- Approve (if user is approver)
            // -- Deny (if user is approver)
            string += viewMore;
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
            string += viewMore + markOrdered;
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
                string += editOrView + resubmit + deleteRequest;
            } else {
                string += viewMore;
            }

            if (userIsApprover) {
                string += approve;
            }
            break;
        case 'ordered':
            // status ordered
            // -- View More
            // -- Mark Complete
            string += viewMore + markComplete;
            break;
        case 'complete':
            // status complete
            // -- View More
            string += viewMore;
            break;
        default:
            throw new Error('Invalid status');
    }
    string += '</footer>'
    return new Handlebars.SafeString(string);
};

module.exports = setViewActions;