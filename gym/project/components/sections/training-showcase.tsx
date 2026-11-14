'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

gsap.registerPlugin(Flip);

export function TrainingShowcase() {
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useFlipIn<HTMLElement>();

  const items = IMAGES.training;

  const goTo = (idx: number) => {
    if (flipping || idx === active) return;
    setFlipping(true);
    const next = (idx + items.length) % items.length;

    // Capture current state for Flip
    const state = Flip.getState(stageRef.current?.querySelectorAll('[data-flip]') || []);

    setActive(next);

    // Animate from previous state
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        absolute: true,
        onComplete: () => setFlipping(false),
      });
    });
  };

  const current = items[active];

  return (
    <section
      ref={sectionRef}
      id="training"
      className="flex min-h-screen flex-col justify-center bg-white py-24"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 lg:grid-cols-[60%_40%] lg:gap-0 lg:px-10">
        {/* LEFT — STAGE */}
        <div className="relative flex flex-col items-center justify-center">
          <div
            ref={stageRef}
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2rem] shadow-2xl"
            data-flip
          >
            <Image
              src={current.img}
              alt={current.title}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                {current.category}
              </p>
              <p className="mt-1 font-anton text-3xl uppercase text-white">
                {current.title}
              </p>
            </div>
          </div>

          {/* Queue previews */}
          <div className="mt-6 flex items-center gap-3">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                data-flip
                className={`relative h-16 w-24 overflow-hidden rounded-xl transition-all duration-300 ${
                  i === active
                    ? 'ring-2 ring-ink ring-offset-2 opacity-100'
                    : 'opacity-40 hover:opacity-80'
                }`}
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="96px"
                  className="object-cover blur-[1px]"
                />
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="mt-6 flex items-center gap-8">
            <button
              onClick={() => goTo(active - 1)}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </span>
              Prev
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
            >
              Next
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="flex flex-col justify-center pl-0 lg:pl-12">
          {/* Breadcrumbs */}
          <div className="flip-in mb-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
            <a href="#home" className="hover:text-ink">Home</a>
            <span>/</span>
            <span className="text-ink">Training</span>
          </div>

          <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/50">
            {current.category}
          </p>

          <h2
            key={current.title}
            className="flip-in mt-2 font-anton text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] tracking-tight text-ink"
          >
            {current.title}
          </h2>

          <p className="flip-in mt-6 max-w-md text-base leading-[1.7] text-ink/60">
            {current.description}
          </p>

          <div className="flip-in mt-8 flex flex-wrap gap-3">
            {current.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-ink/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/70"
              >
                {h}
              </span>
            ))}
          </div>

          <a
            href="#membership"
            className="flip-in mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-xl hover:shadow-ink/20"
          >
            Enquire Now
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <p className="flip-in mt-6 max-w-xs text-xs leading-relaxed text-ink/40">
            Specific programs and personal-training availability must be
            confirmed with the gym before publication.
          </p>
        </div>
      </div>
    </section>
  );
}
