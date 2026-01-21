"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const states = [
  { name: "All States", value: "" },
  { name: "NSW", value: "NSW" },
  { name: "VIC", value: "VIC" },
  { name: "QLD", value: "QLD" },
  { name: "SA", value: "SA" },
  { name: "WA", value: "WA" },
];

export default function AuctionCalendarHero() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current state from URL (empty = All States)
  const currentState = searchParams.get("state") || "";

  const handleStateClick = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("state", value);
    } else {
      params.delete("state");
    }

    // Navigate to the auctionCalender page with updated params
    router.push(`/auctionCalender?${params.toString()}`, { scroll: false });
  };
  return (
    <section className="relative min-h-[85vh] bg-white overflow-hidden flex flex-col pt-18 -pb-28">
      <div className="absolute inset-0 pointer-events-none md:mb-18 hidden md:block ">
        <div className="absolute left-0 bottom-0 w-[65%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[40%] ">
          <Image
            src="/images/fullcar.png"
            alt="Classic blue car"
            width={2000}
            height={2000}
            priority
            className="
              object-contain
              drop-shadow-xl
              -rotate-115
              translate-y-[-110%]
              translate-x-[-25%]
            "
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center w-full md:w-[55%] ml-auto px-2 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-3xl md:text-5xl text-gray-900 mb-6 font-bold">
          Auction Calendar
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mb-12">
          View all upcoming classic car auctions across Australia. Never miss an
          opportunity to bid on your dream car.
        </p>

        <div className="flex flex-wrap gap-3">
          {states.map((state) => {
            const isActive = currentState === state.value;

            return (
              <button
                key={state.name}
                onClick={() => handleStateClick(state.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-indigo-900 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {state.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
