import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { Camera, Laptop, Printer, Network, Globe, Megaphone, ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, Phone, Users, Wrench, ThumbsUp, BadgeCheck } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import whyChooseUsImage from "@/assets/why-choose-us.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechCare Services — CCTV, Laptop & Printer Repair Experts" },
      { name: "description", content: "Trusted local technicians for CCTV installation, laptop repair, and printer servicing. Same-day service, transparent pricing, no-fix no-fee guarantee." },
      { property: "og:title", content: "TechCare Services — CCTV, Laptop & Printer Repair" },
      { property: "og:description", content: "Trusted local technicians for CCTV, laptops, and printers. Same-day service." },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Secure your home or business with professionally installed surveillance systems, fully configured for remote monitoring.",
    to: "/services/cctv" as const,
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    description: "Screen replacements, battery swaps, virus removal, and hardware diagnostics for every major laptop brand.",
    to: "/services/laptop" as const,
  },
  {
    icon: Printer,
    title: "Printer Repair",
    description: "Keep your office productive with fast servicing, ink/toner support, and network printer setup.",
    to: "/services/printer" as const,
  },
  {
    icon: Network,
    title: "Office Networking",
    description: "Structured cabling, business Wi-Fi, switches, and firewalls — networks built to keep your team productive.",
    to: "/services/networking" as const,
  },
  {
    icon: Globe,
    title: "Website Designing",
    description: "Modern, mobile-friendly websites that load fast, rank well, and turn visitors into customers.",
    to: "/services/web-design" as const,
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "SEO, Google Ads, and social media management that bring measurable leads to your business.",
    to: "/services/digital-marketing" as const,
  },
];

const trustPoints = [
  { icon: ShieldCheck, title: "Certified Technicians", text: "Trained, insured, and background-checked specialists." },
  { icon: Clock, title: "Same-Day Service", text: "Most repairs and installs handled within 24 hours." },
  { icon: Award, title: "No-Fix No-Fee", text: "If we can't fix it, you don't pay a rupee. Simple." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted by 500+ homes & businesses
            </span>
            <h1 className="mt-5 text-5xl leading-[1.05] text-foreground md:text-6xl">
              Your tech, <span className="text-primary">uninterrupted.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Reliable CCTV installation, laptop repairs, and printer servicing — delivered by
              certified local technicians who show up on time and get it right the first time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:-translate-y-0.5"
              >
                Book a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+15550102233"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4" /> +1 (555) 010-2233
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              {["Insured & licensed", "90-day warranty", "Transparent pricing"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
            <img
              src={heroImage}
              alt="Technician installing a CCTV security camera on a building"
              width={1536}
              height={1024}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl text-foreground">What we do best</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three core services. One team you can trust.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl text-foreground">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            {trustPoints.map((t) => (
              <div key={t.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <t.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl text-foreground">{t.title}</h3>
                  <p className="mt-2 text-muted-foreground">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center shadow-elegant md:p-16">
          <h2 className="text-4xl text-primary-foreground md:text-5xl">Ready to get back to business?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">
            Tell us what's broken or what you'd like installed. We'll be in touch within an hour.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-card px-8 py-4 text-base font-semibold text-primary shadow-accent-glow transition-smooth hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
