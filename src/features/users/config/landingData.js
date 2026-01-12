import {
  Code,
  Smartphone,
  TrendingUp,
  Layers,
  Target,
  Globe,
  Users,
  UserCheck,
  BookOpen,
  Award,
  Clock,
  MessageCircle,
  BarChart3,
} from "lucide-react";

export const companies = [
  "Google",
  "Microsoft",
  "Meta",
  "Amazon",
  "Netflix",
  "Apple",
];

export const stats = [
  { number: "1000", label: "Siswa Aktif", icon: Users },
  { number: "25", label: "Instruktur Ahli", icon: UserCheck },
  { number: "10", label: "Kursus Tersedia", icon: BookOpen },
  { number: "95%", label: "Tingkat Keberhasilan", icon: Award },
];

export const learningPaths = [
  {
    title: "Web Development",
    duration: "6 Bulan",
    courses: 12,
    level: "Pemula hingga Lanjutan",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
  },
  {
    title: "Data Science",
    duration: "8 Bulan",
    courses: 15,
    level: "Menengah",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    skills: ["Python", "Statistics", "ML", "Data Viz"],
  },
  {
    title: "Mobile Development",
    duration: "5 Bulan",
    courses: 10,
    level: "Pemula hingga Lanjutan",
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    skills: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    title: "Cloud & DevOps",
    duration: "4 Bulan",
    courses: 8,
    level: "Lanjutan",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
];

export const categories = [
  { name: "Pengembangan Web", courses: 125, icon: Code },
  { name: "Aplikasi Mobile", courses: 89, icon: Smartphone },
  { name: "Data Science", courses: 67, icon: TrendingUp },
  { name: "Desain & UI/UX", courses: 54, icon: Layers },
  { name: "Bisnis", courses: 78, icon: Target },
  { name: "Bahasa", courses: 92, icon: Globe },
];

export const features = [
  {
    icon: Clock,
    title: "Belajar Dengan Fleksibel",
    desc: "Akses materi kapan saja, dimana saja. Belajar sesuai pace Anda sendiri.",
  },
  {
    icon: UserCheck,
    title: "Instruktur Berpengalaman",
    desc: "Belajar langsung dari para profesional yang bekerja di perusahaan terkemuka.",
  },
  {
    icon: Award,
    title: "Sertifikat Diakui",
    desc: "Dapatkan sertifikat yang dapat meningkatkan kredibilitas CV Anda.",
  },
  {
    icon: MessageCircle,
    title: "Komunitas Support",
    desc: "Bergabung dengan ribuan learner dan dapatkan bantuan kapan dibutuhkan.",
  },
  {
    icon: Smartphone,
    title: "Akses Mobile",
    desc: "Belajar dari smartphone, tablet, atau laptop dengan seamless experience.",
  },
  {
    icon: TrendingUp,
    title: "Materi Terkini",
    desc: "Konten selalu diupdate mengikuti perkembangan teknologi dan industri.",
  },
];

export const faqs = [
  {
    q: "Bagaimana cara memulai belajar di platform ini?",
    a: "Cukup buat akun lalu login. Semua materi dapat diakses secara gratis tanpa biaya apa pun.",
  },
  {
    q: "Apakah platform ini menyediakan sertifikat?",
    a: "Tidak. Platform ini fokus pada pembelajaran gratis, sehingga tidak menyediakan sertifikat. Namun semua materi tetap bisa dipelajari sepenuhnya.",
  },
  {
    q: "Apakah semua kursus benar-benar gratis?",
    a: "Ya, seluruh materi, kelas, dan latihan tersedia gratis tanpa biaya langganan atau pembayaran apa pun.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan satu materi?",
    a: "Tergantung pada kecepatan belajar masing-masing pengguna. Anda dapat belajar kapan saja tanpa batasan waktu.",
  },
  {
    q: "Bisakah saya belajar menggunakan HP atau tablet?",
    a: "Bisa. Platform ini mendukung tampilan mobile sehingga dapat diakses dari perangkat apa pun, termasuk smartphone dan tablet.",
  },
  {
    q: "Apakah saya perlu instal aplikasi?",
    a: "Tidak perlu. Anda dapat langsung belajar melalui browser karena platform ini berbasis web.",
  },
];
