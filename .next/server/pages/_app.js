/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./getLibrary.ts":
/*!***********************!*\
  !*** ./getLibrary.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getLibrary)\n/* harmony export */ });\n/* harmony import */ var _ethersproject_providers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/providers */ \"@ethersproject/providers\");\n/* harmony import */ var _ethersproject_providers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ethersproject_providers__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction getLibrary(provider) {\n    return new _ethersproject_providers__WEBPACK_IMPORTED_MODULE_0__.Web3Provider(provider, 'any');\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9nZXRMaWJyYXJ5LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUl1RDtBQUV4QyxRQUFRLENBQUNDLFVBQVUsQ0FDaENDLFFBQTZDLEVBQzdDLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDRixrRUFBWSxDQUFDRSxRQUFRLEVBQUMsQ0FBSztBQUN4QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC13ZWIzLWJvaWxlcnBsYXRlLy4vZ2V0TGlicmFyeS50cz8yNGQ1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcbiAgRXh0ZXJuYWxQcm92aWRlcixcbiAgSnNvblJwY0ZldGNoRnVuYyxcbn0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHsgV2ViM1Byb3ZpZGVyIH0gZnJvbSBcIkBldGhlcnNwcm9qZWN0L3Byb3ZpZGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMaWJyYXJ5KFxuICBwcm92aWRlcjogRXh0ZXJuYWxQcm92aWRlciB8IEpzb25ScGNGZXRjaEZ1bmNcbikge1xuICByZXR1cm4gbmV3IFdlYjNQcm92aWRlcihwcm92aWRlciwnYW55Jyk7XG59XG5cbiJdLCJuYW1lcyI6WyJXZWIzUHJvdmlkZXIiLCJnZXRMaWJyYXJ5IiwicHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./getLibrary.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web3-react/core */ \"@web3-react/core\");\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _getLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getLibrary */ \"./getLibrary.ts\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction NextWeb3App({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_web3_react_core__WEBPACK_IMPORTED_MODULE_1__.Web3ReactProvider, {\n        getLibrary: _getLibrary__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        __source: {\n            fileName: \"/Users/friba/projects/lime-bridge-ui/pages/_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 5\n        },\n        __self: this,\n        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {\n            ...pageProps,\n            __source: {\n                fileName: \"/Users/friba/projects/lime-bridge-ui/pages/_app.tsx\",\n                lineNumber: 9,\n                columnNumber: 7\n            },\n            __self: this\n        })\n    }));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextWeb3App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBb0Q7QUFFZDtBQUNSO1NBRXJCRSxXQUFXLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEdBQUVDLFNBQVMsRUFBVyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxNQUFNLHNFQUNISiwrREFBaUI7UUFBQ0MsVUFBVSxFQUFFQSxtREFBVTs7Ozs7Ozt1RkFDdENFLFNBQVM7ZUFBS0MsU0FBUzs7Ozs7Ozs7O0FBRzlCLENBQUM7QUFFRCxpRUFBZUYsV0FBVyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC13ZWIzLWJvaWxlcnBsYXRlLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWIzUmVhY3RQcm92aWRlciB9IGZyb20gXCJAd2ViMy1yZWFjdC9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgZ2V0TGlicmFyeSBmcm9tIFwiLi4vZ2V0TGlicmFyeVwiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5cbmZ1bmN0aW9uIE5leHRXZWIzQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8V2ViM1JlYWN0UHJvdmlkZXIgZ2V0TGlicmFyeT17Z2V0TGlicmFyeX0+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9XZWIzUmVhY3RQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV4dFdlYjNBcHA7XG4iXSwibmFtZXMiOlsiV2ViM1JlYWN0UHJvdmlkZXIiLCJnZXRMaWJyYXJ5IiwiTmV4dFdlYjNBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@ethersproject/providers":
/*!*******************************************!*\
  !*** external "@ethersproject/providers" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@ethersproject/providers");

/***/ }),

/***/ "@web3-react/core":
/*!***********************************!*\
  !*** external "@web3-react/core" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@web3-react/core");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();