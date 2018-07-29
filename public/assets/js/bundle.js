/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/client-js/classes/PurchaseRequest.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/MOCK-DATA/mock-request-data.js":
/*!***********************************************!*\
  !*** ./server/MOCK-DATA/mock-request-data.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint quotes: \"off\", quote-props: \"off\", indent: \"off\" */\r\nconst mockUserData = __webpack_require__(/*! ./mock-user-data */ \"./server/MOCK-DATA/mock-user-data.js\");\r\n\r\nconst mockRequestData = {\r\n    \"purchase_requests\": [{\r\n            \"id\": 1,\r\n            \"requestorId\": \"12345\",\r\n            \"requestorName\": mockUserData.getUserName(12345),\r\n            \"createdAt\": 1529798400,\r\n            \"status\": \"complete\",\r\n            \"items\": [{\r\n                    \"id\": 1529798401,\r\n                    \"name\": \"Kleenex, 150ct Box\",\r\n                    \"qty\": 5,\r\n                    \"pricePer\": 3.99,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n                {\r\n                    \"id\": 1529798402,\r\n                    \"name\": \"Pens, 20ct box\",\r\n                    \"qty\": 8,\r\n                    \"pricePer\": 7.82,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n            ],\r\n        },\r\n        {\r\n            \"id\": 2,\r\n            \"requestorId\": \"67891\",\r\n            \"requestorName\": mockUserData.getUserName(67891),\r\n            \"createdAt\": 15297589200,\r\n            \"status\": \"created\",\r\n            \"items\": [{\r\n                    \"id\": 1529798403,\r\n                    \"name\": \"Kleenex, 150ct Box\",\r\n                    \"qty\": 5,\r\n                    \"pricePer\": 3.99,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n                {\r\n                    \"id\": 1529798404,\r\n                    \"name\": \"Pens, 20ct box\",\r\n                    \"qty\": 8,\r\n                    \"pricePer\": 7.82,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n            ],\r\n        },\r\n    ],\r\n};\r\nmodule.exports = mockRequestData;\n\n//# sourceURL=webpack:///./server/MOCK-DATA/mock-request-data.js?");

/***/ }),

/***/ "./server/MOCK-DATA/mock-user-data.js":
/*!********************************************!*\
  !*** ./server/MOCK-DATA/mock-user-data.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint quotes: \"off\", quote-props: \"off\", indent: \"off\" */\r\n\r\nconst mockUserData = {\r\n    \"users\": [{\r\n            \"id\": 12345,\r\n            \"name\": \"John Doe\",\r\n        },\r\n        {\r\n            \"id\": 67891,\r\n            \"name\": \"Jane Doe\",\r\n        },\r\n        {\r\n            \"id\": 23456,\r\n            \"name\": \"Sally Smith\",\r\n        },\r\n        {\r\n            \"id\": 78912,\r\n            \"name\": \"Sam Smuthers\",\r\n        },\r\n    ],\r\n    \"getUserById\": function(id) {\r\n        const userIndex = mockUserData.users.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n        return mockUserData.users[userIndex];\r\n    },\r\n    \"getUserName\": function(id) {\r\n        const user = mockUserData.getUserById(id);\r\n        if (user) {\r\n            return user.name;\r\n        }\r\n        return null;\r\n    },\r\n};\r\n\r\nmodule.exports = mockUserData;\n\n//# sourceURL=webpack:///./server/MOCK-DATA/mock-user-data.js?");

/***/ }),

/***/ "./server/api/SharedApi.js":
/*!*********************************!*\
  !*** ./server/api/SharedApi.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class SharedApi {\r\n    static checkForRequiredFields(fieldList, request) {\r\n        let message = '';\r\n        for (let i = 0; i < fieldList.length; i++) {\r\n            const field = fieldList[i];\r\n            if (!(field in request)) {\r\n                message += `* Missing \\`${field}\\` in request. `;\r\n            }\r\n        }\r\n        return message;\r\n    }\r\n}\r\n\r\nmodule.exports = SharedApi;\n\n//# sourceURL=webpack:///./server/api/SharedApi.js?");

/***/ }),

