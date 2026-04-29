import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Network, CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Structured LAN cabling and patch panels",
  "Business-grade Wi-Fi access points and roaming",
  "Managed switches, routers, and VLAN setup",
  "Firewall configuration and remote-access VPN",
  "Network printer and shared-drive setup",
  "Ongoing monitoring and AMC plans",
];

const steps = [
  { n: "01", title: "Assess", text: "We audit your floor plan, headcount, and bandwidth needs." },
  { n: "02", title: "Design", text: "A clear network diagram with hardware recommendations and pricing." },
  { n: "03", title: "Deploy", text: "Cabling, configuration, and labeled documentation — done right." },
  { n: "04", title: "Support", text: "Optional AMC with proactive monitoring and quick response." },
];

export default function NetworkingPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Office Networking — TechCare Services</title>
        <meta name="description" content="Structured cabling, Wi-Fi, switches, routers, and firewall setup for offices. Reliable networks installed and maintained by certified technicians." />
        <meta property="og:title" content="Office Networking — TechCare" />
        <meta property="og:description" content="Reliable office networks: cabling, Wi-Fi, switches, and firewalls." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Network className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Networks your team can <span className="text-primary">rely on.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            From a 5-person studio to a multi-floor office — we design, install, and maintain wired and wireless networks that just work.
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
            <h3 className="text-2xl text-foreground">Brands we work with</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Cisco", "Ubiquiti", "TP-Link", "MikroTik", "Netgear", "Sophos", "Fortinet"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-foreground">{b}</span>
              ))}
            </div>
            <h3 className="mt-8 text-2xl text-foreground">Typical projects</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Small-office Wi-Fi rollouts</li>
              <li>• Multi-floor cabling and switching</li>
              <li>• Secure remote-access setup for hybrid teams</li>
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
        <h2 className="text-3xl text-foreground">Plan your office network</h2>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
          Request a network audit <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
