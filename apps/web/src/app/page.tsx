import { Hero } from '@/components/home/Hero';
import { StatsSection } from '@/components/home/StatsSection';
import { StickyScrollAdvantages } from '@/components/home/StickyScrollAdvantages';
import { ProductsSection } from '@/components/home/ProductsSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { LeadForm } from '@/components/LeadForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <StickyScrollAdvantages />
      <ProductsSection />
      <SolutionsSection />
      <HowItWorksSection />
      <section className="section-cinematic bg-neutral-50/50">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <LeadForm />
        </div>
      </section>
    </>
  );
}
