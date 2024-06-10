const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questionsController");

router.get("/result/:id", questionsController.getResult);
router.post("/questions", questionsController.postQuestions);

module.exports = router;
