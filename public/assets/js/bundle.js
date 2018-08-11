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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

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

eval("const SharedApi = __webpack_require__(/*! ../api/SharedApi */ \"./server/api/SharedApi.js\");\r\n// temporary until we hook up mongoose\r\nconst mockRequestData = __webpack_require__(/*! ../MOCK-DATA/mock-request-data */ \"./server/MOCK-DATA/mock-request-data.js\");\r\n// temporary until we hook up mongoose\r\nconst mockUserData = __webpack_require__(/*! ../MOCK-DATA/mock-user-data */ \"./server/MOCK-DATA/mock-user-data.js\");\r\n\r\nclass PurchaseRequestApi {\r\n    static getAllRequests(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        res.json(mockRequestData.purchase_requests);\r\n    }\r\n\r\n    static validateRequest(type, req) {\r\n        let requiredFields = [];\r\n        if (type === 'new') {\r\n            requiredFields = ['requestorId', 'createdAt', 'status', 'items'];\r\n            // make sure there is no id\r\n            if (req.body.id) {\r\n                return 'Cannot recreate existing purchase request.';\r\n            }\r\n        } else {\r\n            requiredFields = ['id', 'requestorId', 'createdAt', 'status', 'items'];\r\n            // make sure param id and body id match\r\n            if (req.params.id != req.body.id) {\r\n                return `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;\r\n            }\r\n        }\r\n\r\n        const message = SharedApi.checkForRequiredFields(requiredFields, req.body);\r\n        if (message) {\r\n            return message;\r\n        }\r\n\r\n        // if items are present, make sure they have all required fields\r\n        let itemIdCounter = 1;\r\n        for (const item of req.body.items) {\r\n            const itemMessage = PurchaseRequestApi.checkItemForRequired(item);\r\n            if (itemMessage) {\r\n                return itemMessage;\r\n            } else {\r\n                // temporary until we hook up mongoose\r\n                item.id = itemIdCounter;\r\n                itemIdCounter++;\r\n            }\r\n        }\r\n        return req.body;\r\n    }\r\n\r\n    static saveNewRequest(req, res) {\r\n        // check for required fields\r\n        const validation = PurchaseRequestApi.validateRequest('new', req);\r\n        if (typeof(validation) === 'string') {\r\n            console.error(validation);\r\n            res.status(400).send(validation);\r\n        }\r\n\r\n        // temporary until we hook up mongoose\r\n        // use timestamp as dummy id\r\n        req.body.id = Date.now();\r\n\r\n        // temporary until we hook up mongoose\r\n        // persist request\r\n        mockRequestData.purchase_requests.push(req.body);\r\n\r\n        // temporary - update when we hook up mongoose\r\n        return res.status(201).json(req.body);\r\n    }\r\n\r\n    static getRequestById(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {\r\n            return element.id == req.params.id;\r\n        });\r\n        console.log('Request Index: ', requestIndex);\r\n        if (requestIndex === -1) {\r\n            res.json({ \"error\": \"Request not found\" });\r\n        } else {\r\n            res.json(mockRequestData.purchase_requests[requestIndex]);\r\n        }\r\n    }\r\n\r\n    static updateRequest(req, res) {\r\n        // check for required fields\r\n        const validation = PurchaseRequestApi.validateRequest('update', req);\r\n        if (typeof(validation) === 'string') {\r\n            console.error(validation);\r\n            res.status(400).send(validation);\r\n        }\r\n\r\n        // temporary - update when we hook up mongoose\r\n        const requestIndex = mockRequestData.purchase_requests.findIndex(function(element) {\r\n            return element.id == req.params.id;\r\n        });\r\n\r\n        mockRequestData.purchase_requests[requestIndex] = req.body;\r\n        res.status(200).json(req.body);\r\n    }\r\n\r\n    static deleteRequest(req, res) {\r\n        // temporary - update when we hook up mongoose\r\n        const index = PurchaseRequestApi.getRequestById(req.params.id);\r\n        mockRequestData.purchase_requests.splice(index, 1);\r\n        res.status(204).end();\r\n    }\r\n\r\n    static getRequestor(userId) {\r\n        return mockUserData.getUserById(userId);\r\n    }\r\n\r\n    static checkItemForRequired(item) {\r\n        const itemRequiredFields = ['name', 'qty', 'pricePer', 'neededBy', 'expeditedShipping'];\r\n        const message = SharedApi.checkForRequiredFields(itemRequiredFields, item);\r\n\r\n        return message;\r\n    }\r\n}\r\n\r\nmodule.exports = PurchaseRequestApi;\n\n//# sourceURL=webpack:///./server/controllers/PurchaseRequestApiController.js?");

/***/ }),

