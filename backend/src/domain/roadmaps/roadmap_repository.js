const Roadmap = require('./roadmap_model');
const { db } = require('../../config/firebase');

async function getRoadmapById(uid) {
    const roadmapDoc = await db.collection('roadmaps').doc(uid).get();
    return Roadmap.fromFirebase(roadmapDoc);
}

async function createRoadmap(roadmapData, uid) {
    await db.collection('roadmaps').doc(uid).set({ roadmapDetails: roadmapData});
    return await getRoadmapById(uid);
}

async function updateRoadmap(roadmapData, uid) {
    await db.collection('roadmaps').doc(uid).update(roadmapData);
    const updatedDoc = await db.collection('roadmaps').doc(uid).get();
    return Roadmap.fromFirebase(updatedDoc);
}

async function deleteRoadmap(uid) {
    await db.collection('roadmaps').doc(uid).delete();
    return { uid };
}

module.exports = {
    getRoadmapById,
    createRoadmap,
    updateRoadmap,
    deleteRoadmap
};