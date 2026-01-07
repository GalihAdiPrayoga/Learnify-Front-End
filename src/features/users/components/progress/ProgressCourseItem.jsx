import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Eye, Trash2 } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/button";

const ProgressCourseItem = ({
  course,
  index = 0,
  getImageUrl,
  onView,
  onDelete,
}) => {
  return (
    <motion.div
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
          onClick={() => onView(course.id)}
        />

        <div className="flex-1">
          <h3
            className="font-semibold text-gray-900 group-hover:text-blue-600 transition cursor-pointer"
            onClick={() => onView(course.id)}
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant="secondary"
              title="lihat"
              className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={() => onView(course.id)}
              aria-label="Lihat materi"
            >
              <Eye size={16} />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant="secondary"
              title="hapus"
              className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-red-600 shadow-sm hover:bg-red-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-red-200"
              onClick={(e) => onDelete(e, course.id)}
              aria-label="Hapus dari progress"
            >
              <Trash2 size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProgressCourseItem);
