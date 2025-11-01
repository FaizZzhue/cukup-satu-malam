const express = require('express');
const router = express.Router();

const authRoutes = require('./auth_routes');
const userRoutes = require('./user_routes');
const roadmapRoutes = require('./roadmap_routes');
const geminiRoutes = require('./gemini_routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/gemini', geminiRoutes);

module.exports = router;