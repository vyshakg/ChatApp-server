"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require("../models");

exports.default = async id => {
  const allConversation = await _models.Conversation.find({ participants: id }).populate({
    path: "participants"
  }).exec();
  // eslint-disable-next-line array-callback-return
  allConversation.map(conversation => {
    const filterParticipants = conversation.participants.filter(participant => {
      if (participant.id === id) return false;
      return true;
    });
    conversation.participants = filterParticipants; // eslint-disable-line no-param-reassign
  });

  return allConversation;
};