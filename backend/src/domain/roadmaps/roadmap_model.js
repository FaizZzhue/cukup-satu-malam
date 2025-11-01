class Roadmap {
    constructor(id, roadmapDetails, createdAt, updatedAt) {
        this.id = id;
        this.roadmapDetails = roadmapDetails;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromFirebase(roadmapRecord) {
        return new Roadmap(
            roadmapRecord.id,
            roadmapRecord.roadmapDetails || [],
            roadmapRecord.createdAt ? roadmapRecord.createdAt.toDate() : new Date(),
            roadmapRecord.updatedAt ? roadmapRecord.updatedAt.toDate() : new Date()
        );
    }
}

module.exports = Roadmap;