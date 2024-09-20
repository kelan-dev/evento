"use client"; // Error components must be Client Components

import H1 from "@/components/h1";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-24 text-center">
      <H1>{error.message}</H1>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
