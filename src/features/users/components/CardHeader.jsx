import { ArrowLeft } from "lucide-react";

const CardHeader = ({ title, subtitle, showBack = false, onBack }) => {
  return (
    <section
      className="group bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-10 w-full shadow-xl pb-24 text-start relative overflow-hidden rounded-xl mb-8
                 hover:shadow-2xl"
    >
      {/* Decorative layers */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-800/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transform transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl opacity-50 group-hover:opacity-90 group-hover:scale-105 transform transition-all duration-300" />
      <div className="absolute top-10 right-20 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
      <div className="absolute bottom-10 left-20 w-16 h-16 border-2 border-white/5 rounded-full transition-transform duration-300 group-hover:scale-110" />

      {/* Back Button */}
      {showBack && (
        <button
          onClick={onBack}
          className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 text-white px-3 py-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      )}

      {/* Content (DITURUNKAN) */}
      <div className={showBack ? "pt-14 relative z-10" : "relative z-10"}>
        <h1
          className="
            text-4xl font-extrabold tracking-wide
            transition-all duration-500 ease-out
            group-hover:text-white
            group-hover:[text-shadow:0_0_20px_rgba(96,165,250,0.8),0_0_40px_rgba(59,130,246,0.6),0_0_60px_rgba(37,99,235,0.4)]
            [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              text-lg mt-3 text-zinc-300 font-medium
              transition-all duration-500 ease-out
              group-hover:text-white
              group-hover:[text-shadow:0_0_15px_rgba(147,197,253,0.7),0_0_30px_rgba(96,165,250,0.5)]
            "
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default CardHeader;
