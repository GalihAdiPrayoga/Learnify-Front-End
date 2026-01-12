import { Link } from "react-router-dom";
import Logo from "@/components/logo";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  courses: [
    { label: "Telusuri Semua", href: "#" },
    { label: "Populer", href: "#" },
    { label: "Rilisan Baru", href: "#" },
  ],
  company: [
    { label: "Tentang Kami", href: "#" },
    { label: "Kontak", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Kebijakan Cookie", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-12 md:py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo to="/user/landing" size="md" showText={true} />
            <p className="text-gray-400 text-sm mt-4">
              Memberdayakan pelajar di seluruh dunia dengan pendidikan
              berkualitas.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Courses Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">Kursus</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.courses.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">
              Perusahaan
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left text-gray-400 text-xs md:text-sm">
            <p>&copy; 2024 Learning Hub. Semua hak dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
