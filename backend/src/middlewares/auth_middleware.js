const { admin } = require('../config/firebase');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const bearer = authHeader.match(/^Bearer (.+)$/);
    const sessionCookie = req.cookies?.session || null;

    let decoded;
    if (bearer) {
      decoded = await admin.auth().verifyIdToken(bearer[1]);
    } else if (sessionCookie) {
      decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    } else {
      return res.status(401).json({ error: 'Missing token' });
    }

    req.user = { uid: decoded.uid, email: decoded.email || null, claims: decoded };
    next();
  } catch (e) {
    res.status(401).json({ error: `Invalid or expired token, ${e.message}` });
  }
}

module.exports = { authenticate };
