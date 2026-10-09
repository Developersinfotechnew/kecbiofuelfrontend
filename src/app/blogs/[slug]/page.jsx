import { notFound } from 'next/navigation';
import { blogData as staticBlogs } from '@/app/data/blogData';
import { fetchBlogBySlug, fetchRelatedBlogs } from '@/app/lib/blogs';
import BlogDetailWrapper from './BlogDetailWrapper';

// Re-check the admin panel for edits every minute (no rebuild needed).
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.kecbiofuel.com';

const getAbsoluteUrl = (path) => {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) return { title: 'Blog Not Found' };

    const seo = blog.seo || {};
    const blogUrl = seo.canonicalUrl || `${SITE_URL}/blogs/${blog.slug}`;
    const title = seo.metaTitle || seo.title || `${blog.title} | KEC Biofuel Blog`;
    const description = seo.metaDescription || blog.excerpt;
    const keywords = [...(seo.primaryKeywords || []), ...(seo.secondaryKeywords || [])];
    const ogImage = getAbsoluteUrl(seo.ogImage || blog.image || blog.thumbnail);
    const twitterImage = getAbsoluteUrl(seo.twitterImage || seo.ogImage || blog.image || blog.thumbnail);
    const robots = (seo.robots || 'index, follow').toLowerCase();
    const noindex = robots.includes('noindex');
    const nofollow = robots.includes('nofollow');

    return {
      title,
      description,
      keywords: keywords.length
        ? keywords.join(', ')
        : `${blog.category}, CBG, biofuel, renewable energy, ${blog.title}`,
      authors: [{ name: blog.author }],

      openGraph: {
        title: seo.ogTitle || blog.title,
        description: seo.ogDescription || description,
        type: seo.ogType || 'article',
        publishedTime: blog.date ? new Date(blog.date).toISOString() : undefined,
        authors: [blog.author],
        url: blogUrl,
        siteName: 'KEC Biofuel',
        locale: 'en_IN',
        images: [{ url: ogImage, width: 1200, height: 630, alt: blog.imageAlt || blog.title }],
      },

      twitter: {
        card: seo.twitterCard || 'summary_large_image',
        title: seo.twitterTitle || seo.ogTitle || blog.title,
        description: seo.twitterDescription || seo.ogDescription || description,
        images: [twitterImage],
        creator: '@KEC_Biofuel',
        site: '@KEC_Biofuel',
      },

      alternates: { canonical: blogUrl },

      robots: {
        index: !noindex,
        follow: !nofollow,
        googleBot: {
          index: !noindex,
          follow: !nofollow,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Blog | KEC Biofuel' };
  }
}

// Pre-build the old static posts; posts created in the admin panel render on first visit.
export async function generateStaticParams() {
  return staticBlogs.map((blog) => ({ slug: blog.slug }));
}

// JSON-LD: admin-pasted structured data wins, otherwise a default Article schema.
function buildJsonLd(blog) {
  const seo = blog.seo || {};
  if (seo.structuredData) {
    try {
      return JSON.parse(seo.structuredData);
    } catch (e) {
      /* invalid JSON pasted - fall back to the default below */
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: seo.metaDescription || blog.excerpt,
    image: getAbsoluteUrl(blog.image),
    datePublished: blog.date ? new Date(blog.date).toISOString() : undefined,
    author: { '@type': 'Organization', name: blog.author },
    publisher: { '@type': 'Organization', name: 'KEC Biofuel' },
    mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) notFound();

  const relatedBlogs = await fetchRelatedBlogs(blog.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(blog)) }}
      />
      <BlogDetailWrapper blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
