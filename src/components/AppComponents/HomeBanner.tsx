// components/HeroSection.tsx

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden from-gray-50 via-white to-blue-50">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2zM36 12v4h4v2h-4v4h-2v-4h4v-2h-4v-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Australia’s Complete
            <br />
            <span className="text-indigo-900">Classic Car Auction</span>
            <br />
            Directory
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
            Every classic, collector, and muscle car at public auction across
            Australia. All in one place. Updated in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-1 max-w-xl mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Make"
              className="px-3 py-2 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 text-gray-800"
            />
            <input
              type="text"
              placeholder="Model"
              className="px-3 py-2 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 text-gray-800"
            />
            <input
              type="text"
              placeholder="Variant"
              className="px-3 py-2 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 text-gray-800"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
            <button className="w-full sm:w-auto px-12 py-3 bg-indigo-900 text-white font-bold text-lg rounded-xl hover:bg-indigo-800 transition transform hover:scale-105">
              Search
            </button>
            <button className="w-full sm:w-auto px-12 py-3 border-2 border-indigo-900 text-indigo-900 font-bold text-lg rounded-xl hover:bg-indigo-50 transition">
              View Calendar
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-900">2,500+</div>
              <div className="text-gray-600 font-medium">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-900">150+</div>
              <div className="text-gray-600 font-medium">Auction Houses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-900">24/7</div>
              <div className="text-gray-600 font-medium">Live Updates</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-2xl">
            <Image
              src="/images/car.png"
              alt="Classic Car Auction Hero"
              width={1200}
              height={800}
              className="rounded-2xl shadow-2xl object-cover drop-shadow-2xl"
              priority
            />
            {/* Optional glow effect */}
            <div className="absolute -inset-4 bg-indigo-600/20 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
