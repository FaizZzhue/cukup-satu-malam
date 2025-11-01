"use client"

import { motion } from "framer-motion"

interface SelfAssessmentStepProps {
  assessment?: Record<number, string>
  setAssessment?: (value: Record<number, string>) => void
  onNext?: () => void
  onBack?: () => void
}

const QUESTIONS = [
  {
    question: "Saat belajar hal baru, saya lebih suka...",
    options: [
      "Belajar lewat praktik langsung",
      "Mendengarkan penjelasan orang lain",
      "Membaca dan menulis catatan sendiri",
      "Berdiskusi dan bertukar ide",
    ],
  },
  {
    question: "Dalam tim, saya biasanya berperan sebagai...",
    options: [
      "Pemimpin yang mengatur arah tim",
      "Pelaksana yang fokus menyelesaikan tugas",
      "Ideator yang memberi gagasan kreatif",
      "Pendengar dan penengah saat ada konflik",
    ],
  },
  {
    question: "Saya merasa paling termotivasi ketika...",
    options: [
      "Dapat mengembangkan kemampuan baru",
      "Mendapat pengakuan dari orang lain",
      "Bisa membantu atau berdampak pada orang lain",
      "Mendapat hasil yang konkret dan terukur",
    ],
  },
  {
    question: "Dalam menghadapi masalah, saya cenderung...",
    options: [
      "Analitis dan mencari akar masalah",
      "Kreatif mencari solusi alternatif",
      "Tenang dan menunggu waktu yang tepat",
      "Langsung bertindak untuk menyelesaikan",
    ],
  },
  {
    question: "Saya lebih nyaman bekerja dalam lingkungan...",
    options: [
      "Terstruktur dengan aturan jelas",
      "Fleksibel dan bebas bereksperimen",
      "Kolaboratif dengan banyak interaksi",
      "Mandiri tanpa banyak pengawasan",
    ],
  },
  {
    question: "Saya lebih menyukai aktivitas yang...",
    options: [
      "Berhubungan dengan teknologi dan data",
      "Melibatkan seni, desain, atau kreativitas",
      "Berfokus pada membantu atau mengajar orang lain",
      "Menantang kemampuan komunikasi dan kepemimpinan",
    ],
  },
  {
    question: "Ketika mendapat tugas baru, saya...",
    options: [
      "Langsung mencoba meski belum yakin",
      "Membaca panduan dulu dengan detail",
      "Bertanya pada teman atau dosen",
      "Menganalisis dulu agar tidak salah langkah",
    ],
  },
  {
    question: "Saya paling percaya bahwa kesuksesan datang dari...",
    options: [
      "Kerja keras dan disiplin",
      "Kreativitas dan inovasi",
      "Relasi dan kemampuan sosial",
      "Kesempatan dan keberanian mencoba",
    ],
  },
  {
    question: "Saat menghadapi tekanan atau deadline, saya...",
    options: [
      "Tetap fokus dan menyusun prioritas",
      "Menunda sebentar untuk menenangkan diri",
      "Mencari dukungan atau nasihat dari orang lain",
      "Bekerja lebih cepat meski stres meningkat",
    ],
  },
  {
    question: "Jika saya diberi pilihan kegiatan tambahan, saya akan memilih...",
    options: [
      "Magang di perusahaan atau instansi",
      "Mengikuti lomba dan proyek kreatif",
      "Bergabung dengan organisasi atau komunitas sosial",
      "Meneliti dan menulis karya ilmiah",
    ],
  },
]

export default function SelfAssessmentStep({
  assessment = {},
  setAssessment = () => {},
}: SelfAssessmentStepProps) {
  const handleSelect = (index: number, choice: string) => {
    setAssessment({ ...assessment, [index]: choice })
  }

  const answeredCount = Object.keys(assessment || {}).length
  const allAnswered = answeredCount === QUESTIONS.length

  return (
    <motion.div
      key="self-assessment"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.5 }}
      className="text-white"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold">🧩 Mini Quiz Karakteristik Mahasiswa</h2>
        <p className="text-white/70 text-sm mt-2">
          Jawab semua pertanyaan untuk mengetahui karakter dan preferensimu.
        </p>
      </div>

      {/* Scrollable area only */}
      <div className="space-y-6 max-h-[55vh] overflow-y-auto custom-scroll px-1">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="border-b border-white/10 pb-5 last:border-none">
            <p className="mb-3 text-sm font-semibold text-white/90">
              {i + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(i, opt)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all text-sm ${
                    assessment?.[i] === opt
                      ? "bg-blue-500/20 border-blue-400 text-blue-100"
                      : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress info only (no buttons) */}
      <div className="flex justify-center mt-5 text-xs text-white/60">
        Terjawab: {answeredCount} / {QUESTIONS.length}
      </div>
    </motion.div>
  )
}
