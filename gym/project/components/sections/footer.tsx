'use client';

import { useEffect, useState } from 'react';
import { Phone, MapPin, Clock, ArrowUp, Dumbbell, ArrowUpRight } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/lib/data';

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink">
      {/* Massive faded background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="font-anton text-[clamp(6rem,20vw,18rem)] uppercase leading-none tracking-tighter text-white/[0.04] whitespace-nowrap select-none">
          LIVE FITNESS
        </span>
      </div>

      {/* Floating card */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl lg:p-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* LEFT — Brand */}
            <div>
              <div className="flex items-center gap-2 text-ink">
                <Dumbbell className="h-6 w-6" strokeWidth={2.5} />
                <span className="font-display text-2xl tracking-wide">
                  LIVE FITNESS GYM
                </span>
              </div>
              <p className="mt-6 font-anton text-3xl uppercase leading-tight tracking-tight text-ink">
                Show up.
                <br />
                Get stronger.
                <br />
                Keep going.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#membership"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-xl"
                >
                  Enquire Now
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-ink hover:bg-ink hover:text-white"
                >
                  Get Directions
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* CENTER — Quick Links */}
            <div className="md:justify-self-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
                Quick Links
              </p>
              <nav className="mt-6 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
                  >
                    <span className="h-px w-0 bg-ink transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* RIGHT — Contact */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
                Contact
              </p>
              <p className="mt-6 text-sm font-semibold text-ink">
                Live Fitness Gym
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-ink/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {BUSINESS.address}
              </p>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:underline"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
                  Opening Hours
                </p>
                <div className="mt-3 space-y-2">
                  <p className="flex items-center gap-2 text-sm text-ink/60">
                    <Clock className="h-4 w-4 shrink-0" />
                    {BUSINESS.hoursWeek}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-ink/60">
                    <Clock className="h-4 w-4 shrink-0" />
                    {BUSINESS.hoursSun}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            © 2026 Live Fitness Gym. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/40 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/40 transition-colors hover:text-white">
              Membership Terms
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        className={`fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-xl transition-all duration-300 lg:bottom-8 lg:right-8 ${
          showTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
