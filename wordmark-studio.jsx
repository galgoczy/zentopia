// Wordmark Studio — variations gallery + live preview

function WMCard({ title, spec, children, mono }) {
  return (
    <div style={{
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 12,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      minHeight: 220,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: Z.slate,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>{title}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: Z.ember,
          letterSpacing: '0.04em',
        }}>{mono}</span>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 100,
      }}>
        {children}
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: Z.slate,
        letterSpacing: '0.04em',
        whiteSpace: 'pre',
        lineHeight: 1.6,
      }}>{spec}</div>
    </div>
  );
}

// Standalone wordmark that ignores parent context — for the gallery presets.
function PresetWM({ size = 64, iconScale = 1, fontMul = 0.72, gap = 8, tracking = -0.025, weight = 700, lockup = 'horizontal', color = Z.forest, iconVariant }) {
  // Bypass context by providing local override
  return (
    <WordmarkCtx.Provider value={{ fontMul, gap, tracking, weight, iconScale, lockup }}>
      <Wordmark size={size} color={color} iconVariant={iconVariant} />
    </WordmarkCtx.Provider>
  );
}

function WordmarkStudio({ width = 1440 }) {
  return (
    <div style={{ width, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', padding: '48px 56px 64px', position: 'relative' }}>
      <PixelGrid />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PixelLabel size={11}>[ STUDIO ] WORDMARK</PixelLabel>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: '-0.035em',
            color: Z.forest,
            margin: 0,
            lineHeight: 1,
          }}>Logo + tipo arányok.</h2>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            color: Z.slate,
            margin: 0,
            letterSpacing: '0.02em',
          }}>// Élőben tweakold a jobb alsó panellel — minden navban azonnal frissül.</p>
        </div>

        {/* LIVE: tweakable big preview */}
        <div style={{
          background: Z.forest,
          borderRadius: 14,
          padding: '56px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <PixelGrid color="rgba(200,255,107,0.06)" />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                color: Z.lime,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>// live preview</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: 'rgba(250,250,247,0.5)',
                letterSpacing: '0.02em',
              }}>használd a tweaks panelt a jobb alsó sarokban</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <Wordmark size={96} color={Z.offwhite} iconVariant="white" />
            </div>
          </div>
        </div>

        {/* PRESETS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          <WMCard
            title="A · Baseline (current)"
            mono="ref"
            spec={'icon × 1.00\nfont × 0.72\ngap   8px\ntrack -0.025em'}
          >
            <PresetWM size={64} iconScale={1.00} fontMul={0.72} gap={8} tracking={-0.025} />
          </WMCard>

          <WMCard
            title="B · Compact"
            mono="tight"
            spec={'icon × 1.00\nfont × 0.80\ngap   5px\ntrack -0.030em'}
          >
            <PresetWM size={64} iconScale={1.00} fontMul={0.80} gap={5} tracking={-0.03} />
          </WMCard>

          <WMCard
            title="C · Optical match"
            mono="balanced"
            spec={'icon × 1.00\nfont × 0.90\ngap   6px\ntrack -0.035em'}
          >
            <PresetWM size={64} iconScale={1.00} fontMul={0.90} gap={6} tracking={-0.035} />
          </WMCard>

          <WMCard
            title="D · Smaller mark"
            mono="text-led"
            spec={'icon × 0.82\nfont × 0.86\ngap   6px\ntrack -0.030em'}
          >
            <PresetWM size={64} iconScale={0.82} fontMul={0.86} gap={6} tracking={-0.03} />
          </WMCard>

          <WMCard
            title="E · Bigger mark"
            mono="mark-led"
            spec={'icon × 1.18\nfont × 0.62\ngap   10px\ntrack -0.020em'}
          >
            <PresetWM size={64} iconScale={1.18} fontMul={0.62} gap={10} tracking={-0.02} />
          </WMCard>

          <WMCard
            title="F · Stacked"
            mono="vertical"
            spec={'lockup stacked\nicon × 1.00\nfont × 0.50\ngap   4px'}
          >
            <PresetWM size={64} iconScale={1.00} fontMul={0.50} gap={4} tracking={-0.02} lockup="stacked" />
          </WMCard>
        </div>

        {/* CONTEXT TEST: nav-scale preview */}
        <div style={{
          background: Z.white,
          border: `1px solid ${Z.hairline}`,
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: Z.slate,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>// nav scale teszt (mit lát a felhasználó)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: Z.slate }}>18px</span>
              <Wordmark size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: Z.slate }}>22px (mobil nav)</span>
              <Wordmark size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: Z.slate }}>26px (desktop nav)</span>
              <Wordmark size={26} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: Z.slate }}>40px (footer)</span>
              <Wordmark size={40} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: Z.slate }}>64px (presentation)</span>
              <Wordmark size={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.WordmarkStudio = WordmarkStudio;
