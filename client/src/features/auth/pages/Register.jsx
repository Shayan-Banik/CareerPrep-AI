import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegister({ username, email, password });
    if (success) navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-sm shadow-sm">
        <h1 className="text-2xl font-serif font-normal text-gray-900 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Sign in to continue to your account
        </p>

        <div className="mb-5">
          <label className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-1.5">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="you@example.com"
            className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-1.5">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-medium uppercase tracking-widest text-gray-500 mb-1.5">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full h-11 px-3.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <div className="text-right mb-6">
          <a href="#" className="text-xs text-gray-400 hover:text-gray-700">
            Forgot password?
          </a>
        </div>

        <button className="w-full h-11 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[0.98] transition-all">
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline">
            login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
