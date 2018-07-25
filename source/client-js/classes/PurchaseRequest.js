import requestData from '../MOCK-DATA/mock-request-data';

class PurchaseRequest {
    constructor(userId, json = null) {
        if (!json) {
            this.requestorId = userId;
            // change or remove requestor name when hooking up API
            // because user name will be populated with a query
            this.requestorName = 'John Smith';
            this.createdAt = Date.now();
            this.status = 'created';
            this.items = [];
        } else {
            const data = json;
            this.id = data.id;
            this.requestorId = data.requestorId;
            this.requestorName = data.requestorName;
            this.createdAt = data.createdAt;
            this.status = data.status;
            this.items = data.items;
        }
    }

    addItem(name, qty, pricePer, neededBy, expeditedShipping) {
        this.items.push({
            id: Date.now(), // item id to allow deleting
            name,
            qty,
            pricePer,
            neededBy,
            expeditedShipping,
        });
    }

    findItemById(id) {
        return this.items.findIndex(function(element) {
            return element.id === id;
        });
    }

    removeItem(id) {
        const itemIndex = this.findItemById(id);

        this.items.splice(itemIndex, 1);
    }

    setStatus(status) {
        this.status = status;
    }

    // Will need to change this when hooking up API
    save() {
        // if this already has an id, we need to update the
        // existing item
        if (this.id) {
            const requestIndex = PurchaseRequest.findRequestIndex(this.id);
            requestData.purchase_requests[requestIndex] = this;
        } else {
            // if it doesn't already have an id, we need to
            // create one - temporarily using timestamp for
            // unique value
            this.id = Date.now();
            requestData.purchase_requests.push(this);
        }
    }

    static findRequestIndex(id) {
        return requestData.purchase_requests.findIndex(function(element) {
            return element.id === id;
        });
    }

    static getRequestById(id) {
        const requestIndex = this.findRequestIndex(id);
        return new PurchaseRequest('aaaaaaa', requestData.purchase_requests[requestIndex]);
    }
}

const testRequest = new PurchaseRequest('aaaaaa', requestData.purchase_requests[0]);
console.log(testRequest);
testRequest.removeItem(1529798401);
console.log(testRequest);
testRequest.addItem("test item", 1, 5, 1529798400, false);
console.log(testRequest);
testRequest.setStatus("reviewed");
console.log(testRequest);
console.log(requestData.purchase_requests);
testRequest.save();
console.log(requestData.purchase_requests);

const newRequest = PurchaseRequest.getRequestById(2);
console.log(newRequest);

module.exports = PurchaseRequest;