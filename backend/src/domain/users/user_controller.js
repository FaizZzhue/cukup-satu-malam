const userService = require('./user_service');

async function getUserById(req, res) {
    try {
        const uid = req.user.uid;
        const user = await userService.getUserById(uid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const uid = req.user.uid;
        const userData = req.body;
        await userService.createUser(userData, uid);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const uid = req.user.uid;
        const newUserData = req.body;
        await userService.updateUser(newUserData, uid);
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getUserById, createUser, updateUser };