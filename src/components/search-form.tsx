"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchText) return;
    router.push(`/events/${searchText}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search events in any city..."
        spellCheck={false}
        className="h-16 w-full rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:bg-white/10 focus:ring-2"
      />
    </form>
  );
}
