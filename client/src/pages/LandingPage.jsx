import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Command,
  Flame,
  Kanban,
  LayoutGrid,
  Menu,
  Timer,
  TrendingUp,
  X,
  Shield,
  Lock,
  Users,
  BellRing,
  Scissors,
  Ruler,
  Pin,
  Quote,
  PenTool,
  Compass,
} from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

/* lucide-react no longer ships trademarked brand/logo glyphs, so the three
   social marks used in the mobile menu are small inline SVGs instead. */
function GithubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}
function TwitterMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18.9 2.25h3.68l-8.04 9.19 9.46 12.31h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L.03 2.25h7.58l5.24 6.93 6.05-6.93Zm-1.29 19.3h2.04L6.5 4.32H4.3l13.31 17.23Z" />
    </svg>
  );
}
function LinkedinMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared motion presets                                              */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = (gap = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const viewport = { once: true, margin: "-80px" };

/* ------------------------------------------------------------------ */
/*  Atelier signature primitives                                       */
/* ------------------------------------------------------------------ */

/** A fixed, scroll-linked gold thread running down the left margin —
 *  the page's spine. A brass bead rides it, marking how far you've read. */
function ThreadRail() {
  const { scrollYProgress } = useScroll();
  const beadY = useTransform(scrollYProgress, [0, 1], ["2%", "96%"]);
  return (
    <div className="hidden lg:flex flex-col items-center fixed left-7 top-0 bottom-0 w-4 z-30 pointer-events-none">
      <div className="relative flex-1 w-px my-10">
        <div className="absolute inset-0 w-px bg-[repeating-linear-gradient(180deg,color-mix(in_srgb,var(--color-brown,#5b2d1d)_28%,transparent)_0px,color-mix(in_srgb,var(--color-brown,#5b2d1d)_28%,transparent)_3px,transparent_3px,transparent_9px)]" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-0 w-px bg-gold origin-top"
        />
        <motion.div style={{ top: beadY }} className="absolute -left-[5px] luxe-thread-bead" />
      </div>
    </div>
  );
}

/** Pinking-shears zigzag edge — literally how an atelier cuts fabric so it
 *  won't fray — used between light and dark sections instead of a generic wave. */
function ZigzagDivider({ tone = "toDark", teeth = 34, height = 22 }) {
  const pts = [];
  const w = 1200;
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * w;
    const y = i % 2 === 0 ? 0 : height;
    pts.push(`${x},${y}`);
  }
  pts.push(`${w},${height + 40}`, `0,${height + 40}`);
  const fill = tone === "toDark" ? "var(--color-brown-dark, #3b2314)" : "var(--color-bg, #fdfbf7)";
  return (
    <div className="relative w-full overflow-hidden leading-[0]" style={{ height }} aria-hidden="true">
      <svg viewBox={`0 0 ${w} ${height + 40}`} preserveAspectRatio="none" className="w-full h-full block">
        <motion.polygon
          points={pts.join(" ")}
          fill={fill}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </svg>
    </div>
  );
}

function SpecTag({ children }) {
  return (
    <motion.div variants={fadeUp} className="inline-flex flex-col gap-1 mb-5">
      <span className="luxe-pill inline-flex items-center gap-1.5 px-3 py-1 bg-cream text-brown w-fit">
        <Ruler className="w-3 h-3" />
        {children}
      </span>
      <span className="luxe-ruler w-24 rounded-full" />
    </motion.div>
  );
}

function MagneticButton({ as: As = "button", className = "", children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <As
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`luxe-liquid-btn relative overflow-hidden ${className}`}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </As>
    </motion.div>
  );
}

function CountUp({ value, suffix = "", decimals = 0, duration = 1.8 }) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);
  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        animate(0, value, {
          duration,
          ease: EASE,
          onUpdate: (v) => setDisplay(v.toFixed(decimals)),
        });
      }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {display}
      {suffix}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const FEATURES = [
  { icon: Flame, n: "01", title: "Daily Focus", body: "Each morning, Luxe surfaces the single task that matters most today — so your list stops shouting and starts guiding.", size: "lg", rot: -1.5 },
  { icon: TrendingUp, n: "02", title: "Habit Streaks", body: "A calendar heatmap of your consistency, current streak and personal best.", size: "sm", rot: 1.2 },
  { icon: Timer, n: "03", title: "Pomodoro Studio", body: "A 25-minute focus timer with an unhurried break timer.", size: "sm", rot: -0.8 },
  { icon: Command, n: "04", title: "Command Palette", body: "Create a task, jump to a view, or search without lifting your hands from the keyboard.", size: "lg", rot: 1 },
  { icon: Kanban, n: "05", title: "Kanban Board", body: "Drag tasks across To Do, In Progress, Review and Completed.", size: "sm", rot: 1.8 },
  { icon: LayoutGrid, n: "06", title: "Analytics", body: "Completion rate, category breakdowns and monthly trends.", size: "sm", rot: -1.4 },
];

