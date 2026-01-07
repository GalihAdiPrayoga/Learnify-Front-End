import React from "react";
import { Search, X } from "lucide-react";

const CourseSearch = ({ value, onChange, onClear }) => {
  return (
    <div className="mt-6 mb-4">
      <div className="max-w-full">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Cari kelas..."
            className="w-full pl-10 pr-10 py-2 border rounded-lg bg-white text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {value && (
            <button
              onClick={onClear}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
