// Full-page assembly — stacks all chosen section variations in order.
// Mobile uses Hero V2 (Monument), Desktop uses Hero V1 (Grid+Glitch).
// All other sections use the same chosen variation across viewports.

function FullPage({ viewport = 'desktop' }) {
  const Hero = viewport === 'mobile' ? HeroV2 : HeroV1;
  return (
    <div style={{ background: Z.offwhite }}>
      <Hero       viewport={viewport} />
      <ServicesV2 viewport={viewport} />
      <ProblemV1  viewport={viewport} />
      <ProcessV1  viewport={viewport} />
      <CasesV2    viewport={viewport} />
      <FounderV2  viewport={viewport} />
      <FaqV1      viewport={viewport} />
      <CtaV1      viewport={viewport} />
      <FooterV2   viewport={viewport} />
    </div>
  );
}

window.FullPage = FullPage;
