// V2 — "Monument": Light, centered hero, bonsai as centerpiece, wordmark as typographic statement.

function HeroV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

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
      <Wordmark size={isMobile ? 22 : 26} fontSize={isMobile ? 17 : 20} />
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Szolgáltatások', 'Munkák', 'Folyamat', 'GYIK'].map(l => (
            <a key={l} style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 14, fontWeight: 500, color: Z.forest,
              textDecoration: 'none', letterSpacing: '-0.01em',
            }}>{l}</a>
          ))}
          <a style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 14, fontWeight: 500, color: Z.slate,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>labs <span style={{ fontSize: 10 }}>↗</span></a>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14 }}>
        <LangSwitch value="HU" />
        <CTAPrimary size="sm">{isMobile ? 'Foglalj →' : 'Foglalj időpontot →'}</CTAPrimary>
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

  // metric markers around bonsai — gives "monument plinth" feel
  const metric = (label, val) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: Z.slate,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>{label}</span>
      <span style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 18 : 22,
        color: Z.forest,
        letterSpacing: '-0.02em',
      }}>{val}</span>
    </div>
  );

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      {Nav}

      <div style={{
        padding: isMobile ? '24px 20px 28px' : '48px 56px 56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: isMobile ? 16 : 24 }}>
          <PixelLabel size={isMobile ? 10 : 11}>[ 00 ] MANIFESTO</PixelLabel>
        </div>

        {/* monument frame: bonsai with side metric markers */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? 0 : 56,
          width: '100%',
          position: 'relative',
          margin: isMobile ? '0 0 20px' : '0 0 24px',
        }}>
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'right', alignItems: 'flex-end' }}>
              {metric('iparág', '04')}
              {metric('leggyorsabb', '2 hét')}
            </div>
          )}

          <div style={{ position: 'relative' }}>
            {/* plinth */}
            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: isMobile ? -8 : -16,
              transform: 'translateX(-50%)',
              width: isMobile ? 200 : 380,
              height: 4,
              background: `linear-gradient(90deg, transparent, ${Z.forest} 20%, ${Z.forest} 80%, transparent)`,
            }} />
            <BreathingBonsai size={isMobile ? 220 : 340} base="forest" sweepSeconds={4} />
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'left' }}>
              {metric('AI-powered', '100%')}
              {metric('projekt-fókusz', '01')}
            </div>
          )}
        </div>

        <h1 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 40 : 96,
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          color: Z.forest,
          margin: isMobile ? '8px 0 16px' : '16px 0 24px',
          textWrap: 'balance',
          maxWidth: isMobile ? '100%' : 1080,
        }}>
          Jövő-technológia. A <GlitchTE /> üzletedben. Ma.
        </h1>

        <div style={{ marginBottom: isMobile ? 24 : 32, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, background: Z.lime,
            boxShadow: `0 0 12px ${Z.lime}`,
          }} />
          <RotatingSubline
            messages={['AI a TE vállalkozásodnak.', 'Hetek, nem hónapok.', 'AI, gondozva.']}
            style={{ fontSize: isMobile ? 14 : 18, color: Z.forest, letterSpacing: '0.01em' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <CTAPrimary size={isMobile ? 'md' : 'lg'}>Foglalj 30 perces AI-konzultációt →</CTAPrimary>
          <CTASecondary size={isMobile ? 'md' : 'lg'}>Nézd a munkákat</CTASecondary>
        </div>

        {isMobile && (
          <div style={{
            marginTop: 28,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            paddingTop: 20,
            borderTop: `1px solid ${Z.hairline}`,
          }}>
            {[['iparág', '04'], ['leggyorsabb', '2 hét'], ['AI-powered', '100%'], ['fókusz', '01']].map(([k, v]) => (
              <div key={k}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9, color: Z.slate, letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>{k}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: Z.forest, marginTop: 2, letterSpacing: '-0.02em' }}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? '0 20px 18px' : '0 56px 24px', position: 'relative', zIndex: 1 }}>
        <TechStackStrip compact={isMobile} />
      </div>
    </div>
  );
}

window.HeroV2 = HeroV2;
