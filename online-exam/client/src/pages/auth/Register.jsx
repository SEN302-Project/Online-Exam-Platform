import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Eye, EyeOff, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ROLES = [
  { value: "student", label: "Student", description: "Take exams and view results" },
  { value: "instructor", label: "Instructor", description: "Create and manage exams" },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    institution: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }
    setLoading(true);
    try {
      await register(formData);
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      // Show backend error message if available, otherwise generic
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-display text-lg font-bold text-ink-900">Proctera</span>
        </Link>

        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6">
          <ArrowLeft size={15} /> Back to sign in
        </Link>

        <div className="card p-5 sm:p-8">
          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-6 sm:mb-7">
            {[1, 2].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                    step >= s ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-400"
                  }`}
                >
                  {step > s ? <Check size={13} strokeWidth={3} /> : s}
                </div>
                {s === 1 && <div className={`flex-1 h-0.5 ${step > 1 ? "bg-ink-900" : "bg-ink-100"}`} />}
              </div>
            ))}
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink-900">
            {step === 1 ? "Choose your role" : "Account details"}
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            {step === 1 ? "How will you use Proctera?" : "Fill in your information to continue."}
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-danger/30 bg-danger/5 px-4 py-2.5 text-sm text-danger">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 space-y-2.5">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r.value })}
                  className={`w-full text-left rounded-xl border-2 p-4 transition ${
                    formData.role === r.value
                      ? "border-accent-600 bg-accent-50"
                      : "border-ink-100 hover:border-ink-300 bg-white"
                  }`}
                >
                  <div className="font-semibold text-ink-900">{r.label}</div>
                  <div className="text-sm text-ink-500 mt-0.5">{r.description}</div>
                </button>
              ))}

              <button onClick={() => setStep(2)} className="btn-primary w-full mt-4">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Institutional email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="you@university.edu"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Institution</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="input"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input pr-10"
                    placeholder="Min 8 characters"
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

              <div>
                <label className="text-sm font-medium text-ink-700 block mb-1.5">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="input pr-10"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
                  Back
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? "Creating…" : "Create account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}