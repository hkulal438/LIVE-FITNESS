'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

export function WhyChooseUs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useFlipIn<HTMLElement>();

  const scroll = (dir: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = 380;
    container.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative bg-off-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
              The Live Fitness Experience
            </p>
            <h2 className="flip-in mt-4 max-w-2xl font-anton text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight text-ink">
              Why Choose Live Fitness Gym?
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-all hover:border-ink hover:bg-ink hover:text-white"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-all hover:border-ink hover:bg-ink hover:text-white"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="no-scrollbar mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        >
          {IMAGES.whyChoose.map((feature) => (
            <article
              key={feature.num}
              className="flip-in group relative flex h-[460px] w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 font-anton text-5xl text-white/90 drop-shadow-lg">
                  {feature.num}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-anton text-2xl uppercase tracking-tight text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">
                    {feature.desc}
                  </p>
                </div>

                <button
                  className="mt-6 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 group-hover:scale-110"
                  aria-label={`Learn about ${feature.title}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
