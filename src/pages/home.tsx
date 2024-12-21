import { Hero } from '../components/home/hero';
import { Features } from '../components/home/features';
import { PreviewVideo } from '../components/home/preview-video';
import { TeachersSection } from '../components/home/teachers';
import { Testimonials } from '../components/home/testimonials';
import { Pricing } from '../components/home/pricing';
import { LearningPath } from '../components/home/learning-path';
import { Stats } from '../components/home/stats';
import { WhyChooseUs } from '../components/home/why-choose-us';
import { CultureSection } from '../components/home/culture-section';

export default function HomePage() {
  return (
    <div className="pt-16">
      <Hero />
      <Stats />
      <Features />
      <LearningPath />
      <PreviewVideo />
      <WhyChooseUs />
      <TeachersSection />
      <CultureSection />
      <Testimonials />
      <Pricing />
    </div>
  );
}