import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CTASection from '@site/src/components/cta-section';
import FeaturesSection from '@site/src/components/features-section';
import HeroSection from '@site/src/components/hero-section';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
}
