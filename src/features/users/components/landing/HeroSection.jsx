import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ChevronRight,
  Code,
  BarChart3,
  Award,
  Users,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-pink-100 to-yellow-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-white bg-linear-to-br bg-zinc-900 px-4 py-2 rounded-full shadow-lg animate-bounce-slow">
            <Sparkles className="w-4 h-4" /> #1 Platform Pembelajaran di
            Indonesia
          </span>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-br bg-zinc-800 bg-clip-text text-transparent">
              Transformasikan Karier Anda
            </span>
            <br />
            <span className="text-gray-900">dengan Kursus dari Para Ahli</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Bergabung dengan{" "}
            <span className="font-bold text-blue-600">50,000+ profesional</span>{" "}
            yang telah mengakselerasi karir mereka. Akses ribuan kursus premium,
            belajar dari ahli industri, dan raih sertifikasi yang diakui secara
            global.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/user/courses"
              className="group px-8 py-4 flex items-center justify-center bg-linear-to-br bg-zinc-900 text-white rounded-xl hover:shadow-2xl hover:scale-105 font-bold transition-all duration-300"
            >
              Mulai Belajar Sekarang
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-gray-200">
            <div>
              <p className="text-3xl font-black text-gray-900">50K+</p>
              <p className="text-sm text-gray-600">Pelajar Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">1000+</p>
              <p className="text-sm text-gray-600">Kursus Premium</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">4.9★</p>
              <p className="text-sm text-gray-600">Rating Rata-rata</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in-right">
          <div className="relative">
            {/* Main card */}
            <div className="bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full"></div>
                <div>
                  <p className="text-white font-bold">
                    Dasbor Pembelajaran Anda
                  </p>
                  <p className="text-gray-400 text-sm">Pantau kemajuan Anda</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      React Masterclass
                    </p>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                      <div className="w-3/4 bg-linear-to-br from-blue-500 to-purple-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">75%</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      Data Science dengan Python
                    </p>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                      <div className="w-1/2 bg-linear-to-br from-purple-500 to-pink-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">50%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                  <p className="text-blue-100 text-sm mb-1">Selesai</p>
                  <p className="text-white text-2xl font-bold">24</p>
                </div>
                <div className="bg-linear-to-br from-purple-500 to-purple-600 p-4 rounded-xl">
                  <p className="text-purple-100 text-sm mb-1">Jam Dipelajari</p>
                  <p className="text-white text-2xl font-bold">156</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 animate-float">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-600">Pencapaian</p>
                  <p className="font-bold text-sm">Sertifikat Diperoleh!</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 animate-float-delayed">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-xs text-gray-600">Sedang Belajar</p>
                  <p className="font-bold text-sm">2.3K+ Sedang Belajar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
