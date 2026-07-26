import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brown-dark">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-beige/10 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-14 text-cream w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-gold/90 flex items-center justify-center text-brown-dark font-display">L</span>
            <span className="font-display text-xl">Luxe</span>
          </Link>
          <div className="max-w-md luxe-fade-in">
            <p className="text-4xl font-display leading-tight mb-4">
              "The Daily Focus card alone changed how I plan my mornings."
            </p>
            <p className="text-cream/60">Julian Voss — Product Manager</p>
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

          <h1 className="font-display text-3xl text-brown-dark mb-2">Welcome back</h1>
          <p className="text-ink/55 mb-9">Log in to continue your streak.</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                placeholder=" "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm"
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brown transition-all pointer-events-none"
              >
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                required
                placeholder=" "
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm pr-12"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brown transition-all pointer-events-none"
              >
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-brown"
                />
                Remember me
              </label>
              <a href="#" className="text-brown hover:text-brown-dark">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="luxe-btn-primary w-full py-3.5 text-sm disabled:opacity-60">
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm text-ink/55 mt-8">
            New to Luxe?{" "}
            <Link to="/signup" className="text-brown font-medium hover:text-brown-dark">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
