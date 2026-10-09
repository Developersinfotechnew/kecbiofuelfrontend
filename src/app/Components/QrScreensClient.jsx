'use client';

import dynamic from 'next/dynamic';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const QrCompOne = dynamic(() => import('@/app/Components/QrCompOne'), { ssr: false, loading: () => <LazyLoader /> });
const QrcompThree = dynamic(() => import('@/app/Components/QrCompThree'), { ssr: false, loading: () => <LazyLoader /> });
const QrCompFour = dynamic(() => import('@/app/Components/QrCompFour'), { ssr: false, loading: () => <LazyLoader /> });
const QrServices = dynamic(() => import('@/app/Components/QrServices'), { ssr: false, loading: () => <LazyLoader /> });
const QrCta = dynamic(() => import('@/app/Components/QtCta'), { ssr: false, loading: () => <LazyLoader /> });
const QrVisCards = dynamic(() => import('@/app/Components/QrVisCards'), { ssr: false, loading: () => <LazyLoader /> });

export default function QrScreensClient() {
  return (
    <>
      <QrCompOne />
      <QrcompThree />
      <QrCompFour />
      {/* <QrCompTwo/> */}
      <QrServices />
      <QrCta />
      <QrVisCards />
      <Footer />
    </>
  );
}