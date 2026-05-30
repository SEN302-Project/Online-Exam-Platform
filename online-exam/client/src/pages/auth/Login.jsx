import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, GraduationCap, ShieldCheck, ScanFace, BarChart3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOMES } from "../../utils/roleGuard";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(formData.email, formData.password);
      navigate(ROLE_HOMES[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ink-50">
      {/* Left brand panel - hidden on mobile */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 bg-ink-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-600/30 blur-3xl" aria-hidden />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink-950">
              <GraduationCap size={22} strokeWidth={2.25} />
            </div>
            <div className="font-display text-xl font-bold tracking-tight">Proctera</div>
          </div>
        </div>

        <div className="relative space-y-8">
          <div>
            <h1 className="font-display text-5xl font-bold leading-tight">
              Examinations,
              <br />
              <span className="text-accent-500">re-engineered.</span>
            </h1>
            <p className="mt-4 text-ink-300 text-lg max-w-md leading-relaxed">
              Secure, intelligent, and trusted by institutions to deliver assessments at scale.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { icon: ScanFace, label: "AI Proctoring" },
              { icon: ShieldCheck, label: "Plagiarism Checks" },
              { icon: BarChart3, label: "Live Analytics" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <f.icon size={20} className="text-accent-500 mb-2" />
                <div className="text-xs font-medium text-ink-200">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-ink-500">© 2026 Proctera. Built for academic integrity.</div>
      </div>

      {/* Right form - full width on mobile */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-white">
              <GraduationCap size={20} />
            </div>
            <span className="font-display text-lg font-bold text-ink-900">Proctera</span>
          </Link>

          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">Welcome back</h2>
          <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Sign in to access your dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
            {error && (
              <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-2.5 text-sm text-danger">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-ink-700 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@university.edu"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-700">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-accent-600 hover:text-accent-700">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-500">
            New here?{" "}
            <Link to="/register" className="font-semibold text-accent-600 hover:text-accent-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}