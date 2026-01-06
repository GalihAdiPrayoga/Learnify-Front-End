import React from "react";
import { motion } from "framer-motion";
import { companies } from "../../config/landingData";

export default function TrustedCompanies() {
  // Duplicate companies untuk seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-12 bg-white border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8 font-semibold uppercase tracking-wider">
          Dipercaya oleh karyawan dari perusahaan terkemuka
        </p>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedCompanies.map((company, i) => (
              <div
                key={i}
                className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-900 transition whitespace-nowrap shrink-0"
              >
                {company}
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays untuk smooth edge */}
          <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
