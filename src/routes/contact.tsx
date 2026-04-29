import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — TechCare Services" },
      { name: "description", content: "Get in touch for CCTV installation, laptop repair, or printer servicing. Free quotes, same-day response." },
      { property: "og:title", content: "Contact TechCare Services" },
      { property: "og:description", content: "Free quotes and same-day response." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl text-foreground md:text-6xl">Let's <span className="text-primary">talk.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Tell us what you need — installation, repair, or just a quick question. We respond within an hour during business hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Phone, title: "Phone", value: "+1 (555) 010-2233", href: "tel:+15550102233" },
              { icon: Mail, title: "Email", value: "hello@techcare.example", href: "mailto:hello@techcare.example" },
              { icon: MapPin, title: "Service area", value: "Citywide & suburbs" },
              { icon: Clock, title: "Hours", value: "Mon–Sat, 9 AM – 8 PM" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-muted-foreground">{c.title}</div>
                  {c.href ? (
                    <a href={c.href} className="text-foreground hover:text-primary">{c.value}</a>
                  ) : (
                    <div className="text-foreground">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl border border-border bg-card p-8 shadow-elegant"
            >
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent" />
                  <h3 className="mt-4 text-2xl text-foreground">Thanks — we got it!</h3>
                  <p className="mt-2 text-muted-foreground">A technician will call you back shortly.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl text-foreground">Request a quote</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Fill in your details and we'll be in touch.</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" name="name" required />
                    <Field label="Phone number" name="phone" type="tel" required />
                  </div>
                  <div className="mt-4">
                    <Field label="Email" name="email" type="email" />
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-foreground">Service needed</label>
                    <select
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option>CCTV Installation</option>
                      <option>Laptop Repair</option>
                      <option>Printer Repair</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-foreground">How can we help?</label>
                    <textarea
                      rows={4}
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Briefly describe the issue or project…"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow sm:w-auto"
                  >
                    Send request <Send className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
