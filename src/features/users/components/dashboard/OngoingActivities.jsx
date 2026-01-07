import React from "react";
import { Eye } from "lucide-react";

const OngoingActivities = ({ courses = [], onOpen }) => {
  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="h-full flex flex-col overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Ongoing Activities List</h2>

        <div className="space-y-4">
          {courses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada kelas yang sedang dipelajari</p>
              <a
                href="/user/courses"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Mulai belajar sekarang
              </a>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between bg-linear-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => onOpen(course.id)}
                    >
                      {course.nama}
                    </h3>
                    <div className="text-sm text-gray-500 font-medium">
                      {course.progress ?? 0}%
                    </div>
                  </div>

                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress ?? 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {course.totalMaterials || 0} materi ·{" "}
                    {course.completedMaterials?.length || 0} selesai
                  </p>
                </div>
                <button
                  type="button"
                  title="lihat"
                  className="p-2 h-9 w-9 rounded-lg border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={() => onOpen(course.id)}
                >
                  <Eye size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingActivities;
