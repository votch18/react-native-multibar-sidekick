"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get('screen'),
    screenWidth = _Dimensions$get.width;

var styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    justifyContent: 'flex-end'
  }
});