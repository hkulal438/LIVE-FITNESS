'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

export function TrainingPrograms() {
  const sectionRef = useFlipIn<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative bg-off-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
            Train With Purpose
          </p>
          <h2 className="flip-in mt-4 font-anton text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight text-ink">
            Find Your Strength
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMAGES.programs.map((program) => (
            <article
              key={program.title}
              className="flip-in group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-sm transition-shadow duration-500 hover:shadow-2xl"
            >
              <Image
                src={program.img}
                alt={program.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-ink px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                  Training
                </span>
                <h3 className="font-anton text-2xl uppercase leading-tight tracking-tight text-white">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {program.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-transform duration-300 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="flip-in mt-12 text-center text-xs leading-relaxed text-ink/40">
          Confirm the availability of these training programs before launch.
          Program fees and trainer qualifications are available on enquiry.
        </p>
      </div>
    </section>
  );
}
