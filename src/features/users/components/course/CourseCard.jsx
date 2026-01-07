import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/button";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const CourseCard = ({
  course,
  index = 0,
  getImageUrl,
  onView,
  onStart,
  onCancel,
}) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      onClick={() => onView(course.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onView(course.id);
      }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer transition-colors duration-200 focus-within:ring-2 focus-within:ring-indigo-200"
    >
      <div className="h-40 sm:h-48 md:h-56 lg:h-60 bg-gray-100 overflow-hidden relative">
        <img
          src={getImageUrl(course.thumnail)}
          alt={course.nama}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {course.nama}
        </h3>
        <p className="text-xs text-gray-500 mt-1">Beginner to Advanced</p>

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
                  onView(course.id);
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
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel(e, course.id);
                }}
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
              onClick={(e) => {
                e.stopPropagation();
                onStart(e, course.id);
              }}
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
  );
};

export default React.memo(CourseCard);
