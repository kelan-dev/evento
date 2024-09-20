import SkeletonCard from "@/components/skeleton-card";
import React from "react";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1100px] animate-pulse flex-wrap justify-center gap-20 px-[20px] py-24">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
