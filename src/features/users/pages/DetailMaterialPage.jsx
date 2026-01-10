import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { materiApi } from "../../../services/api/materi.api";
import { kelasApi } from "@/services/api/kelas.api";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";
import CardHeader from "../components/CardHeader";
import { useMaterial } from "../hooks/useMaterial";
import { useCourse } from "../hooks/useCourse";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/button";

// added imports: split components
import MaterialContent from "../components/materials/MaterialContent";
import MaterialCompletionToggle from "../components/materials/MaterialCompletionToggle";
import MaterialNavigator from "../components/materials/MaterialNavigator";

const DetailMaterialPage = () => {
  const { kelasId, materialId } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const { courses, refetch: refetchCourses } = useCourse();

  const { materials } = useMaterial(kelasId);

  const prevIndexRef = useRef(-1);
  const [animDir, setAnimDir] = useState(0);

  const currentIndex = materials.findIndex((m) => m.id === Number(materialId));

  const prevMaterial = currentIndex > 0 ? materials[currentIndex - 1] : null;
  const nextMaterial =
    currentIndex < materials.length - 1 ? materials[currentIndex + 1] : null;

  /* ================= FETCH DETAIL ================= */
  useEffect(() => {
    const fetchDetail = async () => {
      material ? setIsTransitioning(true) : setLoading(true);

      try {
        const res = await materiApi.getDetailForUser(materialId);
        let payload = res?.data;
        let mat = payload?.data ?? payload;

        if (Array.isArray(mat)) {
          mat = mat.find((m) => String(m.id) === String(materialId)) || mat[0];
        }

        setMaterial(mat);
      } catch (err) {
        toast.error("Gagal memuat detail materi");
        navigate(`/user/courses/${kelasId}/materials`);
      } finally {
        setIsTransitioning(false);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [materialId]);

  /* ================= ANIMATION DIR ================= */
  useEffect(() => {
    if (prevIndexRef.current === -1) {
      prevIndexRef.current = currentIndex;
      setAnimDir(0);
    } else {
      setAnimDir(currentIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  /* ================= SCROLL TO TOP ON MATERIAL CHANGE ================= */
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [materialId]);

  /* ================= CHECK COMPLETION STATUS ================= */
  useEffect(() => {
    const currentCourse = courses.find((c) => c.id === Number(kelasId));
    if (currentCourse) {
      const completed = currentCourse.completedMaterials || [];
      setIsCompleted(completed.includes(Number(materialId)));
    }
  }, [courses, materialId, kelasId]);

  /* ================= TOGGLE COMPLETION ================= */
  const handleToggleComplete = async () => {
    if (isToggling) return;
    setIsToggling(true);
    // optimistic update
    setIsCompleted((prev) => !prev);

    try {
      await kelasApi.toggleMaterial(kelasId, materialId);
      toast.success(
        isCompleted
          ? "Materi ditandai belum selesai"
          : "Materi ditandai selesai! 🎉"
      );
      await refetchCourses();
    } catch (err) {
      // revert on error
      setIsCompleted((prev) => !prev);
      toast.error(err?.response?.data?.message || "Gagal mengubah status");
    } finally {
      setIsToggling(false);
    }
  };

  const handleStartExam = (materiId) => {
    console.log("🚀 Starting exam for material:", materiId);
    navigate(`/user/courses/${kelasId}/materials/${materiId}/exam`);
  };

  console.log("📄 DetailMaterialPage:", {
    kelasId,
    materialId,
    currentIndex,
    prevMaterial: prevMaterial?.id,
    nextMaterial: nextMaterial?.id,
  });

  if (loading && !material) return <Loading />;
  if (!material) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ================= FIX HEADING CSS ================= */}
      <style>
        {`
          /* === FORCE HEADING STYLE (ANTI KETIMPA) === */
          .prose h1 { font-size: 2.75rem; font-weight: 800; margin: 2.5rem 0 1.5rem; }
          .prose h2 { font-size: 2.1rem; font-weight: 700; margin: 2.25rem 0 1.25rem; }
          .prose h3 { font-size: 1.75rem; font-weight: 600; margin: 2rem 0 1rem; }
          .prose h4 { font-size: 1.4rem; font-weight: 600; margin: 1.75rem 0 0.75rem; }

          .prose p {
            margin-bottom: 1.25rem;
            line-height: 1.8;
          }

          /* === QUILL SUPPORT === */
          .ql-align-center { text-align: center; }
          .ql-align-right { text-align: right; }
          .ql-align-justify { text-align: justify; }

          .ql-indent-1 { padding-left: 3em; }
          .ql-indent-2 { padding-left: 6em; }
          .ql-indent-3 { padding-left: 9em; }

          /* === CODE & BLOCKQUOTE === */
          .prose pre {
            background: #0f172a;
            color: #e5e7eb;
            padding: 1.25rem;
            border-radius: 0.75rem;
            margin: 1.5rem 0;
          }

          .prose blockquote {
            border-left: 4px solid #cbd5f5;
            padding-left: 1rem;
            font-style: italic;
            color: #475569;
          }
        `}
      </style>

      <CardHeader
        title={material.judul}
        subtitle={material.deskripsi || "Materi pembelajaran"}
        showBack
        onBack={() => navigate(`/user/courses/${kelasId}/materials`)}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <MaterialContent material={material} animDir={animDir} />

        {isTransitioning && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        )}

        <MaterialCompletionToggle
          isCompleted={isCompleted}
          isToggling={isToggling}
          onToggle={handleToggleComplete}
        />

        <MaterialNavigator
          prevMaterial={prevMaterial}
          nextMaterial={nextMaterial}
          currentMaterialId={materialId}
          onNavigate={(id) => {
            console.log("🔄 Navigating to material:", id);
            navigate(`/user/courses/${kelasId}/materials/${id}`);
          }}
          onStartExam={handleStartExam}
        />
      </div>
    </div>
  );
};

export default DetailMaterialPage;
