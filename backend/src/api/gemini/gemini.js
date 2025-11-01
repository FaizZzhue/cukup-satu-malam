const userService = require('../../domain/users/user_service');
const apiKey = process.env.GEMINI_API_KEY;

let ai;
(async () => {
  const genai = await import('@google/genai');
  ai = new genai.GoogleGenAI({apiKey});
})();

const model = 'gemma-3-27b-it';

async function generateRoadmap(uid) {
    try {
        const user = await userService.getUserById(uid);
        if (!user) {
            throw new Error('User not found');
        }

        const prompt = `
            Anda adalah asisten karir akademik yang ahli dalam perencanaan pengembangan diri mahasiswa.

            Saya adalah mahasiswa dengan program studi ${user.program_studi}.
            Saya saat ini berada di semester ${user.semester}.
            Tujuan karir saya adalah ${user.tujuan_karir}.
            Saya memiliki karakteristik sebagai berikut:
            ${user.karakteristik}

            Berdasarkan informasi tersebut, buatkan saya roadmap pembelajaran yang terstruktur, bertahap, dan realistis untuk mencapai tujuan karir saya yaitu ${user.tujuan_karir}.
            Roadmap harus berisi langkah-langkah yang relevan dengan konteks mahasiswa Indonesia, mencakup:
            1. Pembelajaran akademik (kursus, mata kuliah, proyek)
            2. Pengalaman non-akademik (organisasi, magang, kegiatan sosial)
            3. Pengembangan skill pendukung (hard dan soft skill)
            4. Rekomendasi sertifikasi atau portofolio yang perlu disiapkan

            Buat roadmap dalam format poin-poin dengan penomoran berurutan dari awal hingga akhir perjalanan.
            Berikan tag <ENDL> setiap kali berpindah ke poin baru.
            Gunakan bahasa yang ringkas, jelas, dan mudah dipahami mahasiswa.
            Jangan gunakan format tebal, miring, atau simbol apapun.
        `;

        const answer = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return answer.text;
    } catch (error) {
        console.error('Error generating roadmap:', error);
        throw error;
    }
}

async function analyzeMiniQuiz(quizResponses, uid) {
    try {
        const prompt = `
            Anda adalah seorang psikolog karir digital yang ahli dalam menganalisis kepribadian, gaya belajar, dan potensi mahasiswa berdasarkan hasil tes reflektif.

            Berikut adalah hasil mini quiz karakteristik mahasiswa saya.  
            Setiap soal mencerminkan aspek kepribadian yang berbeda (gaya belajar, peran dalam tim, motivasi, nilai pribadi, minat karir, dan preferensi lingkungan kerja).

            Daftar pertanyaan dan jawaban saya:
            1. Saat belajar hal baru, saya lebih suka... = ${quizResponses[0]}
            2. Dalam tim, saya biasanya berperan sebagai... = ${quizResponses[1]}
            3. Saya merasa paling termotivasi ketika... = ${quizResponses[2]}
            4. Dalam menghadapi masalah, saya cenderung... = ${quizResponses[3]}
            5. Saya lebih nyaman bekerja dalam lingkungan... = ${quizResponses[4]}
            6. Saya lebih menyukai aktivitas yang... = ${quizResponses[5]}
            7. Ketika mendapat tugas baru, saya... = ${quizResponses[6]}
            8. Saya paling percaya bahwa kesuksesan datang dari... = ${quizResponses[7]}
            9. Saat menghadapi tekanan atau deadline, saya... = ${quizResponses[8]}
            10. Jika saya diberi pilihan kegiatan tambahan, saya akan memilih... = ${quizResponses[9]}

            Berdasarkan kombinasi semua jawaban tersebut, analisis dan tuliskan deskripsi karakteristik saya dalam satu paragraf saja, dengan kalimat yang diawali oleh frasa “Saya adalah…”, yang mencakup:
            - Gaya belajar dan cara berpikir saya,
            - Kekuatan utama saya,
            - Aspek yang perlu dikembangkan,
            - Dan tipe lingkungan kerja yang paling sesuai bagi saya.

            Gunakan bahasa yang positif, profesional, dan mudah dipahami mahasiswa.
            Hasil akhir harus hanya satu paragraf tanpa penomoran, poin, atau format tambahan.
        `;

        const answer = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        await userService.updateUser({ karakteristik: answer.text }, uid);
        return answer.text;
    } catch (error) {
        console.error('Error analyzing mini quiz:', error);
        throw error;
    }
}

async function generateKarirs(uid) {
    try {
        const user = await userService.getUserById(uid);
        if (!user) {
            throw new Error('User not found');
        }
        const prompt = `
            Anda adalah konsultan karir yang membantu mahasiswa menentukan arah profesinya secara spesifik dan realistis.

            Saya adalah mahasiswa dengan program studi ${user.program_studi}.
            Saya saat ini berada di semester ${user.semester}.
            Saya memiliki karakteristik sebagai berikut:
            ${user.karakteristik}

            Berdasarkan informasi tersebut, buatkan saya daftar tujuan karir yang spesifik, realistis, dan sesuai dengan latar belakang saya.
            Berikan sampai 5 rekomendasi tujuan karir yang paling relevan dengan potensi dan bidang studi saya.

            Pisahkan setiap tujuan karir dengan tanda koma.
            Pastikan hasilnya dalam satu kalimat yang hanya berisi daftar tujuan karir tanpa penjelasan tambahan.
            Untuk nama karir gunakan Bahasa Inggris.
        `;

        const answer = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return answer.text.split(',').map(career => career.trim());
    } catch (error) {
        console.error('Error generating career goals:', error);
        throw error;
    }
}

module.exports = { generateRoadmap, analyzeMiniQuiz, generateKarirs };