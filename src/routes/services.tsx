import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Camera, Laptop, Printer, Network, Globe, Megaphone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — TechCare Services" },
      { name: "description", content: "Explore our professional services: CCTV installation, laptop repair, and printer servicing for homes and businesses." },
      { property: "og:title", content: "Our Services — TechCare" },
      { property: "og:description", content: "CCTV, laptop, and printer service experts." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Camera,
    title: "CCTV Installation",
    to: "/services/cctv" as const,
    intro: "Site survey, professional installation, configuration, and remote monitoring setup.",
    items: ["Indoor & outdoor cameras", "DVR/NVR configuration", "Mobile app setup", "Annual maintenance plans"],
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    to: "/services/laptop" as const,
    intro: "Hardware and software diagnostics for all major brands — Dell, HP, Lenovo, Apple, ASUS, Acer.",
    items: ["Screen & keyboard replacement", "Battery & charging issues", "Virus & malware removal", "Data recovery & backup"],
  },
  {
    icon: Printer,
    title: "Printer Repair",
    to: "/services/printer" as const,
    intro: "Servicing for inkjet, laser, and multifunction printers — at home or on-site at your office.",
    items: ["Paper jam & roller fixes", "Print head cleaning", "Network printer setup", "Ink & toner support"],
  },
  {
    icon: Network,
    title: "Office Networking",
    to: "/services/networking" as const,
    intro: "Structured cabling, business Wi-Fi, switches, and firewalls — designed and deployed for reliable office networks.",
    items: ["LAN cabling & patch panels", "Wi-Fi access points & roaming", "Routers, switches & VLANs", "Firewalls & remote-access VPN"],
  },
  {
    icon: Globe,
    title: "Website Designing",
    to: "/services/web-design" as const,
    intro: "Modern, mobile-friendly websites with clean design, fast performance, and SEO-ready structure.",
    items: ["Custom responsive design", "SEO-ready pages", "Contact, WhatsApp & Maps", "Hosting & domain support"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    to: "/services/digital-marketing" as const,
    intro: "Local SEO, Google Ads, Meta Ads, and social media — measurable marketing that brings real leads.",
    items: ["Local SEO & Google Business", "Google & Meta Ads", "Social media management", "Monthly performance reports"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl text-foreground md:text-6xl">Services built around <span className="text-primary">your uptime.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            From a single laptop fix to a multi-camera CCTV rollout, we handle the technical work so you don't have to.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-20 sm:px-6 lg:px-8">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-2 md:p-12 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl text-foreground">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.intro}</p>
              <Link
                to={s.to}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-primary-glow"
              >
                See details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-3 self-center">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg bg-secondary/50 px-4 py-3 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
