"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiBarButton = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _context = require("../../context");

var _Styles = require("./Styles");

var _FontAwesome = _interopRequireDefault(require("react-native-vector-icons/FontAwesome"));

// import  MaterialIcons from 'react-native-vector-icons';
var MultiBarButton = exports.MultiBarButton = function MultiBarButton(_ref) {
  var children = _ref.children,
      rotationDegrees = _ref.rotationDegrees,
      style = _ref.style,
      onPress = _ref.onPress;

  var _React$useContext = React.useContext(_context.MultiBarContext),
      extrasVisible = _React$useContext.extrasVisible,
      setExtrasVisible = _React$useContext.setExtrasVisible;

  var animated = React.useRef(new _reactNative.Animated.Value(0)).current;
  React.useEffect(function () {
    var animation = _reactNative.Animated.spring(animated, {
      toValue: extrasVisible ? 1 : 0,
      useNativeDriver: true
    });

    animation.start();
    return function () {
      return animation.stop();
    };
  }, [extrasVisible]);
  var handlePress = React.useCallback(function () {
    if (!onPress || !onPress()) {
      setExtrasVisible(!extrasVisible);
    }
  }, [extrasVisible]);
  var rotateZ = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', "".concat(rotationDegrees !== null && rotationDegrees !== void 0 ? rotationDegrees : 180, "deg")]
  });
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 0.9,
    onPress: handlePress
  }, !extrasVisible ? /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [_Styles.styles.contentContainer, {
      transform: [{
        rotateZ: rotateZ
      }]
    }, style]
  }, children) : /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [_Styles.styles.contentContainer, {
      transform: [{
        rotateZ: rotateZ
      }]
    }, style]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 55,
      height: 55,
      backgroundColor: '#3D5B81',
      borderRadius: 50
    }
  }, /*#__PURE__*/React.createElement(_FontAwesome["default"], {
    name: "times",
    size: 20,
    color: "white"
  }))));
};