import { Outlet } from "react-router-dom";
import Navbar from "@/app/navigation/user/navbar";
import Footer from "@/app/navigation/user/footer";

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
