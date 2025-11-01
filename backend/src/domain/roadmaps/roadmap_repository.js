const Roadmap = require('./roadmap_model');
const { db } = require('../../config/firebase');

async function getRoadmapById(id) {
    const roadmapDoc = await db.collection('roadmaps').doc(id).get();
    return Roadmap.fromFirebase(roadmapDoc);
}

async function createRoadmap(roadmapData, uid) {
    const roadmapRef = await db.collection('roadmaps').doc(uid).set(roadmapData);
    return Roadmap.fromFirebase({ id: uid, ...roadmapData });
}

async function updateRoadmap(roadmapData, uid) {
    await db.collection('roadmaps').doc(uid).update(roadmapData);
    const updatedDoc = await db.collection('roadmaps').doc(id).get();
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