'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MONGOURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ChatApp';

exports.default = async () => {
  try {
    await _mongoose2.default.connect(MONGOURL, {
      useNewUrlParser: true
    });
  } catch (e) {
    console.log("Couldn't connect with Database", e);
  }
};