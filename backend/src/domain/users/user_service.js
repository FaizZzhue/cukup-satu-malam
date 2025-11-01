const userRepository = require('./user_repository');

async function getUserById(uid) {
    return await userRepository.getUserById(uid);
}

async function createUser(user, uid) {
    return await userRepository.createUser(user, uid);
}

async function updateUser(newUser, uid) {
    return await userRepository.updateUser(newUser, uid);
}

module.exports = { getUserById, createUser, updateUser };