// CTA / "BESZÉLJÜNK" section — dark moment with form + "Mire számíthatsz" + alt contact.

const STEPS_EXPECT = [
  { n: '1', title: '24 órán belül válasz',   body: 'Email-en jelentkezünk, és kiválasztunk egy közös időpontot.' },
  { n: '2', title: '30 perces Google Meet',  body: 'Megnézzük a működésedet, kérdezünk konkrétumokat.' },
  { n: '3', title: 'Konkrét AI-térkép',      body: '3–5 területet jelölünk meg, ahol érdemes elindulnod.' },
  { n: '4', title: 'Te döntesz',             body: 'Ha nálunk akarsz dolgozni, ajánlatot adunk. Ha nem, akkor is tiéd a térkép.' },
];

function DarkField({ label, placeholder, required, textarea, name, isMobile }) {
  const id = React.useMemo(() => 'f-' + Math.random().toString(36).slice(2, 7), []);
  const [focused, setFocused] = React.useState(false);
  const commonInput = {
    width: '100%',
    background: 'rgba(250,250,247,0.03)',
    border: `1px solid ${focused ? Z.lime : 'rgba(250,250,247,0.15)'}`,
    borderRadius: 6,
    padding: '12px 14px',
    color: Z.offwhite,
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: isMobile ? 15 : 16,
    letterSpacing: '-0.01em',
    outline: 'none',
    transition: 'border-color 200ms, background 200ms',
    caretColor: Z.lime,
    boxSizing: 'border-box',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: 'rgba(250,250,247,0.6)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        {label}{required && <span style={{ color: Z.lime, marginLeft: 4 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id} name={name}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          style={{ ...commonInput, resize: 'vertical', minHeight: 100, fontFamily: '"Space Grotesk", sans-serif' }}
        />
      ) : (
        <input
          id={id} name={name}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonInput}
        />
      )}
    </div>
  );
}

function ContactForm({ isMobile }) {
  return (
    <form onSubmit={e => e.preventDefault()} style={{
      background: 'rgba(250,250,247,0.04)',
      border: `1px solid rgba(250,250,247,0.10)`,
      borderRadius: 14,
      padding: isMobile ? '28px 22px 28px' : '40px 40px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* corner pixel cluster — lime */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 14, right: 14,
        display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gridTemplateRows: 'repeat(3, 4px)', gap: 1,
      }}>
        {[1,1,0,1,1,1,0,1,1].map((v, i) => (
          <span key={i} style={{ width: 4, height: 4, background: v ? Z.lime : 'transparent' }} />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <PixelLabel size={11} color={Z.lime}>FOGLALJ IDŐPONTOT</PixelLabel>
        <span style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: isMobile ? 14 : 15,
          color: 'rgba(250,250,247,0.65)',
          letterSpacing: '-0.01em',
          marginTop: 8,
        }}>Töltsd ki és 24 órán belül megkeresünk, hogy időpontot egyeztessünk.</span>
      </div>

      <DarkField name="name"     label="Név"           placeholder="Hogyan szólítsunk?"            required isMobile={isMobile} />
      <DarkField name="email"    label="Email"         placeholder="pl. neved@cegnev.hu"           required isMobile={isMobile} />
      <DarkField name="phone"    label="Telefonszám"   placeholder="+36 30 123 4567"                       isMobile={isMobile} />
      <DarkField name="company"  label="Cégnév"        placeholder="A vállalkozásod neve"                  isMobile={isMobile} />
      <DarkField name="industry" label="Iparág"        placeholder="pl. e-commerce, vendéglátás"           isMobile={isMobile} />
      <DarkField name="message"  label="Mi a kihívás?" placeholder="Szeretnénk az ügyfélszolgálatot AI-jal támogatni, de nem tudjuk hol kezdjük..." required textarea isMobile={isMobile} />

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 14, marginTop: 4 }}>
        <CTAPrimary size={isMobile ? 'md' : 'lg'} dark>Foglalj 30 perces AI-konzultációt →</CTAPrimary>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'rgba(250,250,247,0.45)',
          letterSpacing: '0.04em',
        }}>* kötelező mező · 100% spam-mentes</span>
      </div>
    </form>
  );
}

