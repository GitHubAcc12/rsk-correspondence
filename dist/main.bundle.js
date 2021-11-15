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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Application)\n/* harmony export */ });\n/* harmony import */ var _contingencyTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contingencyTable */ \"./js/contingencyTable.js\");\n/* harmony import */ var _tableau__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tableau */ \"./js/tableau.js\");\n\n\nclass Application {\n  constructor() {\n    this.contingencyTable = new _contingencyTable__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 3);\n  }\n\n  start() {\n    this.initializeEventListeners();\n  }\n\n  incrementCell(cell, index) {\n    let val = parseInt(cell.innerHTML);\n    cell.innerHTML = val + 1;\n    let i = index[0];\n    let j = index[1];\n    this.contingencyTable.increment(i, j); // this.contingencyTable.printTable();\n  }\n\n  decrementCell(cell, index) {\n    let val = parseInt(cell.innerHTML);\n\n    if (val > 0) {\n      cell.innerHTML = val - 1;\n      let i = index[0];\n      let j = index[1];\n      this.contingencyTable.decrement(i, j);\n    } else {\n      console.warn(\"Only positive integers allowed!\");\n    }\n  }\n\n  initializeEventListeners() {\n    let items = document.getElementsByTagName(\"td\");\n\n    for (let i = 0; i < items.length; ++i) {\n      // compute row and column number from i\n      let cols = this.contingencyTable.columns;\n      let row = Math.floor(i / cols);\n      let col = i % cols;\n      let index = [row, col];\n      items[i].addEventListener(\"click\", () => {\n        this.incrementCell(items[i], index);\n      });\n      items[i].addEventListener(\"contextmenu\", event => {\n        event.preventDefault();\n        this.decrementCell(items[i], index);\n      });\n    }\n\n    let btn = document.getElementById(\"rsk-button\");\n    btn.addEventListener(\"click\", () => {\n      let [P, Q] = this.contingencyTable.semistandardTableauxFromCT();\n      console.log(P);\n      console.log(Q);\n      let headers = document.getElementsByClassName(\"vis-when-rsk\");\n\n      for (let i = 0; i < headers.length; ++i) {\n        headers[i].style.visibility = \"visible\";\n      }\n\n      let tableP = document.getElementById(\"tableauP\");\n      let tableQ = document.getElementById(\"tableauQ\");\n      tableP.innerHTML = \"\";\n      tableQ.innerHTML = \"\";\n\n      for (let i = 0; i < P.tableau.length; ++i) {\n        let trP = document.createElement(\"tr\");\n        let trQ = document.createElement(\"tr\");\n\n        for (let j = 0; j < P.tableau[i].length; ++j) {\n          let tdP = document.createElement(\"td\");\n          tdP.innerHTML = P.tableau[i][j];\n          trP.appendChild(tdP);\n          let tdQ = document.createElement(\"td\");\n          tdQ.innerHTML = Q.tableau[i][j];\n          trQ.appendChild(tdQ);\n        }\n\n        tableP.appendChild(trP);\n        tableQ.appendChild(trQ);\n      }\n    });\n  }\n\n}\n\n//# sourceURL=webpack://rsk/./js/application.js?");

/***/ }),

