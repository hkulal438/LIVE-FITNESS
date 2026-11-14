'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Adds a 3D flip-in scroll animation to all elements with the `.flip-in` class
 * inside the provided container ref. Elements stagger in with:
 * opacity 0→1, y 50→0, rotateX -40→0, transformPerspective 1000.
 */
export function useFlipIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('.flip-in');
    if (items.length === 0) return;

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 50,
          rotateX: -40,
          transformPerspective: 1000,
          transformOrigin: 'center top',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return ref;
}
