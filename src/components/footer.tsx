import Link from "next/link";
import React from "react";

const routes = [
  {
    name: "Terms and Conditions",
    path: "/terms-conditions",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex h-16 items-center justify-between border-t border-white/10 px-3 text-xs text-white/25 sm:px-9">
      <small className="text-xs">
        &copy; 2024 Evento. All rights reserved.
      </small>
      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map(({ name, path }) => (
          <li key={path}>
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
