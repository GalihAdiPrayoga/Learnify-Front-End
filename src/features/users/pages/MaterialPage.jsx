import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMaterial } from "../hooks/useMaterial";
import { useCourse } from "../hooks/useCourse";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import NotFound from "@/features/error/notfound";
import { kelasApi } from "@/services/api/kelas.api";

// added imports for split components
import MaterialItem from "../components/materials/MaterialItem";
import MaterialProgressSummary from "../components/materials/MaterialProgressSummary";

const MaterialPage = () => {
  const { kelasId } = useParams();
  const navigate = useNavigate();
  const { materials, loading, error } = useMaterial(kelasId);
  const { courses, refetch: refetchCourses } = useCourse();

  const currentCourse = courses.find((c) => c.id === Number(kelasId));
  const completedMaterials = currentCourse?.completedMaterials || [];
  const progress = currentCourse?.progress || 0;

  // optimistic local state to reduce perceived delay
  const [localCompleted, setLocalCompleted] = useState(
    new Set(completedMaterials)
  );
  const [togglingIds, setTogglingIds] = useState(new Set());
  const [togglingAll, setTogglingAll] = useState(false);

  useEffect(() => {
    setLocalCompleted(new Set(completedMaterials));
  }, [completedMaterials]);

  const handleMaterialClick = (materialId) => {
    navigate(`/user/courses/${kelasId}/materials/${materialId}`);
  };

  // Toggle single material completion (optimistic)
  const toggleMaterial = async (e, materialId) => {
    e?.stopPropagation();
    if (togglingIds.has(materialId)) return;
    const prev = new Set(localCompleted);
    const isNowCompleted = !prev.has(materialId);
    if (isNowCompleted) prev.add(materialId);
    else prev.delete(materialId);
    setLocalCompleted(prev);
    setTogglingIds((s) => new Set(s).add(materialId));

    try {
      await kelasApi.toggleMaterial(kelasId, materialId);
      await refetchCourses();
    } catch (err) {
      // revert on error
      setLocalCompleted(new Set(currentCourse?.completedMaterials || []));
      console.error(err);
    } finally {
      setTogglingIds((s) => {
        const n = new Set(s);
        n.delete(materialId);
        return n;
      });
    }
  };

  // Toggle all materials (optimistic)
  const toggleAllMaterials = async () => {
    if (togglingAll) return;
    setTogglingAll(true);

    const currentlyDone = new Set(localCompleted);
    const incomplete = materials.filter((m) => !currentlyDone.has(m.id));
    const targets = incomplete.length ? incomplete : materials;

    // optimistic
    const newSet = new Set(localCompleted);
    if (incomplete.length) {
      targets.forEach((m) => newSet.add(m.id));
    } else {
      materials.forEach((m) => newSet.delete(m.id));
    }
    setLocalCompleted(newSet);

    try {
      for (const m of targets) {
        // fire sequentially to keep server stable; backend ignores duplicates
        await kelasApi.toggleMaterial(kelasId, m.id);
      }
      await refetchCourses();
    } catch (err) {
      // revert on error
      setLocalCompleted(new Set(currentCourse?.completedMaterials || []));
      console.error(err);
    } finally {
      setTogglingAll(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="p-6">
        <NotFound
          title="Gagal Memuat Data"
          message={
            error ||
            "Terjadi kesalahan saat mengambil data materi. Silakan coba lagi."
          }
          type="error"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CardHeader
        title="Daftar Materi"
        subtitle="Pilih materi yang ingin Anda pelajari"
        showBack={true}
        onBack={() => navigate("/user/courses")}
      />

      {/* Progress Summary */}
      <MaterialProgressSummary
        progress={progress}
        completed={completedMaterials.length}
        total={materials.length}
        onToggleAll={toggleAllMaterials}
        isLoading={togglingAll}
      />

      {/* Materials List */}
      {materials.length === 0 ? (
        <NotFound
          title="Belum Ada Materi"
          message="Materi untuk kelas ini belum tersedia."
          type="notfound"
          onHome={() => navigate("/user/courses")}
        />
      ) : (
        <div className="space-y-4">
          {materials.map((material, index) => {
            const isCompleted = localCompleted.has(material.id);
            return (
              <MaterialItem
                key={material.id}
                material={material}
                index={index}
                isCompleted={isCompleted}
                isToggling={togglingIds.has(material.id)}
                onOpen={handleMaterialClick}
                onToggle={toggleMaterial}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaterialPage;
