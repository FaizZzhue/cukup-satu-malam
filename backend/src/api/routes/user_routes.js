const express = require('express');
const router = express.Router();
const userController = require('../../domain/users/user_controller');
const { authenticate } = require('../../middlewares/auth_middleware');

router.use(authenticate);


router.get('/:uid', async (req, res) => {
    await userController.getUserById(req, res);
});

router.post('/', async (req, res) => {
    await userController.createUser(req, res);
});

router.put('/:uid', async (req, res) => {
    await userController.updateUser(req, res);
});

module.exports = router;