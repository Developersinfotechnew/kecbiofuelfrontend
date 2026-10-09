import { notFound } from 'next/navigation';
import { fetchProjectBySlug } from '@/app/lib/projects';
import ProjectDetailClient from './ProjectDetailClient';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.kecbiofuel.com';

const abs = (path) => {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | KEC Biofuel' };

  const seo = project.seo || {};
  const url = seo.canonicalUrl || `${SITE_URL}/projectmanagement/${project.slug}`;
  const title = seo.metaTitle || `${project.title} | KEC Biofuel Projects`;
  const description = seo.metaDescription || project.summary;
  const image = abs(seo.ogImage || project.heroBanner.src || project.thumbnail.src);
  const robots = (seo.robots || 'index, follow').toLowerCase();
  const keywords = [...(seo.primaryKeywords || []), ...(seo.secondaryKeywords || [])];

  return {
    title,
    description,
    keywords: keywords.length ? keywords.join(', ') : undefined,
    alternates: { canonical: url },
    robots: { index: !robots.includes('noindex'), follow: !robots.includes('nofollow') },
    openGraph: {
      title: seo.ogTitle || project.title,
      description: seo.ogDescription || description,
      type: seo.ogType || 'website',
      url,
      siteName: 'KEC Biofuel',
      locale: 'en_IN',
      images: image ? [{ url: image, width: 1200, height: 630, alt: project.title }] : undefined,
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.twitterTitle || seo.ogTitle || project.title,
      description: seo.twitterDescription || seo.ogDescription || description,
      images: image ? [abs(seo.twitterImage) || image] : undefined,
    },
  };
}

function buildJsonLd(project) {
  if (project.seo?.structuredData) {
    try {
      return JSON.parse(project.seo.structuredData);
    } catch (e) {
      /* invalid JSON pasted - use default */
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: project.title,
    description: project.seo?.metaDescription || project.summary,
    url: `${SITE_URL}/projectmanagement/${project.slug}`,
    image: abs(project.heroBanner.src),
    publisher: { '@type': 'Organization', name: 'KEC Biofuel' },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(project)) }} />
      <ProjectDetailClient project={project} />
    </>
  );
}
