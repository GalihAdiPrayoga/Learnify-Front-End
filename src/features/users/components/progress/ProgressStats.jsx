import React from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Award } from "lucide-react";

const ProgressStats = ({ total, completed, average }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Kelas Aktif</p>
            <p className="text-4xl font-bold mt-2">{total}</p>
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
        <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Kelas Selesai</p>
            <p className="text-4xl font-bold mt-2">{completed}</p>
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
        <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">
              Rata-rata Progress
            </p>
            <p className="text-4xl font-bold mt-2">{average}%</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressStats;
