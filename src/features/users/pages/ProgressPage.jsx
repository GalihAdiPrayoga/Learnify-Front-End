import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import NotFound from "@/features/error/notfound";
import { toast } from "react-hot-toast";
import { kelasApi } from "@/services/api/kelas.api";
import Alert from "@/components/alert";
import { STORAGE_URL } from "@/services/api/axios";
import ProgressStats from "../components/progress/ProgressStats";
import ProgressCourseItem from "../components/progress/ProgressCourseItem";
import { getCourseImageUrl } from "../utils/courseImage";

const ProgressPage = () => {
  const { courses, loading, refetch } = useCourse();
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const openDeleteConfirm = (e, courseId) => {
    e.stopPropagation();
    setSelectedCourseId(courseId);
    setAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourseId) return;
    setDeleting(true);
    try {
      await kelasApi.cancelCourse(selectedCourseId);
      toast.success("Kelas dihapus dari progress");
      refetch();
      setAlertOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal menghapus kelas");
    } finally {
      setDeleting(false);
      setSelectedCourseId(null);
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
      <ProgressStats
        total={coursesInProgress.length}
        completed={totalCompleted}
        average={avgProgress}
      />

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
              <ProgressCourseItem
                key={course.id}
                course={course}
                index={index}
                getImageUrl={(thumb) => getCourseImageUrl(thumb, STORAGE_URL)}
                onView={(id) => navigate(`/user/courses/${id}/materials`)}
                onDelete={openDeleteConfirm}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delete confirmation alert */}
      <Alert
        open={alertOpen}
        onOpenChange={setAlertOpen}
        onCancel={() => {
          if (deleting) return;
          setAlertOpen(false);
          setSelectedCourseId(null);
        }}
        onConfirm={confirmDelete}
        title="Hapus Progress"
        message="Apakah Anda yakin ingin menghapus kelas ini dari progress?"
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

export default ProgressPage;
