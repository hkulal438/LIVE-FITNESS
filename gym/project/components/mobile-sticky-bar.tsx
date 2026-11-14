'use client';

import { Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS } from '@/lib/data';

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 border-t border-ink/10 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-ink hover:bg-ink hover:text-white"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href="#membership"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:shadow-xl"
      >
        Enquire Now
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
