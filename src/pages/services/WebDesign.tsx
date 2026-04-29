import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Globe, CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Custom design tailored to your brand",
  "Mobile-first, fast-loading pages",
  "SEO-ready structure and meta tags",
  "Contact forms, WhatsApp, and Google Maps",
  "Easy-to-edit content management",
  "Hosting and domain setup assistance",
];

const steps = [
  { n: "01", title: "Discover", text: "We learn your business, audience, and goals for the site." },
  { n: "02", title: "Design", text: "You review wireframes and a polished visual mockup before we build." },
  { n: "03", title: "Build", text: "Clean code, responsive layouts, and on-page SEO baked in." },
  { n: "04", title: "Launch", text: "We deploy, train you on edits, and stay available for support." },
];

export default function WebDesignPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Website Designing — TechCare Services</title>
        <meta name="description" content="Modern, mobile-friendly websites for small businesses. Custom design, fast performance, SEO-ready, and easy to update." />
        <meta property="og:title" content="Website Designing — TechCare" />
        <meta property="og:description" content="Modern, fast, mobile-friendly websites built for small businesses." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Globe className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Websites that <span className="text-primary">earn trust.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A clean, fast website that looks great on every device — and turns visitors into customers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl text-foreground">What's included</h2>
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl text-foreground">Site types we build</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Business sites", "Portfolios", "Landing pages", "Service catalogs", "Restaurant menus", "Booking sites"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Typical projects</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• 5–10 page small-business websites</li>
              <li>• High-converting single-page landings</li>
              <li>• Refresh of older, slow, non-mobile sites</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-foreground">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-serif text-3xl text-primary">{s.n}</span>
                <h3 className="mt-2 text-xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl text-foreground">Ready for a website that performs?</h2>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
          Get a project quote <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
