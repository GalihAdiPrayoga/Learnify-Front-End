import React from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Eye,
  Trash2,
} from "lucide-react";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import { motion } from "framer-motion";
import { STORAGE_URL } from "@/services/api/axios";
import NotFound from "@/features/error/notfound";
import Button from "@/components/button";
import { toast } from "react-hot-toast";
import { kelasApi } from "@/services/api/kelas.api";
import ProgressBar from "@/components/ProgressBar";

const ProgressPage = () => {
  const { courses, loading, refetch } = useCourse();
  const navigate = useNavigate();

  const coursesInProgress = courses.filter(
    (c) => c.isEnrolled && c.isInProgress
  );
  const totalCompleted = coursesInProgress.filter(
    (c) => c.progress === 100
  ).length;
  const avgProgress =
    coursesInProgress.length > 0
      ? Math.round(
          coursesInProgress.reduce((sum, c) => sum + c.progress, 0) /
            coursesInProgress.length
        )
      : 0;

  const getImageUrl = (thumbnail) => {
    if (!thumbnail) return "/placeholder-course.jpg";
    const base = String(STORAGE_URL || "").replace(/\/+$/, "");
    const path = String(thumbnail).replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  const handleRemoveCourse = async (e, courseId) => {
    e.stopPropagation();
    try {
      await kelasApi.cancelCourse(courseId);
      toast.success("Kelas dihapus dari progress");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal menghapus kelas");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CardHeader
        title="Progress Pembelajaran"
        subtitle="Pantau perkembangan belajar Anda"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-xl"
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Kelas Aktif</p>
              <p className="text-4xl font-bold mt-2">
                {coursesInProgress.length}
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-green-600 to-teal-700 text-white p-6 rounded-xl shadow-xl"
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">
                Kelas Selesai
              </p>
              <p className="text-4xl font-bold mt-2">{totalCompleted}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-linear-to-br from-purple-500 via-violet-600 to-fuchsia-700 text-white p-6 rounded-xl shadow-xl"
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Rata-rata Progress
              </p>
              <p className="text-4xl font-bold mt-2">{avgProgress}%</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress List */}
      {coursesInProgress.length === 0 ? (
        <NotFound
          title="Belum Ada Progress"
          message="Anda belum memulai kelas apapun. Klik 'Mulai Belajar' pada halaman kelas untuk memulai pembelajaran."
          type="notfound"
          onHome={() => navigate("/user/courses")}
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daftar Kelas</h2>

          <div className="space-y-4">
            {coursesInProgress.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(course.thumnail)}
                    alt={course.nama}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                    onClick={() =>
                      navigate(`/user/courses/${course.id}/materials`)
                    }
                  />

                  <div className="flex-1">
                    <h3
                      className="font-semibold text-gray-900 group-hover:text-blue-600 transition cursor-pointer"
                      onClick={() =>
                        navigate(`/user/courses/${course.id}/materials`)
                      }
                    >
                      {course.nama}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.totalMaterials} Materi
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.completedMaterials?.length || 0} Selesai
                      </span>
                    </div>

                    <div className="mt-3">
                      <ProgressBar
                        value={course.progress}
                        height={10}
                        label={`${course.progress}%`}
                        from="#06b6d4"
                        to="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        title="lihat"
                        className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        onClick={() =>
                          navigate(`/user/courses/${course.id}/materials`)
                        }
                        aria-label="Lihat materi"
                      >
                        <Eye size={16} />
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        title="hapus"
                        className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-red-600 shadow-sm hover:bg-red-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-red-200"
                        onClick={(e) => handleRemoveCourse(e, course.id)}
                        aria-label="Hapus dari progress"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
