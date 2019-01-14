'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conversationSchema = new _mongoose2.default.Schema({
  participants: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const Conversation = _mongoose2.default.model('Conversation', conversationSchema);

exports.default = Conversation;