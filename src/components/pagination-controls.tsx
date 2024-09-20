import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const styles =
  "bg-white/5 px-5 py-3 text-white rounded-md opacity-75 flex items-center gap-2 hover:opacity-100 transition text-sm";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="flex w-full justify-between">
      {previousPath ? (
        <Link href={previousPath} className={styles}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath && (
        <Link href={nextPath} className={styles}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
