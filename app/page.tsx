import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import GroupSnapshot from '@/components/home/GroupSnapshot';
import RecognitionStrip from '@/components/home/RecognitionStrip';
import ResearchDirections from '@/components/home/ResearchDirections';
import SelectedPublications from '@/components/home/SelectedPublications';
import NewsSection from '@/components/news/NewsSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ResearchDirections />
      <FeaturedProjects />
      <GroupSnapshot />
      <SelectedPublications />
      <RecognitionStrip />
      <NewsSection />
    </main>
  );
}
