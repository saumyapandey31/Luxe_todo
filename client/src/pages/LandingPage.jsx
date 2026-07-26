import { useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const FEATURES = [
  {
    n: "Daily Focus",
    title: "One task. Not twenty.",
    body: "Each morning, Luxe surfaces the single task that matters most today — so your list stops shouting and starts guiding.",
  },
  {
    n: "Habit Streaks",
    title: "Momentum you can see",
    body: "A calendar heatmap of your consistency, current streak and personal best, rendered like a piece worth framing.",
  },
  {
    n: "Pomodoro Studio",
    title: "Focus, then rest",
    body: "A 25-minute focus timer with an unhurried break timer — minimal enough to disappear into the background.",
  },
  {
    n: "Kanban Board",
    title: "See work move",
    body: "Drag tasks across To Do, In Progress, Review and Completed. Motion is feedback.",
  },
  {
    n: "Command Palette",
    title: "⌘K for everything",
    body: "Create a task, jump to a view, or search your whole workspace without lifting your hands from the keyboard.",
  },
  {
    n: "Analytics",
    title: "Your week, quantified",
    body: "Completion rate, category breakdowns and monthly trends — presented the way a good editor would, not a spreadsheet.",
  },
];

const STATS = [
  { value: "2.4×", label: "More tasks completed weekly" },
  { value: "18 min", label: "Average daily planning time" },
  { value: "94%", label: "Users who keep a 7-day streak" },
  { value: "40k+", label: "Focus sessions run monthly" },
];

const TESTIMONIALS = [
  {
    quote: "It's the first productivity app that doesn't feel like homework. I actually open it in the morning.",
    name: "Amara Chen",
    role: "Creative Director",
  },
  {
    quote: "The Daily Focus card alone changed how I plan my mornings. Everything else is a quiet bonus.",
    name: "Julian Voss",
    role: "Product Manager",
  },
  {
    quote: "Beautiful enough that I don't mind living inside it for eight hours a day.",
    name: "Priya Nair",
    role: "Independent Designer",
  },
];

const FAQS = [
  {
    q: "Is Luxe free to use?",
    a: "You can create an account and manage tasks at no cost. We may introduce optional premium tiers for teams later, but the core planning experience stays free.",
  },
  {
    q: "Can I use Luxe on my phone?",
    a: "Yes — the entire interface is built mobile-first and adapts from small phones up to ultra-wide monitors.",
  },
  {
    q: "Where is my data stored?",
    a: "Your tasks and account details are stored securely on our servers and protected behind authenticated APIs.",
  },
  {
    q: "Does Luxe support recurring tasks and reminders?",
    a: "Yes — set a task to repeat daily, weekly or monthly, and attach a reminder so nothing quietly slips.",
  },
];

function FeatureCard({ f, i }) {
  return (
    <div
      className="luxe-card luxe-card-hover p-8 luxe-fade-in"
      style={{ animationDelay: `${i * 90}ms` }}
    >
      <span className="luxe-pill inline-block px-3 py-1 bg-cream text-brown mb-6">{f.n}</span>
      <h3 className="font-display text-2xl text-brown-dark mb-3">{f.title}</h3>
      <p className="text-ink/65 leading-relaxed text-[15px]">{f.body}</p>
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-bg">
      <PublicNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-beige/50 blur-3xl" />
        <div className="absolute top-40 -left-32 w-[320px] h-[320px] rounded-full bg-gold/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="luxe-fade-in">
            <span className="luxe-pill inline-block px-4 py-1.5 bg-cream text-brown mb-7">
              Premium Productivity, Reimagined
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.05] text-brown-dark mb-7">
              A calmer way to move through your day
            </h1>
            <p className="text-lg text-ink/65 leading-relaxed max-w-lg mb-10">
              Luxe replaces the cluttered to-do list with one considered task at a time —
              wrapped in an interface that feels more like an editorial studio than software.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/signup" className="luxe-btn-primary px-8 py-4 text-[15px]">
                Start planning — it's free
              </Link>
              <a href="#features" className="luxe-btn-ghost px-8 py-4 text-[15px]">
                See how it works
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-ink/50">
              <div className="flex -space-x-3">
                {["#5B2D1D", "#C8A165", "#3B7D5D", "#B94A48"].map((c, i) => (
                  <span key={i} className="w-9 h-9 rounded-full border-2 border-bg" style={{ background: c }} />
                ))}
              </div>
              <p>Joined by 12,000+ focused people</p>
            </div>
          </div>

          <div className="relative luxe-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 luxe-arch bg-beige/60 scale-95 translate-x-4 translate-y-4" />
              <div className="relative luxe-card luxe-arch p-8 overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-brown/50 mb-1">Today's Focus</p>
                <h3 className="font-display text-2xl text-brown-dark mb-5">Ship the Luxe onboarding flow</h3>

                <div className="space-y-3 mb-6">
                  {["Wireframe empty states", "Write the welcome copy", "Review with the team"].map((t, i) => (
                    <div key={t} className="flex items-center gap-3 luxe-card !rounded-2xl px-4 py-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? "bg-success border-success text-white text-xs" : "border-brown/25"}`}
                      >
                        {i === 0 ? "✓" : ""}
                      </span>
                      <span className={`text-sm ${i === 0 ? "line-through text-ink/40" : "text-ink/80"}`}>{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between luxe-divider !bg-none !h-px" />
                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className="text-xs text-ink/45 mb-1">Productivity score</p>
                    <p className="font-display text-3xl text-brown-dark">86</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-gold/30 border-t-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-brown/8 bg-cream/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl text-brown-dark mb-1">{s.value}</p>
              <p className="text-sm text-ink/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="luxe-pill inline-block px-3 py-1 bg-cream text-brown mb-5">Features</span>
          <h2 className="font-display text-4xl lg:text-5xl text-brown-dark mb-5">
            Ten small studios, one workspace
          </h2>
          <p className="text-ink/60 text-lg leading-relaxed">
            Every feature is built to reduce noise, not add to it — each one a quiet upgrade over the last to-do app you tried.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-brown-dark text-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <span className="luxe-pill inline-block px-3 py-1 bg-cream/10 text-gold mb-5">How it works</span>
            <h2 className="font-display text-4xl lg:text-5xl mb-5">Three steps to a quieter list</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: "Capture", body: "Drop in tasks with ⌘K as fast as they come to mind — no forms to fight." },
              { step: "Focus", body: "Luxe lifts one task into Daily Focus so your morning has a clear first move." },
              { step: "Reflect", body: "Streaks, mood check-ins and weekly analytics show the shape of your effort." },
            ].map((s, i) => (
              <div key={s.step} className="luxe-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="font-display text-6xl text-gold/40 mb-4">0{i + 1}</p>
                <h3 className="font-display text-2xl mb-3">{s.step}</h3>
                <p className="text-cream/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <span className="luxe-pill inline-block px-3 py-1 bg-cream text-brown mb-5">Testimonials</span>
          <h2 className="font-display text-4xl lg:text-5xl text-brown-dark">People who slowed down and got more done</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="luxe-card luxe-card-hover p-8 flex flex-col">
              <p className="text-3xl text-gold mb-4 font-display">"</p>
              <p className="text-ink/75 leading-relaxed mb-6 flex-1">{t.quote}</p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-beige flex items-center justify-center font-display text-brown-dark">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium text-brown-dark">{t.name}</p>
                  <p className="text-xs text-ink/45">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream/40 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="luxe-pill inline-block px-3 py-1 bg-card text-brown mb-5">FAQ</span>
            <h2 className="font-display text-4xl text-brown-dark">Questions, answered plainly</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="luxe-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className="font-medium text-brown-dark">{f.q}</span>
                  <span className={`text-gold text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 text-ink/60 leading-relaxed luxe-fade-in">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="luxe-card p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-beige/40 blur-2xl" />
          <h2 className="font-display text-3xl lg:text-4xl text-brown-dark mb-4 relative">Get one gentle nudge a week</h2>
          <p className="text-ink/60 mb-8 max-w-md mx-auto relative">
            Productivity notes, feature previews and nothing that resembles spam.
          </p>
          {subscribed ? (
            <p className="text-success font-medium relative">You're on the list — welcome.</p>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="luxe-input flex-1 px-5 py-3.5 text-sm"
              />
              <button type="submit" className="luxe-btn-primary px-7 py-3.5 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
