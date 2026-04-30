// Edge function: receives a contact form submission, stores it in the
// database, and emails the site owner with the full details.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const NOTIFY_EMAIL = "prith001@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as ContactPayload;

    if (!payload?.name || !payload?.phone) {
      return new Response(
        JSON.stringify({ error: "Name and phone are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Persist the submission first so we never lose data, even if email fails.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email ?? null,
        service: payload.service ?? null,
        message: payload.message ?? null,
      });

    if (insertError) {
      console.error("Failed to store submission:", insertError);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${escapeHtml(payload.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${escapeHtml(payload.phone)}">${escapeHtml(payload.phone)}</a></td></tr>
          ${payload.email ? `<tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>` : ""}
          ${payload.service ? `<tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${escapeHtml(payload.service)}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td>${escapeHtml(submittedAt)} (IST)</td></tr>
        </table>
        ${
          payload.message
            ? `<div style="margin-top: 24px;">
                <div style="font-weight: bold; margin-bottom: 8px;">Message:</div>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; white-space: pre-wrap; border-radius: 4px;">${escapeHtml(payload.message)}</div>
              </div>`
            : ""
        }
        <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
          Sent from your website contact form.
        </p>
      </div>
    `;

    const replyTo = payload.email || undefined;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TechCare Services <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `New contact: ${payload.name}${payload.service ? ` — ${payload.service}` : ""}`,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", emailRes.status, errText);
      return new Response(
        JSON.stringify({
          error: "Failed to send email notification.",
          details: errText,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Send confirmation email to the submitter (if they provided an email)
    if (payload.email) {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
          <h2 style="color: #0f172a;">Thanks for reaching out, ${escapeHtml(payload.name)}!</h2>
          <p>We've received your request and a member of our team will get back to you shortly — usually within an hour during business hours (Mon–Sat, 9 AM – 8 PM).</p>
          <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
            <div style="font-weight: bold; margin-bottom: 8px;">Your submission</div>
            <div><strong>Name:</strong> ${escapeHtml(payload.name)}</div>
            <div><strong>Phone:</strong> ${escapeHtml(payload.phone)}</div>
            ${payload.service ? `<div><strong>Service:</strong> ${escapeHtml(payload.service)}</div>` : ""}
            ${payload.message ? `<div style="margin-top: 8px;"><strong>Message:</strong><div style="white-space: pre-wrap; margin-top: 4px;">${escapeHtml(payload.message)}</div></div>` : ""}
          </div>
          <p>If you need urgent assistance, feel free to call us directly at <a href="tel:+15550102233">+1 (555) 010-2233</a>.</p>
          <p style="margin-top: 24px;">— The TechCare Services Team</p>
        </div>
      `;

      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "TechCare Services <onboarding@resend.dev>",
          to: [payload.email],
          subject: "We've received your request — TechCare Services",
          html: confirmationHtml,
        }),
      });

      if (!confirmRes.ok) {
        // Don't fail the whole request — owner notification already succeeded.
        const errText = await confirmRes.text();
        console.error("Confirmation email failed:", confirmRes.status, errText);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-contact-email error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
