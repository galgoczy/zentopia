// Services section — 2 variations
// Brand: 5 services, each with its accent color (Ember/Sky/Violet/Coral/Sunshine)

function buildServices(palette) {
  const p = palette || Z.palettes.book;
  return [
    { n: '02', color: p.ember,    title: 'AI tartalomgyártás',     sub: 'Kreatív kommunikáció',     body: 'Social poszt, kampányszöveg, blog, video script, AI képek és kreatív tesztek — gyorsabban, több verzióban.', icon: 'content' },
    { n: '01', color: p.sky,      title: 'AI agentek',              sub: 'Digitális asszisztensek',  body: 'Ügyfélszolgálati, sales, admin, HR vagy dokumentumkezelő AI munkatársak. Saját rendszerre szabva.',          icon: 'agents'  },
    { n: '03', color: p.violet,   title: 'Folyamat-automatizáció',  sub: 'Ismétlődő munka, eltüntetve', body: 'E-mailek, ajánlatkérések, CRM, számlák, riportok automatizálása n8n / Make / Zapier alapon.',            icon: 'flow'    },
    { n: '04', color: p.coral,    title: 'AI webappok',             sub: 'Egyedi üzleti alkalmazások', body: 'Dashboard-ok, tudásbázisok (RAG), ajánlatkészítő rendszerek, integrált CRM/ERP megoldások.',                icon: 'webapp'  },
    { n: '05', color: p.sunshine, title: 'AI tanácsadás',           sub: 'Képzés és bevezetés',       body: 'AI audit, eszközválasztás, vezetői workshop, csapat-tréning, promptolás, bevezetési roadmap.',               icon: 'consult' },
  ];
}

// Backwards-compat: keep a default const for any old callers.
const SERVICES = buildServices(Z.palettes.book);

