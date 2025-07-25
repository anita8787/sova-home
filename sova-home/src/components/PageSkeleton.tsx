import React from 'react';
import ProductSkeleton from './ProductSkeleton';

interface PageSkeletonProps {
  type?: 'products' | 'about' | 'detail';
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ type = 'products' }) => {
  if (type === 'products') {
    return (
      <div className="min-h-screen bg-sova-linen">
        {/* Navigation Skeleton */}
        <div className="h-16 bg-white border-b border-sova-sand animate-pulse">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="h-8 w-32 bg-sova-sand rounded-md"></div>
            <div className="flex space-x-4">
              <div className="h-6 w-16 bg-sova-sand rounded-md"></div>
              <div className="h-6 w-16 bg-sova-sand rounded-md"></div>
              <div className="h-6 w-16 bg-sova-sand rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="h-64 bg-gradient-to-r from-sova-sand via-sova-secondary to-sova-sand animate-pulse">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-8 w-64 bg-sova-mocha rounded-md mx-auto opacity-30"></div>
              <div className="h-4 w-96 bg-sova-mocha rounded-md mx-auto opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Filter Skeleton */}
          <div className="mb-8 flex flex-wrap gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 w-20 bg-sova-sand rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'about') {
    return (
      <div className="min-h-screen bg-sova-linen animate-pulse">
        {/* Navigation Skeleton */}
        <div className="h-16 bg-white border-b border-sova-sand">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="h-8 w-32 bg-sova-sand rounded-md"></div>
            <div className="flex space-x-4">
              <div className="h-6 w-16 bg-sova-sand rounded-md"></div>
              <div className="h-6 w-16 bg-sova-sand rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 py-12">
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <div key={sectionIndex} className="max-w-4xl mx-auto px-4">
              <div className="space-y-6">
                {/* Title */}
                <div className="h-8 w-64 bg-sova-sand rounded-md mx-auto"></div>
                {/* Paragraphs */}
                <div className="space-y-3">
                  <div className="h-4 bg-sova-secondary rounded-md"></div>
                  <div className="h-4 bg-sova-secondary rounded-md w-5/6"></div>
                  <div className="h-4 bg-sova-secondary rounded-md w-4/5"></div>
                </div>
                {/* Image placeholder */}
                <div className="h-64 bg-sova-sand rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="min-h-screen bg-sova-linen animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="h-12 w-3/4 bg-sova-sand rounded-lg"></div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-4 bg-sova-secondary rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;