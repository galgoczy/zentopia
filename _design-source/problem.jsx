// Problem / "A KÉRDÉS" section — 2 variations
// 3 questions, each with accent color (Ember/Sky/Violet), big symbol, italic sub.
// Bridge dark bar at the bottom.

// Typewriter: types `text` char-by-char after `delay` ms, leaves a blinking cursor at the end.
function Typewriter({ text, delay = 0, speed = 45, cursorColor = Z.forest, cursorSize = 'auto' }) {
  const [shown, setShown] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    let charTimer;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) {
        charTimer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    const startTimer = setTimeout(tick, delay);
    return () => { cancelled = true; clearTimeout(startTimer); clearTimeout(charTimer); };
  }, [text, delay, speed]);

  return (
    <>
      <span style={{ whiteSpace: 'pre-line' }}>{shown}</span>
      <span style={{
        display: 'inline-block',
        width: cursorSize === 'auto' ? '0.55em' : cursorSize,
        height: cursorSize === 'auto' ? '0.9em' : cursorSize,
        background: cursorColor,
        marginLeft: 4,
        verticalAlign: '-0.10em',
        animation: done ? 'tw-blink 1s steps(2, end) infinite' : 'none',
      }} />
    </>
  );
}

function buildProblems(palette) {
  const p = palette || Z.palettes.book;
  return [
    { n: '01', color: p.ember,  symbol: '?', q: ['Használnád az AI-t,', 'de nem tudod,', 'pontosan mire?'], sub: 'Sok eszköz, sok hype, sok ígéret. De konkrétan?' },
    { n: '02', color: p.sky,    symbol: '$', q: ['Melyik eszköz hozna', 'tényleg bevételt?'],               sub: 'Nem trend, nem demo — valódi üzleti hatás.' },
    { n: '03', color: p.violet, symbol: '⚙', q: ['Hogy tudnál kiváltani', 'emberi munkaerőt?'],              sub: 'Vagy felgyorsítani azt, ami már működik.' },
  ];
}

// Shared bridge — dark sáv at the bottom of the Problem section
function ProblemBridge({ isMobile }) {
  return (
    <div style={{
      background: Z.forest,
      color: Z.offwhite,
      padding: isMobile ? '36px 24px' : '56px 56px',
      borderRadius: 14,
      position: 'relative',
      overflow: 'hidden',
      marginTop: isMobile ? 28 : 56,
    }}>
      <PixelGrid color="rgba(200,255,107,0.06)" />
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 18 : 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 12 }}>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: isMobile ? 16 : 18,
            color: 'rgba(250,250,247,0.65)',
            letterSpacing: '-0.01em',
          }}>Ismerős kérdések?</span>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 22 : 30,
            color: Z.offwhite,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            maxWidth: isMobile ? '100%' : 720,
          }}>Akkor jó helyen jársz. <span style={{ color: Z.lime }}>Megmutatjuk, hogyan találunk rájuk választ →</span></span>
        </div>
        <CTAPrimary size={isMobile ? 'md' : 'lg'} dark>Mutasd a folyamatot →</CTAPrimary>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Question grid: 3 clean cards, big symbol top, accent stripe
