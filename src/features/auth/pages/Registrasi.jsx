import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useRegistrasi from "../hooks/useRegistrasi";
import { handleRegistrasiSubmit } from "../services/AuthHandleSubmit";
import RegistrasiHero from "@/assets/RegistrasiHero.svg";
import Button from "@/components/button";
import { InputField, PasswordField } from "@/components/fields";

export default function RegistrasiPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error } = useRegistrasi();
  const navigate = useNavigate();

  const handleSubmit = (e) =>
    handleRegistrasiSubmit(
      e,
      { name, username, email, password },
      register,
      navigate
    );

  return (
    <motion.div
      className="min-h-screen flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Kiri: Form */}
      <div className="flex flex-1 flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-2">Let's Get Started</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div>{error}</div>}

            <InputField
              type="text"
              placeholder="What is your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <InputField
              type="text"
              placeholder="What is your username?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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

            <Button type="submit" fullWidth={true} disabled={loading}>
              {loading ? "Registering..." : "Continue"}
            </Button>
          </form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            By continuing you agree to our{" "}
            <span className="underline cursor-pointer">Terms & Conditions</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-zinc-500 font-semibold cursor-pointer hover:text-zinc-400"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Kanan: Image / Illustration */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 items-center justify-center flex-col p-8">
        <img
          src={RegistrasiHero}
          alt="Registrasi Hero"
          className="object-contain max-h-130 w-auto"
        />
        <div className="mt-6 text-center max-w-xs text-neutral-300">
          <h3 className="text-3xl font-semibold text-neutral-100 mb-2">
            Start Learning!
          </h3>
          <p className="text-sm">
            Join our community and unlock access to thousands of courses.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
