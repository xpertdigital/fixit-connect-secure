import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center" aria-label="Digitek Solutions home">
              <img src={logo} alt="Digitek Solutions" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Trusted local experts for CCTV installation, laptop repair, and printer servicing.
              On-time, on-budget, with a no-fix no-fee promise.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base text-foreground">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/home-security" className="hover:text-primary">Home Security</Link></li>
              <li><Link to="/services/laptop" className="hover:text-primary">Laptop Repair</Link></li>
              <li><Link to="/services/industrial-automation" className="hover:text-primary">Industrial Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+91 98305 04138</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>info@digiteksolutions.net.in</span></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>27/C, Jogendra Basak Road, Baranagar, Kolkata - 700036, West Bengal</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Digitek Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
