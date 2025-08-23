"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomTabBarWrapper = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _MultiBarOverlay = require("../MultiBarOverlay");

var _Styles = require("./Styles");

var _context = require("../../context");

var BottomTabBarWrapper = exports.BottomTabBarWrapper = function BottomTabBarWrapper(_ref) {
  var children = _ref.children,
      params = _ref.params;

  var _React$useContext = React.useContext(_context.MultiBarContext),
      extrasVisible = _React$useContext.extrasVisible;

  return /*#__PURE__*/React.createElement(_reactNative.View, {
    pointerEvents: "box-none",
    style: [_Styles.styles.container, extrasVisible ? {
      backgroundColor: 'white'
    } : {
      backgroundColor: 'transparent'
    }]
  }, /*#__PURE__*/React.createElement(_MultiBarOverlay.MultiBarOverlay, {
    params: params
  }), children);
};