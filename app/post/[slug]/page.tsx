import PostPageClient from '@/components/post-page';
import { POSTS } from '@/data/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  const postUrl = `https://jeffpolasz.com/post/${post.slug}`;
  const imageUrl = post.image
    ? `https://jeffpolasz.com${post.image}`
    : 'https://jeffpolasz.com/opengraph-image.png';

  return {
    metadataBase: new URL('https://jeffpolasz.com'),
    title: `${post.title} - Jeffrey Polasz`,
    description: post.content,
    authors: [{ name: 'Jeffrey Polasz' }],
    keywords: [
      'Jeffrey Polasz',
      post.title,
      ...(post.tags || []),
      ...(post.technologies || []),
      'Portfolio',
      'Project',
    ].join(','),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} - Jeffrey Polasz`,
      description: post.content,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: post.title,
        },
      ],
      url: postUrl,
      siteName: 'Jeffrey Polasz Portfolio',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: ['Jeffrey Polasz'],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - Jeffrey Polasz`,
      description: post.content,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
      creator: '@DigitalEpidemic',
      site: '@DigitalEpidemic',
    },
  };
}

// Reddit-style post detail page - server component
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Need to await params before accessing its properties
  const { slug } = await params;

  // Find the post with the matching slug
  const post = POSTS.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Pass the post data to the client component
  return <PostPageClient post={post} />;
}