/***/ "./source/client-js/ClickHandler.js":
/*!******************************************!*\
  !*** ./source/client-js/ClickHandler.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// this is a static class\r\n\r\nconst ClickHandler = {\r\n    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',\r\n    addClickListeners: function() {\r\n        const body = document.querySelector('body');\r\n        body.addEventListener('click', this.handleClicked);\r\n    },\r\n    handleClicked: function(e) {\r\n        const clicked = e.target;\r\n        if (clicked.hasAttribute('data-clickable')) {\r\n            e.preventDefault();\r\n            ClickHandler[clicked.getAttribute('data-clickable')](clicked);\r\n        }\r\n    },\r\n    addItemToReq: function(element) {\r\n        const requestId = element.getAttribute('data-reqId');\r\n        console.log(requestId);\r\n    },\r\n    deleteRequest: function(element) {\r\n        const requestId = element.getAttribute('data-reqId');\r\n        if (confirm(\"Are you sure you want to delete this request?  This action CANNOT be undone!\")) {\r\n            const url = this.apiUrl + 'requests/' + requestId;\r\n            fetch(url, {\r\n                    method: 'delete'\r\n                })\r\n                .then((response) => {\r\n                    const redirectUrl = window.location.origin + '/requests';\r\n                    window.location.href = redirectUrl;\r\n                })\r\n                .catch(error => console.error('Fetch Error: ', error));\r\n        }\r\n        console.log(requestId);\r\n    },\r\n}\r\n\r\nmodule.exports = ClickHandler;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./source/client-js/ClickHandler.js?");

/***/ }),

/***/ "./source/client-js/PurchaseRequest.js":
/*!*********************************************!*\
  !*** ./source/client-js/PurchaseRequest.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const requestData = __webpack_require__(/*! ../../server/MOCK-DATA/mock-request-data */ \"./server/MOCK-DATA/mock-request-data.js\");\r\nconst PurchaseRequestApi = __webpack_require__(/*! ../../server/controllers/PurchaseRequestApiController */ \"./server/controllers/PurchaseRequestApiController.js\");\r\n\r\nclass PurchaseRequest {\r\n    constructor(userId = null, json = null) {\r\n        if (!json) {\r\n            this.requestorId = userId;\r\n            this.requestorName = PurchaseRequestApi.getRequestor(userId);\r\n            this.createdAt = Date.now();\r\n            this.status = 'created';\r\n            this.items = [];\r\n        } else {\r\n            const data = json;\r\n            this.id = data.id;\r\n            this.requestorId = data.requestorId;\r\n            this.requestorName = data.requestorName;\r\n            this.createdAt = data.createdAt;\r\n            this.status = data.status;\r\n            this.items = data.items;\r\n        }\r\n    }\r\n\r\n    addItem(name, qty, pricePer, neededBy, expeditedShipping) {\r\n        this.items.push({\r\n            id: Date.now(), // item id to allow deleting\r\n            name,\r\n            qty,\r\n            pricePer,\r\n            neededBy,\r\n            expeditedShipping,\r\n        });\r\n    }\r\n\r\n    findItemById(id) {\r\n        return this.items.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    removeItem(id) {\r\n        const itemIndex = this.findItemById(id);\r\n\r\n        this.items.splice(itemIndex, 1);\r\n    }\r\n\r\n    setStatus(status) {\r\n        this.status = status;\r\n    }\r\n\r\n    // Will need to change this when hooking up API\r\n    save() {\r\n        // if this already has an id, we need to update the\r\n        // existing item\r\n        if (this.id) {\r\n            const requestIndex = PurchaseRequest.findRequestIndex(this.id);\r\n            requestData.purchase_requests[requestIndex] = this;\r\n        } else {\r\n            const savedRequest = PurchaseRequestApi.create(this);\r\n            this.id = savedRequest.id;\r\n        }\r\n    }\r\n\r\n    static findRequestIndex(id) {\r\n        return requestData.purchase_requests.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    static getRequestById(id) {\r\n        const requestIndex = this.findRequestIndex(id);\r\n        return new PurchaseRequest('aaaaaaa', requestData.purchase_requests[requestIndex]);\r\n    }\r\n}\r\n\r\nmodule.exports = PurchaseRequest;\n\n//# sourceURL=webpack:///./source/client-js/PurchaseRequest.js?");

/***/ }),

/***/ "./source/client-js/client.js":
/*!************************************!*\
  !*** ./source/client-js/client.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ClickHandler = __webpack_require__(/*! ./ClickHandler */ \"./source/client-js/ClickHandler.js\");\r\n\r\n// when document is ready, add necessary client click listeners\r\ndocument.onreadystatechange = function() {\r\n    if (document.readyState === \"interactive\") {\r\n        ClickHandler.addClickListeners();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./source/client-js/client.js?");

/***/ }),

/***/ 0:
/*!*******************************************************************************************************************!*\
  !*** multi ./source/client-js/ClickHandler.js ./source/client-js/client.js ./source/client-js/PurchaseRequest.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\laragon\\www\\purchase-order-app\\source\\client-js\\ClickHandler.js */\"./source/client-js/ClickHandler.js\");\n__webpack_require__(/*! D:\\laragon\\www\\purchase-order-app\\source\\client-js\\client.js */\"./source/client-js/client.js\");\nmodule.exports = __webpack_require__(/*! D:\\laragon\\www\\purchase-order-app\\source\\client-js\\PurchaseRequest.js */\"./source/client-js/PurchaseRequest.js\");\n\n\n//# sourceURL=webpack:///multi_./source/client-js/ClickHandler.js_./source/client-js/client.js_./source/client-js/PurchaseRequest.js?");

/***/ })

/******/ });