import { Link } from "@tanstack/react-router";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-soft">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl text-foreground">TechCare Services</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Trusted local experts for CCTV installation, laptop repair, and printer servicing.
              On-time, on-budget, with a no-fix no-fee promise.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base text-foreground">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/cctv" className="hover:text-primary">CCTV Installation</Link></li>
              <li><Link to="/services/laptop" className="hover:text-primary">Laptop Repair</Link></li>
              <li><Link to="/services/printer" className="hover:text-primary">Printer Repair</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (555) 010-2233</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@techcare.example</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Service area: citywide</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} TechCare Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