const STATS = [
  { value: 2.4, decimals: 1, suffix: "×", label: "More tasks completed weekly" },
  { value: 18, suffix: " min", label: "Average daily planning time" },
  { value: 94, suffix: "%", label: "Users who keep a 7-day streak" },
  { value: 40, suffix: "k+", label: "Focus sessions run monthly" },
];

const TESTIMONIALS = [
  { quote: "It's the first productivity app that doesn't feel like homework. I actually open it in the morning.", name: "Amara Chen", role: "Creative Director" },
  { quote: "The Daily Focus card alone changed how I plan my mornings. Everything else is a quiet bonus.", name: "Julian Voss", role: "Product Manager" },
  { quote: "Beautiful enough that I don't mind living inside it for eight hours a day.", name: "Priya Nair", role: "Independent Designer" },
  { quote: "Switched three teams over from spreadsheets. Nobody has asked to go back.", name: "Marcus Webb", role: "Engineering Lead" },
];

const FAQS = [
  { q: "Is Luxe free to use?", a: "You can create an account and manage tasks at no cost. We may introduce optional premium tiers for teams later, but the core planning experience stays free." },
  { q: "Can I use Luxe on my phone?", a: "Yes — the entire interface is built mobile-first and adapts from small phones up to ultra-wide monitors." },
  { q: "Where is my data stored?", a: "Your tasks and account details are stored securely on our servers and protected behind authenticated APIs." },
  { q: "Does Luxe support recurring tasks and reminders?", a: "Yes — set a task to repeat daily, weekly or monthly, and attach a reminder so nothing quietly slips." },
];

const COMPANIES = ["Northwind", "Alder & Co", "Fieldstone", "Meridian", "Ostro", "Kindred Labs", "Basalt", "Verano"];

const WORKFLOW = [
  { step: "Capture", body: "Drop in tasks with ⌘K as fast as they come to mind — no forms to fight.", tag: "PATTERN A" },
  { step: "Focus", body: "Luxe lifts one task into Daily Focus so your morning has a clear first move.", tag: "PATTERN B" },
  { step: "Reflect", body: "Streaks, mood check-ins and weekly analytics show the shape of your effort.", tag: "PATTERN C" },
];

const PRICING = [
  { name: "Personal", price: "Free", body: "Everything you need to plan a considered day.", features: ["Daily Focus", "Habit streaks", "Pomodoro Studio", "Command palette"], cta: "Start free" },
  { name: "Studio", price: "$9", period: "/mo", body: "For people who live inside their workspace.", features: ["Everything in Personal", "Unlimited boards", "Advanced analytics", "Priority support"], cta: "Start trial", featured: true },
  { name: "Team", price: "$19", period: "/mo per seat", body: "Shared focus for small, fast teams.", features: ["Everything in Studio", "Shared kanban boards", "Team analytics", "Admin controls"], cta: "Talk to us" },
];

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["⌘", "N"], label: "New task" },
  { keys: ["⌘", "/"], label: "Toggle sidebar" },
  { keys: ["G", "F"], label: "Go to Daily Focus" },
  { keys: ["G", "B"], label: "Go to board" },
  { keys: ["⌘", "⏎"], label: "Complete task" },
];

const ROADMAP = [
  { quarter: "Shipped", title: "Command palette & keyboard-first flows", done: true },
  { quarter: "This quarter", title: "Team boards with shared analytics", done: false },
  { quarter: "Next up", title: "Calendar sync (Google, Outlook)", done: false },
  { quarter: "Exploring", title: "Native offline mode", done: false },
];

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

const SECTIONS = ["features", "how", "testimonials", "pricing", "faq"];

