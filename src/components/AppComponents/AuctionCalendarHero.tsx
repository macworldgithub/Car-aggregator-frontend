import Image from "next/image";
import Link from "next/link";

const states = [
  { name: "All States", active: true },
  { name: "NSW", active: false },
  { name: "VIC", active: false },
  { name: "QLD", active: false },
  { name: "SA", active: false },
  { name: "WA", active: false },
];

export default function AuctionCalendarHero() {
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
          {/* {states.map((s) => (
            <Link
              key={s.name}
              href={
                s.name === "All States"
                  ? "/calendar"
                  : `/calendar?state=${s.name}`
              }
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                ${
                  s.active
                    ? "bg-indigo-900 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {s.name}
            </Link>
          ))} */}

          {states.map((state) => (
            <button
              key={state.name}
              type="button"
              disabled
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-default
                ${
                  state.active
                    ? "bg-indigo-900 text-white shadow-lg"
                    : "bg-gray-200 text-gray-500 opacity-70"
                }`}
            >
              {state.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
