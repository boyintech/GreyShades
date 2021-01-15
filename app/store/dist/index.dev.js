"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _CartReducer = _interopRequireDefault(require("../reducers/CartReducer.js"));

var _DetailsReducer = _interopRequireDefault(require("../reducers/DetailsReducer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = store = (0, _redux.createStore)(_DetailsReducer["default"]);

exports["default"] = _default;