function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const links = [
    { id: "features", label: "Features" },
    { id: "how", label: "How it works" },
    { id: "testimonials", label: "Stories" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4"
      >
        <motion.div
          animate={{ marginTop: scrolled ? 12 : 20, paddingInline: scrolled ? 18 : 26, paddingBlock: scrolled ? 8 : 12 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="luxe-glass w-full max-w-4xl rounded-full flex items-center justify-between shadow-[0_8px_30px_-12px_rgba(59,35,20,0.25)]"
        >
          <Link to="/" className="flex items-center gap-2 font-display text-lg text-brown-dark tracking-tight">
            <span className="w-6 h-6 rounded-full bg-gold/90 flex items-center justify-center text-[11px] text-brown-dark font-bold">L</span>
            Luxe
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="relative px-4 py-2 text-sm text-ink/65 hover:text-brown-dark transition-colors">
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="luxe-nav-underline" className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-gold rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-block text-sm text-ink/60 hover:text-brown-dark px-3 py-2">Log in</Link>
            <MagneticButton as={Link} to="/signup" className="luxe-btn-primary px-5 py-2.5 text-sm">Start free</MagneticButton>
            <button onClick={() => setMenuOpen(true)} className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-brown-dark" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.header>
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}

function FullscreenMenu({ open, onClose, links }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="fixed inset-0 z-[60] luxe-glass-dark luxe-pattern-paper-dark text-cream flex flex-col">
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="flex items-center justify-between px-6 py-6 relative">
            <span className="font-display text-xl">Luxe</span>
            <button onClick={onClose} aria-label="Close menu" className="w-10 h-10 rounded-full flex items-center justify-center border border-cream/15">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2 relative">
            {links.map((l, i) => (
              <motion.a key={l.id} href={`#${l.id}`} onClick={onClose} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }} className="font-display text-4xl sm:text-5xl py-2 text-cream/90 hover:text-gold transition-colors">
                {l.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center justify-between px-8 py-8 relative">
            <Link to="/signup" onClick={onClose} className="luxe-btn-primary px-6 py-3 text-sm">Start free</Link>
            <div className="flex items-center gap-4 text-cream/50">
              <TwitterMark className="w-4 h-4" />
              <GithubMark className="w-4 h-4" />
              <LinkedinMark className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — asymmetric editorial "brief", not a symmetric split          */
/* ------------------------------------------------------------------ */

function AnimatedHeadline() {
  const line1 = "A calmer way";
  const line2 = "to move through";
  return (
    <h1 className="font-display leading-[0.95] text-brown-dark mb-8">
      <span className="block text-4xl sm:text-5xl lg:text-6xl">
        {line1.split(" ").map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: EASE }} className="inline-block mr-[0.28em]">
            {w}
          </motion.span>
        ))}
      </span>
      <span className="block text-4xl sm:text-5xl lg:text-6xl">
        {line2.split(" ").map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: EASE }} className="inline-block mr-[0.28em]">
            {w}
          </motion.span>
        ))}
      </span>
      <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease: EASE }} className="luxe-gradient-text block text-7xl sm:text-8xl lg:text-[7.5rem] -mt-2">
        your day
      </motion.span>
    </h1>
  );
}

