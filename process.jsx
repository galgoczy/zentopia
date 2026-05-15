// Process / "FOLYAMAT" section — 2 variations + shared KEZDÉS CTA card.

function buildSteps(palette) {
  const p = palette || Z.palettes.book;
  return [
    { n: '01', color: p.ember,    title: 'Audit',     time: '~1 hét',     body: 'Átnézzük együtt a működésedet. Megkeressük, hol veszítesz időt, és hol térül meg gyorsan az AI.' },
    { n: '02', color: p.sky,      title: 'Roadmap',   time: '~3 nap',     body: 'Megkapod a prioritás-sorrendet. 3-5 konkrét projekt, sorba rakva ROI alapján. Nem 60 oldal PDF.' },
    { n: '03', color: p.violet,   title: 'Build',     time: '2-8 hét',    body: 'A legjobb ROI-pontnál elkezdjük építeni. Iteratívan, heti demókkal. Te látod, mi készül.' },
    { n: '04', color: p.sunshine, title: 'Skálázás',  time: 'folyamatos', body: 'A működő rendszert kibővítjük. Új use case-eket integrálunk, mérjük az eredményeket.' },
  ];
}

// Shared closing card: KEZDÉS
function KezdesCard({ isMobile }) {
  return (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 14,
      padding: isMobile ? '32px 24px' : '48px 56px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      gap: isMobile ? 24 : 40,
      marginTop: isMobile ? 32 : 56,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* lime corner accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, width: 80, height: 80,
        background: `linear-gradient(225deg, ${Z.lime} 0%, ${Z.lime} 40%, transparent 41%)`,
        opacity: 0.7,
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', flex: 1 }}>
        <PixelLabel size={isMobile ? 9 : 10} color={Z.lime}>[ 04.5 ] KEZDÉS</PixelLabel>
        <h3 style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 26 : 36,
          letterSpacing: '-0.03em',
          color: Z.forest,
          lineHeight: 1.1,
        }}>Az első lépés mindig az <GlitchText cycle={7}><span style={{
          background: Z.lime,
          padding: '0 0.12em',
          boxShadow: `3px 3px 0 ${Z.forest}`,
          display: 'inline-block',
          color: Z.forest,
        }}>Audit.</span></GlitchText></h3>
        <p style={{
          margin: 0,
          fontSize: isMobile ? 14 : 16,
          color: Z.slate,
          lineHeight: 1.5,
          maxWidth: 520,
        }}>Ingyenes 30 perces beszélgetés, ahol megnézzük, hol érdemes elindulni.</p>
      </div>
      <CTAPrimary size={isMobile ? 'md' : 'lg'}>Foglalj 30 perces AI-konzultációt →</CTAPrimary>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Linear timeline (horizontal desktop, vertical mobile)
