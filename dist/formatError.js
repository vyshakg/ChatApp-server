'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = e => {
  const result = [];
  if (e.name === 'ValidationError') {
    if (e.isJoi) {
      // eslint-disable-next-line array-callback-return
      Object.values(e.details).map(err => {
        const obj = _lodash2.default.pick(err, ['path', 'message']);
        result.push({
          path: obj.path[0],
          message: obj.message
        });
      });
    } else {
      Object.values(e.errors).map(err => result.push(_lodash2.default.pick(err, ['path', 'message'])));
    }
  } else if (e.extensions.code === 'UNAUTHENTICATED') {
    result.push({
      path: 'global',
      message: 'Incorrect email or password. Please try again.'
    });
  }
  return result;
};