import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  challenge?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  challenge: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TEAM_EMAIL = process.env.CONTACT_TO || "team@zentopia.io";
const FROM_EMAIL = process.env.CONTACT_FROM || "Zentopia <team@zentopia.io>";

export async function POST(req: Request) {
  try {
    let body: ContactPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const data: FormData = {
      name: (body.name || "").trim(),
      email: (body.email || "").trim(),
      phone: (body.phone || "").trim(),
      company: (body.company || "").trim(),
      industry: (body.industry || "").trim(),
      challenge: (body.challenge || "").trim(),
    };

    if (!data.name || !data.email || !data.challenge) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!isEmail(data.email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // Fan-out: team email, visitor confirmation, Telegram. Failures on any one
    // channel are tolerated so the visitor's submission isn't lost. If every
    // configured external send fails, log loudly and surface 502.
    const results = await Promise.allSettled([
      sendTeamNotification(data),
      sendVisitorConfirmation(data),
      sendTelegramNotification(data),
    ]);

    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length === results.length) {
      for (const f of failures) {
        console.error("[contact] all channels failed:", (f as PromiseRejectedResult).reason);
      }
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    for (const f of failures) {
      console.warn("[contact] channel failure:", (f as PromiseRejectedResult).reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unhandled error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

async function sendResendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Local dev fallback — log and treat as success so the UI flow stays end-to-end.
    console.log("[contact] (no RESEND_API_KEY) email skipped:", { to, subject });
    return;
  }
  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to,
    subject,
    html,
    text,
  };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`resend ${res.status}: ${detail.slice(0, 240)}`);
  }
}

function summaryRowsHtml(rows: [string, string][]) {
  return rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#5A6F66;font-family:'JetBrains Mono',monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;color:#0F1F1A;font-family:Arial,sans-serif;font-size:15px">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join("");
}

async function sendTeamNotification(d: FormData) {
  const subjectCompany = d.company || d.name;
  const subjectIndustry = d.industry || "—";
  const subject = `🌿 Új megkeresés: ${subjectCompany} · ${subjectIndustry}`;

  const rows: [string, string][] = [
    ["Név", d.name],
    ["Email", d.email],
    ["Telefon", d.phone || "—"],
    ["Cég", d.company || "—"],
    ["Iparág", d.industry || "—"],
  ];

  const html = `<!doctype html><html lang="hu"><body style="margin:0;padding:32px;background:#FAFAF7;color:#0F1F1A;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E8E4D8;border-radius:12px;padding:32px">
    <div style="font-family:'Courier New',monospace;font-size:12px;color:#F08947;letter-spacing:0.08em;margin-bottom:8px">// ÚJ MEGKERESÉS</div>
    <h1 style="margin:0 0 24px;font-size:22px;line-height:1.3;letter-spacing:-0.02em">Új audit-foglalás érkezett a zentopia.io-ról</h1>
    <table style="border-collapse:collapse;width:100%">${summaryRowsHtml(rows)}</table>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #E8E4D8">
      <div style="font-family:'Courier New',monospace;font-size:11px;color:#5A6F66;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">Mi a kihívás?</div>
      <div style="font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(d.challenge)}</div>
    </div>
    <div style="margin-top:24px;font-family:'Courier New',monospace;font-size:11px;color:#5A6F66">// Jelentkezzünk 24 órán belül.</div>
  </div>
</body></html>`;

  const text = `Új megkeresés érkezett a zentopia.io-ról

${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

Mi a kihívás?
${d.challenge}

// Jelentkezzünk 24 órán belül.`;

  await sendResendEmail({
    to: TEAM_EMAIL,
    subject,
    html,
    text,
    replyTo: d.email,
  });
}

async function sendVisitorConfirmation(d: FormData) {
  const subject = "Köszi, megkaptuk az üzeneted — Zentopia";

  const rows: [string, string][] = [
    ["Név", d.name],
    ["Email", d.email],
  ];
  if (d.phone) rows.push(["Telefon", d.phone]);
  if (d.company) rows.push(["Cég", d.company]);
  if (d.industry) rows.push(["Iparág", d.industry]);

  const html = `<!doctype html><html lang="hu"><body style="margin:0;padding:32px;background:#FAFAF7;color:#0F1F1A;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E8E4D8;border-radius:12px;padding:32px">
    <div style="font-family:'Courier New',monospace;font-size:12px;color:#F08947;letter-spacing:0.08em;margin-bottom:8px">// VISSZAIGAZOLÁS</div>
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;letter-spacing:-0.02em">Helló ${escapeHtml(d.name)}, köszi az üzenetedet!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#0F1F1A">Megkaptuk a megkeresésedet a zentopia.io-n. <strong>24 órán belül visszajelzünk</strong> egy konkrét időpont-javaslattal a 30 perces AI-konzultációra.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#5A6F66">Az alábbi adatokat rögzítettük:</p>
    <table style="border-collapse:collapse;width:100%">${summaryRowsHtml(rows)}</table>
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid #E8E4D8">
      <div style="font-family:'Courier New',monospace;font-size:11px;color:#5A6F66;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px">A kihívásod</div>
      <div style="font-size:15px;line-height:1.55;color:#0F1F1A;white-space:pre-wrap">${escapeHtml(d.challenge)}</div>
    </div>
    <p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:#0F1F1A">Üdv,<br/><strong>Zentopia csapat</strong></p>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #E8E4D8;font-family:'Courier New',monospace;font-size:11px;color:#5A6F66;letter-spacing:0.04em">[ team@zentopia.io · Budapest, HU ]</div>
  </div>
</body></html>`;

  const text = `Helló ${d.name},

Köszi az üzenetedet — megkaptuk a megkeresésedet a zentopia.io-n.
24 órán belül visszajelzünk egy konkrét időpont-javaslattal a 30 perces AI-konzultációra.

Az alábbi adatokat rögzítettük:
${rows.map(([k, v]) => `  ${k}: ${v}`).join("\n")}

A kihívásod:
${d.challenge}

Üdv,
Zentopia csapat
team@zentopia.io · Budapest, HU`;

  await sendResendEmail({
    to: d.email,
    subject,
    html,
    text,
  });
}

async function sendTelegramNotification(d: FormData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || "5275561903";
  if (!token) {
    console.log("[contact] (no TELEGRAM_BOT_TOKEN) telegram skipped");
    return;
  }

  const lines = [
    "🌿 <b>Új megkeresés a zentopia.io-n</b>",
    "",
    `<b>Név:</b> ${escapeHtml(d.name)}`,
    `<b>Email:</b> ${escapeHtml(d.email)}`,
  ];
  if (d.phone) lines.push(`<b>Telefon:</b> ${escapeHtml(d.phone)}`);
  if (d.company) lines.push(`<b>Cég:</b> ${escapeHtml(d.company)}`);
  if (d.industry) lines.push(`<b>Iparág:</b> ${escapeHtml(d.industry)}`);
  lines.push("", "<b>Mi a kihívás?</b>", escapeHtml(d.challenge));

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`telegram ${res.status}: ${detail.slice(0, 240)}`);
  }
}
