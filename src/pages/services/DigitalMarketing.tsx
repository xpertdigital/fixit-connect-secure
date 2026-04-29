import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Megaphone, CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Local SEO and Google Business Profile optimization",
  "Google Ads (Search, Display, Performance Max)",
  "Meta Ads on Facebook and Instagram",
  "Social media content planning and posting",
  "Landing-page and conversion optimization",
  "Monthly reports with clear, plain-language insights",
];

const steps = [
  { n: "01", title: "Audit", text: "We review your current online presence and competitors." },
  { n: "02", title: "Strategy", text: "A focused plan with clear KPIs and a realistic budget." },
  { n: "03", title: "Run", text: "Campaigns launched, content published, listings optimized." },
  { n: "04", title: "Optimize", text: "Monthly review — double down on what works, cut what doesn't." },
];

export default function DigitalMarketingPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Digital Marketing — TechCare Services</title>
        <meta name="description" content="SEO, Google Ads, Meta Ads, and social media management. Get found online and grow leads with measurable digital marketing." />
        <meta property="og:title" content="Digital Marketing — TechCare" />
        <meta property="og:description" content="SEO, paid ads, and social media that drive real leads." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Megaphone className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Marketing that brings <span className="text-primary">real leads.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We help local businesses get found on Google, attract the right customers, and turn clicks into bookings.
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
            <h3 className="text-2xl text-foreground">Channels we manage</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Google Search", "Google Maps", "YouTube", "Facebook", "Instagram", "WhatsApp", "LinkedIn"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Typical clients</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Local service businesses and clinics</li>
              <li>• Retail stores and restaurants</li>
              <li>• B2B startups looking for qualified leads</li>
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
        <h2 className="text-3xl text-foreground">Let's grow your business online</h2>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
          Get a marketing plan <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
