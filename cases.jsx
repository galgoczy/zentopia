// Case studies / "MUNKÁK" section — dark moment.
// Each case has tag, title, sub, 3 stats, and a placeholder visual.

function buildCases(palette) {
  const p = palette || Z.palettes.book;
  return [
    {
      n: '01',
      tag: 'RENDEZVÉNY · CUSTOM BUILD',
      title: 'Élménypont AI Selfiemata',
      sub: 'AI fotóbox, ami 10 másodperc alatt űrhajóst csinál bárkiből.',
      stats: [['10mp', 'kép / generálás'], ['5k+', 'kép készült'], ['end-to-end', 'fejlesztés']],
      color: p.coral,
      visual: 'photo',
    },
    {
      n: '02',
      tag: 'VENDÉGLÁTÁS · AUTOMATIZÁCIÓ',
      title: 'Pepper House',
      sub: '7-egységes vendéglátó cég teljes AI-vezérelt pénzügyi rendszere.',
      stats: [['7', 'egység'], ['100%', 'AI admin'], ['online', 'workflow']],
      color: p.sunshine,
      visual: 'ledger',
    },
    {
      n: '03',
      tag: 'IRODA · AI AGENT',
      title: 'Alfie the Agent',
      sub: 'Teljes irodai AI munkatárs számlákkal, naptárral, stratégiával.',
      stats: [['1', 'AI munkatárs'], ['24/7', 'működés'], ['NDA', 'sandboxed']],
      color: p.sky,
      visual: 'agent',
    },
    {
      n: '04',
      tag: 'E-COMMERCE · END-TO-END',
      title: 'Nola and Co',
      sub: 'Teljes AI-powered webshop 2 hét alatt, töredék fenntartási költséggel.',
      stats: [['2 hét', 'build'], ['1', 'workflow mindenre'], ['−90%', 'költség']],
      color: p.violet,
      visual: 'shop',
    },
  ];
}

