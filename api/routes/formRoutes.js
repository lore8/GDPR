const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.get("/form", formController.getForm);

module.exports = router;
