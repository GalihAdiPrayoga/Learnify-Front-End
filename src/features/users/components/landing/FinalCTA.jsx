import React from "react";
import { Link } from "react-router-dom";
import { Rocket, CheckCircle2 } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-block p-4 bg-zinc-900 rounded-3xl mb-6">
            <Rocket className="w-16 h-16 text-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-4 text-gray-900">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah mengubah karir
            mereka. Mulai belajar hari ini, gratis!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/user/courses"
              className="px-10 py-4 bg-linear-to-br bg-zinc-900 text-white rounded-xl hover:shadow-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Mulai Sekarang — Gratis
              <Rocket className="w-6 h-6" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Tidak perlu kartu kredit
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Bisa dibatalkan kapan saja
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Akses ke kursus gratis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
