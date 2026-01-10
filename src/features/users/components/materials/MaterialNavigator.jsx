import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import Button from "@/components/button";
import Alert from "@/components/alert";
import { soalApi } from "@/services/api/soal.api";
import { toast } from "react-hot-toast";

const MaterialNavigator = ({
  prevMaterial,
  nextMaterial,
  onNavigate,
  onStartExam,
  currentMaterialId,
}) => {
  const [showExamAlert, setShowExamAlert] = useState(false);
  const [showStartExamAlert, setShowStartExamAlert] = useState(false);
  const [checkingSoal, setCheckingSoal] = useState(false);
  const [hasSoal, setHasSoal] = useState(false);
  const [soalCount, setSoalCount] = useState(0);

  // Check if current material has soal on mount
  useEffect(() => {
    const checkCurrentMaterialSoal = async () => {
      if (!currentMaterialId) return;

      console.log("🔍 Checking soal for material:", currentMaterialId);

      try {
        const response = await soalApi.checkSoalExists(currentMaterialId);
        console.log("📝 Soal API Response:", response);

        const soalList = response?.data?.data ?? response?.data ?? [];
        console.log("📋 Soal List:", soalList);
        console.log("📊 Soal Count:", soalList.length);

        const hasSoalValue = Array.isArray(soalList) && soalList.length > 0;
        setHasSoal(hasSoalValue);
        setSoalCount(soalList.length);

        console.log("✅ Has Soal:", hasSoalValue);
      } catch (err) {
        console.error("❌ Error checking soal:", err);
        console.error("Error response:", err.response);
        setHasSoal(false);
        setSoalCount(0);
      }
    };

    checkCurrentMaterialSoal();
  }, [currentMaterialId]);

  const handleNextClick = async () => {
    if (!nextMaterial) return;

    console.log("🔘 Next button clicked");
    console.log("Has soal:", hasSoal);
    console.log("Soal count:", soalCount);

    // If current material has soal, show exam alert
    if (hasSoal && soalCount > 0) {
      console.log("🎯 Showing exam alert");
      setShowExamAlert(true);
    } else {
      console.log("⏭️ No exam, navigating to next material");
      onNavigate(nextMaterial.id);
    }
  };

  const handleDirectExamClick = () => {
    console.log("🎯 Direct exam button clicked");
    setShowStartExamAlert(true);
  };

  const handleConfirmStartExam = () => {
    console.log("✅ User confirmed to start exam directly");
    setShowStartExamAlert(false);
    if (onStartExam) {
      onStartExam(currentMaterialId);
    }
  };

  const handleConfirmExam = () => {
    console.log("✅ User confirmed to take exam from next button");
    setShowExamAlert(false);
    if (onStartExam) {
      onStartExam(currentMaterialId);
    }
  };

  const handleSkipExam = () => {
    console.log("⏭️ User skipped exam");
    setShowExamAlert(false);
    toast.info("Anda melewati ujian. Anda dapat mengerjakan nanti.");
    if (nextMaterial) {
      onNavigate(nextMaterial.id);
    }
  };

  // Show "Kerjakan Ujian" button if current material has soal
  const showExamButton = hasSoal && soalCount > 0;

  console.log("🎨 Rendering MaterialNavigator:", {
    currentMaterialId,
    hasSoal,
    soalCount,
    showExamButton,
    prevMaterial: prevMaterial?.id,
    nextMaterial: nextMaterial?.id,
  });

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
              onClick={() => onNavigate(prevMaterial.id)}
              variant="primary"
              className="flex items-center gap-2 px-4 py-2"
            >
              <ArrowLeft size={16} />
              Materi Sebelumnya
            </Button>
          </motion.div>
        ) : (
          <div />
        )}

        <div className="flex gap-3">
          {/* Show exam button if current material has soal */}
          {showExamButton && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded"
            >
              <Button
                onClick={handleDirectExamClick}
                variant="success"
                className="flex items-center gap-2 px-4 py-2"
              >
                Kerjakan Ujian
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {/* only show next button when there is a nextMaterial AND current material has NO soal */}
          {nextMaterial && !hasSoal && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded"
            >
              <Button
                onClick={handleNextClick}
                variant="primary"
                loading={checkingSoal}
                className="flex items-center gap-2 px-4 py-2"
              >
                Materi Selanjutnya
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Alert untuk klik direct button "Kerjakan Ujian" */}
      <Alert
        open={showStartExamAlert}
        title="Mulai Ujian?"
        message={`Anda akan memulai ujian dengan ${soalCount} soal. Waktu ujian adalah 30 menit. Pastikan Anda siap sebelum memulai.`}
        type="warning"
        confirmText="Mulai Ujian"
        cancelText="Batal"
        onConfirm={handleConfirmStartExam}
        onCancel={() => setShowStartExamAlert(false)}
      />

      {/* Alert untuk navigasi ke materi berikutnya (ada ujian) */}
      <Alert
        open={showExamAlert}
        title="Ujian Tersedia"
        message={`Materi ini memiliki ${soalCount} soal ujian. Apakah Anda ingin mengerjakan ujian sekarang sebelum lanjut ke materi berikutnya?`}
        type="info"
        confirmText="Kerjakan Ujian"
        cancelText="Lewati"
        onConfirm={handleConfirmExam}
        onCancel={handleSkipExam}
      />
    </>
  );
};

export default MaterialNavigator;
