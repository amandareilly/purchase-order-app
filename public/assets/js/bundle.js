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

/***/ "./source/client-js/MOCK-DATA/mock-request-data.js":
/*!*********************************************************!*\
  !*** ./source/client-js/MOCK-DATA/mock-request-data.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint quotes: \"off\", quote-props: \"off\", indent: \"off\" */\r\n\r\nconst mockRequestData = {\r\n    \"purchase_requests\": [{\r\n            \"id\": 1,\r\n            \"requestorId\": \"aaaaaaa\",\r\n            \"requestorName\": \"John Smith\",\r\n            \"createdAt\": 1529798400,\r\n            \"status\": \"complete\",\r\n            \"items\": [{\r\n                    \"id\": 1529798401,\r\n                    \"name\": \"Kleenex, 150ct Box\",\r\n                    \"qty\": 5,\r\n                    \"pricePer\": 3.99,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n                {\r\n                    \"id\": 1529798402,\r\n                    \"name\": \"Pens, 20ct box\",\r\n                    \"qty\": 8,\r\n                    \"pricePer\": 7.82,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n            ],\r\n        },\r\n        {\r\n            \"id\": 2,\r\n            \"requestorId\": \"bbbbbbb\",\r\n            \"requestorName\": \"Jane Doe\",\r\n            \"createdAt\": 15297589200,\r\n            \"status\": \"created\",\r\n            \"items\": [{\r\n                    \"id\": 1529798403,\r\n                    \"name\": \"Kleenex, 150ct Box\",\r\n                    \"qty\": 5,\r\n                    \"pricePer\": 3.99,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n                {\r\n                    \"id\": 1529798404,\r\n                    \"name\": \"Pens, 20ct box\",\r\n                    \"qty\": 8,\r\n                    \"pricePer\": 7.82,\r\n                    \"neededBy\": 1532995200,\r\n                    \"expeditedShipping\": false,\r\n                    \"notes\": \"Lorem ipsum dolor sit amet...\",\r\n                },\r\n            ],\r\n        },\r\n    ],\r\n};\r\n\r\nmodule.exports = mockRequestData;\n\n//# sourceURL=webpack:///./source/client-js/MOCK-DATA/mock-request-data.js?");

/***/ }),

/***/ "./source/client-js/classes/PurchaseRequest.js":
/*!*****************************************************!*\
  !*** ./source/client-js/classes/PurchaseRequest.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import requestData from '../MOCK-DATA/mock-request-data';\r\n\r\nconst requestData = __webpack_require__(/*! ../MOCK-DATA/mock-request-data */ \"./source/client-js/MOCK-DATA/mock-request-data.js\");\r\n\r\nclass PurchaseRequest {\r\n    constructor(userId, json = null) {\r\n        if (!json) {\r\n            this.requestorId = userId;\r\n            // change or remove requestor name when hooking up API\r\n            // because user name will be populated with a query\r\n            this.requestorName = 'John Smith';\r\n            this.createdAt = Date.now();\r\n            this.status = 'created';\r\n            this.items = [];\r\n        } else {\r\n            console.log(json);\r\n            // const data = JSON.parse(json);\r\n            const data = json;\r\n            console.log(data);\r\n            this.id = data.id;\r\n            this.requestorId = data.requestorId;\r\n            this.requestorName = data.requestorName;\r\n            this.createdAt = data.createdAt;\r\n            this.status = data.status;\r\n            this.items = data.items;\r\n        }\r\n    }\r\n\r\n    addItem(name, qty, pricePer, neededBy, expeditedShipping) {\r\n        this.items.push({\r\n            id: Date.now(), // item id to allow deleting\r\n            name,\r\n            qty,\r\n            pricePer,\r\n            neededBy,\r\n            expeditedShipping,\r\n        });\r\n    }\r\n\r\n    findItemById(id) {\r\n        return this.items.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    removeItem(id) {\r\n        const itemIndex = this.findItemById(id);\r\n\r\n        this.items.splice(itemIndex, 1);\r\n    }\r\n\r\n    setStatus(status) {\r\n        this.status = status;\r\n    }\r\n\r\n    // Will need to change this when hooking up API\r\n    save() {\r\n        // if this already has an id, we need to update the\r\n        // existing item\r\n        if (this.id) {\r\n            const requestIndex = PurchaseRequest.findRequestIndex(this.id);\r\n            requestData.purchase_requests[requestIndex] = this;\r\n        } else {\r\n            // if it doesn't already have an id, we need to\r\n            // create one - temporarily using timestamp for\r\n            // unique value\r\n            this.id = Date.now();\r\n            requestData.purchase_requests.push(this);\r\n        }\r\n    }\r\n\r\n    static findRequestIndex(id) {\r\n        return requestData.purchase_requests.findIndex(function(element) {\r\n            return element.id === id;\r\n        });\r\n    }\r\n\r\n    static getRequestById(id) {\r\n        const requestIndex = this.findRequestIndex(id);\r\n        return new PurchaseRequest('aaaaaaa', requestData.purchase_requests[requestIndex]);\r\n    }\r\n}\r\n\r\n// const testRequest = new PurchaseRequest('aaaaaa', requestData.purchase_requests[0]);\r\n// console.log(testRequest);\r\n// testRequest.removeItem(1529798401);\r\n// console.log(testRequest);\r\n// testRequest.addItem(\"test item\", 1, 5, 1529798400, false);\r\n// console.log(testRequest);\r\n// testRequest.setStatus(\"reviewed\");\r\n// console.log(testRequest);\r\n// console.log(requestData.purchase_requests);\r\n// testRequest.save();\r\n// console.log(requestData.purchase_requests);\r\n\r\n// const newRequest = PurchaseRequest.getRequestById(2);\r\n// console.log(newRequest);\r\n\r\n// module.exports = PurchaseRequest;\n\n//# sourceURL=webpack:///./source/client-js/classes/PurchaseRequest.js?");

/***/ }),

/***/ 0:
/*!*************************************************************************************************************!*\
  !*** multi ./source/client-js/classes/PurchaseRequest.js ./source/client-js/MOCK-DATA/mock-request-data.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\laragon\\www\\purchase-order-app\\source\\client-js\\classes\\PurchaseRequest.js */\"./source/client-js/classes/PurchaseRequest.js\");\nmodule.exports = __webpack_require__(/*! D:\\laragon\\www\\purchase-order-app\\source\\client-js\\MOCK-DATA\\mock-request-data.js */\"./source/client-js/MOCK-DATA/mock-request-data.js\");\n\n\n//# sourceURL=webpack:///multi_./source/client-js/classes/PurchaseRequest.js_./source/client-js/MOCK-DATA/mock-request-data.js?");

/***/ })

/******/ });