// ─────────────────────────────────────────────────────────────
function ProblemV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const problems = React.useMemo(() => buildProblems(palette), [palette]);

  const Card = ({ p, idx }) => (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: isMobile ? 'auto' : 380,
    }}>
      <div style={{ height: 5, background: p.color }} />
      <div style={{
        padding: isMobile ? '22px 19px 24px' : '36px 32px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 14 : 18,
        flex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: Z.slate,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>// kérdés {p.n}</span>
        </div>
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 60 : 104,
          color: p.color,
          letterSpacing: '-0.06em',
          lineHeight: 0.85,
          height: isMobile ? 51 : 88,
          display: 'flex',
          alignItems: 'flex-start',
        }}>{p.symbol}</div>
        <h3 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 22 : 30,
          letterSpacing: '-0.03em',
          color: Z.forest,
          lineHeight: 1.1,
          whiteSpace: 'pre-line',
          minHeight: isMobile ? '3.3em' : '3.3em',
        }}>
          <Typewriter
            text={p.q.join('\n')}
            delay={200 + idx * 1800}
            speed={42}
            cursorColor={p.color}
          />
        </h3>
        <p style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontStyle: 'italic',
          fontSize: isMobile ? 14 : 15,
          color: Z.slate,
          lineHeight: 1.5,
          marginTop: 'auto',
        }}>{p.sub}</p>
      </div>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <style>{`@keyframes tw-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }`}</style>
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: isMobile ? 28 : 48, maxWidth: 760 }}>
          <PixelLabel size={isMobile ? 10 : 11}>[ 03 ] A KÉRDÉS</PixelLabel>
          <h2 style={{
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 48 : 80,
            letterSpacing: '-0.035em',
            color: Z.forest,
            lineHeight: 0.98,
          }}>Ismerős?</h2>
        </div>
        <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
          {problems.map((p, i) => <Card key={p.n} p={p} idx={i} />)}
        </div>
        <ProblemBridge isMobile={isMobile} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Terminal-row interrogation: alternating full-width rows, huge symbol block.
// ─────────────────────────────────────────────────────────────
function ProblemV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const problems = React.useMemo(() => buildProblems(palette), [palette]);

  // Symbol block — big tinted square with the glyph, 8-bit framing
  const SymbolBlock = ({ p, big }) => (
    <div style={{
      width: big ? (isMobile ? 140 : 240) : (isMobile ? 100 : 180),
      height: big ? (isMobile ? 140 : 240) : (isMobile ? 100 : 180),
      background: p.color,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `8px 8px 0 ${Z.forest}`,
    }}>
      {/* pixel cluster corner */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 6, right: 6,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 4px)',
        gridTemplateRows: 'repeat(3, 4px)',
        gap: 1,
      }}>
        {[1,1,0,1,1,1,0,1,1].map((v, i) => (
          <span key={i} style={{ width: 4, height: 4, background: v ? Z.forest : 'transparent', opacity: 0.7 }} />
        ))}
      </div>
      <span style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: big ? (isMobile ? 110 : 180) : (isMobile ? 78 : 130),
        color: Z.forest,
        lineHeight: 0.85,
        letterSpacing: '-0.04em',
        marginTop: -8,
      }}>{p.symbol}</span>
    </div>
  );

  const Row = ({ p, idx, reverse }) => (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : (reverse ? 'row-reverse' : 'row'),
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? 24 : 56,
      padding: isMobile ? '28px 0' : '40px 0',
      borderTop: idx === 0 ? `1px solid ${Z.hairline}` : 'none',
      borderBottom: `1px solid ${Z.hairline}`,
    }}>
      <div style={{ paddingTop: isMobile ? 0 : 8 }}>
        <SymbolBlock p={p} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 11,
            color: p.color,
            letterSpacing: '0.05em',
          }}>[ Q{p.n} ]</span>
          <span style={{
            display: 'inline-block',
            width: 8, height: 14,
            background: Z.forest,
            animation: 'blink 1s steps(2, end) infinite',
          }} />
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 30 : 56,
          letterSpacing: '-0.035em',
          color: Z.forest,
          lineHeight: 0.98,
          textWrap: 'balance',
        }}>{p.q.join(' ')}</h3>
        <p style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontStyle: 'italic',
          fontSize: isMobile ? 15 : 18,
          color: Z.slate,
          maxWidth: 540,
          lineHeight: 1.5,
        }}>{p.sub}</p>
      </div>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }`}</style>
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: isMobile ? 12 : 24, maxWidth: 760 }}>
          <PixelLabel size={isMobile ? 10 : 11}>[ 03 ] A KÉRDÉS</PixelLabel>
          <h2 style={{
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 48 : 96,
            letterSpacing: '-0.04em',
            color: Z.forest,
            lineHeight: 0.96,
          }}>Ismerős?</h2>
        </div>
        <div>
          {problems.map((p, i) => (
            <Row key={p.n} p={p} idx={i} reverse={i % 2 === 1} />
          ))}
        </div>
        <ProblemBridge isMobile={isMobile} />
      </div>
    </div>
  );
}

window.ProblemV1 = ProblemV1;
window.ProblemV2 = ProblemV2;
