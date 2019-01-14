'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.signUp = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const email = _joi2.default.string().email().required().label('Email');

const username = _joi2.default.string().alphanum().min(4).max(30).required().label('Username');

const phoneNo = _joi2.default.string().min(10).max(30).required().label('PhoneNo');

const password = _joi2.default.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).required().label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least one lowercase letter, one uppercase letter, and one digit.'
      }
    }
  }
});

const signUp = exports.signUp = _joi2.default.object().keys({
  email,
  username,
  password,
  phoneNo
});

const signIn = exports.signIn = _joi2.default.object().keys({
  email,
  password
});