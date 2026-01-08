import React, { useState, useEffect, useRef } from "react";
import { stats } from "../../config/landingData";

export default function StatsSection() {
  // Tambahkan state global yang membaca sessionStorage agar animasi hanya sekali per session/tab
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(() => {
    try {
      return sessionStorage.getItem("landingStatsAnimated") === "true";
    } catch {
      return false;
    }
  });

  return (
    <section className="bg-linear-to-r bg-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              index={i}
              globalAnimated={hasAnimatedOnce}
              setGlobalAnimated={setHasAnimatedOnce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, globalAnimated, setGlobalAnimated }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  const Icon = stat.icon;

  // Extract number from string (e.g., "50K+" -> 50, "95%" -> 95)
  const targetNumber = parseInt(stat.number.replace(/[^0-9]/g, ""));
  const suffix = stat.number.replace(/[0-9]/g, "");

  useEffect(() => {
    // Jika global sudah pernah animasi, set langsung ke target dan tandai lokal
    if (globalAnimated) {
      setCount(targetNumber);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter();
          // Tandai global supaya tidak ada lagi animasi pada session ini
          try {
            sessionStorage.setItem("landingStatsAnimated", "true");
          } catch {}
          setGlobalAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalAnimated, hasAnimated, targetNumber]);

  const animateCounter = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = targetNumber / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(
        Math.floor(stepValue * currentStep),
        targetNumber
      );
      setCount(newCount);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(targetNumber);
      }
    }, duration / steps);
  };

  return (
    <div
      ref={elementRef}
      className="text-center animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <p className="text-5xl font-black text-white mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-white/90 font-medium">{stat.label}</p>
    </div>
  );
}
