const express = require('express');
const router = express.Router();
const roadmapController = require('../../domain/roadmaps/roadmap_controller');
const { authenticate } = require('../../middlewares/auth_middleware');

router.use(authenticate);

router.get('/:id', async (req, res) => {
    await roadmapController.getRoadmapById(req, res);
});

router.post('/', async (req, res) => {
    await roadmapController.createRoadmap(req, res);
});

router.put('/:id', async (req, res) => {
    await roadmapController.updateRoadmap(req, res);
});

router.delete('/:id', async (req, res) => {
    await roadmapController.deleteRoadmap(req, res);
});

module.exports = router;
