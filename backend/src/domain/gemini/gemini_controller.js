const gemini = require('../../api/gemini/gemini');

async function analyzeMiniQuiz(req, res) {
    try {
        const uid = req.user.uid;
        const quizResponses = req.body;
        const analysis = await gemini.analyzeMiniQuiz(quizResponses, uid);
        res.status(200).json({ analysis });
    } catch (error) {
        console.error('Error analyzing mini quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function generateRoadmap(req, res) {
    try {
        const uid = req.user.uid;
        const roadmap = await gemini.generateRoadmap(uid);
        res.status(200).json({ roadmap });
    } catch (error) {
        console.error('Error generating roadmap:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function generateKarirs(req, res) {
    try {
        const uid = req.user.uid;
        const karirs = await gemini.generateKarirs(uid);
        res.status(200).json({ karirs });
    } catch (error) {
        console.error('Error generating karirs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { analyzeMiniQuiz, generateRoadmap, generateKarirs };