const roadmapRepository = require('./roadmap_repository');
const gemini = require('../../api/gemini/gemini');

async function getRoadmapById(uid) {
    return await roadmapRepository.getRoadmapById(uid);
}

async function createRoadmap(uid) {
    const roadmapData = await gemini.generateRoadmap(uid);
    return await roadmapRepository.createRoadmap(roadmapData, uid);
}

async function updateRoadmap(newRoadmapData, uid) {
    return await roadmapRepository.updateRoadmap(newRoadmapData, uid);
}

async function deleteRoadmap(uid) {
    return await roadmapRepository.deleteRoadmap(uid);
}

module.exports = { getRoadmapById, createRoadmap, updateRoadmap, deleteRoadmap };