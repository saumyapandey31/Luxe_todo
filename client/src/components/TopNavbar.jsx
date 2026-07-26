import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function TopNavbar({ onMenuClick, onSearchClick, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="h-20 sticky top-0 z-20 luxe-glass flex items-center justify-between px-5 sm:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden w-10 h-10 rounded-full border border-brown/15 flex items-center justify-center text-brown-dark">
          ☰
        </button>
        <h1 className="font-display text-xl sm:text-2xl text-brown-dark">{title}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-3 luxe-input px-4 py-2.5 text-sm text-ink/40 w-64"
        >
          <span>Search or create…</span>
          <kbd className="ml-auto px-1.5 py-0.5 rounded bg-cream border border-brown/15 text-[10px] text-brown/60">⌘K</kbd>
        </button>
        <button onClick={onSearchClick} className="sm:hidden w-10 h-10 rounded-full border border-brown/15 flex items-center justify-center text-brown-dark">
          ⌕
        </button>

        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-cream font-display text-sm"
              style={{ background: user?.avatarColor || "#5B2D1D" }}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-56 luxe-card p-2 luxe-fade-in">
              <div className="px-3 py-3 border-b border-brown/8 mb-2">
                <p className="text-sm font-medium text-brown-dark truncate">{user?.name}</p>
                <p className="text-xs text-ink/45 truncate">{user?.email}</p>
              </div>
              <button
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-ink/70 hover:bg-cream/70"
                onClick={() => { setOpen(false); navigate("/dashboard/profile"); }}
              >
                Profile settings
              </button>
              <button
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-danger hover:bg-danger/10"
                onClick={() => { logout(); navigate("/"); }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
