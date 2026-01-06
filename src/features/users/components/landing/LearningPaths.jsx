import React from "react";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { learningPaths } from "../../config/landingData";

export default function LearningPaths() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Structured Learning
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
            Pilih Learning Path Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jalur pembelajaran terstruktur dari pemula hingga expert dengan
            kurikulum yang dirancang oleh profesional industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <div
                key={i}
                onClick={() => console.log(`Clicked path: ${path.title}`)}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden relative animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                ></div>

                <div
                  className={`w-14 h-14 bg-linear-to-br ${path.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {path.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{path.level}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.courses} Courses
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">
                    Skills you'll gain:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group-hover:gap-3 group-hover:shadow-lg transform group-hover:scale-[1.02] active:scale-95">
                  Explore Path
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
