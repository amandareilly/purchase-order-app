const requestData = require('../../server/MOCK-DATA/mock-request-data');
const PurchaseRequestApi = require('../../server/controllers/PurchaseRequestApiController');

class PurchaseRequest {
    constructor(userId = null, json = null) {
        if (!json) {
            this.requestorId = userId;
            this.requestorName = PurchaseRequestApi.getRequestor(userId);
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
            const savedRequest = PurchaseRequestApi.create(this);
            this.id = savedRequest.id;
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

module.exports = PurchaseRequest;