'use client';

import Image from 'next/image';
import { Eye } from 'lucide-react';
import { IMAGES } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

export function Facilities() {
  const sectionRef = useFlipIn<HTMLElement>();

  const smallCards = [
    { title: 'Free Weights', desc: 'Dumbbells, weight plates, and strength equipment.', img: IMAGES.facilities.freeWeights },
    { title: 'Resistance Machines', desc: 'Gym equipment and training stations.', img: IMAGES.facilities.machines },
    { title: 'Gym Interior', desc: 'The workout floor and gym environment.', img: IMAGES.facilities.interior },
  ];

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
            Explore Our Space
          </p>
          <h2 className="flip-in mt-4 font-anton text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight text-ink">
            Built For Your Workout
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Large tall card */}
          <article className="flip-in group relative col-span-1 row-span-2 min-h-[500px] overflow-hidden rounded-[1.75rem] shadow-sm transition-shadow duration-500 hover:shadow-2xl md:col-span-1 lg:col-span-2 lg:min-h-[640px]">
            <Image
              src={IMAGES.facilities.large}
              alt="Strength Training Zone"
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="font-anton text-3xl uppercase leading-tight tracking-tight text-white lg:text-4xl">
                Strength Training Zone
              </h3>
              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                <Eye className="h-3.5 w-3.5" />
                View Gallery
              </span>
            </div>
          </article>

          {/* Stacked smaller cards */}
          {smallCards.map((card) => (
            <article
              key={card.title}
              className="flip-in group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-sm transition-shadow duration-500 hover:shadow-2xl lg:aspect-auto lg:min-h-[310px]"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-anton text-xl uppercase leading-tight tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {card.desc}
                </p>
                <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Eye className="h-3 w-3" />
                  View Gallery
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
