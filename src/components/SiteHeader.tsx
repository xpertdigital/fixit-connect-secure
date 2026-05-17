import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck, Laptop, Cpu, Network, Globe, Megaphone, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useQuoteModal } from "@/components/QuoteModal";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", hasMega: true },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const serviceItems = [
  { to: "/services/home-security", title: "Home Security", icon: ShieldCheck, blurb: "CCTV, burglar alarms & digital smart locks for homes and offices." },
  { to: "/services/laptop", title: "Laptop Repair", icon: Laptop, blurb: "Diagnostics, screen, battery & data recovery for all major brands." },
  { to: "/services/industrial-automation", title: "Industrial Automation", icon: Cpu, blurb: "Biometric access, pump sensors, display boards & video conferencing." },
  { to: "/services/networking", title: "Office Networking", icon: Network, blurb: "Structured cabling, Wi-Fi, switches, firewalls & VPN." },
  { to: "/services/web-design", title: "Website Designing", icon: Globe, blurb: "Modern, mobile-friendly, SEO-ready websites that perform." },
  { to: "/services/digital-marketing", title: "Digital Marketing", icon: Megaphone, blurb: "Local SEO, Google & Meta Ads, social media that drives leads." },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: openQuote } = useQuoteModal();
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/"));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-foreground" aria-label="Digitek Solutions home">
          <img src={logo} alt="Digitek Solutions" className="h-10 w-auto md:h-11" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            "hasMega" in item && item.hasMega ? (
              <div
                key={item.to}
                className="relative flex h-16 items-center"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  to={item.to}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${isActive(item.to) ? "text-primary" : "text-muted-foreground"}`}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                >
                  {item.label}
                </Link>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-smooth hover:text-primary ${isActive(item.to) ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            )
          )}
          <button
            type="button"
            onClick={openQuote}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-primary-glow"
          >
            Book a Visit
          </button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega menu */}
      <div
        className={`hidden md:block absolute inset-x-0 top-16 z-30 transition-all duration-200 ${megaOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "pointer-events-none opacity-0 -translate-y-2"}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-background/95 shadow-elegant backdrop-blur-md">
            <div className="grid grid-cols-4 gap-3 p-5">
              {serviceItems.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setMegaOpen(false)}
                  className="group flex flex-col gap-2 rounded-xl border border-transparent p-4 transition-smooth hover:border-border hover:bg-secondary/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary">{s.title}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{s.blurb}</p>
                </Link>
              ))}
              <div className="col-span-4 flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Need help choosing the right service?</span>
                <Link
                  to="/services"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-glow"
                >
                  View all services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-primary ${isActive(item.to) ? "text-primary bg-secondary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
