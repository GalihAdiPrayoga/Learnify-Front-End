import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/button";
import Alert from "@/components/alert";

export default function MaterialNavigatorView({
  prevMaterial,
  nextMaterial,
  onPrev,
  onNext,
  onDirectExam,
  hasSoal,
  soalCount,
  loading,
  showExamAlert,
  showStartExamAlert,
  setShowExamAlert,
  setShowStartExamAlert,
  onConfirmExam,
  onSkipExam,
  onConfirmStartExam,
}) {
  return (
    <>
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        {prevMaterial ? (
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded"
          >
            <Button
              onClick={onPrev}
              variant="primary"
              className="flex items-center gap-2 px-4 py-2"
            >
              <ArrowLeft size={16} /> Materi Sebelumnya
            </Button>
          </motion.div>
        ) : (
          <div />
        )}

        <div className="flex gap-3">
          {hasSoal && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded"
            >
              <Button
                onClick={() => setShowStartExamAlert(true)}
                variant="success"
                className="flex items-center gap-2 px-4 py-2"
              >
                Kerjakan Ujian
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {nextMaterial && !hasSoal && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded"
            >
              <Button
                onClick={onNext}
                variant="primary"
                loading={loading}
                className="flex items-center gap-2 px-4 py-2"
              >
                Materi Selanjutnya
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Direct exam confirmation */}
      <Alert
        open={showStartExamAlert}
        title="Mulai Ujian?"
        message={`Anda akan memulai ujian dengan ${soalCount} soal. Pastikan Anda siap sebelum memulai.`}
        type="warning"
        confirmText="Mulai Ujian"
        cancelText="Batal"
        onConfirm={() => {
          setShowStartExamAlert(false);
          onConfirmStartExam();
        }}
        onCancel={() => setShowStartExamAlert(false)}
      />

      {/* Exam available before navigating */}
      <Alert
        open={showExamAlert}
        title="Ujian Tersedia"
        message={`Materi ini memiliki ${soalCount} soal ujian. Apakah Anda ingin mengerjakan ujian sekarang sebelum lanjut ke materi berikutnya?`}
        type="info"
        confirmText="Kerjakan Ujian"
        cancelText="Lewati"
        onConfirm={() => {
          setShowExamAlert(false);
          onConfirmExam();
        }}
        onCancel={() => {
          setShowExamAlert(false);
          onSkipExam();
        }}
      />
    </>
  );
}
