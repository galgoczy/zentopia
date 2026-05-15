// V1 — "Grid + Glitch": Light, split desktop / stacked mobile, pixel grid bg, ember pixel label.

function HeroV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  // NAV
  const Nav = (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '14px 20px' : '20px 56px',
      borderBottom: `1px solid ${Z.hairline}`,
      background: 'rgba(250,250,247,0.85)',
      backdropFilter: 'blur(8px)',
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Wordmark size={isMobile ? 22 : 26} fontSize={isMobile ? 17 : 20} />
        {!isMobile && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: Z.slate,
            letterSpacing: '0.04em',
            paddingLeft: 14,
            borderLeft: `1px solid ${Z.hairline}`,
          }}>jövő-technológia. ma.</span>
        )}
      </div>
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Szolgáltatások', 'Munkák', 'Folyamat', 'GYIK'].map(l => (
            <a key={l} style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: Z.forest,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}>{l}</a>
          ))}
          <a style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 14, fontWeight: 500,
            color: Z.slate, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>labs <span style={{ fontSize: 10 }}>↗</span></a>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14 }}>
        <LangSwitch value="HU" />
        <CTAPrimary size={isMobile ? 'sm' : 'sm'}>{isMobile ? 'Foglalj →' : 'Foglalj időpontot →'}</CTAPrimary>
        {isMobile && (
          <button aria-label="menu" style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
            <div style={{ width: 22, height: 2, background: Z.forest, marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: Z.forest, marginBottom: 5 }} />
            <div style={{ width: 14, height: 2, background: Z.forest }} />
          </button>
        )}
      </div>
    </nav>
  );

  // HERO BODY
  const heroText = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 20 : 28,
      maxWidth: isMobile ? '100%' : 660,
    }}>
      <PixelLabel size={isMobile ? 10 : 11}>[ 00 ] MANIFESTO</PixelLabel>
      <h1 style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 44 : 84,
        lineHeight: 0.98,
        letterSpacing: '-0.035em',
        color: Z.forest,
        margin: 0,
        textWrap: 'balance',
      }}>
        Jövő-technológia.<br />
        A <GlitchTE /> üzletedben.<br />
        Ma.
      </h1>
      <div style={{
        fontSize: isMobile ? 14 : 17,
        lineHeight: 1.5,
        minHeight: isMobile ? 22 : 26,
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: Z.slate,
          fontSize: isMobile ? 12 : 13,
          marginRight: 10,
          letterSpacing: '0.04em',
        }}>{'//'}</span>
        <RotatingSubline
          messages={['AI a TE vállalkozásodnak.', 'Hetek, nem hónapok.', 'AI, gondozva.']}
          style={{ fontSize: isMobile ? 14 : 17, color: Z.forest }}
        />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
        <CTAPrimary size={isMobile ? 'md' : 'lg'}>Foglalj 30 perces AI-konzultációt →</CTAPrimary>
        <CTASecondary size={isMobile ? 'md' : 'lg'}>Nézd a munkákat</CTASecondary>
      </div>
    </div>
  );

  // bonsai panel
  const bonsaiPanel = (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? '100%' : 'auto',
    }}>
      {/* corner brackets */}
      {!isMobile && [
        { top: 0, left: 0, borderTop: `2px solid ${Z.forest}`, borderLeft: `2px solid ${Z.forest}` },
        { top: 0, right: 0, borderTop: `2px solid ${Z.forest}`, borderRight: `2px solid ${Z.forest}` },
        { bottom: 0, left: 0, borderBottom: `2px solid ${Z.forest}`, borderLeft: `2px solid ${Z.forest}` },
        { bottom: 0, right: 0, borderBottom: `2px solid ${Z.forest}`, borderRight: `2px solid ${Z.forest}` },
      ].map((s, i) => (
        <span key={i} style={{ position: 'absolute', width: 18, height: 18, ...s }} />
      ))}
      <div style={{ position: 'relative', padding: isMobile ? 8 : 24 }}>
        <BreathingBonsai size={isMobile ? 200 : 460} base="forest" />
      </div>
      {/* mono caption */}
      <span style={{
        position: 'absolute',
        bottom: isMobile ? -4 : 6,
        right: isMobile ? 4 : 12,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: Z.slate,
        letterSpacing: '0.06em',
      }}>circuit_bonsai.v2</span>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      {Nav}
      <div style={{
        padding: isMobile ? '36px 20px 28px' : '88px 56px 64px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 32 : 40,
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}>
        {isMobile && bonsaiPanel}
        {heroText}
        {!isMobile && bonsaiPanel}
      </div>
      <div style={{ padding: isMobile ? '0 20px 18px' : '0 56px 24px', position: 'relative', zIndex: 1 }}>
        <TechStackStrip compact={isMobile} />
      </div>
    </div>
  );
}

window.HeroV1 = HeroV1;
