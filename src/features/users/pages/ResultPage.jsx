import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMaterial } from "../hooks/useMaterial";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";

import useExamResult from "../hooks/useExamResult";
import ResultSummary from "../components/result/ResultSummary";
import ResultActions from "../components/result/ResultActions";
import ConfettiEffect from "../components/result/ConfettiEffect";

export default function ResultPage() {
  const { kelasId, materialId, hasilUjianId } = useParams();
  const navigate = useNavigate();
  const { materials } = useMaterial(kelasId);

  const { hasil, loading, passed } = useExamResult(
    hasilUjianId,
    navigate,
    kelasId
  );

  if (loading) return <Loading />;
  if (!hasil) return null;

  const currentIndex = materials.findIndex((m) => m.id === Number(materialId));
  const nextMaterial =
    currentIndex < materials.length - 1 ? materials[currentIndex + 1] : null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ConfettiEffect show={passed} />

      <CardHeader
        title="Hasil Ujian"
        subtitle={`Materi: ${hasil.materi?.judul || ""}`}
        showBack
        onBack={() => navigate(`/user/courses/${kelasId}/materials`)}
      />

      <ResultSummary hasil={hasil} passed={passed} />

      <ResultActions
        kelasId={kelasId}
        nextMaterial={nextMaterial}
        navigate={navigate}
      />
    </div>
  );
}
