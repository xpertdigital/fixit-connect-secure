import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ShieldCheck, Heart, Users, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — TechCare Services" },
      { name: "description", content: "Meet the team behind TechCare Services. Local technicians with 10+ years of experience in CCTV, laptops, and printers." },
      { property: "og:title", content: "About TechCare Services" },
      { property: "og:description", content: "A local team of certified technicians you can trust." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "Trust", text: "Background-checked technicians, transparent quotes, no surprise charges." },
  { icon: Heart, title: "Care", text: "We treat your devices and your space with the respect they deserve." },
  { icon: Wrench, title: "Craft", text: "Genuine parts, proper tools, and the patience to do it right." },
  { icon: Users, title: "Community", text: "We're local, accountable, and only a phone call away." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl text-foreground md:text-6xl">A local team that <span className="text-primary">shows up.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            TechCare Services started ten years ago with a simple promise: be the technicians we'd want to hire ourselves. Today, we serve hundreds of homes and businesses with that same standard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl bg-gradient-primary p-10 text-primary-foreground md:grid-cols-3 md:p-14">
          {[
            { stat: "10+", label: "Years in business" },
            { stat: "500+", label: "Homes & businesses served" },
            { stat: "98%", label: "Customer satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-5xl">{s.stat}</div>
              <div className="mt-2 text-primary-foreground/85">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl text-foreground">Let's work together.</h2>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
