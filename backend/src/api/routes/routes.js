const express = require('express');
const router = express.Router();

const authRoutes = require('./auth_routes');
const userRoutes = require('./user_routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;