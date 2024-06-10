const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  question: { type: String, required: true },
  article: { type: String, required: true },
});
module.exports = mongoose.model("Question", QuestionSchema);
