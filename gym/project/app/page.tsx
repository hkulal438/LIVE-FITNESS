import { SmoothScroll } from '@/components/smooth-scroll';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { TrainingShowcase } from '@/components/sections/training-showcase';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { TrainingPrograms } from '@/components/sections/training-programs';
import { Facilities } from '@/components/sections/facilities';
import { FitnessIdentity } from '@/components/sections/fitness-identity';
import { FeaturedMembership } from '@/components/sections/featured-membership';
import { Testimonials } from '@/components/sections/testimonials';
import { Footer } from '@/components/sections/footer';
import { MobileStickyBar } from '@/components/mobile-sticky-bar';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <TrainingShowcase />
        <WhyChooseUs />
        <TrainingPrograms />
        <Facilities />
        <FitnessIdentity />
        <FeaturedMembership />
        <Testimonials />
      </main>
      <Footer />
      <MobileStickyBar />
    </SmoothScroll>
  );
}