/***/ "./js/contingencyTable.js":
/*!********************************!*\
  !*** ./js/contingencyTable.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ContingencyTable)\n/* harmony export */ });\n/* harmony import */ var _tableau__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableau */ \"./js/tableau.js\");\n\nclass ContingencyTable {\n  constructor(n, m) {\n    this.table = [];\n\n    for (let i = 0; i < n; ++i) {\n      this.table.push(Array.from({\n        length: m\n      }, () => 0));\n    }\n\n    this.rows = n;\n    this.columns = m;\n  }\n\n  printTable() {\n    console.log(this.table);\n  }\n\n  increment(i, j) {\n    ++this.table[i][j];\n  }\n\n  decrement(i, j) {\n    --this.table[i][j];\n  }\n\n  semistandardTableauxFromCT() {\n    let array = this.compute2dArray(); // array[0] is for P, array[1] for Q\n\n    console.log(array);\n    let P = new _tableau__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    let Q = new _tableau__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n    for (let i = 0; i < array.length; ++i) {\n      // insert array[i][0] into P\n      let pos = P.rowBump(array[i][0]);\n      console.log(\"added \" + array[i][0]);\n      console.log(\"at \" + pos);\n      Q.addBoxAt(pos, array[i][1]);\n    }\n\n    return [P, Q];\n  }\n\n  compute2dArray() {\n    let array = [];\n\n    for (let i = 0; i < this.table.length; ++i) {\n      for (let j = 0; j < this.table[0].length; ++j) {\n        for (let amount = 0; amount < this.table[i][j]; ++amount) {\n          array.push([i + 1, j + 1]);\n        }\n      }\n    }\n\n    array.sort((a, b) => a[1] - b[1]); // don't know if this is the most useful shape\n\n    return array;\n  }\n\n  computeRowSums() {\n    let rowSums = [];\n\n    for (let i = 0; i < this.table.length; ++i) {\n      rowSums.push(this.table[i].reduce((a, b) => a + b, 0));\n    }\n  }\n\n  computeColSums() {\n    let colSums = [];\n\n    for (let j = 0; j < this.contingencyTable[0].length; ++j) {\n      let sum = 0;\n\n      for (let i = 0; i < this.contingencyTable.length; ++i) {\n        sum += this.contingencyTable[i][j];\n      }\n\n      colSums.push(sum);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://rsk/./js/contingencyTable.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ \"./js/application.js\");\n\nlet app = new _application__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\napp.start();\n\n//# sourceURL=webpack://rsk/./js/index.js?");

/***/ }),

/***/ "./js/tableau.js":
/*!***********************!*\
  !*** ./js/tableau.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ YoungTableu)\n/* harmony export */ });\nclass YoungTableu {\n  constructor(shape = [], content = []) {\n    this.shape = shape;\n    this.content = content;\n    this.tableau = [[]];\n  }\n\n  rowBump(val) {\n    this.content.push(val);\n\n    if (this.tableau[0].length == 0) {\n      this.tableau[0].push(val);\n      return [0, 0];\n    }\n\n    let pos = this.tableau[0].length - 1;\n\n    if (this.tableau[0][pos] <= val) {\n      this.tableau[0].push(val);\n      return [0, pos + 1];\n    }\n\n    let toBump = val;\n\n    for (let i = 0; i < this.tableau.length; ++i) {\n      let j = this.tableau[i].length - 1;\n\n      if (toBump >= this.tableau[i][j]) {\n        this.tableau[i].push(toBump);\n        ++this.shape[i];\n        return [i, j + 1];\n      } else {\n        --j;\n\n        for (; j >= -1; --j) {\n          if (j == -1 || toBump >= this.tableau[i][j]) {\n            let bumpOut = this.tableau[i][j + 1];\n            this.tableau[i][j + 1] = toBump;\n            toBump = bumpOut;\n            break;\n          }\n        }\n      }\n    } // if we arrive here, we have to add a new row to the tableau\n\n\n    this.tableau.push([toBump]);\n    this.shape.push(1);\n    return [this.tableau.length - 1, 0]; // TODO check if this is the right return\n  }\n\n  addBoxAt(index, val = 0) {\n    let row = index[0];\n    let col = index[1];\n\n    if (this.tableau.length < row) {\n      console.error(\"can't add box\");\n    } else if (this.tableau.length == row) {\n      this.tableau.push([]);\n      this.shape.push(1);\n    }\n\n    if (this.tableau[row].length < col) {\n      console.error(\"can't add box\");\n    } else if (this.tableau[row].length == col) {\n      this.tableau[row].push(val);\n      ++this.shape[row];\n    }\n  }\n\n}\n\n//# sourceURL=webpack://rsk/./js/tableau.js?");

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