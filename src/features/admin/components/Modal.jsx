import { useEffect } from "react";

export default function Modal({ title, onClose, children, className = "" }) {
  // Close dengan tombol ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        animate-fadeIn
      "
      onClick={onClose}
    >
      <div
        className={`
          relative bg-white rounded-2xl
          p-6 w-full max-w-md
          shadow-xl
          animate-scaleIn
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="
              w-8 h-8 flex items-center justify-center
              rounded-full text-gray-500
              hover:bg-gray-100 hover:text-gray-700
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
}
