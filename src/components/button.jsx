import React from "react";

export default function Button({
  type = "button",
  disabled = false,
  loading = false,
  children,
  className = "",
  variant = "primary",
  fullWidth = false,
  ...props
}) {
  const baseStyles = `${
    fullWidth ? "w-full" : "inline-flex"
  } py-3 font-semibold rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed items-center justify-center gap-2`;

  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      )}
      {children}
    </button>
  );
}
