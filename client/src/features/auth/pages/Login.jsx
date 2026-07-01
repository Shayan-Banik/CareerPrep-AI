
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
          <p className="text-[14px] text-white/40 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0f1a] px-4">

      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-[#13162a] border border-white/[0.07] rounded-2xl p-8 sm:p-10 w-full max-w-sm shadow-2xl"
      >
        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-7">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-white/70 tracking-wide">InterviewAI</span>
        </div>

        <h1 className="text-xl font-semibold text-white/90 mb-1">
          Welcome back
        </h1>
        <p className="text-[13px] text-white/40 mb-8">
          Sign in to continue to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[10px] font-medium uppercase tracking-widest text-white/30 mb-1.5">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 px-3.5 rounded-xl border border-white/[0.07] bg-[#1a1d30] text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-[10px] font-medium uppercase tracking-widest text-white/30 mb-1.5">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full h-11 px-3.5 rounded-xl border border-white/[0.07] bg-[#1a1d30] text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right mb-7">
          <a href="#" className="text-[11px] text-white/25 hover:text-violet-400 transition-colors">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-300 text-[13px] font-medium hover:bg-violet-500/30 hover:border-violet-500/60 active:scale-[0.98] transition-all duration-150"
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-[11px] text-white/20">or</span>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        <p className="text-center text-[12px] text-white/30">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;