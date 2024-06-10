const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  question: { type: String, required: true },
  article: { type: String, required: true },
  type: { type: String, required: true },
});

const FormSchema = new mongoose.Schema({
  company: { type: String, required: false },
  employees: { type: Number, required: false },
  email: { type: String, required: false },
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Form", FormSchema);
