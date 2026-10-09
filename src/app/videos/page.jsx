import VideosScreen from '@/screens/VideosScreen';

export const metadata = {
  title: 'YouTube Videos - KEC Biofuel | CBG Plant Tours & Biofuel Insights',
  description: 'Watch KEC Biofuel\'s YouTube videos on CBG plant tours, biofuel technology, farmer success stories and sustainable energy — organized by category.',
  keywords: 'KEC Biofuel videos, CBG plant tour video, biogas videos, Kisan Experience Centre YouTube, CBG technology explainer',
  openGraph: {
    title: 'KEC Biofuel Video Library',
    description: 'Plant tours, CBG technology explainers and farmer success stories, organized by category.',
    type: 'website',
    url: 'https://www.kecbiofuel.com/videos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEC Biofuel Video Library',
    description: 'Plant tours, CBG technology explainers and farmer success stories, organized by category.',
  },
};

export default function VideosPage() {
  return <VideosScreen />;
}
