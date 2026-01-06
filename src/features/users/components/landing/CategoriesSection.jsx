import React from "react";
import { categories } from "../../config/landingData";

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3 text-gray-900">
          Kategori Kursus
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Jelajahi berbagai kategori pembelajaran sesuai minat Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition border border-gray-200 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600">{cat.courses} Kursus</p>
                  </div>
                  <Icon className="w-10 h-10 text-gray-900 group-hover:scale-110 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
