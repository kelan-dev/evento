import "server-only";
import { unstable_cache } from "next/cache";
import { capitalize } from "./utils";
import prisma from "./db";
import { notFound } from "next/navigation";

// NextJS caches fetch requests automatically, but if you're using an ORM like Prisma,
// you have to manually cache the request with `unstable_cache`.
export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.eventoEvent.findMany({
    where: {
      // city: city !== "all" ? capitalize(city) : undefined,
      // For now, just fetch events in all cities; this can be fixed later.
      city: undefined,
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalEvents = 0;
  if (city === "all") {
    totalEvents = await prisma.eventoEvent.count();
  } else {
    totalEvents = await prisma.eventoEvent.count({
      where: {
        city: capitalize(city),
      },
    });
  }

  return { events, totalEvents };
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
});
