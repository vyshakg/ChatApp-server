'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SECRET = 'secretkey';
const { Schema } = _mongoose2.default;
const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.` // TODO: security
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken.` // TODO: security
    }
  },
  phoneNo: String,
  password: String,
  online: {
    type: Boolean,
    default: false
  },
  profilePic: {
    type: Schema.Types.ObjectId,
    ref: 'ProfilePic'
  }
}, {
  timestamps: true
});

// eslint-disable-next-line
userSchema.pre('save', async function () {
  this.password = await (0, _bcryptjs.hash)(this.password, 10);
});

userSchema.statics.doesntExist = async function doesntExist(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function matchesPassword(password) {
  return (0, _bcryptjs.compare)(password, this.password);
};

userSchema.methods.createToken = function createToken() {
  return _jsonwebtoken2.default.sign({
    email: this.email,
    id: this._id // eslint-disable-line no-underscore-dangle
  }, SECRET);
};

const User = _mongoose2.default.model('User', userSchema);

exports.default = User;