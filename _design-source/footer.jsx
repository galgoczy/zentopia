// Footer section — 2 variations. Dark forest bg + lime accents + 8-bit easter egg.

const FOOTER_COLS = {
  oldal: {
    label: 'OLDAL',
    links: ['Szolgáltatások', 'Munkák', 'Folyamat', 'Alapító', 'GYIK'],
  },
  tartalom: {
    label: 'TARTALOM',
    links: ['labs.zentopia.io ↗', 'Hírlevél'],
  },
  kapcsolat: {
    label: 'KAPCSOLAT',
    links: ['team@zentopia.io', 'Budapest, HU'],
  },
};

const FOOTER_LEGAL = ['Impresszum', 'Adatkezelés', 'Cookie szabályzat'];

function FooterLinkCol({ col, isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: isMobile ? 'auto' : 140 }}>
      <PixelLabel size={10} color={Z.lime}>{col.label}</PixelLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {col.links.map(l => (
          <a key={l} style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: isMobile ? 14 : 15,
            fontWeight: 500,
            color: 'rgba(250,250,247,0.85)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            transition: 'color 180ms',
          }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

function BrandBlock({ isMobile, big = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Wordmark
        size={big ? (isMobile ? 32 : 48) : (isMobile ? 26 : 32)}
        color={Z.offwhite}
        iconVariant="white"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          color: Z.lime,
          letterSpacing: '0.02em',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 6,
          minHeight: '1.5em',
        }}>
          <span>{'//'}</span>
          <RotatingSubline
            messages={['AI a TE vállalkozásodnak.', 'Hetek, nem hónapok.', 'AI, gondozva.']}
            intervalMs={4000}
            color={Z.lime}
            style={{ color: Z.lime, fontSize: 13, letterSpacing: '0.02em' }}
          />
        </span>
        <p style={{
          margin: 0,
          fontSize: isMobile ? 13 : 14,
          color: 'rgba(250,250,247,0.55)',
          lineHeight: 1.55,
          maxWidth: 320,
        }}>Jövő-technológia. A Te üzletedben. Ma.</p>
      </div>
    </div>
  );
}

function EasterEgg() {
  return (
    <span style={{
      fontFamily: '"Press Start 2P", monospace',
      fontSize: 9,
      color: 'rgba(250,250,247,0.35)',
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap',
    }}>[ MADE WITH 8-BIT LOVE ]</span>
  );
}

function BottomRow({ isMobile }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      gap: isMobile ? 14 : 24,
      paddingTop: 24,
      borderTop: `1px solid rgba(250,250,247,0.10)`,
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: 'rgba(250,250,247,0.45)',
        letterSpacing: '0.04em',
      }}>© 2026 Zentopia</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 24, flexWrap: 'wrap' }}>
        {FOOTER_LEGAL.map(l => (
          <a key={l} style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: isMobile ? 12 : 13,
            color: 'rgba(250,250,247,0.55)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
          }}>{l}</a>
        ))}
      </div>
      <EasterEgg />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Classic 4-col with brand left, link cols right, easter egg in bottom row
// ─────────────────────────────────────────────────────────────
function FooterV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  return (
    <div style={{ width: W, background: Z.forestDeep, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.04)" />
      <div style={{ padding: isMobile ? '56px 20px 28px' : '88px 56px 32px', position: 'relative', zIndex: 1 }}>
        {/* Top: brand + cols */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(280px, 1.5fr) 1fr 1fr 1.2fr',
          gap: isMobile ? 36 : 40,
          marginBottom: isMobile ? 36 : 56,
          alignItems: 'flex-start',
        }}>
          <BrandBlock isMobile={isMobile} />
          <FooterLinkCol col={FOOTER_COLS.oldal} isMobile={isMobile} />
          <FooterLinkCol col={FOOTER_COLS.tartalom} isMobile={isMobile} />

          {/* Kapcsolat column with CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PixelLabel size={10} color={Z.lime}>{FOOTER_COLS.kapcsolat.label}</PixelLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: isMobile ? 14 : 15,
                fontWeight: 600,
                color: Z.offwhite,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}>team@zentopia.io</a>
              <span style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: isMobile ? 13 : 14,
                color: 'rgba(250,250,247,0.55)',
              }}>Budapest, HU</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <CTAPrimary size="md" dark>Foglalj időpontot →</CTAPrimary>
            </div>
          </div>
        </div>

        <BottomRow isMobile={isMobile} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Manifesto-led: huge tagline up top, link rows below
// ─────────────────────────────────────────────────────────────
function FooterV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;

  return (
    <div style={{ width: W, background: Z.forestDeep, color: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid color="rgba(200,255,107,0.04)" />
      <div style={{ padding: isMobile ? '56px 20px 28px' : '96px 56px 36px', position: 'relative', zIndex: 1 }}>
        {/* Massive manifesto */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          paddingBottom: isMobile ? 40 : 64,
          borderBottom: `1px solid rgba(250,250,247,0.10)`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <BrandBlock isMobile={isMobile} big />
            <h3 style={{
              margin: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: isMobile ? 40 : 72,
              letterSpacing: '-0.045em',
              color: Z.offwhite,
              lineHeight: 0.96,
              maxWidth: isMobile ? '100%' : 760,
            }}>Jövő-technológia.<br/>A Te üzletedben.<br/><span style={{ color: Z.lime }}>Ma.</span></h3>
          </div>
          <CTAPrimary size={isMobile ? 'md' : 'lg'} dark>Foglalj időpontot →</CTAPrimary>
        </div>

        {/* Link rows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 28 : 40,
          padding: isMobile ? '32px 0' : '48px 0',
        }}>
          <FooterLinkCol col={FOOTER_COLS.oldal} isMobile={isMobile} />
          <FooterLinkCol col={FOOTER_COLS.tartalom} isMobile={isMobile} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <PixelLabel size={10} color={Z.lime}>{FOOTER_COLS.kapcsolat.label}</PixelLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: isMobile ? 14 : 15,
                fontWeight: 600,
                color: Z.offwhite,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}>team@zentopia.io</a>
              <span style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: isMobile ? 13 : 14,
                color: 'rgba(250,250,247,0.55)',
              }}>Budapest, HU</span>
            </div>
          </div>
        </div>

        <BottomRow isMobile={isMobile} />
      </div>
    </div>
  );
}

window.FooterV1 = FooterV1;
window.FooterV2 = FooterV2;
