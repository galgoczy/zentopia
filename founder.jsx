// Founder / "ALAPÍTÓ" section — Gergő, light bg, Ember accent.

const BIO = [
  '10+ éve dolgozom digitális marketingben — multiknál és KKV-knál egyaránt. Pontosan értem, milyen problémákkal néz szembe egy szervezet, függetlenül a méretétől.',
  '2023-ban megérkezett a generatív AI, és azonnal megéreztem, hogy ez nem egy újabb hype-ciklus. Azóta hands-on építek AI-t — webshopoktól irodai munkatársakig, rendezvénytechnikától pénzügyi adminig. Négy iparág, négy nagyon különböző use case.',
  'Ezért indítottam el a Zentopiát.',
  'A küldetésünk egyszerű: nem AI-stratégiát árulunk PDF-ben — működő rendszereket építünk. Olyanokat, amik ott vannak, dolgoznak, és tényleges különbséget tesznek. Hetek alatt — nem hónapok alatt.',
];

const STATS = [
  ['10+', 'év marketing'],
  ['2023 óta', 'AI'],
  ['4', 'iparág'],
];

// Polaroid-style portrait placeholder — drag a real photo in later via <image-slot>.
function PortraitCard({ accent, isMobile, width = 280 }) {
  return (
    <div style={{
      width: isMobile ? '100%' : width,
      maxWidth: 360,
      background: Z.white,
      border: `1px solid ${Z.hairline}`,
      borderRadius: 12,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{
        aspectRatio: '1 / 1',
        width: '100%',
        borderRadius: 6,
        background: `linear-gradient(135deg, ${accent}28, ${accent}10)`,
        border: `1px solid ${accent}40`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* circuit-style portrait silhouette */}
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* shoulders */}
          <path d="M 30 188 Q 50 138 100 134 Q 150 138 170 188" fill="none" stroke={accent} strokeWidth="2" />
          {/* head */}
          <circle cx="100" cy="88" r="34" fill="none" stroke={accent} strokeWidth="2" />
          {/* circuit lines through */}
          <line x1="15" y1="64" x2="64" y2="64" stroke={accent} strokeWidth="1.2" strokeDasharray="2 4" opacity="0.7" />
          <line x1="136" y1="64" x2="185" y2="64" stroke={accent} strokeWidth="1.2" strokeDasharray="2 4" opacity="0.7" />
          <circle cx="15" cy="64" r="2" fill={accent} />
          <circle cx="185" cy="64" r="2" fill={accent} />
          <circle cx="100" cy="88" r="4" fill={accent} opacity="0.4" />
        </svg>
        {/* pixel-grid bg */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(to right, ${accent}14 1px, transparent 1px), linear-gradient(to bottom, ${accent}14 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
          pointerEvents: 'none',
        }} />
        {/* mono "placeholder" stamp */}
        <span style={{
          position: 'absolute',
          bottom: 10,
          left: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 9,
          color: accent,
          letterSpacing: '0.06em',
          background: 'rgba(255,255,255,0.85)',
          padding: '3px 6px',
          borderRadius: 2,
        }}>// portrait placeholder</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <span style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: 16,
          color: Z.forest,
          letterSpacing: '-0.02em',
        }}>Galgóczy Gergely</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: accent,
          letterSpacing: '0.04em',
        }}>// alapító</span>
      </div>
    </div>
  );
}

function StatStrip({ accent, isMobile, dark = false }) {
  const fg = dark ? Z.offwhite : Z.forest;
  const muted = dark ? 'rgba(250,250,247,0.55)' : Z.slate;
  const border = dark ? 'rgba(250,250,247,0.10)' : Z.hairline;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 0,
      paddingTop: 20,
      paddingBottom: 20,
      borderTop: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
    }}>
      {STATS.map(([val, lbl], i) => (
        <div key={i} style={{
          paddingLeft: i === 0 ? 0 : (isMobile ? 12 : 24),
          paddingRight: isMobile ? 6 : 16,
          borderLeft: i > 0 ? `1px solid ${border}` : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 24 : 32,
            color: accent,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>{val}</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: muted,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>{lbl}</span>
        </div>
      ))}
    </div>
  );
}

