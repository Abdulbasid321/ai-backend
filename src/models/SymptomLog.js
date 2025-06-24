const mongoose = require('mongoose');

const SymptomLogSchema = new mongoose.Schema({
  userInput: String,
  aiResponse: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SymptomLog', SymptomLogSchema);
