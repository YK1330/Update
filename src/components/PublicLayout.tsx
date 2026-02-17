import { Link, Outlet, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Enquiry", path: "/enquiry" },
  { label: "Track Application", path: "/track" },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-card">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">Bright<span className="text-gradient">Future</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === l.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/student/login">
              <Button variant="ghost" size="sm">Student Login</Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t bg-card overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {NAV_LINKS.map(l => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === l.path ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="flex gap-2 mt-2">
                  <Link to="/student/login" className="flex-1"><Button variant="ghost" size="sm" className="w-full">Student Login</Button></Link>
                  <Link to="/admin/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Admin</Button></Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background/80 py-12">
        <div className="container grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5" />
              <span className="font-bold text-background">BrightFuture College</span>
            </div>
            <p className="text-sm text-background/60">Empowering minds, shaping futures since 1995.</p>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-3">Quick Links</h4>
            <div className="flex flex-col gap-1 text-sm">
              {NAV_LINKS.map(l => <Link key={l.path} to={l.path} className="hover:text-background transition-colors">{l.label}</Link>)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-3">Contact</h4>
            <div className="text-sm space-y-1">
              <p>123 Education Lane, Knowledge City</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@brightfuture.edu</p>
            </div>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t border-background/10 text-center text-xs text-background/40">
          © 2026 BrightFuture College. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
