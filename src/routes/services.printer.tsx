import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Printer, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/printer")({
  head: () => ({
    meta: [
      { title: "Printer Repair — TechCare Services" },
      { name: "description", content: "On-site printer repair and servicing for inkjet, laser, and multifunction printers. Network setup, paper jams, print quality, and more." },
      { property: "og:title", content: "Printer Repair — TechCare" },
      { property: "og:description", content: "Keep your office productive with professional printer servicing." },
    ],
  }),
  component: PrinterPage,
});

const issues = [
  { title: "Paper jams & feeder issues", text: "Roller cleaning, replacement, and feed mechanism repairs." },
  { title: "Print quality problems", text: "Streaks, faded prints, color issues — fixed at the source." },
  { title: "Network printer setup", text: "Wi-Fi and shared network configuration for any device." },
  { title: "Print head cleaning", text: "Deep cleaning and unclogging for inkjets and plotters." },
  { title: "Toner & cartridge support", text: "Genuine and compatible cartridge sourcing and installs." },
  { title: "Annual maintenance contracts", text: "Predictable pricing for offices with multiple devices." },
];

function PrinterPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Printer className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-5xl text-foreground md:text-6xl">Printer servicing, <span className="text-primary">on-site.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We come to your home or office, diagnose the issue, and get your printer back in service — usually within the hour.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {issues.map((s) => (
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
            {["HP", "Canon", "Epson", "Brother", "Xerox", "Ricoh", "Samsung", "Kyocera"].map((b) => (
              <span key={b} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl text-foreground">Need a printer fixed today?</h2>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
            Request a service visit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
