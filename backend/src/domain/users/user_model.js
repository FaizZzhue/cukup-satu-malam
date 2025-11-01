class User {
    constructor(uid, nama_lengkap, program_studi, semester, tujuan_karir, opsional_karir, karakteristik, deskripsi ) {
        this.uid = uid;
        this.nama_lengkap = nama_lengkap;
        this.program_studi = program_studi;
        this.semester = semester;
        this.tujuan_karir = tujuan_karir;
        this.opsional_karir = opsional_karir;
        this.karakteristik = karakteristik;
        this.deskripsi = deskripsi;
    }

    static fromFirebase(userRecord) {
        return new User(
            userRecord.uid,
            userRecord.nama_lengkap || null,
            userRecord.program_studi || null,
            userRecord.semester || null,
            userRecord.tujuan_karir || null,
            userRecord.opsional_karir || null,
            userRecord.karakteristik || null,
            userRecord.deskripsi || null
        );
    }
}

module.exports = User;