'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { BUSINESS } from '@/lib/data';

const SLIDES = [
  {
    src: 'https://images.pexels.com/photos/14898419/pexels-photo-14898419.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Athlete lifting kettlebells in dark gym',
  },
  {
    src: 'https://images.pexels.com/photos/39259258/pexels-photo-39259258.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Strong male silhouette working out in dimly lit gym',
  },
  {
    src: 'https://images.pexels.com/photos/39259261/pexels-photo-39259261.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Muscular man performing weightlifting in dimly lit gym',
  },
  {
    src: 'https://images.pexels.com/photos/11338008/pexels-photo-11338008.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Strong muscular man posing in dimly lit studio',
  },
  {
    src: 'https://images.pexels.com/photos/17956257/pexels-photo-17956257.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Powerful silhouette of muscular man against dramatic backdrop',
  },
  {
    src: 'https://images.pexels.com/photos/32996768/pexels-photo-32996768.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Silhouetted muscular man flexing arms in dramatic lighting',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const root = useRef<HTMLElement>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((idx + SLIDES.length) % SLIDES.length);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    autoTimer.current = setInterval(() => {
      setCurrent((prev) => {
        const nextIdx = (prev + 1) % SLIDES.length;
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 800);
        return nextIdx;
      });
    }, 5000) as unknown as ReturnType<typeof setInterval>;

    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, []);

  // Entrance animation for slider controls
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-hero-ui]', { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        '[data-hero-image-wrap]',
        { opacity: 0, scale: 1.08, filter: 'blur(12px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power2.out',
        }
      )
        .fromTo(
          '[data-hero-ui]',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .fromTo(
          '[data-hero-scroll]',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        );
    }, root);

    return () => ctx.revert();
  }, []);

  // Animate slide change with GSAP
  useEffect(() => {
    if (isTransitioning) {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        '[data-hero-slide]',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [current, isTransitioning]);

  return (
    <section
      ref={root}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* Image slider */}
      <div
        data-hero-image-wrap
        className="absolute inset-0 z-0"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            data-hero-slide={i === current ? 'active' : undefined}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/40" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
      </div>

      {/* Navigation arrows */}
      <button
        data-hero-ui
        onClick={prev}
        className="group absolute left-4 top-1/2 z-30 -translate-y-1/2 lg:left-8"
        aria-label="Previous slide"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink lg:h-14 lg:w-14">
          <ChevronLeft className="h-6 w-6" />
        </span>
      </button>

      <button
        data-hero-ui
        onClick={next}
        className="group absolute right-4 top-1/2 z-30 -translate-y-1/2 lg:right-8"
        aria-label="Next slide"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink lg:h-14 lg:w-14">
          <ChevronRight className="h-6 w-6" />
        </span>
      </button>

      {/* Slide counter */}
      <div
        data-hero-ui
        className="absolute right-6 top-28 z-30 lg:right-10"
      >
        <div className="flex items-baseline gap-2 font-anton text-white">
          <span className="text-5xl leading-none">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="text-lg text-white/40">
            / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div
        data-hero-ui
        className="absolute left-1/2 top-28 z-30 flex -translate-x-1/2 gap-2"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? 'w-10 bg-white'
                : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom floating stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div
          data-hero-ui
          className="mx-auto max-w-[1440px] border-t border-white/10 bg-ink/60 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 text-center md:flex-row md:gap-0 lg:px-10">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Location
              </p>
              <p className="text-sm font-semibold text-white">
                {BUSINESS.addressShort}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Mon – Sat
              </p>
              <p className="text-sm font-semibold text-white">5 AM – 11 PM</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Sunday
              </p>
              <p className="text-sm font-semibold text-white">6 AM – 12 PM</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <a
              href="#membership"
              className="flex flex-col items-center md:items-start"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Enquiries
              </p>
              <p className="text-sm font-semibold text-white underline-offset-4 hover:underline">
                Membership Enquiries
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-24 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-white/50" />
      </div>
    </section>
  );
}
