import React from "react";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/button";
import NotFoundImg from "@/assets/NotFound.svg";

export default function NotFound({
  title = "Data Tidak Ditemukan",
  message = "Maaf, data yang Anda cari tidak dapat ditemukan.",
  type = "notfound", // notfound, error, failed
  onRetry,
  onHome,
}) {
  const typeStyles = {
    notfound: {
      bgColor: "bg-white",
      borderColor: "border-gray-200",
    },
    error: {
      bgColor: "bg-white",
      borderColor: "border-gray-200",
    },
    failed: {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  };

  const style = typeStyles[type] || typeStyles.notfound;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg p-8 md:p-12 text-center"
    >
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        className={`flex justify-center mb-6`}
      >
        <motion.img
          src={NotFoundImg}
          alt="Not Found"
          className="w-56 h-56 object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{message}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <Button
            type="button"
            variant="primary"
            onClick={onRetry}
            className="h-10 px-6"
          >
            Coba Lagi
          </Button>
        )}
        {onHome && (
          <Button
            type="button"
            variant="secondary"
            onClick={onHome}
            className="h-10 px-6 flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Kembali ke Beranda
          </Button>
        )}
      </div>
    </motion.div>
  );
}
