this["templates"] = this["templates"] || {};
this["templates"]["login"] = Handlebars.registerPartial("login", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header class=\"page-title\">\r\n    <div class=\"wrapper\">\r\n        <h1>Welcome to Purchaser</h1>\r\n    </div>\r\n</header>\r\n<div class=\"wrapper\">\r\n    <div class=\"app-info\">\r\n        <p>Purchaser is an app that allows users in a small business environment to create, approve, and manage purchase orders.</p>\r\n        <p>Small businesses often struggle with purchasing, and this app enables users to see at-a-glance items that have been requested, and the status of those items as they move through the purchasing process.</p>\r\n        <p>There are two user roles in the system.  <b>Basic users</b> can create purchase orders, and can view and manage their own purchase orders.  <b>Approvers</b> have the same permissions as Basic users, plus they can view and approve or deny purchase orders created by any user.</p>        \r\n        <p>Enter any of the email addresses below to log into the system as that user.  Multiple basic user accounts have been provided to demonstrate that basic users can only view and manage their own requests.</p>\r\n    </div>\r\n    <div class=\"demo-user-info\">\r\n        <div class=\"basic-users\">\r\n            <h2 class=\"user-list-heading\">To log in as a <b>Basic User:</b></h2>\r\n            <ul class=\"basic-user-list\">\r\n                <li>basic1@testapp.test</li>\r\n                <li>basic2@testapp.test</li>\r\n                <li>basic3@testapp.test</li>\r\n                <li>basic4@testapp.test</li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"approver-users\">\r\n            <h2 class=\"user-list-heading\">To log in as an <b>Approver:</b></h2>\r\n            <ul class=\"approver-list\">\r\n                <li>approver1@testapp.test</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <form action=\"/login\" method=\"post\" class=\"login-form\">\r\n\r\n        <label for=\"email\" class=\"login-label\">Enter an email address to log in:<br>\r\n            <input type=\"email\" name=\"email\" id=\"email\">\r\n        </label>\r\n        <button type=\"submit\" class=\"login-button\">Log In</button>\r\n    </form>\r\n</div>\r\n<script type='text/javascript'>\r\n    const pageContext = 'loginPage';\r\n</script>\r\n";
},"useData":true}));;
this["templates"]["requestDashboard"] = Handlebars.registerPartial("requestDashboard", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["page/header"],depth0,{"name":"page/header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<header class=\"page-title\">\r\n    <div class=\"wrapper flex-horz-wrap justify-between dashboard-header\">\r\n        <h1 class=\"dashboard-title\">\r\n            Dashboard\r\n        </h1>\r\n        <div class=\"dashboard-actions\">\r\n            <p class=\"dashboard-toggle create-form-toggle-open\" data-clickable=\"toggleNewRequestForm\"><i class=\"material-icons\"\r\n                    data-clickable=\"toggleNewRequestForm\">add</i><span class=\"toggle-explainer\" data-clickable=\"toggleNewRequestForm\">New\r\n                    Request</span></p>\r\n            <p class=\"dashboard-toggle filter-form-toggle-open\" data-clickable=\"toggleFilterForm\"><i class=\"material-icons\"\r\n                    data-clickable=\"toggleFilterForm\">filter_list</i><span class=\"toggle-explainer\" data-clickable=\"toggleFilterForm\">Filter\r\n                    Requests</span></p>\r\n        </div>\r\n    </div>\r\n</header>\r\n<div class=\"request-form-wrapper wrapper hidden\">\r\n"
    + ((stack1 = container.invokePartial(partials["dashboard/newRequestForm"],(depth0 != null ? depth0.vendorList : depth0),{"name":"dashboard/newRequestForm","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\r\n\r\n<div class=\"dashboard-container wrapper\">\r\n    <div class=\"filter-panel\">\r\n    </div>\r\n"
    + ((stack1 = container.invokePartial(partials["page/loadingSpinner"],depth0,{"name":"page/loadingSpinner","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"request-grid-container\"></div>\r\n</div>\r\n<script type='text/javascript'>\r\n    const pageContext = 'requestDashboard';\r\n    const userData = "
    + ((stack1 = (helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"json","hash":{},"data":data})) != null ? stack1 : "")
    + ";\r\n</script>\r\n";
},"usePartial":true,"useData":true}));;
this["templates"]["requestDetail"] = Handlebars.registerPartial("requestDetail", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "    <header class=\"request-header\">\r\n        <div class=\"wrapper\">\r\n            <div class=\"request-header-wrap\">\r\n                <p class=\"status-text "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.status : stack1), depth0))
    + "\">"
    + alias2((helpers.capitalizeFirstLetter || (depth0 && depth0.capitalizeFirstLetter) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.status : stack1),{"name":"capitalizeFirstLetter","hash":{},"data":data}))
    + "</p>\r\n                <div class=\"request-header-group\">\r\n                    <p class=\"request-vendor\"><b>Vendor: </b>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.vendor : stack1)) != null ? stack1.name : stack1), depth0))
    + "</p>               \r\n                        <p class=\"request-data\">Created on "
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.createdAt : stack1),"MMMM Do YYYY",{"name":"dateFormat","hash":{},"data":data}))
    + " by "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.first : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.last : stack1), depth0))
    + " ("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + ")</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"request-action-box flex-horz-wrap\">\r\n"
    + ((stack1 = (helpers.checkForSubmitted || (depth0 && depth0.checkForSubmitted) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.status : stack1),{"name":"checkForSubmitted","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </header>\r\n    <div class=\"wrapper\">\r\n        <div class=\"flex-horz-wrap request-item-header-group\">\r\n            <h2 class=\"detail-page-header\">Items Requested</h2>\r\n"
    + ((stack1 = (helpers.checkForSubmitted || (depth0 && depth0.checkForSubmitted) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.status : stack1),{"name":"checkForSubmitted","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "        \r\n        <table class=\"item-listing\">\r\n            <tr>\r\n                <th>Name</th>\r\n                <th>Quantity</th>\r\n                <th>Price Each</th>\r\n                <th>Needed By</th>\r\n                <th></th>\r\n                <th></th>\r\n            </tr>\r\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.items : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <a href=\"/requests/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/submit\" class=\"request-action submit-request\" data-clickable=\"submitRequest\" data-reqId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"><i class=\"material-icons\">send</i>Submit\r\n                        Request</a>\r\n                        <a href=\"/requests/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/delete\" class=\"request-action delete-request\" data-clickable=\"deleteRequest\" data-reqId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"><i                        class=\"material-icons\">delete</i>Delete\r\n                            Request</a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.checkForApproved || (depth0 && depth0.checkForApproved) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.status : stack1),{"name":"checkForApproved","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <a href=\"/requests/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/approve\" class=\"request-action approve-request\" data-clickable=\"approveRequest\" data-reqId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"><i class=\"material-icons\">thumb_up</i>Approve\r\n                        Request</a>\r\n                        <a href=\"/request/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/deny\" class=\"request-action deny-request\" data-clickable=\"denyRequest\" data-reqId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"><i class=\"material-icons\">thumb_down</i>Deny\r\n                        Request</a>\r\n                        <a href=\"/request/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/unsubmit\" class=\"request-action undo-submit\" data-clickable=\"unsubmit\" data-reqId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"><i class=\"material-icons\">undo</i>Unsubmit\r\n                        Request</a>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <a href=\"\" id=\"toggle-add-item-form\" class=\"toggle-add-item-form\" data-clickable=\"toggleAddItemForm\"><i class=\"material-icons\">add</i>Add\r\n                Item</a>\r\n                </div>\r\n"
    + ((stack1 = container.invokePartial(partials["request/addItemForm"],depth0,{"name":"request/addItemForm","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "                </div>\r\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["request/itemTableRow"],depth0,{"name":"request/itemTableRow","hash":{"parent":depths[1]},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrapper\">\r\n    <h2>Request Not Found</h2>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = container.invokePartial(partials["page/header"],depth0,{"name":"page/header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<header class=\"page-title\">\r\n    <div class=\"wrapper\">\r\n        <h1>Request Detail</h1>\r\n    </div>\r\n</header>\r\n<nav class=\"page-nav\">\r\n    <div class=\"wrapper\">\r\n        <a href=\"/requests\" class=\"back-to-dashboard page-nav-item\"><i class=\"material-icons\">arrow_back</i>Return to Dashboard</a>\r\n    </div>\r\n</nav>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "<script type='text/javascript'>\r\n    const pageContext = 'requestDetail';\r\n    const userData = "
    + ((stack1 = (helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.user : depth0),{"name":"json","hash":{},"data":data})) != null ? stack1 : "")
    + ";\r\n</script>\r\n";
},"usePartial":true,"useData":true,"useDepths":true}));;
this["templates"]["main"] = Handlebars.registerPartial("layouts_main", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n    <title>"
    + container.escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</title>\r\n    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\r\n    <link rel=\"stylesheet\" href=\"/assets/css/main.css\">\r\n</head>\r\n<body>\r\n    <div class=\"content\">\r\n    "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"footer\"></div>\r\n    <script src=\"https://code.jquery.com/jquery-3.3.1.min.js\" integrity=\"sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=\"\r\n        crossorigin=\"anonymous\"></script>\r\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.min.js\" charset=\"utf-8\"></script>\r\n    <script src=\"/assets/js/bundle.js\"></script>\r\n</body>\r\n</html>\r\n";
},"useData":true}));;
this["templates"]["filterPanel"] = Handlebars.registerPartial("partials_dashboard_filterPanel", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div>\r\n            <div class=\"input-wrapper\">\r\n                <input type=\"radio\" name=\"filter-by-loggedInUser\" id=\"yes\" value=\"yes\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.myFilterSelected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class=\"toggle toggle-left\"><label for=\"yes\" class=\"toggle-btn\">My Requests</label>\r\n                <input type=\"radio\" name=\"filter-by-loggedInUser\" id=\"no\" value=\"no\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.myFilterSelected : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(2, data, 0),"data":data})) != null ? stack1 : "")
    + " class=\"toggle toggle-right\"><label for=\"no\" class=\"toggle-btn\">Other User Requests</label>\r\n            </div>\r\n        </div>\r\n        <div class=\"filter-wrapper\">\r\n            <fieldset class=\"filters general-filters status-filters"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.myFilterSelected : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                <div class=\"fieldset-wrap\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.generalStatuses : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </fieldset>\r\n            \r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " checked";
},"4":function(container,depth0,helpers,partials,data) {
    return "";
},"6":function(container,depth0,helpers,partials,data) {
    return " hidden";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"filter-checkbox\">\r\n                            <input type=\"checkbox\" name=\"gen-statuses\" value=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" class=\"filter-gen-filters filter-gen-status checkbox\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n                            <label for=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" class=\"filter-label\">\r\n                                <div class=\"label-wrapper\">"
    + alias2(alias1((depth0 != null ? depth0.displayText : depth0), depth0))
    + "</div>\r\n                            </label>\r\n                        </div> \r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.myFilterSelected : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <div class=\"filter-checkbox\">\r\n                        <input type=\"checkbox\" name=\"my-statuses\" value=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" id=\"my-"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" class=\"filter-own-filters checkbox\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n                        <label for=\"my-"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" class=\"filter-label\"><div class=\"label-wrapper\">"
    + alias2(alias1((depth0 != null ? depth0.displayText : depth0), depth0))
    + "</div></label>\r\n                    </div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <fieldset class=\"filters general-filters user-filters"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.myFilterSelected : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                <div class=\"fieldset-wrap\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </fieldset>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"filter-checkbox\">\r\n                            <input type=\"checkbox\" name=\"users\" value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"filter-gen-filters checkbox\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n                            <label for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"filter-label\">\r\n                                <div class=\"label-wrapper\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</div>\r\n                            </label>\r\n                        </div>\r\n                        \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<form action=\"#\" class=\"filter-form hidden\" id=\"filter-form\">\r\n    <i class=\"material-icons filter-form-toggle-close\" data-clickable=\"toggleFilterForm\">close</i>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.userIsApprover : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <fieldset class=\" filters own-filters"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.userIsApprover : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n            <div class=\"fieldset-wrap\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.myStatuses : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </fieldset>\r\n        \r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.userIsApprover : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <button type=\"submit\" class=\"btn btn-submit filter-btn\" id=\"filter-requests-button\">Filter</button>\r\n</form>\r\n";
},"useData":true}));;
this["templates"]["newRequestForm"] = Handlebars.registerPartial("partials_dashboard_newRequestForm", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form action=\"/requests/new\" method=\"post\" class=\"new-request-form flex-col-wrap hidden\" id=\"new-request-form\">\r\n    <i class=\"material-icons create-form-toggle-close\" data-clickable=\"toggleNewRequestForm\">close</i>\r\n    <p class=\"create-instructions\" id=\"create-instructions\">Select a Vendor to create a new request:</p>\r\n    <select name=\"vendorSelector\" id=\"vendor-selector\" class=\"vendor-selector\" required aria-labelledby=\"create-instructions\">\r\n        <option value=\"\">Select a vendor...</option>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.vendors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <option value=\"\">----------</option>\r\n        <option value=\"create-new-vendor\">Create New Vendor</option>\r\n    </select>\r\n    <input type=\"text\" name=\"vendorName\" id=\"vendorName\" class=\"hidden vendor-name\" placeholder=\"Enter vendor name...\">\r\n    <button type=\"submit\" class=\"btn btn-submit btn-create\"><i class=\"material-icons\">create</i>Create Request</button>\r\n</form>\r\n";
},"useData":true}));;
this["templates"]["panel"] = Handlebars.registerPartial("partials_dashboard_panel", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "            <li class=\"tab\"><a href=\"\" class=\""
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-targets=\""
    + alias2(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-clickable=\"changeDashboardSelectors\">"
    + alias2(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"request-group-container "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n    <h2>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\r\n    <div class=\"request-grid-container\">\r\n        \r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.requests : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "hidden";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["request/requestSummary"],depth0,{"name":"request/requestSummary","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<nav class=\"panel-nav\">\r\n    <ul class=\"tabs-group\">\r\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</nav>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true}));;
this["templates"]["header"] = Handlebars.registerPartial("partials_page_header", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <div class=\"page-header\">\r\n        <div class=\"wrapper\">\r\n            <div class=\"user-wrap\">\r\n                <img class=\"user-avatar\" src=\"https://api.adorable.io/avatars/150/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1), depth0))
    + ".png\" alt=\"Avatar for "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.first : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.last : stack1), depth0))
    + "\">\r\n                <div class=\"user-info\">\r\n                    <p class=\"user-name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.first : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1)) != null ? stack1.last : stack1), depth0))
    + "</p>\r\n                    <p class=\"user-email\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <a href=\"logout\" class=\"header-link\"><span class=\"link-group\">Log Out<i class=\"material-icons\">exit_to_app</i></span></a>\r\n        </div>\r\n    </div>\r\n";
},"useData":true}));;
this["templates"]["loadingSpinner"] = Handlebars.registerPartial("partials_page_loadingSpinner", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"spinner-container\">\r\n    <div class=\"sk-fading-circle\">\r\n        <div class=\"sk-circle1 sk-circle\"></div>\r\n        <div class=\"sk-circle2 sk-circle\"></div>\r\n        <div class=\"sk-circle3 sk-circle\"></div>\r\n        <div class=\"sk-circle4 sk-circle\"></div>\r\n        <div class=\"sk-circle5 sk-circle\"></div>\r\n        <div class=\"sk-circle6 sk-circle\"></div>\r\n        <div class=\"sk-circle7 sk-circle\"></div>\r\n        <div class=\"sk-circle8 sk-circle\"></div>\r\n        <div class=\"sk-circle9 sk-circle\"></div>\r\n        <div class=\"sk-circle10 sk-circle\"></div>\r\n        <div class=\"sk-circle11 sk-circle\"></div>\r\n        <div class=\"sk-circle12 sk-circle\"></div>\r\n    </div>\r\n</div>\r\n";
},"useData":true}));;
this["templates"]["addItemForm"] = Handlebars.registerPartial("partials_request_addItemForm", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form action=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1), depth0))
    + "/addItem\" method=\"post\" class=\"hidden\" id=\"add-item-form\">\r\n    <table>\r\n        <tr>\r\n            <th><label for=\"itemName\">Item Name</label></th>\r\n            <th><label for=\"itemQty\">Quantity</label></th>\r\n            <th><label for=\"itemPrice\">Price Each</label></th>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td><input type=\"text\" name=\"itemName\" id=\"itemName\"></td>\r\n            <td><input type=\"number\" name=\"itemQty\" id=\"itemQty\"></td>\r\n            <td><input type=\"number\" name=\"itemPrice\" id=\"itemPrice\" step=\"0.01\" min=0></td>\r\n        </tr>\r\n        <tr>\r\n            <th><label for=\"neededBy\">Needed By</label></th>\r\n            <th><label for=\"expeditedShipping\">Expedited Shipping?</label></th>\r\n            <th><label for=\"itemLink\">Vendor Link (optional)</label></th>\r\n        </tr>\r\n        <tr>\r\n            <td><label for=\"neededBy\">Needed By: <input type=\"date\" name=\"neededBy\" id=\"neededBy\"></td>\r\n            <td><input type=\"checkbox\" name=\"expeditedShipping\" id=\"expeditedShipping\"></td>\r\n            <td><input type=\"url\" name=\"itemLink\" id=\"itemLink\"></td>\r\n        </tr>\r\n        <tr>\r\n            <th colspan=3><label for=\"itemNotes\">Notes (optional)</label></td>\r\n        </tr>\r\n        <tr>\r\n            <td colspan=3><textarea name=\"itemNotes\" id=\"itemNotes\"></textarea></td>\r\n        </tr>\r\n    </table> \r\n    \r\n    <div class=\"button-box flex-horz-wrap\">\r\n        <button type=\"submit\" class=\"btn btn-submit\"><i class=\"material-icons\">send</i>Add Item</button>\r\n        <button type=\"reset\" class=\"btn btn-clear\"><i class=\"material-icons\">clear_all</i>Clear Form</button>\r\n        <button type=\"reset\" class=\"btn btn-cancel\" data-clickable=\"cancelAddItem\" data-allow-default><i class=\"material-icons\">clear</i>Cancel</button>\r\n    </div>\r\n</form>\r\n";
},"useData":true}));;
this["templates"]["dashboardSection"] = Handlebars.registerPartial("partials_request_dashboardSection", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true}));;
this["templates"]["itemSummary"] = Handlebars.registerPartial("partials_request_itemSummary", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <td rowspan=\"3\">\r\n            <a href=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.parent : depth0)) != null ? stack1.data : stack1)) != null ? stack1.id : stack1), depth0))
    + "/items/delete/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"view-request-link\" data-item=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">Remove</a>\r\n        </td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<tr class=\"data\">\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.qty : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.pricePer : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.neededBy : depth0),"MMMM Do YYYY",{"name":"dateFormat","hash":{},"data":data}))
    + "</td>\r\n    <td>"
    + alias2((helpers.prettifyTrueFalse || (depth0 && depth0.prettifyTrueFalse) || alias4).call(alias3,(depth0 != null ? depth0.expeditedShipping : depth0),{"name":"prettifyTrueFalse","hash":{},"data":data}))
    + "</td>\r\n    \r\n"
    + ((stack1 = (helpers.checkForApproved || (depth0 && depth0.checkForApproved) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.parent : depth0)) != null ? stack1.data : stack1)) != null ? stack1.status : stack1),{"name":"checkForApproved","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n<tr class=\"link\">\r\n    <td class=\"link\">Link:</td>\r\n    <td colspan=\"5\"><a href=\""
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "\" target=\"_new\" class=\"item-link\"></a>"
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "</td>\r\n</tr>\r\n<tr class=\"notes\">\r\n    <td class=\"notes\">Notes:</td>\r\n    <td colspan=\"5\">"
    + alias2(alias1((depth0 != null ? depth0.notes : depth0), depth0))
    + "</td>\r\n</tr>\r\n";
},"useData":true}));;
this["templates"]["itemTableRow"] = Handlebars.registerPartial("partials_request_itemTableRow", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <td>\r\n            <a href=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.parent : depth0)) != null ? stack1.data : stack1)) != null ? stack1.id : stack1), depth0))
    + "/items/delete/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" class=\"view-request-link\" data-item=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\"><i class=\"material-icons\">delete</i></a>\r\n        </td>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <td></td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<tr class=\"data\">\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.qty : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2(alias1((depth0 != null ? depth0.pricePer : depth0), depth0))
    + "</td>\r\n    <td>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.neededBy : depth0),"MMMM Do YYYY",{"name":"dateFormat","hash":{},"data":data}))
    + "</td>\r\n    \r\n"
    + ((stack1 = (helpers.checkForApproved || (depth0 && depth0.checkForApproved) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.parent : depth0)) != null ? stack1.data : stack1)) != null ? stack1.status : stack1),{"name":"checkForApproved","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    <td>\r\n        <a href=\"\" class=\"view-more-info\" data-item=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-clickable=\"toggleItemDetailView\"><i class=\"material-icons\" data-item=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-clickable=\"toggleItemDetailView\">expand_more</i></a>\r\n    </td>\r\n</tr>\r\n<tr class=\"additional-info-parent hidden\" data-item-targeted=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\r\n    <td colspan=\"6\" class=\"additional-info\">\r\n        <p><b>Expedited Shipping: </b>"
    + alias2((helpers.prettifyTrueFalse || (depth0 && depth0.prettifyTrueFalse) || alias4).call(alias3,(depth0 != null ? depth0.expeditedShipping : depth0),{"name":"prettifyTrueFalse","hash":{},"data":data}))
    + "</p>\r\n        <p><b>Vendor Link: </b><a href=\""
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "\" target=\"_new\" class=\"item-link\">"
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "</a></p>\r\n        <p class=\"notes\"><b>Notes:</b> "
    + alias2(alias1((depth0 != null ? depth0.notes : depth0), depth0))
    + "</p>\r\n        \r\n    </td>\r\n</tr>\r\n";
},"useData":true}));;
this["templates"]["requestSummary"] = Handlebars.registerPartial("partials_request_requestSummary", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <i class=\"material-icons list-toggle\" data-clickable=\"toggleRequestListView\" data-reqId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                list</i>\r\n                <p class=\"item-list-title\">Items in this Request</p>\r\n                <ul class=\"item-list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    "
    + alias4(((helper = (helper = helpers.getAdditionalItemsHtml || (depth0 != null ? depth0.getAdditionalItemsHtml : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"getAdditionalItemsHtml","hash":{},"data":data}) : helper)))
    + "\r\n                </ul>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <li class=\"request-item\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.qty : depth0), depth0))
    + " @ $"
    + alias2(alias1((depth0 != null ? depth0.pricePer : depth0), depth0))
    + "</li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"no-items-msg\">No Items Yet</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<article class=\"request "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.status : depth0)) != null ? stack1.forCode : stack1), depth0))
    + "\" data-reqId=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n     "
    + alias2(((helper = (helper = helpers.viewActions || (depth0 != null ? depth0.viewActions : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"viewActions","hash":{},"data":data}) : helper)))
    + "\r\n    <div class=\"summary\">\r\n        <header class=\"request-summary-header\">\r\n            <p class=\"status\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.status : depth0)) != null ? stack1.forDisplay : stack1), depth0))
    + "</p>\r\n            <div class=\"clearfix\"></div>\r\n        </header>\r\n        <div class=\"main-summary-section\">\r\n            <p class=\"request-total\">"
    + alias2(((helper = (helper = helpers.requestTotal || (depth0 != null ? depth0.requestTotal : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"requestTotal","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <p class=\"vendor-name\"><span class=\"vendor-label\">Vendor: </span>\r\n                "
    + alias2(((helper = (helper = helpers.vendorName || (depth0 != null ? depth0.vendorName : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"vendorName","hash":{},"data":data}) : helper)))
    + "</p>\r\n            "
    + alias2(((helper = (helper = helpers.requestorHtml || (depth0 != null ? depth0.requestorHtml : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"requestorHtml","hash":{},"data":data}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"item-list-container\">\r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.items : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</article>\r\n";
},"useData":true}));;