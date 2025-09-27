import React from 'react';
import Hero from '../components/home/Hero';
import ProjectsPreview from '../components/home/ProjectsPreview';
import SkillsPreview from '../components/home/SkillsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogPreview from '../components/home/BlogPreview';
import ContactCTA from '../components/home/ContactCTA';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ProjectsPreview />
      <SkillsPreview />
      <TestimonialsSection />
      <BlogPreview />
      <ContactCTA />
    </div>
  );
};

export default Home;