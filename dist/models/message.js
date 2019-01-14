'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageSchema = new _mongoose2.default.Schema({
  conversationId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  from: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Message = _mongoose2.default.model('Message', messageSchema);

exports.default = Message;