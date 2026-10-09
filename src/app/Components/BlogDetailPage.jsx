// app/blogs/[slug]/page.js
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/app/data/blogData';
import BlogDetailClient from './BlogDetailClient';

// Helper to convert relative URLs to absolute
const getAbsoluteUrl = (path) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.kecbiofuel.com';
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const blogUrl = `https://www.kecbiofuel.com/blogs/${blog.slug}`;
  const imageUrl = getAbsoluteUrl(blog.image);

  return {
    title: `${blog.title} | KEC Biofuel Blog`,
    description: blog.excerpt,
    keywords: `${blog.category}, CBG, biofuel, renewable energy, ${blog.title}`,
    authors: [{ name: blog.author }],
    
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      url: blogUrl,
      siteName: 'KEC Biofuel',
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
          type: 'image/jpeg',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [imageUrl],
      creator: '@KEC_Biofuel',
      site: '@KEC_Biofuel',
    },
    
    alternates: {
      canonical: blogUrl,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const { blogData } = await import('@/app/data/blogData');
  
  return blogData.map((blog) => ({
    slug: blog.slug,
  }));
}

// This is now a SERVER COMPONENT - no "use client"
export default function BlogDetailPage({ params }) {
  const blog = getBlogBySlug(params.slug);
  
  if (!blog) {
    notFound();
  }
  
  // Pass the slug to client component
  return <BlogDetailClient slug={params.slug} />;
}
