"use client";

import { useId, useState } from "react";
import { Z } from "@/lib/tokens";
import { useT, useLang } from "@/lib/i18n";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PixelLabel } from "@/components/ui/PixelLabel";
import { CTAPrimary } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";

export function Cta() {
  const t = useT();
  return (
    <section
      id="beszeljunk"
      className="relative overflow-hidden"
      style={{
        background: Z.forest,
        color: Z.offwhite,
      }}
    >
      <PixelGrid color="rgba(200,255,107,0.05)" />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: -300,
          right: -200,
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(200,255,107,0.12), transparent 60%)",
        }}
      />
      <div className="relative z-[1] px-5 pt-14 pb-[72px] md:px-14 md:pt-[104px] md:pb-[120px]">
        <Reveal className="flex flex-col gap-[18px] max-w-[820px] mb-9 md:mb-14">
          <PixelLabel size={10} color={Z.lime} className="md:text-[11px]">
            {t.cta.label}
          </PixelLabel>
          <h2
            className="m-0 font-sans font-bold"
            style={{
              fontSize: "clamp(56px, 9vw, 112px)",
              letterSpacing: "-0.045em",
              color: Z.offwhite,
              lineHeight: 0.94,
            }}
          >
            {t.cta.h2_before}
            <span style={{ color: Z.lime }}>{t.cta.h2_highlight}</span>
          </h2>
          <p
            className="m-0 leading-[1.5] max-w-[620px]"
            style={{
              fontSize: 16,
              color: "rgba(250,250,247,0.7)",
            }}
          >
            {t.cta.sub}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-9 md:gap-14 items-start">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-9">
            <MireSzamithatsz />
            <AltContact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const t = useT();
  const lang = useLang();
  const [state, setState] = useState<
    | { status: "idle" | "loading" }
    | { status: "success" }
    | { status: "error"; msg: string }
  >({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "loading") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = { ...Object.fromEntries(fd.entries()), lang };
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let json: { ok?: boolean; error?: string } = {};
      try {
        json = await res.json();
      } catch {
        // Server returned non-JSON (e.g. HTML error page). Treat as failure.
      }
      if (res.ok && json.ok) {
        setState({ status: "success" });
        form.reset();
      } else {
        setState({
          status: "error",
          msg:
            json?.error === "missing_fields"
              ? t.cta.form.errorMissing
              : json?.error === "invalid_email"
              ? t.cta.form.errorEmail
              : json?.error === "not_configured"
              ? t.cta.form.errorNotConfigured
              : t.cta.form.errorGeneric,
        });
      }
    } catch (err) {
      console.error("[contact form]", err);
      setState({
        status: "error",
        msg: t.cta.form.errorNetwork,
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden flex flex-col gap-5"
      style={{
        background: "rgba(250,250,247,0.04)",
        border: "1px solid rgba(250,250,247,0.10)",
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: 14,
          right: 14,
          display: "grid",
          gridTemplateColumns: "repeat(3, 4px)",
          gridTemplateRows: "repeat(3, 4px)",
          gap: 1,
        }}
      >
        {[1, 1, 0, 1, 1, 1, 0, 1, 1].map((v, i) => (
          <span
            key={i}
            style={{
              width: 4,
              height: 4,
              background: v ? Z.lime : "transparent",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <PixelLabel size={11} color={Z.lime}>
          {t.cta.form.label}
        </PixelLabel>
        <span
          className="font-sans mt-2"
          style={{
            fontSize: 14,
            color: "rgba(250,250,247,0.65)",
            letterSpacing: "-0.01em",
          }}
        >
          {t.cta.form.caption}
        </span>
      </div>

      <DarkField name="name" label={t.cta.form.fields.name.label} placeholder={t.cta.form.fields.name.placeholder} required />
      <DarkField name="email" label={t.cta.form.fields.email.label} type="email" placeholder={t.cta.form.fields.email.placeholder} required />
      <DarkField name="phone" label={t.cta.form.fields.phone.label} placeholder={t.cta.form.fields.phone.placeholder} />
      <DarkField name="company" label={t.cta.form.fields.company.label} placeholder={t.cta.form.fields.company.placeholder} />
      <DarkField name="industry" label={t.cta.form.fields.industry.label} placeholder={t.cta.form.fields.industry.placeholder} />
      <DarkField
        name="challenge"
        label={t.cta.form.fields.challenge.label}
        placeholder={t.cta.form.fields.challenge.placeholder}
        required
        textarea
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 mt-1">
        <CTAPrimary
          type="submit"
          size="md"
          dark
          className="md:[--cta-size:lg]"
        >
          {state.status === "loading" ? t.cta.form.submitting : t.cta.form.submit}
        </CTAPrimary>
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            color: "rgba(250,250,247,0.45)",
            letterSpacing: "0.04em",
          }}
        >
          {t.cta.form.disclaimer}
        </span>
      </div>

      {state.status === "success" && (
        <div
          role="status"
          className="animate-fade-up"
          style={{
            border: `1px solid ${Z.lime}`,
            background: "rgba(200,255,107,0.08)",
            color: Z.offwhite,
            padding: "12px 14px",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          {t.cta.form.success}
        </div>
      )}
      {state.status === "error" && (
        <div
          role="alert"
          className="animate-fade-up"
          style={{
            border: "1px solid rgba(255,143,163,0.4)",
            background: "rgba(255,143,163,0.08)",
            color: Z.offwhite,
            padding: "12px 14px",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          {state.msg}
        </div>
      )}
    </form>
  );
}

function DarkField({
  label,
  placeholder,
  required,
  textarea,
  name,
  type = "text",
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
  name: string;
  type?: string;
}) {
  const raw = useId();
  const id = "f-" + raw.replace(/[^a-z0-9]/gi, "");
  const [focused, setFocused] = useState(false);
  const commonInput: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(250,250,247,0.06)" : "rgba(250,250,247,0.03)",
    border: `1px solid ${focused ? Z.lime : "rgba(250,250,247,0.15)"}`,
    borderRadius: 6,
    padding: "12px 14px",
    color: Z.offwhite,
    fontFamily: 'var(--font-space), system-ui, sans-serif',
    fontSize: 15,
    letterSpacing: "-0.01em",
    outline: "none",
    transition: "border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
    caretColor: Z.lime,
    boxSizing: "border-box",
    boxShadow: focused ? `0 0 0 3px rgba(200,255,107,0.12)` : "none",
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono uppercase transition-colors duration-200"
        style={{
          fontSize: 11,
          color: focused ? Z.lime : "rgba(250,250,247,0.6)",
          letterSpacing: "0.06em",
        }}
      >
        {label}
        {required && (
          <span style={{ color: Z.lime, marginLeft: 4 }}>*</span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          style={{ ...commonInput, resize: "vertical", minHeight: 100 }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonInput}
        />
      )}
    </div>
  );
}

function MireSzamithatsz() {
  const t = useT();
  return (
    <div className="flex flex-col gap-5">
      <PixelLabel size={11} color={Z.lime}>
        {t.cta.expect.label}
      </PixelLabel>
      <div className="flex flex-col gap-[18px]">
        {t.cta.expect.steps.map((s, idx) => (
          <div
            key={idx}
            className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
            style={{ animation: `fade-up 600ms ${idx * 80}ms both` }}
          >
            <span
              className="font-sans font-bold shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                fontSize: 28,
                color: Z.lime,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                width: 32,
              }}
            >
              {idx + 1}.
            </span>
            <div className="flex flex-col gap-1">
              <h4
                className="m-0 font-sans font-bold"
                style={{
                  fontSize: 17,
                  color: Z.offwhite,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h4>
              <p
                className="m-0 leading-[1.5]"
                style={{
                  fontSize: 14,
                  color: "rgba(250,250,247,0.65)",
                }}
              >
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AltContact() {
  const t = useT();
  return (
    <div
      className="flex flex-col gap-3.5 pt-6"
      style={{ borderTop: "1px solid rgba(250,250,247,0.10)" }}
    >
      <PixelLabel size={11} color={Z.lime}>
        {t.cta.direct.label}
      </PixelLabel>
      <a
        href="mailto:team@zentopia.io"
        className="zen-arrow-host inline-flex items-center gap-2 font-sans w-fit zen-link-underline"
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: Z.offwhite,
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        team@zentopia.io{" "}
        <span className="zen-arrow-nudge" style={{ color: Z.lime }}>
          →
        </span>
      </a>
    </div>
  );
}
