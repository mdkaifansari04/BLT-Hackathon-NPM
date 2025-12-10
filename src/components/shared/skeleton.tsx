import React from "react";

export function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>;
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <SkeletonCard className="h-6 w-48 mb-4" />
      <SkeletonCard className="h-96 w-full" />
    </div>
  );
}

export function LeaderboardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <SkeletonCard className="h-6 w-40 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <SkeletonCard className="w-8 h-8 rounded-full mr-3" />
              <SkeletonCard className="w-8 h-8 rounded-full mr-3" />
              <div className="flex-grow">
                <SkeletonCard className="h-4 w-32 mb-2" />
                <SkeletonCard className="h-3 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RepositorySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <SkeletonCard className="h-6 w-40 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <SkeletonCard className="h-5 w-48 mb-2" />
            <div className="flex gap-4 mb-2">
              <SkeletonCard className="h-4 w-32" />
              <SkeletonCard className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <SkeletonCard className="h-8 w-20" />
              <SkeletonCard className="h-8 w-28" />
              <SkeletonCard className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
