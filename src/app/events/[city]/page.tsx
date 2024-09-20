import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
import PaginationControls from "@/components/pagination-controls";
import { z } from "zod";
import { getEvents } from "@/lib/server-utils";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = capitalize(params.city);

  return {
    title: city === "all" ? "All Events" : `Events in ${city}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default function EventsPage({ params, searchParams }: EventsPageProps) {
  const city = params.city;
  const page = pageNumberSchema.safeParse(searchParams.page);

  if (!page.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${capitalize(city)}`}
      </H1>

      <Suspense key={city + page.data} fallback={<Loading />}>
        <EventsListDataLoader city={city} page={page.data} />
      </Suspense>
    </main>
  );
}

async function EventsListDataLoader({
  city,
  page = 1,
}: {
  city: string;
  page?: number;
}) {
  const { events, totalEvents } = await getEvents(city, page);

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalEvents > page * 6 ? `/events/${city}?page=${page + 1}` : "";

  return (
    <div className="flex max-w-[1100px] flex-col gap-10 px-[20px]">
      <EventsList events={events} />
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </div>
  );
}
