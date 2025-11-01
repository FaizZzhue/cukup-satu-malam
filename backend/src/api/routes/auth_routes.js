const express = require('express');
const router = express.Router();
const authController = require('../../domain/auth/auth_controller');

router.post('/verify', async (req, res) => {
    await authController.verifyToken(req, res);
    res.status(200).json({ message: 'Verification successful' });
});

module.exports = router;