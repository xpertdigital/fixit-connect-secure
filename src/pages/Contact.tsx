import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || undefined,
      service: String(fd.get("service") || "").trim() || undefined,
      message: String(fd.get("message") || "").trim() || undefined,
    };

    if (!payload.name || !payload.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: payload,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send your request. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Contact Us — Digitek Solutions</title>
        <meta name="description" content="Get in touch for CCTV installation, laptop repair, or printer servicing. Free quotes, same-day response." />
        <meta property="og:title" content="Contact Digitek Solutions" />
        <meta property="og:description" content="Free quotes and same-day response." />
      </Helmet>

      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl text-foreground md:text-6xl">Contact Digitek Solutions for a <span className="text-primary">free quote.</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Tell us what you need — installation, repair, or just a quick question. We respond within an hour during business hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Phone, title: "Phone", value: "+91 98305 04138", href: "tel:+919830504138" },
              { icon: Mail, title: "Email", value: "info@digiteksolutions.net.in", href: "mailto:info@digiteksolutions.net.in" },
              { icon: MapPin, title: "Address", value: "27/C, Jogendra Basak Road, Baranagar, Kolkata - 700036, West Bengal", href: "https://maps.app.goo.gl/ZvCx3E3zT2gVgwYr6" },
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
              onSubmit={handleSubmit}
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
                    <label htmlFor="service" className="text-sm font-medium text-foreground">Service needed</label>
                    <select id="service" name="service" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="" required>
                      <option value="" disabled>Select a service</option>
                      <option>Home Security</option>
                      <option>Laptop Repair</option>
                      <option>Industrial Automation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">How can we help?</label>
                    <textarea id="message" name="message" rows={4} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Briefly describe the issue or project…" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
                  >
                    {loading ? (
                      <>Sending… <Loader2 className="h-4 w-4 animate-spin" /></>
                    ) : (
                      <>Send request <Send className="h-4 w-4" /></>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl text-foreground">Find us on the map</h2>
              <p className="mt-2 text-muted-foreground">27/C, Jogendra Basak Road, Baranagar, Kolkata - 700036, West Bengal</p>
            </div>
            <a
              href="https://maps.app.goo.gl/ZvCx3E3zT2gVgwYr6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-primary-glow"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
            <iframe
              title="Digitek Solutions location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.4712511234115!2d88.3742854762601!3d22.636211879446485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89dffaf97b4b5%3A0x3706c2a744f55cbd!2sDigitek%20Solutions!5e0!3m2!1sen!2sin!4v1778893233433!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
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
      <input id={name} name={name} type={type} required={required} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}
