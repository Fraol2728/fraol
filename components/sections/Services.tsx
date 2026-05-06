import ServiceCard from "@/components/cards/ServiceCard";
import { allServicesQuery } from "@/lib/queries/services";
import { client } from "@/sanity/lib/client";

type Service = {
  _id: string;
  title: string;
  slug?: { current?: string };
  description?: string;
  icon?: string;
  features?: string[];
  order?: number;
};

export default async function Services() {
  const services = await client.fetch<Service[]>(allServicesQuery);

  return (
    <section className="bg-[#0a0a0a] py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-zinc-500">
            <span className="h-px w-12 bg-zinc-700" />
            WHAT I DO
            <span className="h-px w-12 bg-zinc-700" />
          </p>
          <h2 className="text-4xl font-black sm:text-5xl">
            <span className="text-white">Services & </span>
            <span className="text-[#c9ff47]">Expertise</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            From concept to execution — I handle design and development end to
            end
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0
            ? services.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  delay={index * 0.1}
                />
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`service-skeleton-${index + 1}`}
                  className="animate-pulse rounded-2xl border border-[#1f1f1f] bg-[#111111] p-8"
                >
                  <div className="mb-6 h-14 w-14 rounded-xl bg-[#1a1a1a]" />
                  <div className="h-7 w-2/3 rounded bg-[#222222]" />
                  <div className="mt-3 h-4 w-full rounded bg-[#1e1e1e]" />
                  <div className="mt-2 h-4 w-4/5 rounded bg-[#1e1e1e]" />
                  <div className="mt-5 space-y-2">
                    <div className="h-4 w-5/6 rounded bg-[#1e1e1e]" />
                    <div className="h-4 w-2/3 rounded bg-[#1e1e1e]" />
                    <div className="h-4 w-3/4 rounded bg-[#1e1e1e]" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
