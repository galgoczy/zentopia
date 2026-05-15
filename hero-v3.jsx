// V3 — "Dark Forest": Forest BG, lime energy, asymmetric drama. Bonsai bleeds off right edge on desktop.

function HeroV3({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  const Nav = (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '14px 20px' : '20px 56px',
      borderBottom: `1px solid rgba(250,250,247,0.10)`,
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Wordmark size={isMobile ? 22 : 26} fontSize={isMobile ? 17 : 20} color={Z.offwhite} iconVariant="white" />
        {!isMobile && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, color: 'rgba(250,250,247,0.55)',
            letterSpacing: '0.04em',
            paddingLeft: 14, borderLeft: `1px solid rgba(250,250,247,0.15)`,
          }}>jövő-technológia. ma.</span>
        )}
      </div>
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Szolgáltatások', 'Munkák', 'Folyamat', 'GYIK'].map(l => (
            <a key={l} style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 14, fontWeight: 500, color: Z.offwhite,
              textDecoration: 'none', letterSpacing: '-0.01em',
            }}>{l}</a>
          ))}
          <a style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 14, fontWeight: 500, color: 'rgba(250,250,247,0.6)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>labs <span style={{ fontSize: 10 }}>↗</span></a>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <CTAPrimary size="sm" dark>{isMobile ? 'Foglalj →' : 'Foglalj auditot →'}</CTAPrimary>
        {isMobile && (
          <button aria-label="menu" style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
            <div style={{ width: 22, height: 2, background: Z.offwhite, marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: Z.offwhite, marginBottom: 5 }} />
            <div style={{ width: 14, height: 2, background: Z.offwhite }} />
          </button>
        )}
      </div>
    </nav>
  );

  const heroText = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 20 : 28,
      maxWidth: isMobile ? '100%' : 720,
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          width: 24, height: 1,
          background: Z.lime,
        }} />
        <PixelLabel size={isMobile ? 10 : 11} color={Z.lime}>[ 00 ] MANIFESTO</PixelLabel>
      </div>
      <h1 style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 46 : 96,
        lineHeight: 0.96,
        letterSpacing: '-0.04em',
        color: Z.offwhite,
        margin: 0,
        textWrap: 'balance',
      }}>
        Jövő-<br/>technológia.<br />
        A <GlitchTE blockColor={Z.lime} /> üzletedben.<br />
        Ma.
      </h1>
      <div style={{
        fontSize: isMobile ? 14 : 17,
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: Z.lime,
          fontSize: isMobile ? 12 : 13,
          letterSpacing: '0.04em',
        }}>{'>'}</span>
        <RotatingSubline
          messages={['AI a TE vállalkozásodnak.', 'Hetek, nem hónapok.', 'AI, gondozva.']}
          style={{ fontSize: isMobile ? 14 : 17, color: 'rgba(250,250,247,0.85)' }}
          color="rgba(250,250,247,0.85)"
        />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
        <CTAPrimary size={isMobile ? 'md' : 'lg'} dark>Foglalj 30 perces AI-konzultációt →</CTAPrimary>
        <CTASecondary size={isMobile ? 'md' : 'lg'} dark>Nézd a munkákat</CTASecondary>
      </div>
    </div>
  );

  const bonsaiPanel = (
    <div style={{
      position: isMobile ? 'relative' : 'absolute',
      right: isMobile ? 'auto' : -60,
      top: isMobile ? 'auto' : '50%',
      transform: isMobile ? 'none' : 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}>
      {/* radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, rgba(200,255,107,0.18), transparent 60%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <BreathingBonsai size={isMobile ? 220 : 580} base="white" sweepSeconds={4.2} />
      <span style={{
        position: 'absolute',
        bottom: isMobile ? -4 : 12,
        right: isMobile ? 4 : 60,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: 'rgba(250,250,247,0.45)',
        letterSpacing: '0.06em',
      }}>circuit_bonsai.v2</span>
    </div>
  );

  return (
    <div style={{
      width: W,
      background: Z.forest,
      fontFamily: '"Space Grotesk", sans-serif',
      position: 'relative',
      overflow: 'hidden',
      color: Z.offwhite,
    }}>
      <PixelGrid color="rgba(200,255,107,0.06)" />
      {/* corner crops */}
      <div style={{
        position: 'absolute', top: 56, left: 56,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: 'rgba(250,250,247,0.35)', letterSpacing: '0.08em',
        display: isMobile ? 'none' : 'block',
        zIndex: 2,
      }}>// zentopia/v2.4.0</div>

      {Nav}
      <div style={{
        padding: isMobile ? '36px 20px 28px' : '96px 56px 88px',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? 24 : 40,
        minHeight: isMobile ? 'auto' : 640,
      }}>
        {isMobile && bonsaiPanel}
        {heroText}
        {!isMobile && bonsaiPanel}
      </div>
      <div style={{ padding: isMobile ? '0 20px 18px' : '0 56px 24px', position: 'relative', zIndex: 2 }}>
        <TechStackStrip dark compact={isMobile} />
      </div>
    </div>
  );
}

window.HeroV3 = HeroV3;
