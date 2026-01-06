import toastr from "toastr";
import { logout } from "@/services/api/auth.api";

export const handleRegistrasiSubmit = async (
  e,
  { name, username, email, password },
  register,
  navigate
) => {
  e.preventDefault();
  try {
    await register({ name, username, email, password });
    toastr.success("Registrasi berhasil. Silakan login.");
    navigate("/login", { replace: true });
  } catch (err) {
    const msg =
      err?.response?.data?.message || err.message || "Registration failed";
    toastr.error(msg);
  }
};

export const handleLoginSubmit = async (
  e,
  { email, password },
  login,
  navigate
) => {
  e.preventDefault();
  try {
    const response = await login({ email, password });
    const roles = response?.roles || [];

    const role = roles[0]?.toLowerCase() || "user";

    console.log("LOGIN RESPONSE:", response);
    toastr.success("Login berhasil");

    setTimeout(() => {
      const navigatePath =
        role === "admin" ? "/admin/dashboard" : "/user/landing";
      navigate(navigatePath, { replace: true });
    }, 300);
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || "Login failed";
    toastr.error(msg);
  }
};

export const handleLogout = async (navigate) => {
  try {
    await logout();
    toastr.success("Logout berhasil");
    navigate("/login", { replace: true });
  } catch (err) {
    console.error("Logout error:", err);
    toastr.error("Logout gagal, silakan coba lagi");
    navigate("/login", { replace: true });
  }
};