function MireSzamithatsz({ isMobile, horizontal = false }) {
  if (horizontal) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <PixelLabel size={11} color={Z.lime}>MIRE SZÁMÍTHATSZ</PixelLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 18 : 20,
        }}>
          {STEPS_EXPECT.map(s => (
            <div key={s.n} style={{
              padding: '20px 20px 22px',
              background: 'rgba(250,250,247,0.04)',
              border: `1px solid rgba(250,250,247,0.10)`,
              borderRadius: 10,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <span style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 28,
                color: Z.lime,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>{s.n}.</span>
              <h4 style={{
                margin: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: Z.offwhite,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>{s.title}</h4>
              <p style={{
                margin: 0,
                fontSize: 13,
                color: 'rgba(250,250,247,0.65)',
                lineHeight: 1.5,
              }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // vertical (sidebar)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PixelLabel size={11} color={Z.lime}>MIRE SZÁMÍTHATSZ</PixelLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {STEPS_EXPECT.map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: Z.lime,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              width: 32,
              flexShrink: 0,
            }}>{s.n}.</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h4 style={{
                margin: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 17,
                color: Z.offwhite,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>{s.title}</h4>
              <p style={{
                margin: 0,
                fontSize: 14,
                color: 'rgba(250,250,247,0.65)',
                lineHeight: 1.5,
              }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AltContact({ isMobile, horizontal = false }) {
  const layout = horizontal ? {
    display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
  } : {
    display: 'flex', flexDirection: 'column', gap: 14,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 24, borderTop: `1px solid rgba(250,250,247,0.10)` }}>
      <PixelLabel size={11} color={Z.lime}>VAGY KÖZVETLENÜL</PixelLabel>
      <div style={layout}>
        <a style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: isMobile ? 18 : 20,
          fontWeight: 600,
          color: Z.offwhite,
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}>team@zentopia.io <span style={{ color: Z.lime }}>→</span></a>
      </div>
    </div>
  );
}

function CtaHeader({ isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 820, marginBottom: isMobile ? 36 : 56 }}>
      <PixelLabel size={isMobile ? 10 : 11} color={Z.lime}>[ 08 ] BESZÉLJÜNK</PixelLabel>
      <h2 style={{
        margin: 0,
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 56 : 112,
        letterSpacing: '-0.045em',
        color: Z.offwhite,
        lineHeight: 0.94,
      }}>30 perc, <span style={{ color: Z.lime }}>ami megéri.</span></h2>
      <p style={{
        margin: 0,
        fontSize: isMobile ? 16 : 19,
        color: 'rgba(250,250,247,0.7)',
        lineHeight: 1.5,
        maxWidth: 620,
      }}>Egy fél órás beszélgetés, amiben átnézzük együtt, hol érdemes neked AI-zni — és hol nem.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Side-by-side: form left, "Mire számíthatsz" + alt contact right
// ─────────────────────────────────────────────────────────────
function CtaV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  return (
    <div style={{ width: W, background: Z.forest, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.05)" />
      {/* big radial lime glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -300, right: -200, width: 900, height: 900,
        background: `radial-gradient(circle, rgba(200,255,107,0.12), transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ padding: isMobile ? '56px 20px 72px' : '104px 56px 120px', position: 'relative', zIndex: 1 }}>
        <CtaHeader isMobile={isMobile} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr',
          gap: isMobile ? 36 : 56,
          alignItems: 'flex-start',
        }}>
          <ContactForm isMobile={isMobile} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <MireSzamithatsz isMobile={isMobile} />
            <AltContact isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Statement-led: big H1 + horizontal "Mire számíthatsz" strip, form below
// ─────────────────────────────────────────────────────────────
function CtaV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  return (
    <div style={{ width: W, background: Z.forest, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.05)" />
      <div aria-hidden="true" style={{
        position: 'absolute', top: -200, left: -200, width: 800, height: 800,
        background: `radial-gradient(circle, rgba(200,255,107,0.10), transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ padding: isMobile ? '56px 20px 72px' : '104px 56px 120px', position: 'relative', zIndex: 1 }}>
        <CtaHeader isMobile={isMobile} />
        <MireSzamithatsz isMobile={isMobile} horizontal />
        <div style={{ height: isMobile ? 36 : 56 }} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 0.55fr',
          gap: isMobile ? 36 : 56,
          alignItems: 'flex-start',
        }}>
          <ContactForm isMobile={isMobile} />
          <AltContact isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

window.CtaV1 = CtaV1;
window.CtaV2 = CtaV2;
