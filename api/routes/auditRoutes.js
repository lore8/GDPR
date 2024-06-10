const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");

router.post("/audit", auditController.createAudit);

module.exports = router;
