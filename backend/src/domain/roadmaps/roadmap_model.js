class Roadmap {
    constructor(id, roadmapDetails, createdAt, updatedAt) {
        this.id = id;
        this.roadmapDetails = roadmapDetails;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromFirebase(roadmapDoc) {
        const uid = roadmapDoc.id;
        const roadmapRecord = roadmapDoc.data() || {};
        return new Roadmap(
            uid,
            roadmapRecord.roadmapDetails || [],
            roadmapRecord.createdAt ? roadmapRecord.createdAt.toDate() : new Date(),
            roadmapRecord.updatedAt ? roadmapRecord.updatedAt.toDate() : new Date()
        );
    }
}

module.exports = Roadmap;