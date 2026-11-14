'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Phone, Send, Loader2, CheckCircle2, AlertCircle, CreditCard, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { IMAGES, BUSINESS } from '@/lib/data';
import { useFlipIn } from '@/hooks/use-flip-in';

gsap.registerPlugin(Flip);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function FeaturedMembership() {
  const sectionRef = useFlipIn<HTMLElement>();
  const [activeThumb, setActiveThumb] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    fitness_goal: '',
    callback_time: '',
    message: '',
  });

  const handleThumb = (idx: number) => {
    const state = Flip.getState(
      thumbRef.current?.querySelectorAll('[data-flip-thumb]') || []
    );
    setActiveThumb(idx);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true,
      });
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name and phone number.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('membership_enquiries').insert({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        fitness_goal: form.fitness_goal.trim() || null,
        callback_time: form.callback_time.trim() || null,
        message: form.message.trim() || null,
      });

      if (error) throw error;

      setStatus('success');
      setForm({
        full_name: '',
        phone: '',
        fitness_goal: '',
        callback_time: '',
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="relative bg-off-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — image + thumbnails */}
          <div className="flex flex-col gap-4">
            <div
              ref={thumbRef}
              data-flip-thumb
              className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-2xl"
            >
              <Image
                src={IMAGES.membershipThumbs[activeThumb]}
                alt="Live Fitness Gym interior"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {IMAGES.membershipThumbs.map((thumb, i) => (
                <button
                  key={i}
                  data-flip-thumb
                  onClick={() => handleThumb(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
                    i === activeThumb
                      ? 'ring-2 ring-ink ring-offset-2 ring-offset-off-white'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={thumb}
                    alt={`Gym view ${i + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — content + form */}
          <div className="flex flex-col justify-center">
            <p className="flip-in text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">
              Start Your Fitness Journey
            </p>
            <h2 className="flip-in mt-4 font-anton text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] tracking-tight text-ink">
              <span className="block">Your Fitness.</span>
              <span className="block">Your Membership.</span>
            </h2>
            <p className="flip-in mt-6 max-w-md text-base leading-[1.7] text-ink/55">
              Explore current membership options at Live Fitness Gym. Speak with
              the team about training access, available support, and the
              membership that best fits your routine.
            </p>

            {/* Two info cards */}
            <div className="flip-in mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-ink/10 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/40">
                  Membership
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Ask About Current Plans
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                  <Users className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/40">
                  Training Support
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Speak With Our Team
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flip-in mt-8 rounded-2xl border border-ink/10 bg-white p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50"
                  >
                    Full Name *
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={form.full_name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-off-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-off-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                    placeholder="+91 90000 00000"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fitness_goal"
                    className="block text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50"
                  >
                    Fitness Goal (Optional)
                  </label>
                  <input
                    id="fitness_goal"
                    name="fitness_goal"
                    type="text"
                    value={form.fitness_goal}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-off-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                    placeholder="e.g. Strength, weight loss"
                  />
                </div>
                <div>
                  <label
                    htmlFor="callback_time"
                    className="block text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50"
                  >
                    Preferred Callback (Optional)
                  </label>
                  <input
                    id="callback_time"
                    name="callback_time"
                    type="text"
                    value={form.callback_time}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-off-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                    placeholder="e.g. Morning, evening"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-off-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white"
                  placeholder="Tell us about your fitness goals..."
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-xl hover:shadow-ink/20 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Enquire About Membership
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call {BUSINESS.phone}
                </a>
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-ink/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Enquiry received.
                    </p>
                    <p className="mt-1 text-xs text-ink/60">
                      Our team will contact you shortly. For immediate
                      assistance, call {BUSINESS.phone}.
                    </p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">
                      {errorMsg}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
