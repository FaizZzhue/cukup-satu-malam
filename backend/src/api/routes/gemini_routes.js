const express = require('express');
const router = express.Router();
const geminiController = require('../../domain/gemini/gemini_controller');
const { authenticate } = require('../../middlewares/auth_middleware');

router.post('/analyze-mini-quiz', authenticate, geminiController.analyzeMiniQuiz);
router.get('/generate-roadmap', authenticate, geminiController.generateRoadmap);
router.get('/generate-karirs', authenticate, geminiController.generateKarirs);

module.exports = router;