import { Outlet } from "react-router-dom";
import Navbar from "@/features/users/components/navbar";
import Footer from "@/features/users/components/footer";

export default function UserLayouts() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