// Circuit-DNS line illustrations — monoline, with terminal circles per brand spec.
// Optional `glitch`: periodic shatter+reform shudder, staggered via glitchDelay.
function CircuitIcon({ kind, color, size = 64, glitch = true, glitchDelay = 0, glitchCycle = 9 }) {
  const stroke = 2.2;
  const term = 3.5; // terminal circle radius
  const C = color;
  const common = { strokeWidth: stroke, stroke: C, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const id = React.useMemo(() => 'ci-' + Math.random().toString(36).slice(2, 7), []);

  // deterministic debris positions per instance
  const debris = React.useMemo(() => {
    const rng = (() => { let s = id.charCodeAt(2) * 9301 + 49297; return () => (s = (s * 9301 + 49297) % 233280) / 233280; })();
    return Array.from({ length: 7 }, () => ({
      x: 15 + rng() * 70,
      y: 15 + rng() * 70,
      w: 2 + rng() * 3,
    }));
  }, [id]);

  let body;
  if (kind === 'content') {
    body = (
      <>
        {/* document with bullet lines, circuit style */}
        <rect x="14" y="14" width="60" height="60" {...common} />
        <line x1="24" y1="30" x2="58" y2="30" {...common} />
        <line x1="24" y1="44" x2="64" y2="44" {...common} />
        <line x1="24" y1="58" x2="50" y2="58" {...common} />
        <circle cx="58" cy="30" r={term} fill={C} />
        <circle cx="64" cy="44" r={term} fill={C} />
        <circle cx="50" cy="58" r={term} fill={C} />
      </>
    );
  } else if (kind === 'agents') {
    body = (
      <>
        {/* triangle network */}
        <line x1="20" y1="60" x2="44" y2="20" {...common} />
        <line x1="44" y1="20" x2="68" y2="60" {...common} />
        <line x1="20" y1="60" x2="68" y2="60" {...common} />
        <circle cx="20" cy="60" r={term + 2} fill={C} />
        <circle cx="44" cy="20" r={term + 2} fill={C} />
        <circle cx="68" cy="60" r={term + 2} fill={C} />
        <circle cx="44" cy="46" r={term - 0.5} fill={C} />
      </>
    );
  } else if (kind === 'flow') {
    body = (
      <>
        {/* zigzag: down → up → down → up — like a snake through the grid */}
        <polyline points="14,30 26,30 26,52 44,52 44,28 60,28 60,58 74,58" {...common} />
        {/* arrow at end */}
        <polyline points="74,58 70,54" {...common} />
        <polyline points="74,58 70,62" {...common} />
        {/* start + pivot terminal dots */}
        <circle cx="14" cy="30" r={term} fill={C} />
        <circle cx="26" cy="30" r={term - 1} fill={C} />
        <circle cx="26" cy="52" r={term - 1} fill={C} />
        <circle cx="44" cy="52" r={term - 1} fill={C} />
        <circle cx="44" cy="28" r={term - 1} fill={C} />
        <circle cx="60" cy="28" r={term - 1} fill={C} />
        <circle cx="60" cy="58" r={term - 1} fill={C} />
      </>
    );
  } else if (kind === 'webapp') {
    body = (
      <>
        {/* nested rectangles */}
        <rect x="14" y="20" width="60" height="48" {...common} />
        <line x1="14" y1="32" x2="74" y2="32" {...common} />
        <circle cx="22" cy="26" r={term - 0.5} fill={C} />
        <circle cx="30" cy="26" r={term - 0.5} fill={C} />
        <rect x="24" y="42" width="20" height="18" {...common} />
        <line x1="50" y1="46" x2="66" y2="46" {...common} />
        <line x1="50" y1="54" x2="62" y2="54" {...common} />
        <circle cx="66" cy="46" r={term} fill={C} />
        <circle cx="62" cy="54" r={term} fill={C} />
      </>
    );
  } else if (kind === 'consult') {
    // digital circuit brain — chip body w/ internal neuron dots + 8 traces radiating out
    body = (
      <>
        {/* chip body */}
        <rect x="32" y="36" width="24" height="18" rx="2" {...common} />
        {/* internal "neurons" */}
        <circle cx="38" cy="42" r="1.4" fill={C} />
        <circle cx="46" cy="40" r="1.4" fill={C} />
        <circle cx="51" cy="46" r="1.4" fill={C} />
        <circle cx="40" cy="48" r="1.4" fill={C} />
        <circle cx="48" cy="50" r="1.4" fill={C} />
        {/* connecting traces between neurons */}
        <line x1="38" y1="42" x2="46" y2="40" {...common} strokeWidth="1.2" />
        <line x1="46" y1="40" x2="51" y2="46" {...common} strokeWidth="1.2" />
        <line x1="40" y1="48" x2="48" y2="50" {...common} strokeWidth="1.2" />
        {/* 4 orthogonal traces out */}
        <line x1="44" y1="14" x2="44" y2="36" {...common} />
        <line x1="44" y1="54" x2="44" y2="74" {...common} />
        <line x1="14" y1="45" x2="32" y2="45" {...common} />
        <line x1="56" y1="45" x2="74" y2="45" {...common} />
        {/* 4 diagonal traces (with 45° bends, circuit-style) */}
        <polyline points="20,20 28,28 32,36" {...common} />
        <polyline points="68,20 60,28 56,36" {...common} />
        <polyline points="20,68 28,60 32,54" {...common} />
        <polyline points="68,68 60,60 56,54" {...common} />
        {/* terminal circles */}
        <circle cx="44" cy="14" r={term} fill={C} />
        <circle cx="44" cy="74" r={term} fill={C} />
        <circle cx="14" cy="45" r={term} fill={C} />
        <circle cx="74" cy="45" r={term} fill={C} />
        <circle cx="20" cy="20" r={term} fill={C} />
        <circle cx="68" cy="20" r={term} fill={C} />
        <circle cx="20" cy="68" r={term} fill={C} />
        <circle cx="68" cy="68" r={term} fill={C} />
      </>
    );
  }

  const svgEl = (
    <svg width={size} height={size} viewBox="0 0 88 88" style={{ display: 'block' }}>
      {body}
    </svg>
  );

  if (!glitch) return svgEl;

  // Glitch: shudder + 2 CRT-tear slices + pixel debris in section color.
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <style>{`
        @keyframes ${id}-shake {
          0%, 90%, 100% { transform: translate(0,0) scale(1); }
          90.5%         { transform: translate(2px, -1px) scale(1.04); }
          91%           { transform: translate(-2px, 1px) scale(0.96); }
          91.5%         { transform: translate(1px, 0) scale(1.02); }
          92%           { transform: translate(0,0) scale(1); }
        }
        @keyframes ${id}-pix {
          0%, 90%, 100% { filter: none; }
          90.6%         { filter: contrast(2) brightness(1.3) blur(0.4px); }
          91.3%         { filter: contrast(2.4) blur(0.8px); }
          91.8%         { filter: contrast(1.4); }
        }
        @keyframes ${id}-tear1 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.5%              { opacity: 0.9; transform: translate(5px, 0); }
          91%                { opacity: 0.7; transform: translate(-4px, 0); }
        }
        @keyframes ${id}-tear2 {
          0%, 90%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          90.6%              { opacity: 0.85; transform: translate(-5px, 0); }
          91.1%              { opacity: 0.5;  transform: translate(3px, 0); }
        }
        @keyframes ${id}-debris {
          0%, 90%, 92%, 100% { opacity: 0; transform: scale(0.5); }
          90.6%              { opacity: 1;    transform: scale(1); }
          91.4%              { opacity: 0.4;  transform: scale(1.2); }
        }
        .${id}-shake  { animation: ${id}-shake  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; transform-origin: 50% 50%; }
        .${id}-pix    { animation: ${id}-pix    ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; }
        .${id}-tear1  { animation: ${id}-tear1  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; clip-path: polygon(0 22%, 100% 22%, 100% 42%, 0 42%); }
        .${id}-tear2  { animation: ${id}-tear2  ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; clip-path: polygon(0 58%, 100% 58%, 100% 78%, 0 78%); }
        .${id}-debris { animation: ${id}-debris ${glitchCycle}s steps(1,end) ${glitchDelay}s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-shake, .${id}-pix, .${id}-tear1, .${id}-tear2, .${id}-debris { animation: none !important; }
        }
      `}</style>
      <div className={`${id}-shake`} style={{ position: 'absolute', inset: 0 }}>
        <div className={`${id}-pix`}>{svgEl}</div>
      </div>
      <div className={`${id}-tear1`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{svgEl}</div>
      <div className={`${id}-tear2`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{svgEl}</div>
      <div className={`${id}-debris`} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {debris.map((d, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${d.x}%`, top: `${d.y}%`,
            width: d.w, height: d.w,
            background: color,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Color-strip grid (clean, brand-book canonical)
// ─────────────────────────────────────────────────────────────
function ServicesV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const services = React.useMemo(() => buildServices(palette), [palette]);

  const Card = ({ s, idx = 0 }) => (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 200ms ease, box-shadow 200ms ease',
      position: 'relative',
    }}>
      {/* top color stripe */}
      <div style={{ height: 5, background: s.color, width: '100%' }} />
      <div style={{ padding: isMobile ? '22px 22px 24px' : '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <CircuitIcon kind={s.icon} color={s.color} size={isMobile ? 56 : 64} glitchDelay={idx * 1.8} />
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: Z.slate,
            letterSpacing: '0.06em',
          }}>{s.n}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 22 : 24,
            letterSpacing: '-0.02em',
            color: Z.forest,
            lineHeight: 1.1,
          }}>{s.title}</h3>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: s.color,
            letterSpacing: '0.02em',
            filter: 'brightness(0.85)',
          }}>// {s.sub}</span>
        </div>
        <p style={{
          margin: 0,
          fontSize: isMobile ? 14 : 15,
          lineHeight: 1.5,
          color: Z.slate,
          flex: 1,
        }}>{s.body}</p>
        <a style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 14,
          fontWeight: 600,
          color: Z.forest,
          letterSpacing: '-0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'none',
          marginTop: 4,
        }}>Olvasd el <span style={{ color: s.color }}>→</span></a>
      </div>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: isMobile ? 28 : 56, maxWidth: 760 }}>
          <PixelLabel size={isMobile ? 10 : 11}>[ 02 ] SZOLGÁLTATÁSOK</PixelLabel>
          <h2 style={{
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 36 : 56,
            letterSpacing: '-0.035em',
            color: Z.forest,
            lineHeight: 1,
          }}>Amit a Zentopia épít.</h2>
          <p style={{
            margin: 0,
            fontSize: isMobile ? 15 : 18,
            color: Z.slate,
            maxWidth: 560,
            lineHeight: 1.5,
          }}>Öt terület — minden problémára egy konkrét megoldás.</p>
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {services.map((s, i) => <Card key={s.n} s={s} idx={i} />)}
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
              {services.slice(0, 3).map((s, i) => <Card key={s.n} s={s} idx={i} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: '66.5%', margin: '0 auto' }}>
              {services.slice(3, 5).map((s, i) => <Card key={s.n} s={s} idx={i + 3} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Bento asymmetric (playful, 8-bit accents)
// ─────────────────────────────────────────────────────────────
function ServicesV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const services = React.useMemo(() => buildServices(palette), [palette]);

  // Featured + 4 smaller. We'll feature index 1 (AI agents — the "headline" service).
  const featured = services[1];
  const others = services.filter((_, i) => i !== 1);

  const SmallCard = ({ s, big = false, idx = 0 }) => (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 12,
      padding: big ? (isMobile ? 24 : 32) : (isMobile ? 22 : 26),
      display: 'flex',
      flexDirection: 'column',
      gap: big ? 18 : 14,
      position: 'relative',
      overflow: 'hidden',
      minHeight: big ? (isMobile ? 280 : 360) : (isMobile ? 220 : 220),
    }}>
      {/* corner pixel cluster — 8-bit accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 5px)',
        gridTemplateRows: 'repeat(4, 5px)',
        gap: 1,
        padding: 10,
        opacity: 0.85,
      }}>
        {[
          1,1,0,0,
          1,1,1,0,
          0,1,1,1,
          0,0,1,1,
        ].map((v, i) => (
          <span key={i} style={{ width: 5, height: 5, background: v ? s.color : 'transparent' }} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 10,
          color: s.color,
          letterSpacing: '0.04em',
        }}>[ {s.n} ]</span>
      </div>

      <CircuitIcon kind={s.icon} color={s.color} size={big ? (isMobile ? 80 : 110) : (isMobile ? 52 : 60)} glitchDelay={idx * 1.8} />

      <h3 style={{
        margin: 0,
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: big ? (isMobile ? 28 : 38) : (isMobile ? 20 : 22),
        letterSpacing: '-0.03em',
        color: Z.forest,
        lineHeight: 1.05,
      }}>{s.title}</h3>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: big ? 13 : 12,
        color: s.color,
        letterSpacing: '0.02em',
        filter: 'brightness(0.85)',
        marginTop: -8,
      }}>// {s.sub}</span>
      <p style={{
        margin: 0,
        fontSize: big ? (isMobile ? 15 : 16) : (isMobile ? 13 : 14),
        lineHeight: 1.5,
        color: Z.slate,
        flex: 1,
      }}>{s.body}</p>
      <a style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: 14,
        fontWeight: 600,
        color: Z.forest,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        textDecoration: 'none',
      }}>Olvasd el <span style={{ color: s.color }}>→</span></a>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          flexDirection: isMobile ? 'column' : 'row',
          marginBottom: isMobile ? 28 : 48,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
            <PixelLabel size={isMobile ? 10 : 11}>[ 02 ] SZOLGÁLTATÁSOK</PixelLabel>
            <h2 style={{
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: isMobile ? 36 : 64,
              letterSpacing: '-0.035em',
              color: Z.forest,
              lineHeight: 0.98,
            }}>Amit a Zentopia épít.</h2>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? 15 : 17,
            color: Z.slate,
            maxWidth: 320,
            lineHeight: 1.5,
            textAlign: isMobile ? 'left' : 'right',
          }}>Öt terület — minden problémára egy konkrét megoldás.</p>
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SmallCard s={featured} big idx={0} />
            {others.map((s, i) => <SmallCard key={s.n} s={s} idx={i + 1} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(180px, auto)', gap: 16 }}>
            {/* row 1: featured spans 2 cols 2 rows, then 2 small */}
            <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}><SmallCard s={featured} big idx={0} /></div>
            <div><SmallCard s={others[0]} idx={1} /></div>
            <div><SmallCard s={others[1]} idx={2} /></div>
            <div><SmallCard s={others[2]} idx={3} /></div>
            <div><SmallCard s={others[3]} idx={4} /></div>
          </div>
        )}
      </div>
    </div>
  );
}

window.ServicesV1 = ServicesV1;
window.ServicesV2 = ServicesV2;
window.SERVICES = SERVICES;
window.CircuitIcon = CircuitIcon;
