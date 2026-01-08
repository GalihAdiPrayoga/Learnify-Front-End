import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../course/CourseCard";
import { getCourseImageUrl } from "../../utils/courseImage";
import { STORAGE_URL } from "@/services/api/axios";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import { useCourse } from "../../hooks/useCourse";

export default function LearningPaths() {
  const navigate = useNavigate();
  const { courses = [], loading, error, refetch } = useCourse();
  const latest = (courses || [])
    .slice()
    .sort((a, b) => Number(b?.id ?? 0) - Number(a?.id ?? 0))
    .slice(0, 8);

  if (loading) return <Loading />;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Learning Path
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
            Pilih Jalur Belajar yang Tepat
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan kumpulan kelas terkurasi yang disusun untuk membangun
            kompetensi tertentu — dari dasar hingga mahir, dalam jalur
            pembelajaran yang fokus dan terstruktur.
          </p>
        </div>

        {error ? (
          <div className="mt-6">
            <NotFound
              title="Gagal Memuat Data Kelas"
              message={
                error ||
                "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
              }
              type="error"
              onRetry={() => refetch?.() || window.location.reload()}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latest.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                index={i}
                getImageUrl={(thumb) => getCourseImageUrl(thumb, STORAGE_URL)}
                onView={() => navigate(`/user/courses/${course.id}/materials`)}
                onStart={() => {}}
                onCancel={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
