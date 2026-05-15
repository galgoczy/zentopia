// FAQ / "GYIK" section — 2 variations.

const FAQ = [
  {
    q: 'Mennyibe kerül egy AI projekt nálatok?',
    a: 'A projektek 500.000 – 5.000.000 HUF közötti tartományban mozognak, a komplexitás függvényében. Egy ügyfélszolgálati chatbot más nagyságrend, mint egy teljes webshop AI workflow. A pontos árajánlatot az Audit után adjuk, számokkal alátámasztva.',
  },
  {
    q: 'Mennyi időbe telik egy projekt?',
    a: 'A legtöbb build 2–8 hét. A Nola and Co (teljes AI webshop) 2 hét alatt készült el. Egy enterprise AI agent rendszer (mint az Alfie) 6–8 hét. Az időt mindig az Auditban közösen véglegesítjük.',
  },
  {
    q: 'Mi a különbség köztetek és egy ChatGPT bevezetés között?',
    a: 'A ChatGPT egy eszköz. Mi rendszereket építünk, amik konkrét üzleti folyamatokat futtatnak — számlákat dolgoznak fel, ügyfeleket szolgálnak ki, riportokat készítenek. Egy ChatGPT-fiók 20 USD/hó. Egy Zentopia-rendszer 0-tól dolgozik, integrálva a többi rendszereddel.',
  },
  {
    q: 'Mi van, ha nincs sok adatunk vagy nincs technikai csapatunk?',
    a: 'Ez a leggyakoribb helyzet a vállalkozásoknál — pont ezért dolgozunk velük. Az Auditban átnézzük, mi van, és mi hiányzik. Sokszor a "nincs adatunk" valójában csak azt jelenti, hogy az adat egy másik rendszerben van. Nem kell technikai csapat — mi vagyunk az.',
  },
  {
    q: 'Mi van az adataimmal? Biztonságosan kezeled?',
    a: 'Igen. Minden projekt saját, izolált környezetben fut (lásd: Alfie enterprise sandbox). Az ügyfél-adatokat soha nem osztjuk meg AI training-re, harmadik felekkel. GDPR-konform működés, magyar jogi környezet.',
  },
  {
    q: 'Mi van, ha az ingyenes AI-konzultáció után nem akarok veletek dolgozni?',
    a: 'Akkor a térkép a tied. Megmutattuk, hol érdemes elindulnod — akár saját erőből, akár másik partnerrel. Nincs nyomás, nincs follow-up email-spam.',
  },
  {
    q: 'Mi az a "labs.zentopia.io"?',
    a: 'Ez a "labor" — itt megosztjuk a tanulságokat, a meghibásodásokat, a kísérleteket. Magyar nyelvű AI-tartalom, ami nem hype, hanem tapasztalat. Iratkozz fel, ha akarsz.',
  },
];

function FAQHeader({ isMobile }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: isMobile ? 32 : 48,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
        <PixelLabel size={isMobile ? 10 : 11}>[ 07 ] GYIK</PixelLabel>
        <h2 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 44 : 72,
          letterSpacing: '-0.04em',
          color: Z.forest,
          lineHeight: 0.98,
        }}>Gyakori kérdések.</h2>
      </div>
      <p style={{
        margin: 0,
        fontSize: isMobile ? 15 : 17,
        color: Z.slate,
        maxWidth: 320,
        lineHeight: 1.5,
        textAlign: isMobile ? 'left' : 'right',
      }}>Amit minden első beszélgetésen megkérdeznek.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Accordion (classic, smooth expand/collapse)
// ─────────────────────────────────────────────────────────────
function FaqV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const accent = palette.ember;

  const [openIdx, setOpenIdx] = React.useState(0);

  const Item = ({ item, idx, isOpen }) => {
    // animate via max-height. We use a ref to measure actual content height.
    const contentRef = React.useRef(null);
    const [maxH, setMaxH] = React.useState(0);
    React.useEffect(() => {
      if (contentRef.current) setMaxH(contentRef.current.scrollHeight);
    }, [item.a]);

    return (
      <div style={{
        borderTop: idx === 0 ? `1px solid ${Z.hairline}` : 'none',
        borderBottom: `1px solid ${Z.hairline}`,
      }}>
        <button
          onClick={() => setOpenIdx(isOpen ? -1 : idx)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            padding: isMobile ? '20px 4px' : '24px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flex: 1 }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: accent,
              letterSpacing: '0.08em',
              flexShrink: 0,
              width: isMobile ? 24 : 32,
            }}>0{idx + 1}.</span>
            <span style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: isMobile ? 17 : 22,
              color: Z.forest,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}>{item.q}</span>
          </div>
          {/* chevron rotates */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28, height: 28,
            border: `1.5px solid ${isOpen ? accent : Z.forest}`,
            borderRadius: '50%',
            color: isOpen ? accent : Z.forest,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1), color 220ms, border-color 220ms',
            flexShrink: 0,
          }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        <div style={{
          maxHeight: isOpen ? maxH : 0,
          overflow: 'hidden',
          transition: 'max-height 380ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div ref={contentRef} style={{
            padding: isMobile ? '0 4px 24px 44px' : '0 8px 28px 48px',
            fontSize: isMobile ? 15 : 16,
            color: Z.slate,
            lineHeight: 1.6,
            maxWidth: 920,
          }}>{item.a}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '36px 20px 64px' : '64px 56px 112px', position: 'relative', zIndex: 1 }}>
        <FAQHeader isMobile={isMobile} />
        <div style={{ maxWidth: isMobile ? '100%' : 1080 }}>
          {FAQ.map((item, i) => (
            <Item key={i} item={item} idx={i} isOpen={openIdx === i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Open cards (2-col always-visible, terminal-style Q/A)
// ─────────────────────────────────────────────────────────────
function FaqV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const accent = palette.ember;

  const Card = ({ item, idx }) => (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 10,
      padding: isMobile ? '22px 22px 24px' : '26px 28px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      breakInside: 'avoid',
      marginBottom: isMobile ? 14 : 18,
    }}>
      {/* corner pixel cluster */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 10, right: 10,
        display: 'grid', gridTemplateColumns: 'repeat(3, 3px)', gridTemplateRows: 'repeat(3, 3px)', gap: 1,
      }}>
        {[1,1,0,1,1,1,0,1,1].map((v, i) => (
          <span key={i} style={{ width: 3, height: 3, background: v ? accent : 'transparent', opacity: 0.7 }} />
        ))}
      </div>

      {/* Q row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
          fontSize: 12,
          color: accent,
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>Q.0{idx + 1} {'>'}</span>
        <h3 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 17 : 20,
          color: Z.forest,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}>{item.q}</h3>
      </div>

      {/* hairline divider */}
      <div style={{ height: 1, background: Z.hairline, marginLeft: isMobile ? 0 : 8 }} />

      {/* A row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 500,
          fontSize: 12,
          color: Z.slate,
          letterSpacing: '0.04em',
          flexShrink: 0,
          paddingTop: 2,
        }}>A.0{idx + 1} {'>'}</span>
        <p style={{
          margin: 0,
          fontSize: isMobile ? 14 : 15,
          color: Z.slate,
          lineHeight: 1.55,
        }}>{item.a}</p>
      </div>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '36px 20px 64px' : '64px 56px 112px', position: 'relative', zIndex: 1 }}>
        <FAQHeader isMobile={isMobile} />
        <div style={{
          columnCount: isMobile ? 1 : 2,
          columnGap: 18,
        }}>
          {FAQ.map((item, i) => (
            <Card key={i} item={item} idx={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

window.FaqV1 = FaqV1;
window.FaqV2 = FaqV2;
