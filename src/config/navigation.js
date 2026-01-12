/**
 * User Navigation Items
 */
export const USER_NAV_ITEMS = [
  {
    label: "Beranda",
    path: "/user/landing",
  },
  {
    label: "Kursus",
    path: "/user/courses",
  },
  {
    label: "Kemajuan",
    path: "/user/progress",
    children: [
      { label: "Materi", path: "/user/progress" },
      { label: "Ujian", path: "/user/history" },
    ],
  },
];

/**
 * Admin Navigation Items
 */
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dasbor",
    path: "/admin/dashboard",
  },
  {
    label: "Pengaturan",
    path: "/admin/settings",
  },
  {
    label: "Kelas",
    path: "/admin/kelas",
  },
  {
    label: "Materi",
    path: "/admin/materi",
  },
  {
    label: "Soal",
    path: "/admin/soal",
  },
  {
    label: "Hasil Ujian",
    path: "/admin/hasil-ujian",
  },
];

/**
 * Logo Configuration
 */
export const LOGO_CONFIG = {
  light: {
    url: "https://via.placeholder.com/40",
    alt: "Logo LMS",
  },
  dark: {
    url: "https://via.placeholder.com/40?bg=000&fg=fff",
    alt: "Logo LMS Gelap",
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