function HeroMockup() {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-40, 40], [5, -5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(px, [-40, 40], [-5, 5]), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set(e.clientX - r.left - r.width / 2);
    py.set(e.clientY - r.top - r.height / 2);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const [checks, setChecks] = useState([true, false, false]);
  useEffect(() => {
    const t1 = setTimeout(() => setChecks([true, true, false]), 1500);
    const t2 = setTimeout(() => setChecks([true, true, true]), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  const ringPct = checks.filter(Boolean).length / checks.length;

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ perspective: 1200 }} className="relative mx-auto lg:mx-0 lg:ml-auto max-w-md">
      <motion.div style={{ rotateX: rx, rotateY: ry, rotate: -2 }} className="relative luxe-swatch" >
        <div className="absolute -top-4 left-10 luxe-pin" />
        <div className="absolute inset-0 luxe-arch bg-beige/60 scale-95 translate-x-4 translate-y-4 -z-10" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }} className="relative luxe-card luxe-glass luxe-arch p-8 overflow-hidden">
          <p className="text-xs uppercase tracking-widest text-brown/50 mb-1">Today's Focus</p>
          <h3 className="font-display text-2xl text-brown-dark mb-5">Ship the Luxe onboarding flow</h3>
          <div className="space-y-3 mb-6">
            {["Wireframe empty states", "Write the welcome copy", "Review with the team"].map((t, i) => (
              <motion.div key={t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex items-center gap-3 luxe-card !rounded-2xl px-4 py-3">
                <motion.span animate={{ backgroundColor: checks[i] ? "var(--color-success, #3b7d5d)" : "transparent", borderColor: checks[i] ? "var(--color-success, #3b7d5d)" : "rgba(91,45,29,0.25)" }} className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-white text-xs shrink-0">
                  <AnimatePresence>{checks[i] && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-3 h-3" /></motion.span>}</AnimatePresence>
                </motion.span>
                <span className={`text-sm transition-colors ${checks[i] ? "line-through text-ink/40" : "text-ink/80"}`}>{t}</span>
              </motion.div>
            ))}
          </div>
          <div className="luxe-divider !bg-none !h-px" />
          <div className="flex items-center justify-between mt-5">
            <div>
              <p className="text-xs text-ink/45 mb-1">Productivity score</p>
              <p className="font-display text-3xl text-brown-dark"><CountUp value={86} /></p>
            </div>
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-beige, #e6d9c3)" strokeWidth="5" />
                <motion.circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-gold, #c8a165)" strokeWidth="5" strokeLinecap="round" strokeDasharray={2 * Math.PI * 27} initial={{ strokeDashoffset: 2 * Math.PI * 27 }} animate={{ strokeDashoffset: 2 * Math.PI * 27 * (1 - ringPct) }} transition={{ duration: 0.8, ease: EASE }} />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.2, duration: 0.6, ease: EASE }} className="absolute -right-10 top-4 luxe-card luxe-glass luxe-swatch px-4 py-3 flex items-center gap-3 shadow-lg hidden sm:flex" style={{ "--r": "3deg", animation: "luxe-float 6s ease-in-out infinite" }}>
        <span className="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center"><BellRing className="w-4 h-4" /></span>
        <div>
          <p className="text-xs font-medium text-brown-dark">Streak saved</p>
          <p className="text-[11px] text-ink/45">14 days running</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.35, duration: 0.6, ease: EASE }} className="absolute -left-14 bottom-10 luxe-card luxe-glass luxe-swatch px-4 py-3 hidden sm:block" style={{ "--r": "-2deg", animation: "luxe-float 7s ease-in-out infinite 0.4s" }}>
        <p className="text-[11px] text-ink/45 mb-1">This week</p>
        <svg width="88" height="30" viewBox="0 0 88 30">
          <motion.polyline points="0,24 14,18 28,20 42,10 56,14 70,4 88,8" fill="none" stroke="var(--color-gold, #c8a165)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 1.2, ease: EASE }} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const blobX = useSpring(useTransform(mx, [-1, 1], [-20, 20]), { stiffness: 60, damping: 20 });
  const blobY = useSpring(useTransform(my, [-1, 1], [-20, 20]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 luxe-pattern-paper">
      <motion.div style={{ x: blobX, translateY: blobY }} className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-beige/50 blur-3xl" />
      <div className="absolute top-40 -left-32 w-[320px] h-[320px] rounded-full bg-gold/15 blur-3xl" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 pb-28 lg:pb-40 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-end">
        <motion.div initial="hidden" animate="show" variants={stagger(0.1)}>
          <motion.div variants={fadeUp} className="mb-6">
            <SpecTag>Measured for a considered day</SpecTag>
          </motion.div>
          <AnimatedHeadline />
          <motion.p variants={fadeUp} className="text-lg text-ink/65 leading-relaxed max-w-lg mb-10">
            Luxe replaces the cluttered to-do list with one considered task at a time —
            cut and stitched like a piece from a studio that never overworks a design.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <MagneticButton as={Link} to="/signup" className="luxe-btn-primary px-8 py-4 text-[15px]">
              Start planning — it's free <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton as="a" href="#features" className="luxe-btn-ghost px-8 py-4 text-[15px]">
              See how it works
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-center gap-6 mt-10 text-sm text-ink/50">
            <div className="flex -space-x-3">
              {["#5B2D1D", "#C8A165", "#3B7D5D", "#B94A48"].map((c, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.08, type: "spring", stiffness: 300 }} className="w-9 h-9 rounded-full border-2 border-bg" style={{ background: c }} />
              ))}
            </div>
            <p>Joined by 12,000+ focused people</p>
          </motion.div>
        </motion.div>

        <HeroMockup />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trusted by / swatch strip                                          */
