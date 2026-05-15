import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Cpu, Fingerprint, DoorClosed, Droplets, MonitorSmartphone, Video, CheckCircle2, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: Fingerprint,
    title: "Biometric Attendance Systems",
    text: "Fingerprint and face-recognition attendance machines with cloud reports, payroll exports, and multi-shift support.",
  },
  {
    icon: DoorClosed,
    title: "Biometric Door Locking",
    text: "Access-controlled doors with fingerprint, RFID and PIN — granular permissions, audit logs and anti-tailgating options.",
  },
  {
    icon: Droplets,
    title: "Water Pump Automation",
    text: "Sensor-driven pump controllers with dry-run protection, overhead-tank level sensing and Wi-Fi monitoring.",
  },
  {
    icon: MonitorSmartphone,
    title: "Wi-Fi Digital Display Boards",
    text: "LED & LCD notice boards updated wirelessly from a phone or laptop app — perfect for offices, factories and schools.",
  },
  {
    icon: Video,
    title: "Video Conferencing Setups",
    text: "End-to-end installation of conference cameras, mics, displays and codecs — Zoom, Google Meet and Teams ready.",
  },
];

const features = [
  "On-site requirement study and turnkey design",
  "Genuine hardware sourcing with brand warranty",
  "Cabling, mounting, configuration and integration",
  "Software setup and admin/user training",
  "Annual maintenance contracts and remote support",
  "Scalable rollouts across multi-site facilities",
];

export default function IndustrialAutomationPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Industrial Automation — Biometric, Pump & Display Systems | Digitek Solutions</title>
        <meta name="description" content="Industrial automation in Kolkata — biometric attendance, biometric door locks, water pump automation, Wi-Fi digital displays and video conferencing setups." />
        <meta property="og:title" content="Industrial Automation — Digitek Solutions" />
        <meta property="og:description" content="Turnkey automation for offices, factories and institutions." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Cpu className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Industrial Automation, <span className="text-primary">end-to-end.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            From biometric access to smart pumps and conference rooms — we design, install and maintain automation systems that actually work on the floor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="sr-only">Automation solutions we deliver</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
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
          <div className="rounded-2xl border border-border bg-secondary/40 p-8">
            <h3 className="text-2xl text-foreground">Brands & platforms</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["eSSL", "ZKTeco", "Realtime", "Matrix", "Godrej", "Honeywell", "Crompton", "Havells", "Logitech", "Poly", "Yealink"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Where we deploy</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Factories, warehouses & workshops</li>
              <li>• Corporate offices & coworking spaces</li>
              <li>• Schools, colleges & training institutes</li>
              <li>• Apartments and commercial complexes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center shadow-elegant md:p-14">
          <CtaBackground color="#1d4ed8" speed={3} noiseIntensity={1.2} />
          <div className="relative z-10">
            <h2 className="text-3xl text-primary-foreground md:text-4xl">Planning an automation upgrade?</h2>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 font-semibold text-primary shadow-elegant transition-smooth hover:-translate-y-0.5">
              Request a site visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
