// components/AboutSection.tsx

import Image from "next/image";
import { Check } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top: Title + Description + Car Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Text */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              About Auction Hub
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Australia’s most comprehensive directory of classic, collector,
              and muscle cars at public auction
            </p>
          </div>

          {/* Right Car Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/images/fullcar.png"
              alt="Classic blue car - About Auction Hub"
              width={800}
              height={500}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Collector Auction Hub exists to solve a simple but crucial problem:
            there has never been one reliable place to see{" "}
            <strong>
              every classic car currently offered at public auction in Australia
            </strong>
            .
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            We aggregate listings from every major auction house, specialist
            classic car sales, online platforms, and club auctions to create{" "}
            <strong>the only complete directory of its kind</strong>. If it’s
            being publicly auctioned and it qualifies as a classic or collector
            car, you’ll find it here first.
          </p>
        </div>

        {/* What We Cover */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What We Cover
          </h3>

          <div className="bg-gray-50/70 backdrop-blur-sm rounded-3xl p-10 md:p-12 border border-gray-200 shadow-lg">
            <div className="space-y-8">
              {/* Pre-1990 Vehicles */}
              <div className="flex items-start gap-5">
                <Check className="w-7 h-7 text-indigo-900 mt-0.5" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Pre-1990 Vehicles
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    All classic cars manufactured before 1990, including
                    Australian muscle cars, European sports cars, and American
                    classics
                  </p>
                </div>
              </div>

              {/* Modern Classics */}
              <div className="flex items-start gap-5">
                <Check className="w-7 h-7 text-indigo-900  mt-0.5" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Modern Classics
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Post-1990 vehicles officially marketed as “collector”,
                    “modern classic”, or “future classic” by the selling auction
                    house
                  </p>
                </div>
              </div>

              {/* All Auction Types */}
              <div className="flex items-start gap-5">
                <Check className="w-7 h-7 text-indigo-900 mt-0.5" />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    All Auction Types
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Dedicated classic sales, general auction houses, online-only
                    platforms, and club/charity auctions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
