const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  lecturerId: {
    type: String
  }
});

module.exports = mongoose.model("Grade", gradeSchema);