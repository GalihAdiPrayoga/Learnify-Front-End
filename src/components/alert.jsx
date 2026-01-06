import React from "react";
import { AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/button";

export default function Alert({
  open = false,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  type = "warning",
  onConfirm,
  onCancel,
  confirmText = "Hapus",
  cancelText = "Batal",
  loading = false,
}) {
  const typeStyles = {
    warning: {
      icon: AlertCircle,
      textColor: "text-yellow-700",
      iconColor: "text-yellow-600",
    },
    danger: {
      icon: AlertCircle,
      textColor: "text-gray-700",
      iconColor: "text-gray-600",
    },
    success: {
      icon: Check,
      textColor: "text-green-700",
      iconColor: "text-green-600",
    },
    info: {
      icon: AlertCircle,
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
    },
  };

  const style = typeStyles[type] || typeStyles.warning;
  const IconComponent = style.icon;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onCancel}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onCancel}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`shrink-0 ${style.iconColor}`}>
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${style.textColor}`}>
                    {title}
                  </h3>
                  <p className={`text-sm mt-1 ${style.textColor}`}>{message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={loading}
                  className="px-4 h-9"
                >
                  {cancelText}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={onConfirm}
                  disabled={loading}
                  loading={loading}
                  className="px-4 h-9"
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
