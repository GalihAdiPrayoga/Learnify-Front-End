import React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/button";

const ITEMS_PER_PAGE = 5;

export default function ExamQuestions({
  soalList = [],
  answers = {},
  currentPage = 0,
  setCurrentPage,
  onSelect,
}) {
  const totalPages = Math.max(1, Math.ceil(soalList.length / ITEMS_PER_PAGE));
  const start = currentPage * ITEMS_PER_PAGE;
  const pageSoals = soalList.slice(start, start + ITEMS_PER_PAGE);

  const goPrev = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">
          Menampilkan {start + 1} -{" "}
          {Math.min(start + ITEMS_PER_PAGE, soalList.length)} dari{" "}
          {soalList.length} soal
        </div>
        <div className="text-sm text-gray-500">
          Halaman {currentPage + 1} / {totalPages}
        </div>
      </div>

      {pageSoals.map((soal, idx) => (
        <motion.div
          key={soal.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {start + idx + 1}. {soal.pertanyaan}
            </h3>
            <div>
              {answers[soal.id] ? (
                <span className="inline-flex items-center gap-2 text-green-700">
                  <Check size={16} className="text-green-500" /> Terjawab
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-500">
                  <X size={16} className="text-red-400" /> Belum
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {["a", "b", "c", "d"].map((opt) => {
              const selected = answers[soal.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onSelect(soal.id, opt)}
                  className={`w-full text-left p-4 rounded-lg transition-all flex items-start gap-3 overflow-hidden ${
                    selected
                      ? "bg-linear-to-r from-indigo-600 via-indigo-700 to-blue-900 text-white shadow-md"
                      : "bg-white border border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      selected
                        ? "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {opt.toUpperCase()}
                  </div>
                  <div className="flex-1 text-sm">{soal[`jawaban_${opt}`]}</div>
                </button>
              );
            })}
          </div>
        </motion.div>
      ))}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-between border-t pt-4">
          <Button
            onClick={goPrev}
            variant="primary"
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2"
          >
            <ArrowLeft size={16} /> Sebelumnya
          </Button>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            Halaman {currentPage + 1} dari {totalPages}
          </div>

          <Button
            onClick={goNext}
            variant="primary"
            disabled={currentPage >= totalPages - 1}
            className="flex items-center gap-2 px-4 py-2"
          >
            Selanjutnya <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