/* ------------------------------------------------------------------ */

function TrustedBy() {
  const doubled = [...COMPANIES, ...COMPANIES];
  return (
    <section className="border-y border-brown/8 bg-cream/30 py-10 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-ink/40 mb-6 flex items-center justify-center gap-2">
        <Scissors className="w-3.5 h-3.5" /> Trusted by focused teams at
      </p>
      <div className="relative">
        <div className="luxe-marquee-track">
          {doubled.map((c, i) => (
            <span key={i} className="luxe-swatch inline-block bg-bg border border-brown/10 rounded-lg px-6 py-2.5 mx-3 font-display text-lg text-brown-dark/60 whitespace-nowrap" style={{ "--r": `${(i % 2 ? 1 : -1) * 1.5}deg` }}>
              {c}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream/30 to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats — the ledger                                                 */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="relative bg-cream/40 py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.08)} className="luxe-card luxe-swatch p-8 lg:p-10" style={{ "--r": "-0.6deg" }}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/40 mb-6">
            <PenTool className="w-3.5 h-3.5" /> The ledger — measured, not guessed
          </div>
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} className="flex items-baseline py-3 border-b border-brown/8 last:border-0">
              <span className="text-sm text-ink/60">{s.label}</span>
              <span className="luxe-ledger-leader" />
              <span className="font-display text-2xl text-brown-dark">
                <CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features — the moodboard                                           */
/* ------------------------------------------------------------------ */

function FeatureCard({ f }) {
  const Icon = f.icon;
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }} className={`luxe-card luxe-spotlight luxe-swatch luxe-glow-hover relative p-7 ${f.size === "lg" ? "md:col-span-2 md:row-span-1" : ""}`} style={{ "--r": `${f.rot}deg` }}>
      <div className="absolute -top-3 left-8 luxe-pin" />
      <div className="flex items-start justify-between mb-6">
        <span className="w-11 h-11 rounded-2xl bg-cream flex items-center justify-center text-brown">
          <Icon className="w-5 h-5" />
        </span>
        <span className="font-display text-3xl text-gold/30">{f.n}</span>
      </div>
      <h3 className="font-display text-2xl text-brown-dark mb-3">{f.title}</h3>
      <p className="text-ink/65 leading-relaxed text-[15px]">{f.body}</p>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 py-24 lg:py-32">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="max-w-2xl mb-16">
        <SpecTag>Six pattern pieces</SpecTag>
        <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl text-brown-dark mb-5">
          A moodboard, not a checklist
        </motion.h2>
        <motion.p variants={fadeUp} className="text-ink/60 text-lg leading-relaxed">
          Every feature is cut and pinned deliberately — each one a quiet upgrade over the last to-do app you tried.
        </motion.p>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.08)} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} f={f} />
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works — pattern pieces on the cutting table                 */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section id="how" className="relative bg-brown-dark luxe-pattern-paper-dark text-cream py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 relative">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="max-w-2xl mb-16">
          <motion.span variants={fadeUp} className="luxe-pill inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-cream/10 text-gold">
            <Compass className="w-3 h-3" /> How it works
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl mb-5">
            Three cuts to a quieter list
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.15)} className="grid md:grid-cols-3 gap-10 relative">
          <svg className="hidden md:block absolute top-8 left-0 w-full h-2 -z-0" viewBox="0 0 900 8" preserveAspectRatio="none">
            <motion.path d="M0,4 L900,4" stroke="var(--color-gold, #c8a165)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={viewport} transition={{ duration: 1.4, ease: EASE }} />
          </svg>
          {WORKFLOW.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} className="relative luxe-swatch bg-white/5 border border-white/10 rounded-2xl p-7" style={{ "--r": `${(i - 1) * 1.4}deg` }}>
              <p className="text-[11px] tracking-widest text-gold/70 mb-3">{s.tag}</p>
              <h3 className="font-display text-2xl mb-3">{s.step}</h3>
              <p className="text-cream/60 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                             */
/* ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 py-24 lg:py-32">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="max-w-2xl mb-16">
        <SpecTag>Sizing</SpecTag>
        <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl text-brown-dark">
          Start free, grow when you're ready
        </motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.12)} className="grid md:grid-cols-3 gap-8 items-stretch">
        {PRICING.map((p, i) => (
          <motion.div key={p.name} variants={fadeUp} whileHover={{ y: -6 }} className={`luxe-card luxe-swatch p-8 flex flex-col relative ${p.featured ? "luxe-gradient-border ring-1 ring-gold/30 scale-[1.02]" : ""}`} style={{ "--r": `${(i - 1) * 1}deg` }}>
            {p.featured && <span className="luxe-pill absolute -top-3 left-8 px-3 py-1 bg-gold text-white text-xs">Most popular</span>}
            <div className="absolute -top-3 right-8 luxe-pin" style={{ transform: "scale(0.8)" }} />
            <h3 className="font-display text-xl text-brown-dark mb-1">{p.name}</h3>
            <p className="text-ink/55 text-sm mb-6">{p.body}</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="font-display text-4xl text-brown-dark">{p.price}</span>
              {p.period && <span className="text-ink/45 text-sm mb-1">{p.period}</span>}
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink/70">
                  <Check className="w-4 h-4 text-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <MagneticButton as={Link} to="/signup" className={`w-full justify-center ${p.featured ? "luxe-btn-primary" : "luxe-btn-ghost"} px-6 py-3 text-sm`}>
              {p.cta}
            </MagneticButton>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials — a single rotating pull-quote                        */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="max-w-5xl mx-auto px-6 lg:pl-24 lg:pr-10 py-24 lg:py-32">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="max-w-2xl mb-14">
        <SpecTag>In their words</SpecTag>
        <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl text-brown-dark">
          People who slowed down and got more done
        </motion.h2>
      </motion.div>

      <div className="relative luxe-card luxe-glass p-10 lg:p-16 rounded-[28px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Quote className="luxe-quote-glyph absolute top-6 left-8 w-16 h-16" />
        <AnimatePresence mode="wait">
          <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }} className="relative pt-10">
            <p className="font-display text-2xl sm:text-3xl text-brown-dark leading-snug mb-8 max-w-3xl">{t.quote}</p>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-beige flex items-center justify-center font-display text-brown-dark">{t.name[0]}</span>
              <div>
                <p className="text-sm font-medium text-brown-dark">{t.name}</p>
                <p className="text-xs text-ink/45">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 mt-10 relative">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Go to testimonial ${i + 1}`} className="p-1">
              <span className={`block rounded-full transition-all ${i === index ? "w-3 h-3 luxe-thread-bead" : "w-2 h-2 bg-brown/20"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Keyboard shortcuts                                                  */
/* ------------------------------------------------------------------ */

function KeyboardShortcuts() {
  return (
    <section className="bg-cream/40 py-24">
      <div className="max-w-5xl mx-auto px-6 lg:pl-24 lg:pr-10">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="max-w-xl mb-12">
          <SpecTag>Keyboard-first</SpecTag>
          <motion.h2 variants={fadeUp} className="font-display text-4xl text-brown-dark">Never leave the keyboard</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.06)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHORTCUTS.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} className="luxe-card luxe-swatch flex items-center justify-between px-5 py-4" style={{ "--r": `${(i % 2 ? 1 : -1) * 0.7}deg` }}>
              <span className="text-sm text-ink/70">{s.label}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) => <span key={k} className="luxe-kbd">{k}</span>)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Security & privacy                                                  */
/* ------------------------------------------------------------------ */

function Security() {
  const items = [
    { icon: Lock, title: "Encrypted at rest and in transit", body: "Every request runs over authenticated, encrypted connections." },
    { icon: Shield, title: "Private by default", body: "Your tasks are visible only to you unless you explicitly share a board." },
    { icon: Users, title: "Granular team controls", body: "Admins decide who can see, edit or invite across shared workspaces." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 py-24">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="grid lg:grid-cols-3 gap-10">
        <motion.div variants={fadeUp}>
          <SpecTag>Security & privacy</SpecTag>
          <h2 className="font-display text-3xl text-brown-dark mb-4">Built to be trusted with your day</h2>
          <p className="text-ink/60 leading-relaxed">Luxe is designed so the only person who sees your plan is you — unless you choose otherwise.</p>
        </motion.div>
        {items.map((it, i) => (
          <motion.div key={it.title} variants={fadeUp} className="luxe-card luxe-swatch luxe-glow-hover p-7" style={{ "--r": `${(i - 1) * 1}deg` }}>
            <it.icon className="w-6 h-6 text-brown mb-4" />
            <h3 className="font-display text-lg text-brown-dark mb-2">{it.title}</h3>
            <p className="text-sm text-ink/60 leading-relaxed">{it.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Roadmap                                                             */
/* ------------------------------------------------------------------ */

function Roadmap() {
  return (
    <section className="bg-cream/40 py-24">
      <div className="max-w-3xl mx-auto px-6 lg:pl-24 lg:pr-10">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="mb-14">
          <SpecTag>Roadmap</SpecTag>
          <motion.h2 variants={fadeUp} className="font-display text-4xl text-brown-dark">Where Luxe is headed</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.12)} className="relative pl-8 border-l border-dashed border-brown/20 space-y-10">
          {ROADMAP.map((r) => (
            <motion.div key={r.title} variants={fadeLeft} className="relative">
              <span className={`absolute -left-[27px] top-1 ${r.done ? "luxe-thread-bead" : "w-3 h-3 rounded-full border-2 border-gold bg-bg"}`} />
              <p className="text-xs uppercase tracking-widest text-ink/40 mb-1">{r.quarter}</p>
              <p className="font-display text-xl text-brown-dark">{r.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-cream/40 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:pl-24 lg:pr-10">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)} className="mb-14">
          <SpecTag>FAQ</SpecTag>
          <motion.h2 variants={fadeUp} className="font-display text-4xl text-brown-dark">Questions, answered plainly</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.08)} className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div key={f.q} variants={fadeUp} className="luxe-card overflow-hidden">
              <button className="w-full flex items-center justify-between px-7 py-5 text-left" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="font-medium text-brown-dark">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gold">
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                    <div className="px-7 pb-6 text-ink/60 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter                                                          */
/* ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setSubscribed(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:pl-24 lg:pr-10 py-24">
      <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="luxe-card luxe-glass luxe-gradient-border luxe-swatch p-10 lg:p-16 text-center relative overflow-hidden rounded-[28px]" style={{ "--r": "-0.4deg" }}>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 luxe-pin" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-beige/40 blur-2xl" />
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-gold/15 blur-2xl" />
        <h2 className="font-display text-3xl lg:text-4xl text-brown-dark mb-4 relative">Get one gentle nudge a week</h2>
        <p className="text-ink/60 mb-8 max-w-md mx-auto relative">Productivity notes, feature previews and nothing that resembles spam.</p>
        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-2 text-success font-medium relative">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}><Check className="w-5 h-5" /></motion.span>
              You're on the list — welcome.
            </motion.div>
          ) : (
            <motion.form key="form" exit={{ opacity: 0, y: -10 }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative" onSubmit={submit}>
              <motion.input type="email" required placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setInvalid(false); }} animate={invalid ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }} className={`luxe-input flex-1 px-5 py-3.5 text-sm ${invalid ? "ring-2 ring-red-400" : ""}`} />
              <MagneticButton className="luxe-btn-primary px-7 py-3.5 text-sm whitespace-nowrap">Subscribe</MagneticButton>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative bg-brown-dark luxe-pattern-paper-dark text-cream py-24 lg:py-32 overflow-hidden">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)}>
          <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-6xl mb-6">Your calmest day is one task away</motion.h2>
          <motion.p variants={fadeUp} className="text-cream/60 text-lg mb-10 max-w-lg mx-auto">Join 12,000+ people who traded a shouting list for a single, considered focus.</motion.p>
          <motion.div variants={fadeUp}>
            <MagneticButton as={Link} to="/signup" className="luxe-btn-primary px-10 py-4 text-base">
              Start planning — it's free <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg overflow-x-clip">
      <ThreadRail />
      <FloatingNavbar />
      <Hero />
      <TrustedBy />
      <Stats />
      <Features />
      <ZigzagDivider tone="toDark" />
      <HowItWorks />
      <ZigzagDivider tone="toLight" />
      <Pricing />
      <Testimonials />
      <KeyboardShortcuts />
      <Security />
      <Roadmap />
      <FAQ />
      <Newsletter />
      <ZigzagDivider tone="toDark" />
      <FinalCTA />
      <Footer />

      <style>{`
        @keyframes luxe-float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        .luxe-liquid-btn { transition: box-shadow 0.4s ease, transform 0.25s ease; }
        .luxe-liquid-btn:hover { box-shadow: 0 12px 30px -10px color-mix(in srgb, var(--color-gold, #c8a165) 55%, transparent); }
        .luxe-liquid-btn:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}
