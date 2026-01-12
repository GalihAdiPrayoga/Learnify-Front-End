import { motion } from "framer-motion";
import { useState } from "react";

export default function HistoryChart({ history }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const buckets = [0, 0, 0, 0, 0]; // 0-59,60-69,70-79,80-89,90-100
  history.forEach((h) => {
    const n = Number(h.nilai);
    if (n < 60) buckets[0]++;
    else if (n < 70) buckets[1]++;
    else if (n < 80) buckets[2]++;
    else if (n < 90) buckets[3]++;
    else buckets[4]++;
  });

  const maxBucket = Math.max(...buckets, 1);
  const labels = [
    { range: "<60", color: "#ef4444", desc: "Kurang" },
    { range: "60-69", color: "#f59e0b", desc: "Cukup" },
    { range: "70-79", color: "#eab308", desc: "Baik" },
    { range: "80-89", color: "#22c55e", desc: "Sangat Baik" },
    { range: "90-100", color: "#10b981", desc: "Sempurna" },
  ];

  return (
    <div className="relative w-full h-64 flex items-end justify-around px-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
      {buckets.map((count, i) => {
        const heightPercent = maxBucket > 0 ? (count / maxBucket) * 100 : 0;
        const isHovered = hoveredBar === i;

        return (
          <div
            key={i}
            className="relative flex flex-col items-center gap-2"
            style={{ flex: 1, maxWidth: "80px" }}
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -top-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap"
              >
                <div className="font-semibold">{labels[i].desc}</div>
                <div className="text-gray-300">{count} ujian</div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
              </motion.div>
            )}

            {/* Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="relative w-full rounded-t-lg shadow-md cursor-pointer"
              style={{
                backgroundColor: labels[i].color,
                minHeight: count > 0 ? "24px" : "4px",
              }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              {/* Count Badge */}
              {count > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold text-sm px-2 py-1 rounded-md shadow-md"
                >
                  {count}
                </motion.div>
              )}
            </motion.div>

            {/* Label */}
            <div className="text-xs font-semibold text-gray-600 text-center mt-2">
              {labels[i].range}
            </div>
          </div>
        );
      })}
    </div>
  );
}
