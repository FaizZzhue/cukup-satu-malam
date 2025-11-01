const { admin } = require('../../config/firebase');

async function verifyToken(idToken) {
    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        return { uid: decoded.uid, email: decoded.email || null };
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { verifyToken };