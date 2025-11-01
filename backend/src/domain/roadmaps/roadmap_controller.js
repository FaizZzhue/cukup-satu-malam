const roadmapService = require('./roadmap_service');

async function getRoadmapById(req, res) {
    const uid = req.params.id;
    const roadmap = await roadmapService.getRoadmapById(uid);
    res.json(roadmap);
}

async function createRoadmap(req, res) {
    try {
        const uid = req.user.uid;
        const newRoadmap = await roadmapService.createRoadmap(uid);
        res.status(201).json(newRoadmap);
    } catch (error) {
        console.error('Error creating roadmap:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateRoadmap(req, res) {
    try {
        const uid = req.user.id;
        const roadmapDetails = req.body;
        const updatedRoadmap = await roadmapService.updateRoadmap(roadmapDetails, uid);
        res.status(200).json(updatedRoadmap);
    } catch (error) {
        console.error('Error updating roadmap:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteRoadmap(req, res) {
    try {
        const uid = req.user.id;
        await roadmapService.deleteRoadmap(uid);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting roadmap:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getRoadmapById, createRoadmap, updateRoadmap, deleteRoadmap };