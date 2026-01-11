import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";

const ProgressStats = ({ total, completed, average }) => {
  const stats = [
    {
      icon: BookOpen,
      label: "Total Kelas",
      value: total,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
    },
    {
      icon: Trophy,
      label: "Selesai",
      value: completed,
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
    },
    {
      icon: TrendingUp,
      label: "Rata-rata Progress",
      value: `${average}%`,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
            className={`rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${stat.gradient}`}
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`p-3 rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </motion.div>
              <div>
                <div
                  className={`text-sm font-medium ${stat.textColor} opacity-90`}
                >
                  {stat.label}
                </div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className={`text-3xl font-bold ${stat.textColor}`}
                >
                  {stat.value}
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProgressStats;
