const User = require('./user_model');
const { db } = require('../../config/firebase');

async function getUserById(uid) {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
        throw new Error('User not found');
    }
    return User.fromFirebase(userDoc.data());
}

async function createUser(user, uid) {
    await db.collection('users').doc(uid).set({
        nama_lengkap: user.nama_lengkap,
        program_studi: user.program_studi,
        semester: user.semester,
        tujuan_karir: user.tujuan_karir || "",
        opsional_karir: user.opsional_karir || [],
        karakteristik: user.karakteristik || "",
        deskripsi: user.deskripsi || ""
    });
}

async function updateUser(newUser, uid) {
    const user = await getUserById(uid);
    await db.collection('users').doc(uid).update({
        nama_lengkap: newUser.nama_lengkap || user.nama_lengkap,
        program_studi: newUser.program_studi || user.program_studi,
        semester: newUser.semester || user.semester,
        tujuan_karir: newUser.tujuan_karir || user.tujuan_karir,
        opsional_karir: newUser.opsional_karir || user.opsional_karir,
        karakteristik: newUser.karakteristik || user.karakteristik,
        deskripsi: newUser.deskripsi || user.deskripsi
    });
}

module.exports = { getUserById, createUser, updateUser };