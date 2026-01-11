import React, { useState } from "react";
import { toast } from "react-hot-toast";
import MaterialNavigatorView from "./MaterialNavigator.view";
import { useMaterialExam } from "../../hooks/useMaterialExam";

const MaterialNavigator = ({
  prevMaterial,
  nextMaterial,
  onNavigate,
  onStartExam,
  currentMaterialId,
}) => {
  const { hasSoal, soalCount, loading } = useMaterialExam(currentMaterialId);

  const [showExamAlert, setShowExamAlert] = useState(false);
  const [showStartExamAlert, setShowStartExamAlert] = useState(false);

  const handlePrev = () => {
    if (prevMaterial) onNavigate(prevMaterial.id);
  };

  const handleNext = () => {
    if (!nextMaterial) return;
    if (hasSoal) {
      setShowExamAlert(true);
    } else {
      onNavigate(nextMaterial.id);
    }
  };

  const handleConfirmExam = () => {
    // user chooses to take exam before navigating
    setShowExamAlert(false);
    if (onStartExam) onStartExam(currentMaterialId);
  };

  const handleSkipExam = () => {
    // user skips exam and proceeds
    setShowExamAlert(false);
    toast.info("Anda melewati ujian. Anda dapat mengerjakan nanti.");
    if (nextMaterial) onNavigate(nextMaterial.id);
  };

  const handleConfirmStartExam = () => {
    setShowStartExamAlert(false);
    if (onStartExam) {
      onStartExam(currentMaterialId);
      // ensure destination page is scrolled to top after navigation
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <MaterialNavigatorView
      prevMaterial={prevMaterial}
      nextMaterial={nextMaterial}
      onPrev={handlePrev}
      onNext={handleNext}
      onDirectExam={() => setShowStartExamAlert(true)}
      hasSoal={hasSoal}
      soalCount={soalCount}
      loading={loading}
      showExamAlert={showExamAlert}
      showStartExamAlert={showStartExamAlert}
      setShowExamAlert={setShowExamAlert}
      setShowStartExamAlert={setShowStartExamAlert}
      onConfirmExam={handleConfirmExam}
      onSkip={handleSkipExam}
      onConfirmStartExam={handleConfirmStartExam}
    />
  );
};

export default MaterialNavigator;
