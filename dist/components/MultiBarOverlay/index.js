"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiBarOverlay = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _context = require("../../context");

var _Styles = require("./Styles");

var MultiBarOverlay = exports.MultiBarOverlay = function MultiBarOverlay(_ref) {
  var params = _ref.params;

  var _React$useContext = React.useContext(_context.MultiBarContext),
      data = _React$useContext.data,
      extrasVisible = _React$useContext.extrasVisible,
      overlayProps = _React$useContext.overlayProps,
      setExtrasVisible = _React$useContext.setExtrasVisible;

  var _React$useMemo = React.useMemo(function () {
    return Object.assign({
      expandingMode: 'staging',
      iconWidth: 30,
      iconHeight: 30,
      overlayWidth: 300,
      overlayHeight: 100,
      overlayBackground: 'transparent'
    }, overlayProps || {});
  }, [overlayProps]),
      expandingMode = _React$useMemo.expandingMode,
      iconWidth = _React$useMemo.iconWidth,
      iconHeight = _React$useMemo.iconHeight,
      overlayWidth = _React$useMemo.overlayWidth,
      overlayHeight = _React$useMemo.overlayHeight,
      overlayBackground = _React$useMemo.overlayBackground;

  var animations = React.useMemo(function () {
    return data.map(function () {
      return new _reactNative.Animated.Value(extrasVisible ? 1 : 0);
    });
  }, [data]);
  React.useEffect(function () {
    var animate = _reactNative.Animated.spring;
    var animationsList = animations.map(function (anim, idx) {
      return animate(anim, {
        toValue: extrasVisible ? 1 : 0,
        useNativeDriver: false
      });
    });
    var animator = expandingMode === 'staging' ? _reactNative.Animated.stagger(100, animationsList) : _reactNative.Animated.parallel(animationsList);
    animator.start();
    return function () {
      return animator.stop();
    };
  }, [extrasVisible]);
  var itemsList = React.useMemo(function () {
    return data.map(function (extrasRender, idx) {
      var handleTouchEnd = function handleTouchEnd() {
        setExtrasVisible(false);
      };

      var stepX = overlayWidth / (data.length + 1);
      var x = stepX * (idx + 1) - iconWidth / 2;
      var y = overlayHeight * 0.15;
      var left = animations[idx].interpolate({
        inputRange: [0, 1],
        outputRange: [(overlayWidth - iconWidth) / 2, x]
      });
      var top = animations[idx].interpolate({
        inputRange: [0, 1],
        outputRange: [overlayHeight, y]
      });
      return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
        key: "extra_item_".concat(idx),
        style: [_Styles.styles.itemContainer, {
          left: left,
          top: top,
          width: iconWidth,
          height: iconHeight,
          backgroundColor: overlayBackground || 'transparent'
        }],
        onTouchEnd: handleTouchEnd
      }, extrasRender({
        params: params
      }));
    });
  }, [animations, data, iconWidth, iconHeight, overlayHeight, overlayWidth]);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "box-none",
    style: [_Styles.styles.container, {
      width: overlayWidth,
      height: overlayHeight,
      backgroundColor: overlayBackground || 'transparent'
    }]
  }, itemsList);
};