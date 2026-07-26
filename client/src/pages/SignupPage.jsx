import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score++;
    return score;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const strength = passwordStrength();
  const strengthLabel = ["Too short", "Weak", "Good", "Strong"][strength];
  const strengthColor = ["#B94A48", "#C8A165", "#C8A165", "#3B7D5D"][strength];

  return (
    <div className="min-h-screen bg-bg flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brown-dark">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-beige/10 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-14 text-cream w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-gold/90 flex items-center justify-center text-brown-dark font-display">L</span>
            <span className="font-display text-xl">Luxe</span>
          </Link>
          <div className="max-w-md luxe-fade-in">
            <p className="font-display text-4xl leading-tight mb-4">Join 12,000+ people who traded busy for focused.</p>
            <div className="flex gap-8 mt-8">
              <div>
                <p className="font-display text-3xl text-gold">2.4×</p>
                <p className="text-cream/50 text-sm">more tasks done</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">94%</p>
                <p className="text-cream/50 text-sm">keep a streak</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-cream/40">© {new Date().getFullYear()} Luxe Studio</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md luxe-fade-in">
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-brown to-brown-dark flex items-center justify-center text-cream font-display">L</span>
            <span className="font-display text-xl text-brown-dark">Luxe</span>
          </Link>

          <h1 className="font-display text-3xl text-brown-dark mb-2">Create your account</h1>
          <p className="text-ink/55 mb-9">Free forever. Takes less than a minute.</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                id="name"
                type="text"
                required
                placeholder=" "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm"
              />
              <label htmlFor="name" className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brown transition-all pointer-events-none">
                Full name
              </label>
            </div>

            <div className="relative">
              <input
                id="signup-email"
                type="email"
                required
                placeholder=" "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm"
              />
              <label htmlFor="signup-email" className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brown transition-all pointer-events-none">
                Email address
              </label>
            </div>

            <div>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPw ? "text" : "password"}
                  required
                  placeholder=" "
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm pr-12"
                />
                <label htmlFor="signup-password" className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brown transition-all pointer-events-none">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brown/50 hover:text-brown"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2 mt-2 px-1">
                  <div className="flex-1 h-1 rounded-full bg-brown/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(strength / 3) * 100}%`, background: strengthColor }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="luxe-btn-primary w-full py-3.5 text-sm disabled:opacity-60">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-ink/55 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-brown font-medium hover:text-brown-dark">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
