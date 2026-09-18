import { NavLink, Link } from "react-router-dom";
import { HeartPulse, SlidersHorizontal, Code2, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/assessment", label: "Risk Assessment" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-light dark:border-line-dark bg-canvas-light/90 dark:bg-canvas-dark/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-clinicalRed/90 text-white">
            <HeartPulse size={18} strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-lg tracking-tight">CardioPredict</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 font-mono text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-brand-500 ${
                  isActive
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-muted-light dark:text-muted-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button className="btn-secondary !px-3 !py-2 text-xs font-mono gap-2">
            <SlidersHorizontal size={14} /> API Config
          </button>
          <a
            href="https://github.com"
            className="btn-secondary !px-3 !py-2 text-xs font-mono gap-2"
          >
            <Code2 size={14} /> React + Vite Codebase
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="btn-secondary !px-3 !py-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/assessment" className="btn-primary !px-4 !py-2 text-sm gap-2">
            <HeartPulse size={16} /> Assess Risk
          </Link>
        </div>

        <button
          className="lg:hidden btn-secondary !p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line-light dark:border-line-dark px-5 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 font-mono text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-muted-light dark:text-muted-dark"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn-secondary !px-3 !py-2 flex-1 justify-center"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-sm">Toggle theme</span>
            </button>
          </div>
          <Link
            to="/assessment"
            onClick={() => setOpen(false)}
            className="btn-primary justify-center"
          >
            <HeartPulse size={16} /> Assess Risk
          </Link>
        </div>
      )}
    </header>
  );
}
