"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiBarProvider = exports.MultiBarContext = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var MultiBarContext = exports.MultiBarContext = /*#__PURE__*/React.createContext({});

var MultiBarProvider = exports.MultiBarProvider = function MultiBarProvider(_ref) {
  var children = _ref.children,
      data = _ref.data,
      _ref$initialExtrasVis = _ref.initialExtrasVisible,
      initialExtrasVisible = _ref$initialExtrasVis === void 0 ? false : _ref$initialExtrasVis,
      overlayProps = _ref.overlayProps;

  var _React$useState = React.useState(initialExtrasVisible),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      extrasVisible = _React$useState2[0],
      setExtrasVisible = _React$useState2[1];

  return /*#__PURE__*/React.createElement(MultiBarContext.Provider, {
    value: {
      data: data,
      extrasVisible: extrasVisible,
      setExtrasVisible: setExtrasVisible,
      overlayProps: overlayProps
    }
  }, children);
};