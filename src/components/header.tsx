"use client";

import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Events",
    path: "/events/all",
  },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 sm:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="flex h-full gap-6 text-sm">
          {routes.map(({ name, path }) => (
            <li
              key={path}
              className={cn(
                "relative flex items-center transition hover:text-white",
                {
                  "text-white": path === activePathname,
                  "text-white/50": path !== activePathname,
                },
              )}
            >
              <Link href={path}>{name}</Link>
              {activePathname === path && (
                <motion.div
                  layoutId="header-active-link"
                  className="absolute bottom-0 h-1 w-full bg-accent"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
