"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MultiBarContext = require("./MultiBarContext");

Object.keys(_MultiBarContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MultiBarContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MultiBarContext[key];
    }
  });
});