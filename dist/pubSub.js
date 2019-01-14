'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

const pubsub = new _graphqlSubscriptions.PubSub();
exports.default = pubsub;