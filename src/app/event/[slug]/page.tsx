import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await getEvent(params.slug);

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.slug);

  return (
    <main>
      <section className="relative flex items-center justify-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt=""
          quality={50}
          priority
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="z-0 object-cover blur-3xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:gap-16">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="state-effects mt-5 w-[95vw] rounded-md border-2 border-white/10 bg-white/20 py-2 text-lg capitalize sm:w-full lg:mt-auto">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] px-5 py-16 text-center">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionText>{event.description}</SectionText>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionText>{event.location}</SectionText>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-8 text-2xl">{children}</h2>;
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-4xl text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
