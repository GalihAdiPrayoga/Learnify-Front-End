import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMaterial } from "../hooks/useMaterial";
import { useCourse } from "../hooks/useCourse";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  Bookmark,
} from "lucide-react";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import NotFound from "@/features/error/notfound";
import { kelasApi } from "@/services/api/kelas.api";
import ProgressBar from "@/components/ProgressBar";

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
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
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
      {materials.length > 0 && (
        <div
          className="mb-6"
          title={
            completedMaterials.length < materials.length
              ? "Tandai semua selesai"
              : "Batalkan semua selesai"
          }
        >
          <ProgressBar
            value={progress}
            height={14}
            onClick={toggleAllMaterials}
            label={`${completedMaterials.length} / ${materials.length} materi selesai`}
            from="#06b6d4"
            to="#7c3aed"
          />
        </div>
      )}

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
            // determine completion from local optimistic set
            const isCompleted = localCompleted.has(material.id);

            return (
              <div
                key={material.id}
                onClick={() => handleMaterialClick(material.id)}
                className={`bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  isCompleted
                    ? "border-green-200 bg-green-50/30"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-linear-to-br from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition ${
                          isCompleted ? "text-green-700" : "text-gray-900"
                        }`}
                      >
                        {material.judul}
                      </h3>

                      {/* Bookmark icon replaces badge and toggles completion */}
                      <button
                        onClick={(e) => toggleMaterial(e, material.id)}
                        className="ml-3 p-1 rounded-md hover:bg-gray-100"
                        title={isCompleted ? "Batal selesai" : "Tandai selesai"}
                        disabled={togglingIds.has(material.id)}
                      >
                        {togglingIds.has(material.id) ? (
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                        ) : isCompleted ? (
                          <Bookmark className="w-5 h-5 text-indigo-700" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-400 opacity-60" />
                        )}
                      </button>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {material.deskripsi}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Materi
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(material.created_at).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                        isCompleted
                          ? "bg-green-100 group-hover:bg-green-200"
                          : "bg-gray-100 group-hover:bg-blue-100"
                      }`}
                    >
                      <ArrowLeft
                        className={`w-5 h-5 rotate-180 transition ${
                          isCompleted
                            ? "text-green-600"
                            : "text-gray-600 group-hover:text-blue-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MaterialPage;
