'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProfilePicSchema = new _mongoose2.default.Schema({
  img: {
    type: Buffer
  }
});

const ProfilePic = _mongoose2.default.model('ProfilePic', ProfilePicSchema);

exports.default = ProfilePic;