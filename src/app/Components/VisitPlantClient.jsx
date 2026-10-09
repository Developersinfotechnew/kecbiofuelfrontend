'use client';

import dynamic from 'next/dynamic';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const VisitPlantComp = dynamic(() => import('@/app/Components/VisitPlantComp'), { ssr: false, loading: () => <LazyLoader /> });
const VisitPlantCompOne = dynamic(() => import('@/app/Components/VisitPlantCompOne'), { ssr: false, loading: () => <LazyLoader /> });
const VisitPlantCompTwo = dynamic(() => import('@/app/Components/VisitPlantCompTwo'), { ssr: false, loading: () => <LazyLoader /> });

export default function VisitPlantClient() {
  return (
    <>
      <VisitPlantCompOne />
      <VisitPlantComp />
      <VisitPlantCompTwo />
      <Footer />
    </>
  );
}