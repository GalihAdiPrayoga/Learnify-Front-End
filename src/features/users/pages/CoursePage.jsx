import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";
import { BookOpen, Clock, FileText, ArrowRight, Search, X } from "lucide-react";
import { STORAGE_URL } from "@/services/api/axios";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import NotFound from "@/features/error/notfound";
import { motion } from "framer-motion";
import Button from "@/components/button";
import { toast } from "react-hot-toast";
import { kelasApi } from "@/services/api/kelas.api";
import ProgressBar from "@/components/ProgressBar";

const CoursePage = () => {
  const { courses, loading, error, refetch } = useCourse();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const displayedCourses =
    courses?.filter((c) =>
      String(c.nama || "")
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    ) || [];

  const getImageUrl = (thumbnail) => {
    if (!thumbnail) return "/placeholder-course.jpg";
    const base = String(STORAGE_URL || "").replace(/\/+$/, "");
    const path = String(thumbnail).replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  const handleViewMaterials = (courseId) => {
    navigate(`/user/courses/${courseId}/materials`);
  };

  const handleStartCourse = async (e, courseId) => {
    e.stopPropagation();
    try {
      await kelasApi.startCourse(courseId);
      toast.success("Kelas ditambahkan ke progress!");
      // Force refresh dengan delay untuk memastikan backend sudah update
      await new Promise((resolve) => setTimeout(resolve, 300));
      await refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal memulai kelas");
    }
  };

  const handleCancelCourse = async (e, courseId) => {
    e.stopPropagation();
    try {
      await kelasApi.cancelCourse(courseId);
      toast.success("Kelas dibatalkan dari progress");
      await new Promise((resolve) => setTimeout(resolve, 300));
      await refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal membatalkan kelas");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
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
        title="Kelas Saya"
        subtitle="Daftar kelas yang Anda ikuti"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      {/* Search bar */}
      <div className="mt-6 mb-4">
        <div className="max-w-full">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kelas..."
              className="w-full pl-10 pr-10 py-2 border rounded-lg bg-white text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {displayedCourses.length === 0 ? (
        query ? (
          <NotFound
            title="Tidak ada hasil"
            message={`Tidak ada hasil untuk "${query}"`}
            type="notfound"
            onRetry={() => setQuery("")}
          />
        ) : (
          <NotFound
            title="Belum Ada Kelas"
            message="Anda belum terdaftar di kelas manapun."
            type="notfound"
            onHome={() => navigate("/user/landing")}
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onClick={() => navigate(`/user/courses/${course.id}/materials`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  navigate(`/user/courses/${course.id}/materials`);
              }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-200"
            >
              {/* Thumbnail (responsive) with small progress badge */}
              <div className="h-40 sm:h-48 md:h-56 lg:h-60 bg-gray-100 overflow-hidden relative">
                <img
                  src={getImageUrl(course.thumnail)}
                  alt={course.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {course.nama}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Beginner to Advanced
                </p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.totalMaterials || 0} Materi
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(course.created_at).toLocaleDateString("id-ID", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <ProgressBar
                    value={course.progress || 0}
                    height={10}
                    label={`${course.progress || 0}%`}
                    from="#06b6d4"
                    to="#6366f1"
                  />
                </div>

                {course.isEnrolled ? (
                  <div className="flex gap-3 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user/courses/${course.id}/materials`);
                        }}
                        className="w-full flex items-center justify-center gap-2 h-10"
                        variant="blue"
                        fullWidth
                      >
                        Lihat Materi
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={(e) => handleCancelCourse(e, course.id)}
                        variant="secondary"
                        className="px-4 py-2 h-10"
                      >
                        Batalkan
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-full mt-4">
                    <Button
                      onClick={(e) => handleStartCourse(e, course.id)}
                      variant="primary"
                      className="py-2 rounded-lg font-semibold flex items-center justify-center gap-2 group transition-all duration-200"
                      fullWidth
                    >
                      Mulai Belajar
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
