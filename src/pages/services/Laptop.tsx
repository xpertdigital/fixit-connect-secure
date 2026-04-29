import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Laptop, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  { title: "Screen replacement", text: "Cracked or flickering displays replaced with high-quality panels." },
  { title: "Battery & charging", text: "Battery swaps, charging port repairs, power IC issues." },
  { title: "Keyboard & trackpad", text: "Replacement of damaged keyboards, palmrests, and trackpads." },
  { title: "Virus & malware removal", text: "Deep cleaning, OS reinstall, and security hardening." },
  { title: "Slow PC tune-up", text: "SSD upgrades, RAM expansion, OS optimization." },
  { title: "Data recovery", text: "Recovery from failing drives, accidental deletion, or formatting." },
];

export default function LaptopPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Laptop Repair — TechCare Services</title>
        <meta name="description" content="Expert laptop repair for all major brands. Screen replacements, battery swaps, virus removal, data recovery, and hardware diagnostics." />
        <meta property="og:title" content="Laptop Repair — TechCare" />
        <meta property="og:description" content="Fast, reliable laptop repairs with a no-fix no-fee promise." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Laptop className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Laptop repair, <span className="text-primary">done right.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            From cracked screens to mysterious blue screens — our certified techs diagnose and fix the issue, usually the same day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-elegant">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8">
          <h3 className="text-2xl text-foreground">Brands we service</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Dell", "HP", "Lenovo", "Apple MacBook", "ASUS", "Acer", "MSI", "Microsoft Surface", "Samsung"].map((b) => (
              <span key={b} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl text-foreground">Free diagnosis, transparent pricing.</h2>
          <p className="mt-3 text-muted-foreground">No-fix, no-fee. 90-day warranty on every repair.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
            Get a repair quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
