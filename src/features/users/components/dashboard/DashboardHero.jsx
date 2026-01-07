import React from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHero = ({ userName }) => {
  return (
    <>
      <section className="bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-10 w-full shadow-xl pb-24 text-start relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-800/40 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-b from-zinc-800/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transform transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl opacity-50 group-hover:opacity-90 group-hover:scale-105 transform transition-all duration-300" />
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
        <div className="absolute bottom-10 left-20 w-16 h-16 border-2 border-white/5 rounded-full transition-transform duration-300 group-hover:scale-110" />

        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg relative z-10">
          Selamat Datang {userName}!
        </h1>
        <p className="text-lg mt-3 text-zinc-300 font-medium relative z-10">
          Semoga aktivitas belajarmu menyenangkan.
        </p>
      </section>

      <div className="bg-white text-zinc-800 rounded-lg p-5 max-w-7xl w-full shadow-xl mx-auto -mt-16 relative z-20 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Temukan Kelas</h2>
              <p className="text-sm mt-1 text-gray-600">
                Jelajahi berbagai kelas menarik untuk meningkatkan skill-mu
              </p>
            </div>
          </div>
          <Link
            to="/user/courses"
            className="bg-linear-to-r from-zinc-800 to-zinc-900 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
          >
            Lihat Kelas
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
