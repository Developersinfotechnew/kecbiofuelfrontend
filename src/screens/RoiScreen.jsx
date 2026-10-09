'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CbgRoiCalculator = dynamic(() => import('../app/Components/CbgRoiCalculator'), { ssr: false, loading: () => <LazyLoader /> });


const RoiScreen = () => {
  return <CbgRoiCalculator />;
};

export default RoiScreen;