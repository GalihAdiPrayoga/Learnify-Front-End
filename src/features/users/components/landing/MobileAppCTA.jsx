import React from "react";
import { Smartphone, Download } from "lucide-react";

export default function MobileAppCTA() {
  return (
    <section className="py-16 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Belajar Dimana Saja dengan Mobile App
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download aplikasi mobile kami dan akses ribuan kursus langsung
              dari smartphone Anda. Available untuk iOS dan Android.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5" />
                Download di App Store
              </button>
              <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download di Play Store
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-black text-white">4.8★</p>
                <p className="text-gray-400 text-sm">App Rating</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">100K+</p>
                <p className="text-gray-400 text-sm">Downloads</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">25K+</p>
                <p className="text-gray-400 text-sm">Reviews</p>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block animate-fade-in-right">
            <div className="relative">
              {/* Phone mockup */}
              <div className="w-64 h-[500px] bg-gray-800 rounded-[3rem] mx-auto p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="h-full bg-linear-to-b from-blue-50 to-purple-50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-300 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-24 bg-white rounded-xl shadow"></div>
                      <div className="h-24 bg-white rounded-xl shadow"></div>
                      <div className="h-24 bg-white rounded-xl shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
