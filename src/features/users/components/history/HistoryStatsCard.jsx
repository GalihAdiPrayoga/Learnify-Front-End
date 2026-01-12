import { motion } from "framer-motion";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";

export default function HistoryStatsCard({ total, passed, average }) {
  const stats = [
    {
      icon: BookOpen,
      label: "Total Ujian",
      value: total,
      gradient: "from-indigo-600 via-indigo-700 to-blue-900",
      iconBg: "bg-blue-300",
      iconColor: "text-blue-600",
    },
    {
      icon: Trophy,
      label: "Lulus",
      value: passed,
      gradient: "from-green-600 via-green-700 to-emerald-900",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: TrendingUp,
      label: "Rata-rata",
      value: average,
      gradient: "from-purple-600 via-purple-700 to-violet-950",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
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
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
            className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all bg-linear-to-br ${stat.gradient} p-6`}
          >
            {/* Overlay pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0 bg-white"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                }}
              />
            </div>

            <div className="relative flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.iconBg} shadow-md`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              <div>
                <div className="text-sm text-white/90 font-medium">
                  {stat.label}
                </div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-3xl font-bold text-white"
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
}
