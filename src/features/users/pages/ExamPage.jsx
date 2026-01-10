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

  const handleConfirmSubmit = async () => {
    setShowSubmitAlert(false);
    const success = await submitExam();
    if (success) navigate(`/user/courses/${kelasId}/materials`);
  };

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
