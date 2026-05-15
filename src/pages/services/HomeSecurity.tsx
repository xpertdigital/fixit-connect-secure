import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { ShieldCheck, Camera, Bell, Lock, CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Free on-site security audit and quote",
  "HD & 4K CCTV camera installation (indoor, outdoor, PTZ)",
  "DVR / NVR setup with mobile app remote viewing",
  "Wired & wireless burglar alarm systems with siren and SMS alerts",
  "Digital door locks — fingerprint, RFID card, PIN and app-based",
  "Integration with existing intercom & smart-home setups",
  "Annual maintenance and 90-day workmanship warranty",
];

const pillars = [
  {
    icon: Camera,
    title: "CCTV Surveillance",
    text: "Crystal-clear video coverage with remote viewing on your phone — Hikvision, CP Plus, Dahua, Ezviz and more.",
  },
  {
    icon: Bell,
    title: "Burglar Alarm Systems",
    text: "Door, window and motion sensors paired with loud sirens and instant mobile notifications for intrusion attempts.",
  },
  {
    icon: Lock,
    title: "Digital Locking Systems",
    text: "Keyless smart locks for homes, offices and shops — biometric, RFID, keypad and Wi-Fi enabled options.",
  },
];

const steps = [
  { n: "01", title: "Survey", text: "We visit your premises, identify weak points, and recommend the right mix of cameras, alarms and locks." },
  { n: "02", title: "Quote", text: "You receive a transparent, itemized quote — hardware, installation and AMC, all clearly listed." },
  { n: "03", title: "Install", text: "Clean, professional installation with neat cabling and tested configurations." },
  { n: "04", title: "Handover", text: "App setup, walkthrough, user training and a 90-day workmanship warranty." },
];

export default function HomeSecurityPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Home Security — CCTV, Burglar Alarms & Digital Locks | Digitek Solutions</title>
        <meta name="description" content="Complete home security solutions in Kolkata — CCTV installation, burglar alarm systems, and digital smart locks. Free site survey and 90-day warranty." />
        <meta property="og:title" content="Home Security — Digitek Solutions" />
        <meta property="og:description" content="CCTV, burglar alarms and digital locks installed by certified technicians." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Home Security that <span className="text-primary">actually protects.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            One trusted team for CCTV cameras, burglar alarms and digital smart locks — designed, installed and supported end-to-end.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-foreground">Three layers of protection</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
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
              {["Hikvision", "CP Plus", "Dahua", "Ezviz", "Godrej", "Yale", "Honeywell", "Bosch", "Reolink"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Typical projects</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• 4–8 camera home setups with smart-lock entry</li>
              <li>• Retail shop surveillance + alarm packages</li>
              <li>• Office, warehouse and society installations</li>
              <li>• Apartment smart-lock retrofits</li>
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center shadow-elegant md:p-14">
          <CtaBackground color="#1d4ed8" speed={3} noiseIntensity={1.2} />
          <div className="relative z-10">
            <h2 className="text-3xl text-primary-foreground md:text-4xl">Ready to secure your space?</h2>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 font-semibold text-primary shadow-elegant transition-smooth hover:-translate-y-0.5">
              Book a free site survey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
