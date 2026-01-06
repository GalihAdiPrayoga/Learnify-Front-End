import React from "react";
import { features } from "../../config/landingData";

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900">
          Mengapa Memilih Kami?
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Platform pembelajaran dengan fitur-fitur unggulan untuk kesuksesan
          Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition border border-gray-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-gray-900 mb-4 p-3 bg-gray-100 rounded-full inline-block">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
