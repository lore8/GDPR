const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  employeeCount: { type: String, required: true },
  contactEmail: { type: String, required: true },
  consentCheck: { type: Boolean, required: true },
  section1Question1: { type: String, required: true },
});

module.exports = mongoose.model("Audit", AuditSchema);
