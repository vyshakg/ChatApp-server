'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _profilePic = require('./models/profilePic');

var _profilePic2 = _interopRequireDefault(_profilePic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const absPath = _path2.default.join(__dirname, 'images');

const startFunction = async () => {
  const imagePathArray = [];
  await _profilePic2.default.deleteMany({});
  _fs2.default.readdirSync(absPath).forEach(file => {
    imagePathArray.push({ img: _fs2.default.readFileSync(`${absPath}/${file}`) });
  });

  await _profilePic2.default.insertMany(imagePathArray);
};
exports.default = startFunction;