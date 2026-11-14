'use client';

import { Star, ExternalLink, Quote } from 'lucide-react';
import { BUSINESS } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

export function Testimonials() {
  const sectionRef = useFlipIn<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
            What Our Members Say
          </p>
          <h2 className="flip-in mt-4 font-anton text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight text-ink">
            <span className="block">Every Workout</span>
            <span className="block">Tells A Story.</span>
            <span className="block">Here&apos;s Theirs.</span>
          </h2>
        </div>

        {/* Rating summary */}
        <div className="flip-in mb-16 flex flex-col items-center gap-6">
          {/* Avatar group */}
          <div className="flex -space-x-3">
            {['A', 'R', 'S', 'K', 'M'].map((initial, i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-ink text-sm font-bold text-white shadow-md"
                style={{ zIndex: 10 - i }}
              >
                {initial}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-6 w-6 fill-ink text-ink"
                  />
                ))}
              </div>
              <span className="font-anton text-4xl text-ink">
                {BUSINESS.rating}
                <span className="text-ink/40">/5</span>
              </span>
            </div>
            <p className="text-sm font-semibold text-ink">
              {BUSINESS.reviewCount} Google Reviews
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
              Rating reference checked on {BUSINESS.ratingDate}
            </p>
          </div>

          <a
            href={BUSINESS.mapsReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-xl hover:shadow-ink/20"
          >
            Read Google Reviews
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Review cards — per the brief, we do not fabricate testimonials.
            We present the verified Google rating summary with a CTA. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'Verified Rating',
              text: `Live Fitness Gym holds a ${BUSINESS.rating}/5 rating across ${BUSINESS.reviewCount} Google reviews, verified on ${BUSINESS.ratingDate}.`,
            },
            {
              title: 'Member Feedback',
              text: 'Our members share their fitness journeys on Google. Read authentic, verified reviews directly on our Google business listing.',
            },
            {
              title: 'Community Trust',
              text: `With ${BUSINESS.reviewCount} reviews and a ${BUSINESS.rating}/5 rating, our community reflects the Live Fitness commitment to training excellence.`,
            },
          ].map((card, i) => (
            <article
              key={i}
              className={`flip-in group relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-off-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl ${
                i === 1 ? 'md:translate-y-8' : ''
              }`}
            >
              <Quote
                className="absolute -right-2 -top-2 h-20 w-20 text-ink/5"
                fill="currentColor"
              />
              <div className="relative z-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
                  {card.title}
                </p>
                <p className="mt-4 text-base leading-[1.7] text-ink/70">
                  {card.text}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                    {BUSINESS.rating}
                  </div>
                  <div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-ink text-ink"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/40">
                      Google Verified
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="flip-in mt-12 text-center text-xs leading-relaxed text-ink/40">
          Customer reviews are collected and verified by Google. We do not
          display unverified testimonials.
        </p>
      </div>
    </section>
  );
}
