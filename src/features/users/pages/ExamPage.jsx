import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExam } from "../hooks/useExam";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import { toast } from "react-hot-toast";
import ExamQuestions from "../components/exam/ExamQuestions";
import ExamSidebar from "../components/exam/ExamSidebar";
import ExamSubmitAlert from "../components/exam/ExamSubmitAlert";

export default function ExamPage() {
  const { kelasId, materialId } = useParams();
  const navigate = useNavigate();
  const { soalList, loading, answers, isSubmitting, selectAnswer, submitExam } =
    useExam(materialId);

  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <Loading />;

  if (!soalList || soalList.length === 0) {
    return (
      <div className="p-6">
        <CardHeader
          title="Tidak Ada Soal"
          subtitle="Materi ini belum memiliki soal ujian"
          showBack
          onBack={() =>
            navigate(`/user/courses/${kelasId}/materials/${materialId}`)
          }
        />
      </div>
    );
  }

  const handleSubmitClick = () => {
    const unanswered = soalList.length - Object.keys(answers).length;
    if (unanswered > 0) {
      toast.error(`Masih ada ${unanswered} soal yang belum dijawab`);
      return;
    }
    setShowSubmitAlert(true);
  };

  // auto submit handler called from sidebar when timer reaches 0
  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setShowSubmitAlert(false);

    // scroll to top before submitting
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    }

    // allow partial answers and mark as failed because time expired
    const result = await submitExam({ allowPartial: true, forceFail: true });
    if (result?.success) {
      navigate(
        `/user/courses/${kelasId}/materials/${materialId}/result/${result.hasilUjianId}`
      );
      setTimeout(() => {
        if (typeof window !== "undefined") {
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
            window.scrollTo(0, 0);
          }
        }
      }, 80);
    }
  };

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return; // guard extra
    setShowSubmitAlert(false);

    // scroll ke atas saat mulai submit
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    }

    const result = await submitExam();
    if (result?.success) {
      navigate(
        `/user/courses/${kelasId}/materials/${materialId}/result/${result.hasilUjianId}`
      );
      // pastikan page result juga berada di atas setelah navigasi
      setTimeout(() => {
        if (typeof window !== "undefined") {
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
            window.scrollTo(0, 0);
          }
        }
      }, 80);
    }
  };

  // duration: 1 soal = 60 detik. Jika tidak ada soal, gunakan null (tidak tampilkan timer)
  const durationSeconds =
    (soalList?.length || 0) > 0 ? soalList.length * 60 : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CardHeader
        title="Ujian Materi"
        subtitle={`Total ${soalList.length} soal`}
        showBack
        onBack={() =>
          navigate(`/user/courses/${kelasId}/materials/${materialId}`)
        }
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExamQuestions
          soalList={soalList}
          answers={answers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onSelect={selectAnswer}
        />

        <ExamSidebar
          soalList={soalList}
          answers={answers}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitClick}
          durationSeconds={durationSeconds}
          onAutoSubmit={handleAutoSubmit}
        />
      </div>

      <ExamSubmitAlert
        open={showSubmitAlert}
        answered={Object.keys(answers).length}
        total={soalList.length}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowSubmitAlert(false)}
      />
    </div>
  );
}
