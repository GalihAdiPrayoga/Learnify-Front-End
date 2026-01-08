import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { handleLogout } from "@/features/auth/services/AuthHandleSubmit";
import { useHeader } from "../../../features/admin/hooks/useHeader";

export default function Header({ hasScrolled = false }) {
  const navigate = useNavigate();
  const {
    dropdownOpen,
    setDropdownOpen,
    userData,
    loading,
    dropdownRef,
    getProfileImageUrl,
    getInitials,
  } = useHeader();

  const onLogout = () => handleLogout(navigate);

  const menuItems = [
    {
      label: "Settings",
      icon: Settings,
      onClick: () => navigate("/admin/settings"),
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: onLogout,
      danger: true,
    },
  ];

  return (
    <header
      className={`
        bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-8 
        sticky top-0 z-40 border-b transition-all duration-300
        ${
          hasScrolled
            ? "border-gray-200 shadow-lg shadow-gray-200/50"
            : "border-gray-100/50 shadow-sm"
        }
      `}
    >
      {/* Profile Dropdown */}
      <div className="ml-auto" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 px-3 py-2"
        >
          <div className="w-10 h-10 bg-linear-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm hover:shadow-md hover:ring-indigo-100 transition-all">
            {getProfileImageUrl() ? (
              <img  
                src={getProfileImageUrl()}
                alt={userData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <span
              className="text-white font-semibold text-sm"
              style={{ display: getProfileImageUrl() ? "none" : "flex" }}
            >
              {loading ? "..." : getInitials()}
            </span>
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">
              {loading ? "Loading..." : userData.name}
            </p>
            <p className="text-xs text-gray-500">
              {loading ? "" : userData.email || "Administrator"}
            </p>
          </div>

          <motion.div
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-8 mt-2 w-45 bg-white backdrop-blur-xl shadow-2xl shadow-gray-300/40 rounded-lg border border-gray-100 overflow-hidden origin-top-right ring-1 ring-black/5"
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => {
                      item.onClick();
                      setDropdownOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 w-full text-left px-4 py-3 text-sm 
                      transition-colors duration-150
                      ${
                        item.danger
                          ? "text-red-600 hover:bg-red-50 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
