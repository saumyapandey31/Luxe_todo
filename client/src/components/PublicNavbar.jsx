import { Link } from "react-router-dom";
import { useState } from "react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 luxe-glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-brown to-brown-dark flex items-center justify-center text-cream font-display text-base">
            L
          </span>
          <span className="font-display text-xl tracking-tight text-brown-dark">Luxe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] text-ink/70 hover:text-brown-dark transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="px-5 py-2.5 text-[15px] text-brown-dark hover:text-brown transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="luxe-btn-primary px-6 py-2.5 text-[15px]">
            Get started
          </Link>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-brown/15"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="text-brown-dark text-xl">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 luxe-fade-in">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink/70">
              {l.label}
            </a>
          ))}
          <div className="luxe-divider" />
          <Link to="/login" className="text-brown-dark">Log in</Link>
          <Link to="/signup" className="luxe-btn-primary text-center py-2.5">Get started</Link>
        </div>
      )}
    </header>
  );
}
