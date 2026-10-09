"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Film,
  Sparkles,
} from "lucide-react";
import { API_URL, setAdminToken } from "../utils/adminAuth";

const FEATURES = [
  { icon: Film, text: "Manage the YouTube video library" },
  { icon: Sparkles, text: "Update site content in real time" },
  { icon: ShieldCheck, text: "Secure, role-based admin access" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setAdminToken(data.token);
      router.push("/admin/videos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left — brand panel (desktop only). Holds the page's one image. */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-800">
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -left-16 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0 overflow-hidden p-2">
              <img src="/kec-logo.png" alt="KEC Biofuel logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">KEC Biofuel</p>
              <p className="text-green-200/70 text-sm">Content Admin Panel</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
              Power your content,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                the way you power CBG.
              </span>
            </h2>
            <div className="space-y-4">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-300/30 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-orange-300" strokeWidth={2.25} />
                  </div>
                  <p className="text-green-50/90 text-sm font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-green-200/50 text-xs">© {new Date().getFullYear()} KEC Biofuel. All rights reserved.</p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex flex-col">
        {/* Compact brand header, mobile only — text mark, no image */}
        <div className="lg:hidden bg-gradient-to-r from-green-800 to-emerald-700 px-6 py-5">
          <p className="text-white font-bold text-lg leading-tight">KEC Biofuel</p>
          <p className="text-green-200/70 text-xs">Content Admin Panel</p>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10 sm:py-16">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-green-700 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to website
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-700 tracking-wide uppercase">Admin Access</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">Welcome back</h1>
            <p className="text-sm text-gray-500 mb-8">Sign in to manage KEC Biofuel content</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@kecbiofuel.com"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-3.5 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-600/20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-[18px] h-[18px] animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-[18px] h-[18px]" /> Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-7">
              Trouble signing in? Contact your site administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
