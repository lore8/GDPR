const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionResponseSchema = new mongoose.Schema(
  {
    id: { type: ObjectId, required: true },
    section: { type: String, required: true },
    question: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const FormResponseSchema = new mongoose.Schema({
  company: { type: String, required: false },
  employees: { type: String, required: false },
  email: { type: String, required: false },
  questions: [QuestionResponseSchema],
  createdAt: { type: Date, default: Date.now },
  prompt_tokens: { type: Number, required: false },
  completion_tokens: { type: Number, required: false },
  total_tokens: { type: Number, required: false },
  completion: { type: Object, required: false },
  prompt: { type: String, required: false },
});

module.exports = mongoose.model("FormResponse", FormResponseSchema);