/***/ "./server/controllers/PurchaseRequestApiController.js":
/*!************************************************************!*\
  !*** ./server/controllers/PurchaseRequestApiController.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SharedApi = __webpack_require__(/*! ../api/SharedApi */ \"./server/api/SharedApi.js\");\r\n// temporary until we hook up mongoose\r\nconst mockRequestData = __webpack_require__(/*! ../MOCK-DATA/mock-request-data */ \"./server/MOCK-DATA/mock-request-data.js\");\r\n// temporary until we hook up mongoose\r\nconst mockUserData = __webpack_require__(/*! ../MOCK-DATA/mock-user-data */ \"./server/MOCK-DATA/mock-user-data.js\");\r\n\r\nclass PurchaseRequestApi {\r\n    static getAllRequests(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        res.json(mockRequestData.purchase_requests);\r\n    }\r\n\r\n    static validateRequest(type = 'update', req) {\r\n        let requiredFields = [];\r\n        if (type === 'new') {\r\n            console.log(req.body);\r\n            console.log(req.params);\r\n            requiredFields = ['requestorId', 'createdAt', 'status', 'items'];\r\n            // make sure there is no id\r\n            if (req.body.id) {\r\n                return 'Cannot recreate existing purchase request.';\r\n            }\r\n        } else {\r\n            console.log(req.body);\r\n            console.log(req.params);\r\n            requiredFields = ['id', 'requestorId', 'createdAt', 'status', 'items'];\r\n            // make sure param id and body id match\r\n            if (req.params.id !== req.body.id) {\r\n                return `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;\r\n            }\r\n        }\r\n\r\n        const message = SharedApi.checkForRequiredFields(requiredFields, req.body);\r\n        if (message) {\r\n            return message;\r\n        }\r\n\r\n        // if items are present, make sure they have all required fields\r\n        let itemIdCounter = 1;\r\n        for (const item of req.body.items) {\r\n            const itemMessage = PurchaseRequestApi.checkItemForRequired(item);\r\n            if (itemMessage) {\r\n                return itemMessage;\r\n            } else {\r\n                // temporary until we hook up mongoose\r\n                item.id = itemIdCounter;\r\n                itemIdCounter++;\r\n            }\r\n        }\r\n        return req.body;\r\n    }\r\n\r\n    static saveNewRequest(req, res) {\r\n        // check for required fields\r\n        const validation = PurchaseRequestApi.validateRequest('new', req);\r\n        if (typeof(validation) === 'string') {\r\n            res.status(400).send(validation);\r\n        }\r\n\r\n        // temporary until we hook up mongoose\r\n        // use timestamp as dummy id\r\n        req.body.id = Date.now();\r\n\r\n        // temporary until we hook up mongoose\r\n        // persist request\r\n        mockRequestData.purchase_requests.push(req.body);\r\n\r\n        // temporary - update when we hook up mongoose\r\n        return res.status(201).json(req.body);\r\n    }\r\n\r\n    static getRequestById(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {\r\n            return element.id == req.params.id;\r\n        });\r\n\r\n        res.json(mockRequestData.purchase_requests[requestIndex]);\r\n    }\r\n\r\n    static updateRequest(req, res) {\r\n        // check for required fields\r\n        const validation = PurchaseRequestApi.validateRequest('update', req);\r\n        if (typeof(validation) === 'string') {\r\n            res.status(400).send(validation);\r\n        }\r\n\r\n        // temporary - update when we hook up mongoose\r\n        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {\r\n            return element.id == req.params.id;\r\n        });\r\n\r\n        mockRequestData.purchase_requests[requestIndex] = req.body;\r\n        res.status(200).json(req.body);\r\n    }\r\n\r\n    static deleteRequest(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        const index = PurchaseRequestApi.getRequestById(req.params.id);\r\n        mockRequestData.purchase_requests.splice(index, 1);\r\n        res.status(204).end();\r\n    }\r\n\r\n    static getRequestor(userId) {\r\n        return mockUserData.getUserById(userId);\r\n    }\r\n\r\n    static checkItemForRequired(item) {\r\n        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];\r\n        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);\r\n\r\n        return message;\r\n    }\r\n}\r\n\r\nmodule.exports = PurchaseRequestApi;\n\n//# sourceURL=webpack:///./server/controllers/PurchaseRequestApiController.js?");

/***/ }),

/***/ "./source/client-js/classes/PurchaseRequest.js":
/*!*****************************************************!*\
  !*** ./source/client-js/classes/PurchaseRequest.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const requestData = __webpack_require__(/*! ../../../server/MOCK-DATA/mock-request-data */ \"./server/MOCK-DATA/mock-request-data.js\");\r\nconst PurchaseRequestApi = __webpack_require__(/*! ../../../server/controllers/PurchaseRequestApiController */ \"./server/controllers/PurchaseRequestApiController.js\");\r\n\r\nclass PurchaseRequest {\r\n    constructor(userId = null, json = null) {\r\n        if (!json) {\r\n            this.requestorId = userId;\r\n            this.requestorName = PurchaseRequestApi.getRequestor(userId);\r\n            this.createdAt = Date.now();\r\n            this.status = 'created';\r\n            this.items = [];\r\n        } else {\r\n            const data = json;\r\n            this.id = data.id;\r\n            this.requestorId = data.requestorId;\r\n            this.requestorName = data.requestorName;\r\n            this.createdAt = data.createdAt;\r\n            this.status = data.status;\r\n            this.items = data.items;\r\n        }\r\n    }\r\n\r\n    addItem(name, qty, pricePer, neededBy, expeditedShipping) {\r\n        this.items.push({\r\n            id: Date.now(), // item id to allow deleting\r\n            name,\r\n            qty,\r\n            pricePer,\r\n            neededBy,\r\n            expeditedShipping,\r\n        });\r\n    }\r\n\r\n    findItemById(id) {\r\n        return this.items.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    removeItem(id) {\r\n        const itemIndex = this.findItemById(id);\r\n\r\n        this.items.splice(itemIndex, 1);\r\n    }\r\n\r\n    setStatus(status) {\r\n        this.status = status;\r\n    }\r\n\r\n    // Will need to change this when hooking up API\r\n    save() {\r\n        // if this already has an id, we need to update the\r\n        // existing item\r\n        if (this.id) {\r\n            const requestIndex = PurchaseRequest.findRequestIndex(this.id);\r\n            requestData.purchase_requests[requestIndex] = this;\r\n        } else {\r\n            const savedRequest = PurchaseRequestApi.create(this);\r\n            this.id = savedRequest.id;\r\n        }\r\n    }\r\n\r\n    static findRequestIndex(id) {\r\n        return requestData.purchase_requests.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    static getRequestById(id) {\r\n        const requestIndex = this.findRequestIndex(id);\r\n        return new PurchaseRequest('aaaaaaa', requestData.purchase_requests[requestIndex]);\r\n    }\r\n}\r\n\r\nmodule.exports = PurchaseRequest;\n\n//# sourceURL=webpack:///./source/client-js/classes/PurchaseRequest.js?");

/***/ })

/******/ });