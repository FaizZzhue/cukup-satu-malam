const authRepository = require('./auth_repository');

async function verifyToken(idToken) {
    return await authRepository.verifyToken(idToken);
}

module.exports = { verifyToken };