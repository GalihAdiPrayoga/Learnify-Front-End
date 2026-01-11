import { motion } from "framer-motion";
import SuccessImg from "@/assets/Success.svg";

export default function ResultSummary({ hasil, passed }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-lg p-8 text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <div className="flex justify-center">
          <img
            src={SuccessImg}
            alt="Result"
            className="w-64 h-64 object-contain"
          />
        </div>

        <h2 className="text-6xl font-extrabold mt-4 mb-2 text-gray-900">
          {hasil.nilai}
        </h2>

        <p className="text-lg font-semibold text-gray-600 mb-1">
          Kamu berhasil menjawab {hasil.jumlah_benar} benar dari{" "}
          {hasil.jumlah_soal} soal
        </p>

        <p className={`mt-2 text-2xl font-bold text-gray-700`}>
          {passed ? "Selamat! Anda Lulus" : "Tetap semangat, coba lagi!"}
        </p>
      </div>
    </motion.div>
  );
}
