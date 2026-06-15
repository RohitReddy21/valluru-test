import { Link } from 'react-router-dom';
import ScrollLink from './ScrollLink';

const permanentPortrait = '/Sasi-final.jpeg';

function renderCta(cta, className) {
  if (!cta) return null;
  const isAnchor = cta.href.includes('#');
  const Component = isAnchor ? ScrollLink : Link;
  return (
    <Component key={cta.href} to={cta.href} className={className}>
      {cta.label}
    </Component>
  );
}

export default function HeroSection({ section }) {
  const proofPoints = ['Build', 'Back', 'Scale', 'Govern'];
  const backgroundVideo = section.backgroundVideo || '/hero-background.mp4';

  return (
    <section className="relative flex sm:min-h-[calc(100vh-80px)] items-center overflow-hidden bg-transparent py-2 sm:py-4 md:py-8">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="container-custom relative z-10 grid items-center gap-0 sm:gap-2 md:gap-8 lg:grid-cols-2">
        <div className="space-y-2 sm:space-y-4">
          <div className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">{section.eyebrow}</div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--deep-navy)] sm:text-5xl md:text-6xl">{section.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted-blue)] sm:text-xl">{section.body}</p>
          {section.supporting && (
            <p className="max-w-2xl border-l-4 border-[var(--gold)] pl-5 text-base leading-relaxed text-[var(--muted-blue)] sm:text-lg">
              {section.supporting}
            </p>
          )}

          <div className="grid max-w-2xl grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-lg border border-[var(--surface-grey)] bg-[var(--warm-white)] px-4 py-3 text-center">
                <p className="text-sm font-bold text-[var(--deep-navy)]">{point}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {renderCta(section.primaryCta, 'btn-primary')}
            {renderCta(section.secondaryCta, 'btn-secondary')}
            {renderCta(section.tertiaryCta, 'btn-warm')}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="executive-frame w-[min(90vw,28rem)] lg:w-[30rem]">
            <img
              src={permanentPortrait}
              alt="Sasidhar Valluru"
              className="executive-portrait mx-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
