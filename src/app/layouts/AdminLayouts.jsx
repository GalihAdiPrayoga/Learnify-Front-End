import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/features/admin/components/sidebar";
import Header from "@/features/admin/components/header";

export default function AdminLayouts() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      setHasScrolled(mainElement.scrollTop > 10);
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <Header hasScrolled={hasScrolled} />

        <main ref={mainRef} className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
