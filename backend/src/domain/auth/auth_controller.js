const authService = require('./auth_service');

async function verifyToken(req, res) {
    try {
        const idToken = req.body.idToken;
        if (!idToken) {
            return res.status(400).json({ error: 'Token not provided' });
        }
        const user = await authService.verifyToken(idToken);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { verifyToken };