import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
  challenge?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const challenge = (body.challenge || "").trim();
  const company = (body.company || "").trim();
  const industry = (body.industry || "").trim();

  if (!name || !email || !challenge) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Optional: forward to Resend / Formspree / SMTP if env vars are present.
  // For now we just log on the server and return ok — the UI will show success.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const to = process.env.CONTACT_TO || "hello@zentopia.io";
    const from = process.env.CONTACT_FROM || "Zentopia <hello@zentopia.io>";
    const subject = `🌿 Új audit-foglalás: ${company || name} · ${industry || "—"}`;
    const html = `
      <p><strong>Új form-beérkezés:</strong></p>
      <p><strong>Név:</strong> ${escapeHtml(name)}<br />
      <strong>Email:</strong> ${escapeHtml(email)}<br />
      <strong>Cég:</strong> ${escapeHtml(company || "—")}<br />
      <strong>Iparág:</strong> ${escapeHtml(industry || "—")}</p>
      <p><strong>Kihívás:</strong><br />${escapeHtml(challenge).replace(/\n/g, "<br />")}</p>
    `;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, subject, html }),
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { ok: false, error: "send_failed", detail: text.slice(0, 200) },
          { status: 502 }
        );
      }
    } catch (err) {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } else {
    console.log("[contact]", { name, email, company, industry, challenge });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
