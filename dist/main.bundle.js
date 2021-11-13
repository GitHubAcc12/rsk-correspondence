/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/application.js":
/*!***************************!*\
  !*** ./js/application.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Application)\n/* harmony export */ });\nclass Application {\n  constructor() {\n    this.initializeEventListeners();\n  }\n\n  incrementCell(cell) {\n    let val = parseInt(cell.innerHTML);\n    cell.innerHTML = val + 1;\n  }\n\n  decrementCell(cell) {\n    let val = parseInt(cell.innerHTML);\n\n    if (val > 0) {\n      cell.innerHTML = val - 1;\n    } else {\n      console.warn(\"Only positive integers allowed!\");\n    }\n  }\n\n  initializeEventListeners() {\n    let items = document.getElementsByTagName(\"td\");\n\n    for (let i = 0; i < items.length; ++i) {\n      items[i].addEventListener(\"click\", () => this.incrementCell(items[i]));\n      items[i].addEventListener(\"contextmenu\", event => {\n        event.preventDefault();\n        this.decrementCell(items[i]);\n      });\n    }\n  }\n\n}\n\n//# sourceURL=webpack://rsk/./js/application.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ \"./js/application.js\");\n/* harmony import */ var _tableau__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tableau */ \"./js/tableau.js\");\n\n\nlet app = new _application__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack://rsk/./js/index.js?");

/***/ }),

/***/ "./js/tableau.js":
/*!***********************!*\
  !*** ./js/tableau.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ YoungTableu)\n/* harmony export */ });\nclass YoungTableu {\n  constructor(shape = [], content = []) {\n    this.shape = shape;\n    this.content = content;\n    this.tableau = [[]];\n  }\n\n  rowBump(val) {\n    this.content.push(val);\n\n    if (this.tableau[0].length == 0) {\n      this.tableau[0].push(val);\n    }\n\n    let pos = this.tableau[0].length - 1;\n\n    if (this.tableau[0][pos] <= val) {\n      this.tableau[0].push(val);\n    }\n\n    let toBump = val;\n\n    for (let i = 0; i < this.tableau.length; ++i) {\n      let j = this.tableau[i].length - 1;\n\n      if (toBump >= this.tableau[i][j]) {\n        this.tableau[i].push(toBump);\n        ++this.shape[i];\n        return [i, j + 1];\n      } else {\n        --j;\n\n        for (; j <= 0; ++j) {\n          if (toBump >= this.tableau[i][j]) {\n            let bumpOut = this.tableau[i][j];\n            this.tableau[i][j] = toBump;\n            toBump = bumpOut;\n            break;\n          }\n        }\n      }\n    } // if we arrive here, we have to add a new row to the tableau\n\n\n    this.tableau.push([toBump]);\n    this.shape.push(1);\n    return [this.tableau.length - 1, 0]; // TODO check if this is the right return\n  }\n\n}\n\n//# sourceURL=webpack://rsk/./js/tableau.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;