// Placeholder visual — circuit-DNA tinted block. The actual case photos plug in later.
function CaseVisual({ kind, color, big = false }) {
  // tiny SVG composition per kind — abstract circuit-style
  const inner = (() => {
    const stroke = { strokeWidth: 1.5, stroke: color, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (kind === 'photo') return (
      <g>
        <rect x="20" y="34" width="160" height="92" rx="3" {...stroke} />
        <circle cx="100" cy="80" r="22" {...stroke} strokeWidth="2" />
        <circle cx="100" cy="80" r="10" {...stroke} />
        <line x1="40" y1="46" x2="62" y2="46" {...stroke} />
        <line x1="158" y1="46" x2="168" y2="46" {...stroke} />
        <circle cx="40" cy="46" r="2" fill={color} />
        <circle cx="168" cy="46" r="2" fill={color} />
      </g>
    );
    if (kind === 'ledger') return (
      <g>
        <line x1="20" y1="44" x2="180" y2="44" {...stroke} />
        <line x1="20" y1="64" x2="180" y2="64" {...stroke} />
        <line x1="20" y1="84" x2="140" y2="84" {...stroke} />
        <line x1="20" y1="104" x2="160" y2="104" {...stroke} />
        <line x1="20" y1="124" x2="100" y2="124" {...stroke} />
        <circle cx="180" cy="44" r="2.5" fill={color} />
        <circle cx="180" cy="64" r="2.5" fill={color} />
        <circle cx="140" cy="84" r="2.5" fill={color} />
        <circle cx="160" cy="104" r="2.5" fill={color} />
        <circle cx="100" cy="124" r="2.5" fill={color} />
      </g>
    );
    if (kind === 'agent') return (
      <g>
        <rect x="78" y="36" width="44" height="44" rx="2" {...stroke} strokeWidth="2" />
        <circle cx="90" cy="52" r="2" fill={color} />
        <circle cx="102" cy="52" r="2" fill={color} />
        <line x1="86" y1="64" x2="114" y2="64" {...stroke} />
        <line x1="100" y1="80" x2="100" y2="100" {...stroke} />
        <line x1="60" y1="116" x2="140" y2="116" {...stroke} />
        <circle cx="60" cy="116" r="3" fill={color} />
        <circle cx="140" cy="116" r="3" fill={color} />
        <circle cx="100" cy="100" r="3" fill={color} />
      </g>
    );
    // shop / e-commerce
    return (
      <g>
        <polyline points="40,40 60,40 70,108 160,108" {...stroke} strokeWidth="2" />
        <circle cx="86" cy="124" r="6" {...stroke} />
        <circle cx="146" cy="124" r="6" {...stroke} />
        <rect x="70" y="56" width="100" height="42" {...stroke} />
        <line x1="80" y1="72" x2="120" y2="72" {...stroke} />
        <line x1="80" y1="84" x2="140" y2="84" {...stroke} />
        <circle cx="160" cy="56" r="3" fill={color} />
        <circle cx="120" cy="72" r="2" fill={color} />
        <circle cx="140" cy="84" r="2" fill={color} />
      </g>
    );
  })();

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: big ? 280 : 160,
      borderRadius: 8,
      background: `${color}1a`, // 10% tint
      border: `1px solid ${color}40`,
      overflow: 'hidden',
    }}>
      {/* subtle grid bg */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(to right, ${color}1c 1px, transparent 1px), linear-gradient(to bottom, ${color}1c 1px, transparent 1px)`,
        backgroundSize: '12px 12px',
      }} />
      <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
      }}>{inner}</svg>
      {/* corner pixel cluster */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 10, right: 10,
        display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gridTemplateRows: 'repeat(3, 4px)', gap: 1,
      }}>
        {[1,1,0,1,1,1,0,1,1].map((v, i) => (
          <span key={i} style={{ width: 4, height: 4, background: v ? color : 'transparent' }} />
        ))}
      </div>
    </div>
  );
}

function StatRow({ isMobile, dark }) {
  const stats = [
    { val: '4',     label: 'iparág' },
    { val: '2 hét', label: 'leggyorsabb projekt' },
    { val: '100%',  label: 'AI-powered' },
    { val: '1',     label: 'enterprise sandbox' },
  ];
  const fg = dark ? Z.offwhite : Z.forest;
  const muted = dark ? 'rgba(250,250,247,0.55)' : Z.slate;
  const border = dark ? 'rgba(250,250,247,0.10)' : Z.hairline;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? 16 : 0,
      padding: isMobile ? '20px 0' : '24px 0',
      borderTop: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: isMobile ? '0 4px' : '0 24px',
          borderLeft: !isMobile && i > 0 ? `1px solid ${border}` : 'none',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 32 : 56,
            color: fg,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>{s.val}</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: muted,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>// {s.label}</span>
        </div>
      ))}
    </div>
  );
}

function CaseCard({ c, big = false, isMobile, dark = true }) {
  const fg = dark ? Z.offwhite : Z.forest;
  const muted = dark ? 'rgba(250,250,247,0.62)' : Z.slate;
  const bg = dark ? 'rgba(250,250,247,0.035)' : Z.white;
  const border = dark ? 'rgba(250,250,247,0.10)' : Z.hairline;
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 12,
      padding: big ? (isMobile ? 22 : 32) : (isMobile ? 20 : 24),
      display: 'flex',
      flexDirection: 'column',
      gap: big ? (isMobile ? 18 : 24) : (isMobile ? 14 : 16),
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
    }}>
      {/* image placeholder */}
      <CaseVisual kind={c.visual} color={c.color} big={big && !isMobile} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: c.color,
            letterSpacing: '0.08em',
          }}>{c.tag}</span>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 10,
            color: muted,
            letterSpacing: '0.04em',
          }}>[ {c.n} ]</span>
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: big ? (isMobile ? 24 : 36) : (isMobile ? 20 : 22),
          letterSpacing: '-0.03em',
          color: fg,
          lineHeight: 1.05,
        }}>{c.title}</h3>
        <p style={{
          margin: 0,
          fontSize: big ? (isMobile ? 15 : 17) : (isMobile ? 13 : 14),
          color: muted,
          lineHeight: 1.5,
          flex: 1,
        }}>{c.sub}</p>
      </div>

      {/* stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        paddingTop: 14,
        borderTop: `1px solid ${border}`,
      }}>
        {c.stats.map(([v, l], i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: big ? (isMobile ? 17 : 20) : (isMobile ? 14 : 16),
              color: c.color,
              letterSpacing: '-0.02em',
            }}>{v}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9,
              color: muted,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>{l}</span>
          </div>
        ))}
      </div>

      <a style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: 14,
        fontWeight: 600,
        color: fg,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
      }}>Olvasd el a teljes történetet <span style={{ color: c.color }}>→</span></a>
    </div>
  );
}

function CasesHeader({ isMobile, dark }) {
  const fg = dark ? Z.offwhite : Z.forest;
  const muted = dark ? 'rgba(250,250,247,0.65)' : Z.slate;
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: isMobile ? 28 : 40,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
        <PixelLabel size={isMobile ? 10 : 11} color={Z.lime}>[ 05 ] MUNKÁK</PixelLabel>
        <h2 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 44 : 80,
          letterSpacing: '-0.04em',
          color: fg,
          lineHeight: 0.98,
        }}>Amit eddig építettünk.</h2>
      </div>
      <p style={{
        margin: 0,
        fontSize: isMobile ? 15 : 17,
        color: muted,
        maxWidth: 340,
        lineHeight: 1.5,
        textAlign: isMobile ? 'left' : 'right',
      }}>Négy példa projekt — négy iparág — egyetlen filozófia.</p>
    </div>
  );
}

function CasesFooterCTA({ isMobile }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isMobile ? 'flex-start' : 'flex-end',
      marginTop: isMobile ? 32 : 48,
    }}>
      <CTAPrimary size={isMobile ? 'md' : 'lg'} dark>Foglalj időpontot Te is! →</CTAPrimary>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Trophy bento (1 large featured + 3 in a row)
// ─────────────────────────────────────────────────────────────
function CasesV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const cases = React.useMemo(() => buildCases(palette), [palette]);
  const featured = cases[0];
  const others = cases.slice(1);

  return (
    <div style={{ width: W, background: Z.forest, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.05)" />
      {/* big radial glow top-right */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: -200, right: -100, width: 700, height: 700,
        background: `radial-gradient(circle, rgba(200,255,107,0.10), transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ padding: isMobile ? '56px 20px 64px' : '104px 56px 112px', position: 'relative', zIndex: 1 }}>
        <CasesHeader isMobile={isMobile} dark />
        <StatRow isMobile={isMobile} dark />
        <div style={{ height: isMobile ? 28 : 40 }} />
        {/* featured */}
        <div style={{ marginBottom: isMobile ? 14 : 20 }}>
          <CaseCard c={featured} big isMobile={isMobile} dark />
        </div>
        {/* 3 smaller */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 14 : 20,
        }}>
          {others.map(c => <CaseCard key={c.n} c={c} isMobile={isMobile} dark />)}
        </div>
        <CasesFooterCTA isMobile={isMobile} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Ledger (big stat row + 2x2 equal grid)
// ─────────────────────────────────────────────────────────────
function CasesV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const cases = React.useMemo(() => buildCases(palette), [palette]);

  return (
    <div style={{ width: W, background: Z.forest, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.05)" />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -200, left: -100, width: 700, height: 700,
        background: `radial-gradient(circle, rgba(200,255,107,0.10), transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ padding: isMobile ? '56px 20px 64px' : '104px 56px 112px', position: 'relative', zIndex: 1 }}>
        <CasesHeader isMobile={isMobile} dark />
        <StatRow isMobile={isMobile} dark />
        <div style={{ height: isMobile ? 28 : 48 }} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 14 : 20,
        }}>
          {cases.map(c => <CaseCard key={c.n} c={c} isMobile={isMobile} dark />)}
        </div>
        <CasesFooterCTA isMobile={isMobile} />
      </div>
    </div>
  );
}

window.CasesV1 = CasesV1;
window.CasesV2 = CasesV2;
