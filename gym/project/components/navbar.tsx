'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X, Dumbbell } from 'lucide-react';
import { NAV_LINKS, BUSINESS } from '@/lib/data';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <a
            href="#home"
            className={`flex items-center gap-2 transition-colors ${
              scrolled ? 'text-ink' : 'text-ink'
            }`}
          >
            <Dumbbell className="h-6 w-6" strokeWidth={2.5} />
            <span className="font-display text-xl tracking-wide">
              LIVE FITNESS
            </span>
          </a>

          {/* Center links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink md:flex"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{BUSINESS.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <a
              href="#membership"
              className="hidden rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-ink/85 hover:shadow-lg md:inline-block"
            >
              Join Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ink transition-all duration-500 lg:hidden ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-xl text-white">LIVE FITNESS</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`border-b border-white/10 py-4 font-display text-3xl uppercase tracking-wide text-white/90 transition-all duration-500 ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 200}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col gap-4 px-6">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white"
          >
            <Phone className="h-4 w-4" /> {BUSINESS.phone}
          </a>
          <a
            href="#membership"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center rounded-full bg-white py-4 text-sm font-semibold uppercase tracking-[0.15em] text-ink"
          >
            Join Now
          </a>
        </div>
      </div>
    </>
  );
}