// Auto-advancing progress: line walks from step 0 → 3, then pauses and resets.
// Steps below the current progress are faded; line "draws in" as each step activates.
// (In production: mobile binds activeIdx to scroll progress via IntersectionObserver.)
// ─────────────────────────────────────────────────────────────
function ProcessV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const steps = React.useMemo(() => buildSteps(palette), [palette]);

  const [activeIdx, setActiveIdx] = React.useState(-1);
  React.useEffect(() => {
    const stepMs = isMobile ? 1800 : 1500;
    let cancelled = false;
    let timer;
    let i = -1;
    const tick = () => {
      if (cancelled) return;
      i++;
      if (i >= steps.length) {
        // hold finished state, then reset
        timer = setTimeout(() => {
          if (cancelled) return;
          i = -1;
          setActiveIdx(-1);
          timer = setTimeout(tick, 800);
        }, 2800);
        return;
      }
      setActiveIdx(i);
      timer = setTimeout(tick, stepMs);
    };
    timer = setTimeout(tick, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [isMobile, steps.length]);

  const Node = ({ color, active }) => (
    <div style={{
      width: 18, height: 18,
      background: active ? color : Z.hairline,
      borderRadius: '50%',
      border: `3px solid ${Z.offwhite}`,
      boxShadow: active ? `0 0 0 2px ${color}, 0 0 14px ${color}` : `0 0 0 2px ${Z.hairline}`,
      transition: 'background 500ms ease, box-shadow 500ms ease',
      flexShrink: 0,
      zIndex: 2,
    }} />
  );

  const Connector = ({ from, to, active, vertical }) => {
    const drawMs = isMobile ? 1500 : 1300;
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';
    return (
      <div style={{
        flex: 1,
        position: 'relative',
        ...(vertical
          ? { width: 2, minHeight: 30, background: Z.hairline, marginTop: 4, marginBottom: 4 }
          : { height: 2, background: Z.hairline, marginLeft: 4, marginRight: 4 }),
      }}>
        {/* Drawn line — clip-path reveals the gradient without distorting it */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${vertical ? 'to bottom' : 'to right'}, ${from}, ${to})`,
          clipPath: active
            ? 'inset(0 0 0 0)'
            : (vertical ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)'),
          transition: `clip-path ${drawMs}ms ${ease}`,
        }} />
        {/* Leading energy dot — rides the front of the drawing line */}
        <div style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: to,
          boxShadow: `0 0 10px ${to}, 0 0 18px ${to}`,
          opacity: active ? 1 : 0,
          ...(vertical
            ? { left: -3, top: active ? 'calc(100% - 8px)' : '-4px' }
            : { top: -3, left: active ? 'calc(100% - 8px)' : '-4px' }),
          transition: `left ${drawMs}ms ${ease}, top ${drawMs}ms ${ease}, opacity 240ms ease`,
          pointerEvents: 'none',
        }} />
      </div>
    );
  };

  const StationBody = ({ s, active }) => (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: isMobile ? '0 0 16px 24px' : '24px 16px 0 16px',
      opacity: active ? 1 : 0.32,
      transition: 'opacity 500ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: s.color,
          letterSpacing: '0.08em',
        }}>STEP {s.n}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: Z.slate,
          padding: '3px 8px',
          border: `1px solid ${Z.hairline}`,
          borderRadius: 3,
          letterSpacing: '0.02em',
        }}>{s.time}</span>
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 26 : 32,
        letterSpacing: '-0.03em',
        color: Z.forest,
        lineHeight: 1.05,
      }}>{s.title}</h3>
      <p style={{
        margin: 0,
        fontSize: isMobile ? 14 : 15,
        color: Z.slate,
        lineHeight: 1.5,
      }}>{s.body}</p>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
            <PixelLabel size={isMobile ? 10 : 11}>[ 04 ] FOLYAMAT</PixelLabel>
            <h2 style={{
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: isMobile ? 44 : 72,
              letterSpacing: '-0.035em',
              color: Z.forest,
              lineHeight: 1,
            }}>Hogyan dolgozunk.</h2>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? 15 : 17,
            color: Z.slate,
            maxWidth: 340,
            lineHeight: 1.5,
            textAlign: isMobile ? 'left' : 'right',
          }}>Négy lépés. Két hét — három hónap, projekttől függően.</p>
        </div>

        {isMobile ? (
          // Mobile: vertical timeline — node + connector on left, body on right.
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => {
              const active = i <= activeIdx;
              const isLast = i === steps.length - 1;
              const nextActive = (i + 1) <= activeIdx;
              return (
                <div key={s.n} style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div style={{ width: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
                    <Node color={s.color} active={active} />
                    {!isLast && (
                      <Connector
                        from={s.color}
                        to={steps[i + 1].color}
                        active={nextActive}
                        vertical
                      />
                    )}
                  </div>
                  <StationBody s={s} active={active} />
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop: horizontal — node + connector on top, body below.
          <div style={{ display: 'flex', flexDirection: 'row', gap: 0, alignItems: 'stretch' }}>
            {steps.map((s, i) => {
              const active = i <= activeIdx;
              const isLast = i === steps.length - 1;
              const nextActive = (i + 1) <= activeIdx;
              return (
                <div key={s.n} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: 20 }}>
                    <Node color={s.color} active={active} />
                    {!isLast && (
                      <Connector
                        from={s.color}
                        to={steps[i + 1].color}
                        active={nextActive}
                      />
                    )}
                  </div>
                  <StationBody s={s} active={active} />
                </div>
              );
            })}
          </div>
        )}

        <KezdesCard isMobile={isMobile} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Chip bento (2x2 desktop, stacked mobile) — micro-chip cards with pins
// ─────────────────────────────────────────────────────────────
function ProcessV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const steps = React.useMemo(() => buildSteps(palette), [palette]);

  // Render small "pins" along a side of the card
  const Pins = ({ side, color, count = 4 }) => {
    const isVert = side === 'left' || side === 'right';
    return (
      <div aria-hidden="true" style={{
        position: 'absolute',
        [side]: -6,
        ...(isVert ? { top: '20%', bottom: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
                   : { left: '20%', right: '20%', display: 'flex', justifyContent: 'space-between' }),
      }}>
        {Array.from({ length: count }, (_, i) => (
          <span key={i} style={{
            display: 'block',
            background: color,
            ...(isVert ? { width: 10, height: 4 } : { width: 4, height: 10 }),
          }} />
        ))}
      </div>
    );
  };

  const Chip = ({ s, idx }) => (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 10,
      padding: isMobile ? '24px 22px 26px' : '32px 32px 36px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: isMobile ? 'auto' : 240,
    }}>
      {/* pins on top and bottom — chip identity */}
      <Pins side="top" color={s.color} count={5} />
      <Pins side="bottom" color={s.color} count={5} />

      {/* header row: step + time chip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 11,
            color: s.color,
            letterSpacing: '0.04em',
          }}>[ {s.n} ]</span>
          <span style={{
            width: 8, height: 8,
            background: s.color,
            boxShadow: `0 0 0 2px ${Z.offwhite}, 0 0 0 3px ${s.color}`,
          }} />
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: Z.slate,
          padding: '4px 10px',
          background: Z.offwhite,
          border: `1px solid ${Z.hairline}`,
          borderRadius: 4,
          letterSpacing: '0.04em',
        }}>{s.time}</span>
      </div>

      <h3 style={{
        margin: 0,
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 28 : 36,
        letterSpacing: '-0.03em',
        color: Z.forest,
        lineHeight: 1,
      }}>{s.title}</h3>
      <p style={{
        margin: 0,
        fontSize: isMobile ? 14 : 15,
        color: Z.slate,
        lineHeight: 1.5,
      }}>{s.body}</p>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '48px 20px 56px' : '96px 56px 104px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
            <PixelLabel size={isMobile ? 10 : 11}>[ 04 ] FOLYAMAT</PixelLabel>
            <h2 style={{
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: isMobile ? 44 : 72,
              letterSpacing: '-0.035em',
              color: Z.forest,
              lineHeight: 1,
            }}>Hogyan dolgozunk.</h2>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? 15 : 17,
            color: Z.slate,
            maxWidth: 340,
            lineHeight: 1.5,
            textAlign: isMobile ? 'left' : 'right',
          }}>Négy lépés. Két hét — három hónap, projekttől függően.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 20 : 28,
          padding: isMobile ? '0 6px' : '0 8px',
        }}>
          {steps.map((s, i) => (
            <Chip key={s.n} s={s} idx={i} />
          ))}
        </div>

        <KezdesCard isMobile={isMobile} />
      </div>
    </div>
  );
}

window.ProcessV1 = ProcessV1;
window.ProcessV2 = ProcessV2;
