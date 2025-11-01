class User {
    constructor(uid, nama_lengkap, program_studi, semester, tujuan_karir, opsional_karir, karakteristik, deskripsi, createdAt, updatedAt ) {
        this.uid = uid;
        this.nama_lengkap = nama_lengkap;
        this.program_studi = program_studi;
        this.semester = semester;
        this.tujuan_karir = tujuan_karir;
        this.opsional_karir = opsional_karir;
        this.karakteristik = karakteristik;
        this.deskripsi = deskripsi;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromFirebase(userDoc) {
        const uid = userDoc.id;
        const userRecord = userDoc.data() || {};
        return new User(
            uid,
            userRecord.nama_lengkap || null,
            userRecord.program_studi || null,
            userRecord.semester || null,
            userRecord.tujuan_karir || null,
            userRecord.opsional_karir || null,
            userRecord.karakteristik || null,
            userRecord.deskripsi || null,
            userRecord.createdAt ? userRecord.createdAt.toDate() : new Date(),
            userRecord.updatedAt ? userRecord.updatedAt.toDate() : new Date()
        );
    }
}

module.exports = User;