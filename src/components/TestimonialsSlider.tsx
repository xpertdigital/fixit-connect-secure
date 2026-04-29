import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "TechCare set up 8 cameras across our shop in a single afternoon. Cabling is invisible and the mobile app works flawlessly.",
    name: "Priya R.",
    role: "Boutique Owner",
  },
  {
    quote:
      "My laptop wouldn't boot the morning of a big presentation. They picked it up, recovered my data, and had it back to me by lunch.",
    name: "Arjun M.",
    role: "Marketing Consultant",
  },
  {
    quote:
      "We use them for everything — printers, Wi-Fi, even our office network refresh. Honest pricing and they actually pick up the phone.",
    name: "Neha S.",
    role: "Operations Manager",
  },
  {
    quote:
      "The new website they built brings in real enquiries every week. Clean, fast, and easy for me to update myself.",
    name: "Rahul K.",
    role: "Clinic Director",
  },
];

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</span>
        <h2 className="mt-3 text-4xl text-foreground md:text-5xl">What our customers say</h2>
      </div>

      <div
        className="relative mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${testimonials.length}`}
                aria-hidden={i !== index}
                className="w-full shrink-0 px-8 py-12 md:px-16 md:py-16"
              >
                <Quote className="h-10 w-10 text-primary/40" />
                <div className="mt-4 flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
                  "{t.quote}"
                </p>
                <div className="mt-8">
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-smooth hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-smooth hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
