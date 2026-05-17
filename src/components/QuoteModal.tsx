import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { X, Send, Loader2, CheckCircle2, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type QuoteModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used inside <QuoteModalProvider>");
  return ctx;
}

function genChallenge() {
  const a = Math.floor(Math.random() * 12) + 6; // 6..17
  const b = Math.floor(Math.random() * 6) + 2; // 2..7
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let answer = 0;
  if (op === "+") answer = a + b;
  else if (op === "-") answer = a - b;
  else answer = a * b;
  return { a, b, op, answer };
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [challenge, setChallenge] = useState(genChallenge);
  const [answer, setAnswer] = useState("");
  const startedAt = useRef<number>(0);

  const open = useCallback(() => {
    setSubmitted(false);
    setChallenge(genChallenge());
    setAnswer("");
    startedAt.current = Date.now();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Exit intent (desktop): trigger once per session when cursor leaves top
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("quoteExitShown") === "1") return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("quoteExitShown")) {
        sessionStorage.setItem("quoteExitShown", "1");
        open();
      }
    };
    // small delay so it doesn't fire instantly on page load
    const t = window.setTimeout(() => {
      document.addEventListener("mouseleave", onLeave);
    }, 4000);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [open]);

  const captchaOk = answer.trim() !== "" && Number(answer.trim()) === challenge.answer;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaOk) {
      toast.error("Please solve the quick math check.");
      return;
    }
    // honeypot + min-time guard
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honey = String(fd.get("company_website") || "");
    const elapsed = Date.now() - startedAt.current;
    if (honey || elapsed < 1500) {
      // silently succeed to bots
      setSubmitted(true);
      return;
    }
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim() || undefined,
      phone: String(fd.get("phone") || "").trim(),
      service: "Free quote (modal)",
    };
    if (!payload.name || !payload.phone) {
      toast.error("Please add your name and phone.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: payload });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send your request. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
          aria-labelledby="quote-modal-title"
        >
          {/* Backdrop — click to close, scrolling stays enabled */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={close}
          />

          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-elegant animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-soft hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Visual side */}
              <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-primary via-primary-glow to-accent p-8 text-primary-foreground">
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Free consultation
                </div>
                <div>
                  <h3 className="text-3xl leading-tight">Let's grow your business together.</h3>
                  <p className="mt-3 text-sm text-primary-foreground/85">
                    Share a few details and we'll reply within one business day with ideas tailored to you.
                  </p>
                </div>
                <div className="text-xs text-primary-foreground/75">
                  Mon–Sat · 9 AM – 8 PM · Kolkata
                </div>
              </div>

              {/* Form side */}
              <div className="p-6 sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                    <h3 className="mt-4 text-2xl text-foreground">Thanks — we got it!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">A team member will reach out shortly.</p>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-6 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 id="quote-modal-title" className="text-2xl text-foreground">Get a free quote</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Tell us how to reach you. No obligation.</p>

                    {/* honeypot */}
                    <input
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                      aria-hidden="true"
                    />

                    <div className="mt-5 space-y-4">
                      <div>
                        <label htmlFor="qm-name" className="text-sm font-medium text-foreground">Your name</label>
                        <input id="qm-name" name="name" required placeholder="Jane Doe" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label htmlFor="qm-email" className="text-sm font-medium text-foreground">Email</label>
                        <input id="qm-email" name="email" type="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label htmlFor="qm-phone" className="text-sm font-medium text-foreground">Phone</label>
                        <input id="qm-phone" name="phone" type="tel" required placeholder="+91 98XXXXXXXX" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>

                      {/* Browser-based anti-spam math check */}
                      <div className="rounded-xl border border-border bg-secondary/40 p-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <ShieldCheck className="h-4 w-4 text-primary" /> Quick anti-spam check
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground">
                            <span>{challenge.a}</span><span>{challenge.op}</span><span>{challenge.b}</span><span>=</span>
                          </div>
                          <input
                            inputMode="numeric"
                            pattern="-?[0-9]*"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value.replace(/[^\d-]/g, ""))}
                            placeholder="?"
                            aria-label="Captcha answer"
                            className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            type="button"
                            onClick={() => { setChallenge(genChallenge()); setAnswer(""); }}
                            className="inline-flex items-center gap-1 rounded-lg border border-input bg-background px-2.5 py-2 text-xs text-muted-foreground hover:text-foreground"
                            aria-label="New question"
                          >
                            <RefreshCw className="h-3.5 w-3.5" /> New
                          </button>
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground">Solve the math problem to enable the submit button.</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !captchaOk}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>Sending… <Loader2 className="h-4 w-4 animate-spin" /></>
                      ) : (
                        <>Request my free quote <Send className="h-4 w-4" /></>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">No spam. Your details are only used to reply to you.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
