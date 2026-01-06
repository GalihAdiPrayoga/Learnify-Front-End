/**
 * User Navigation Items
 */
export const USER_NAV_ITEMS = [
  {
    label: "Home",
    path: "/user/landing",
  },
  {
    label: "Courses",
    path: "/user/courses",
  },
  {
    label: "My Progress",
    path: "/user/progress",
  },
];

/**
 * Admin Navigation Items
 */
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Settings",
    path: "/admin/settings",
  },
  {
    label: "Classes",
    path: "/admin/kelas",
  },
  {
    label: "Materials",
    path: "/admin/materi",
  },
  {
    label: "Questions",
    path: "/admin/soal",
  },
  {
    label: "Results",
    path: "/admin/hasil-ujian",
  },
];

/**
 * Logo Configuration
 */
export const LOGO_CONFIG = {
  light: {
    url: "https://via.placeholder.com/40",
    alt: "LMS Logo",
  },
  dark: {
    url: "https://via.placeholder.com/40?bg=000&fg=fff",
    alt: "LMS Logo Dark",
  },
};

/**
 * Navigation Constants
 */
export const NAVIGATION_CONFIG = {
  user: {
    logo: LOGO_CONFIG.light,
    homeLink: "/user/landing",
    dashboardLink: "/user/dashboard",
    items: USER_NAV_ITEMS,
  },
  admin: {
    logo: LOGO_CONFIG.light,
    homeLink: "/admin/dashboard",
    dashboardLink: "/admin/dashboard",
    items: ADMIN_NAV_ITEMS,
  },
};
