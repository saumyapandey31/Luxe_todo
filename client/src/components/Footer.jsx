import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-full bg-gold/90 flex items-center justify-center text-brown-dark font-display text-base">L</span>
            <span className="font-display text-xl text-cream">Luxe</span>
          </div>
          <p className="text-sm text-cream/60 max-w-xs leading-relaxed">
            A quieter kind of productivity tool — for people who want their days to feel considered, not crowded.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">Product</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li><a href="#features" className="hover:text-gold transition-colors">Features</a></li>
            <li><a href="#how" className="hover:text-gold transition-colors">How it works</a></li>
            <li><a href="#faq" className="hover:text-gold transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">Company</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li><a href="#" className="hover:text-gold transition-colors">About</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm font-semibold mb-4 tracking-wide">Account</h4>
          <ul className="space-y-3 text-sm text-cream/60">
            <li><Link to="/login" className="hover:text-gold transition-colors">Log in</Link></li>
            <li><Link to="/signup" className="hover:text-gold transition-colors">Sign up</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/45">
          <p>© {new Date().getFullYear()} Luxe Studio. All rights reserved.</p>
          <p>Crafted with quiet ambition.</p>
        </div>
      </div>
    </footer>
  );
}
