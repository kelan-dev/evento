import { EventoEvent } from "@prisma/client";
import React from "react";
import EventCard from "./event-card";

type EventsListProps = {
  events: EventoEvent[];
};

export default function EventsList({ events }: EventsListProps) {
  return (
    <section className="flex flex-wrap justify-center gap-10">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
