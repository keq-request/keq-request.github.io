import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CTASection from '@site/src/components/CtaSection';
import FeaturesSection from '@site/src/components/FeaturesSection';
import HeroSection from '@site/src/components/HeroSection';
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
