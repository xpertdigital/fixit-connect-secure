import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Camera, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/cctv")({
  head: () => ({
    meta: [
      { title: "CCTV Installation — TechCare Services" },
      { name: "description", content: "Professional CCTV camera installation for homes and businesses. Site survey, wiring, configuration, and remote monitoring setup." },
      { property: "og:title", content: "CCTV Installation — TechCare" },
      { property: "og:description", content: "End-to-end CCTV installation with remote monitoring." },
    ],
  }),
  component: CctvPage,
});

const features = [
  "Free on-site survey and quote",
  "Indoor, outdoor, and PTZ camera installation",
  "DVR / NVR setup and storage configuration",
  "Mobile app and remote-viewing setup",
  "Cable concealment and weatherproofing",
  "Annual maintenance and health-check plans",
];

const steps = [
  { n: "01", title: "Survey", text: "We visit your site, identify blind spots, and recommend camera placement." },
  { n: "02", title: "Quote", text: "You receive a transparent, itemized quote — no hidden fees." },
  { n: "03", title: "Install", text: "Clean, professional installation with neat cabling." },
  { n: "04", title: "Handover", text: "Mobile app setup, walkthrough, and a 90-day workmanship warranty." },
];

function CctvPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">CCTV that <span className="text-primary">actually works.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Crystal-clear surveillance, professionally installed and configured for remote viewing on your phone — the way it should be.
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
            <h3 className="text-2xl text-foreground">Brands we install</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Hikvision", "CP Plus", "Dahua", "Ezviz", "Reolink", "Axis", "Bosch"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Typical projects</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• 4-camera home setups</li>
              <li>• Retail shop surveillance (8–16 cameras)</li>
              <li>• Office, warehouse & society installations</li>
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
        <h2 className="text-3xl text-foreground">Ready to secure your space?</h2>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
          Book a free site survey <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
