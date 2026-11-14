'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { IMAGES } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

export function FitnessIdentity() {
  const sectionRef = useFlipIn<HTMLElement>();
  const marqueeImages = [...IMAGES.marquee, ...IMAGES.marquee];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Centered heading */}
      <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-10">
        <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
          The Live Fitness Mindset
        </p>
        <h2 className="flip-in mt-4 font-anton text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.9] tracking-tight text-ink">
          <span className="block">Push Your Limits.</span>
          <span className="block">Build Your Strength.</span>
          <span className="block">Own Your Journey.</span>
        </h2>
        <p className="flip-in mx-auto mt-8 max-w-xl text-base leading-[1.7] text-ink/55">
          Every workout is a step forward. Stay consistent, challenge yourself,
          and build a fitness routine that works for you.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative mt-16">
        {/* Top curve overlay */}
        <svg
          className="absolute -top-1 left-0 right-0 z-10 w-full"
          viewBox="0 0 1440 80"
          fill="white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 Q720,80 0,40 Z" />
        </svg>

        <div className="flex overflow-hidden py-4">
          <div className="marquee-track flex shrink-0 gap-4">
            {marqueeImages.map((img, i) => (
              <div
                key={i}
                className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl"
              >
                <Image
                  src={img}
                  alt={`Fitness photography ${i + 1}`}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom curve overlay */}
        <svg
          className="absolute -bottom-1 left-0 right-0 z-10 w-full rotate-180"
          viewBox="0 0 1440 80"
          fill="white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 Q720,80 0,40 Z" />
        </svg>
      </div>

      {/* Spinning scroll-down indicator */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Spinning text ring */}
          <svg
            className="spin-slow absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circle-text"
                d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-ink/60 text-[9px] font-semibold uppercase tracking-[0.15em]">
              <textPath href="#circle-text">
                Scroll Down • Scroll Down • Scroll Down •
              </textPath>
            </text>
          </svg>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
