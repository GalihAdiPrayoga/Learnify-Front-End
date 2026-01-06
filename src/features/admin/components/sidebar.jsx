import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/logo";
import {
  LayoutDashboard,
  Library,
  FileQuestion,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Kelas", icon: GraduationCap, path: "/admin/kelas" },
    { label: "Materi", icon: BookOpen, path: "/admin/materi" },
    { label: "Soal", icon: FileQuestion, path: "/admin/soal" },
    { label: "Hasil Ujian", icon: CheckCircle, path: "/admin/hasil-ujian" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-white text-zinc-900 p-3 shadow-lg border border-gray-200 rounded-full hover:shadow-xl transition-shadow"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-white text-zinc-800 flex flex-col z-40 transition-all duration-300 shadow-sm
        ${isOpen ? "left-0" : "-left-72"} md:left-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Logo to="/admin/dashboard" size="md" showText={true} />
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-xl 
                  transition-all duration-200 ease-out
                  ${
                    active
                      ? "text-zinc-900 font-semibold bg-indigo-50/60"
                      : "text-zinc-600 hover:text-zinc-900 hover:translate-x-1 hover:bg-gray-50"
                  }
                `}
              >
                {/* Accent Line - hanya untuk active */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-indigo-500 to-indigo-600 rounded-r-full shadow-sm" />
                )}

                <IconComponent
                  className={`w-5 h-5 transition-all duration-200 ${
                    active
                      ? "scale-110 text-indigo-600"
                      : "group-hover:scale-105"
                  }`}
                />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
