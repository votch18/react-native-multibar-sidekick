"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BottomTabBarWrapper = require("./BottomTabBarWrapper");

Object.keys(_BottomTabBarWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BottomTabBarWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BottomTabBarWrapper[key];
    }
  });
});

var _MultiBarButton = require("./MultiBarButton");

Object.keys(_MultiBarButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MultiBarButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MultiBarButton[key];
    }
  });
});

var _MultiBarOverlay = require("./MultiBarOverlay");

Object.keys(_MultiBarOverlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MultiBarOverlay[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MultiBarOverlay[key];
    }
  });
});