function LinkedInLink({ accent }) {
  return (
    <a style={{
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 14,
      fontWeight: 600,
      color: Z.forest,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      letterSpacing: '-0.01em',
    }}>LinkedIn <span style={{ color: accent }}>↗</span></a>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — Classic editorial: portrait left, bio + stats right
// ─────────────────────────────────────────────────────────────
function FounderV1({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const accent = palette.ember;

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '56px 20px 32px' : '104px 56px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'flex-start',
          gap: isMobile ? 28 : 72,
        }}>
          <PortraitCard accent={accent} isMobile={isMobile} width={320} />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PixelLabel size={isMobile ? 10 : 11} color={accent}>[ 06 ] ALAPÍTÓ</PixelLabel>
              <h2 style={{
                margin: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 44 : 72,
                letterSpacing: '-0.04em',
                color: Z.forest,
                lineHeight: 0.98,
              }}>Helló, Gergő vagyok.</h2>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: isMobile ? 13 : 14,
                color: accent,
                letterSpacing: '0.04em',
              }}>// alapító · zentopia</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {BIO.map((para, i) => (
                <p key={i} style={{
                  margin: 0,
                  color: i === 2 ? Z.forest : Z.slate,
                  lineHeight: 1.55,
                  fontWeight: i === 2 ? 700 : 400,
                  fontSize: i === 2 ? (isMobile ? 19 : 22) : (isMobile ? 15 : 17),
                  letterSpacing: i === 2 ? '-0.02em' : 0,
                  maxWidth: 640,
                }}>{para}</p>
              ))}
            </div>
            <StatStrip accent={accent} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — Pull-quote led: big highlighted sentence, supporting bio + portrait
// ─────────────────────────────────────────────────────────────
function FounderV2({ viewport = 'desktop' }) {
  const isMobile = viewport === 'mobile';
  const W = isMobile ? 390 : 1440;
  const palette = React.useContext(ColorsCtx) || Z.palettes.book;
  const accent = palette.ember;

  // Bio without the "Ezért indítottam el a Zentopiát." line (that becomes the pull quote)
  const beforeQuote = BIO.slice(0, 2);
  const quote = BIO[2];
  const afterQuote = [BIO[3]];

  return (
    <div style={{ width: W, background: Z.offwhite, fontFamily: '"Space Grotesk", sans-serif', position: 'relative', overflow: 'hidden' }}>
      <PixelGrid />
      <div style={{ padding: isMobile ? '56px 20px 32px' : '104px 56px 56px', position: 'relative', zIndex: 1 }}>
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: isMobile ? 32 : 48, maxWidth: 720 }}>
          <PixelLabel size={isMobile ? 10 : 11} color={accent}>[ 06 ] ALAPÍTÓ</PixelLabel>
          <h2 style={{
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? 44 : 72,
            letterSpacing: '-0.04em',
            color: Z.forest,
            lineHeight: 0.98,
          }}>Helló, Gergő vagyok.</h2>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: isMobile ? 13 : 14,
            color: accent,
            letterSpacing: '0.04em',
          }}>// alapító · zentopia</span>
        </div>

        {/* 2-column layout: bio left, portrait+stats right (desktop) */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 28 : 56,
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: isMobile ? '100%' : 720 }}>
            {beforeQuote.map((p, i) => (
              <p key={i} style={{
                margin: 0,
                fontSize: isMobile ? 15 : 17,
                color: Z.slate,
                lineHeight: 1.55,
              }}>{p}</p>
            ))}

            {/* PULL QUOTE */}
            <blockquote style={{
              margin: 0,
              padding: isMobile ? '20px 0 20px 24px' : '24px 0 24px 32px',
              borderLeft: `4px solid ${accent}`,
              position: 'relative',
            }}>
              <span aria-hidden="true" style={{
                position: 'absolute',
                left: isMobile ? 24 : 32,
                top: -14,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 12,
                color: accent,
                background: Z.offwhite,
                padding: '0 8px',
                letterSpacing: '0.04em',
              }}>"</span>
              <p style={{
                margin: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 28 : 44,
                letterSpacing: '-0.035em',
                color: Z.forest,
                lineHeight: 1.05,
              }}>{quote}</p>
            </blockquote>

            {afterQuote.map((p, i) => (
              <p key={i} style={{
                margin: 0,
                fontSize: isMobile ? 15 : 17,
                color: Z.slate,
                lineHeight: 1.55,
              }}>{p}</p>
            ))}
          </div>

          <div style={{
            width: isMobile ? '100%' : 340,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            flexShrink: 0,
          }}>
            <PortraitCard accent={accent} isMobile={isMobile} width={340} />
            <StatStrip accent={accent} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.FounderV1 = FounderV1;
window.FounderV2 = FounderV2;
