import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import { handleLogout } from "@/features/auth/services/AuthHandleSubmit";
import { useNavbar } from "../../../features/users/hooks/useNavbar";
import { USER_NAV_ITEMS } from "@/config/navigation";

export default function Navbar() {
  const navigate = useNavigate();
  const {
    dropdownOpen,
    setDropdownOpen,
    userData,
    loading,
    dropdownRef,
    getProfileImageUrl,
    getInitials,
  } = useNavbar();

  const onLogout = () => handleLogout(navigate);

  // derive first initial (uppercase) with fallback 'D'
  const firstInitial =
    userData && userData.name && userData.name.split(" ")[0]
      ? userData.name.split(" ")[0].charAt(0).toUpperCase()
      : "D";

  // start false so spinner doesn't run when there's no image
  const [imageLoading, setImageLoading] = useState(false);

  // mobile menu open state (was missing -> ReferenceError)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // nav dropdown state (desktop) and mobile nav expand state
  const [navDropdownOpen, setNavDropdownOpen] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(null);

  // call getProfileImageUrl once per render and memoize the result
  const profileImageUrl = useMemo(() => {
    try {
      return typeof getProfileImageUrl === "function"
        ? getProfileImageUrl()
        : null;
    } catch {
      return null;
    }
  }, [getProfileImageUrl, userData?.id, userData?.avatar]); // tweak deps to when source changes

  // only react to the actual image URL changing
  useEffect(() => {
    if (profileImageUrl) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [profileImageUrl]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 ml-20 mr-20">
        <div className="flex justify-between items-center h-16">
          {/* LEFT — Logo + Menu */}
          <div className="flex items-center gap-8">
            <Logo to="/user/landing" size="md" showText={true} />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {USER_NAV_ITEMS.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setNavDropdownOpen(item.label)}
                    onMouseLeave={() => setNavDropdownOpen(null)}
                  >
                    <button
                      onClick={() =>
                        setNavDropdownOpen((v) =>
                          v === item.label ? null : item.label
                        )
                      }
                      className="flex items-center gap-1 text-gray-600 hover:text-zinc-900 font-medium transition"
                    >
                      {item.label}
                      <motion.div
                        animate={{
                          rotate: navDropdownOpen === item.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "inline-flex" }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {navDropdownOpen === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.12 }}
                          className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-md border border-gray-100 z-40 overflow-hidden"
                        >
                          {item.children.map((c) => (
                            <Link
                              key={c.path}
                              to={c.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-zinc-900 font-medium transition"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* RIGHT — Desktop Dashboard + Avatar */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/user/dashboard"
              className="text-gray-600 hover:text-zinc-900 font-medium transition"
            >
              Dashboard
            </Link>

            {/* Profile Dropdown (auto-open on hover for desktop) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative"
                  style={{
                    backgroundColor: "#0f172a",
                    border: "2px solid rgba(34,197,94,0.9)",
                    boxShadow:
                      "0 0 6px rgba(34,197,94,0.45), 0 0 16px rgba(34,197,94,0.25), inset 0 0 6px rgba(255,255,255,0.02)",
                    WebkitBoxShadow:
                      "0 0 6px rgba(34,197,94,0.45), 0 0 16px rgba(34,197,94,0.25), inset 0 0 6px rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Loading Spinner */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}

                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={userData?.name || "profile"}
                      className="w-full h-full object-cover"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  ) : null}

                  {!profileImageUrl && !imageLoading && (
                    <span className="text-white font-bold text-sm">
                      {firstInitial}
                    </span>
                  )}
                </div>

                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {loading ? "Loading..." : userData.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {loading ? "" : userData.email}
                      </p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        onLogout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Profile Avatar */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative"
                style={{
                  backgroundColor: "#0f172a",
                  border: "2px solid rgba(34,197,94,0.9)",
                  boxShadow:
                    "0 0 6px rgba(34,197,94,0.45), 0 0 16px rgba(34,197,94,0.25)",
                }}
              >
                {imageLoading && (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={userData?.name || "profile"}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : null}

                {!profileImageUrl && !imageLoading && (
                  <span className="text-white font-bold text-sm">
                    {firstInitial}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-3">
                {USER_NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label} className="space-y-1">
                      <button
                        onClick={() =>
                          setMobileNavOpen((v) =>
                            v === item.label ? null : item.label
                          )
                        }
                        className="w-full flex items-center justify-between text-gray-700 font-medium py-2"
                      >
                        <span>{item.label}</span>
                        <motion.div
                          animate={{
                            rotate: mobileNavOpen === item.label ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "inline-flex" }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      {mobileNavOpen === item.label &&
                        item.children.map((c) => (
                          <Link
                            key={c.path}
                            to={c.path}
                            onClick={() => {
                              handleNavClick();
                              setMobileNavOpen(null);
                            }}
                            className="block pl-4 text-gray-600 hover:text-zinc-900 font-medium py-2 transition"
                          >
                            {c.label}
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      className="block text-gray-600 hover:text-zinc-900 font-medium py-2 transition"
                    >
                      {item.label}
                    </Link>
                  )
                )}

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    to="/user/dashboard"
                    onClick={handleNavClick}
                    className="block text-gray-600 hover:text-zinc-900 font-medium py-2 transition"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Profile Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="px-4 py-4">
                <p className="text-sm font-medium text-gray-900">
                  {loading ? "Loading..." : userData.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {loading ? "" : userData.email}
                </p>

                <button
                  onClick={() => {
                    onLogout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 mt-3 text-sm text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
