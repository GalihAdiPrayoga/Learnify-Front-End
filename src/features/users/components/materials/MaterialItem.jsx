import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  Bookmark,
} from "lucide-react";

const MaterialItem = ({
  material,
  index,
  isCompleted,
  isToggling,
  onOpen,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onOpen(material.id)}
      className={`bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        isCompleted
          ? "border-green-200 bg-green-50/30"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform ${
            isCompleted
              ? "bg-green-500 text-white"
              : "bg-linear-to-br from-blue-500 to-purple-600 text-white"
          }`}
        >
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : index + 1}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition ${
                isCompleted ? "text-green-700" : "text-gray-900"
              }`}
            >
              {material.judul}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(e, material.id);
              }}
              className="ml-3 p-1 rounded-md hover:bg-gray-100"
              title={isCompleted ? "Batal selesai" : "Tandai selesai"}
              disabled={isToggling}
            >
              {isToggling ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              ) : isCompleted ? (
                <Bookmark className="w-5 h-5 text-indigo-700" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400 opacity-60" />
              )}
            </button>
          </div>

          <p className="text-gray-600 mb-3 line-clamp-2">
            {material.deskripsi}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Materi
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(material.created_at).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
              isCompleted
                ? "bg-green-100 group-hover:bg-green-200"
                : "bg-gray-100 group-hover:bg-blue-100"
            }`}
          >
            <ArrowLeft
              className={`w-5 h-5 rotate-180 transition ${
                isCompleted
                  ? "text-green-600"
                  : "text-gray-600 group-hover:text-blue-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MaterialItem);
