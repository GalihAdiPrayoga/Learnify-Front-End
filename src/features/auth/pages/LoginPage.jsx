import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "../hooks/useLogin";
import { handleLoginSubmit } from "../services/AuthHandleSubmit";
import LoginHero from "@/assets/LoginHero.svg";
import Button from "@/components/button";
import { InputField, PasswordField } from "@/components/fields";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) =>
    handleLoginSubmit(e, { email, password }, login, navigate);

  return (
    <motion.div
      className="min-h-screen flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Kiri: Image / Illustration */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 items-center justify-center flex-col p-8">
        <img
          src={LoginHero}
          alt="Login Hero"
          className="object-contain max-h-100 w-auto"
        />
        <div className="mt-6 text-center max-w-xs text-neutral-300">
          <h3 className="text-3xl font-semibold text-neutral-100 mb-2">
            Welcome back!
          </h3>
          <p className="text-3sm">
            Sign in to access your courses, track progress, and continue
            learning.
          </p>
        </div>
      </div>

      {/* Kanan: Form */}
      <div className="flex flex-1 flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-2">Let's Get Started</h2>
          <p className="text-gray-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div>{error}</div>}

            <InputField
              type="email"
              placeholder="What is your e-mail?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordField
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit"
            fullWidth={true}
            disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </Button>
          </form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            By continuing you agree to our{" "}
            <span className="underline cursor-pointer">Terms & Conditions</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-zinc-800 font-semibold cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
