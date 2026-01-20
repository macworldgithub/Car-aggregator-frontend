import Image from "next/image";
import { Heart, Calendar, MapPin, Clock, Loader2 } from "lucide-react";

interface AuctionLot {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  images: string[];
  price?: { current?: number };
  price_range?: { low?: number; high?: number };
  auction_date?: string | null;
  auction_end?: string | null;
  location?: string | { city?: string; state?: string };
  source?: string;
  description?: string;
  provenance?: string;
  odometer?: string;
  reserve?: string;
  body_style?: string;
  transmission?: string;
  fuel_type?: string;
  buyers_premium_pct?: number;
  url?: string;
}

interface CarDetailProps {
  auctionLot: AuctionLot;
}

export default function CarDetail({ auctionLot }: CarDetailProps) {

  // Transform API data to component format
  const data = {
    title: auctionLot.title || `${auctionLot.year || ''} ${auctionLot.make || ''} ${auctionLot.model || ''}`.trim() || "Untitled Auction",
    year: auctionLot.year?.toString() || "",
    make: auctionLot.make || "",
    model: auctionLot.model || "",
    priceRange: auctionLot.price_range?.low && auctionLot.price_range?.high
      ? `$${auctionLot.price_range.low.toLocaleString()} – $${auctionLot.price_range.high.toLocaleString()}`
      : auctionLot.price?.current
      ? `$${auctionLot.price.current.toLocaleString()}`
      : "Price on request",
    badges: auctionLot.reserve === "No" ? ["No Reserve"] : [],
    description: auctionLot.description || "No description available.",
    provenance: auctionLot.provenance || "Provenance information not available.",
    specs: {
      engine: "Engine info not available", // API may not have this
      transmission: auctionLot.transmission || "Transmission info not available",
      odometer: auctionLot.odometer || "Odometer not available",
      bodyStyle: auctionLot.body_style || "Body style not available",
      exterior: "Exterior info not available",
      interior: "Interior info not available",
    },
    auction: {
      house: auctionLot.source || "Online Auction",
      date: auctionLot.auction_end || auctionLot.auction_date
        ? new Date(auctionLot.auction_end || auctionLot.auction_date!).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Date TBA",
      location: typeof auctionLot.location === "string"
        ? auctionLot.location
        : [auctionLot.location?.city, auctionLot.location?.state].filter(Boolean).join(", ") || "Australia",
      type: "Online Auction",
      time: auctionLot.auction_end || auctionLot.auction_date
        ? new Date(auctionLot.auction_end || auctionLot.auction_date!).toLocaleTimeString("en-AU", {
            hour: "numeric",
            minute: "2-digit",
          })
        : "Time TBA",
    },
  };


}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Title + Price + Badges + Favorite */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                {data.badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-full text-xs font-bold text-white ${
                      badge === "No Reserve"
                        ? "bg-red-600"
                        : badge === "Matching Numbers"
                        ? "bg-orange-600"
                        : "bg-green-600"
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="text-xl md:text-3xl font-extrabold text-indigo-900">
                {data.priceRange}
              </p>
            </div>

            <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              <Heart className="w-7 h-7 text-gray-600 hover:text-red-500 hover:fill-red-500 transition" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.description}
              </p>
            </section>

            {/* Provenance */}
            <section className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Provenance
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.provenance}
              </p>
            </section>

            {/* Specifications */}
            <section className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.specs.engine && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-indigo-600 rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Engine</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.engine}
                      </p>
                    </div>
                  </div>
                )}

                {data.specs.transmission && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-blue-600 rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.transmission}
                      </p>
                    </div>
                  </div>
                )}

                {data.specs.odometer && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-yellow-600 rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Odometer</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.odometer}
                      </p>
                    </div>
                  </div>
                )}

                {data.specs.bodyStyle && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-purple-600 rounded"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Body Style</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.bodyStyle}
                      </p>
                    </div>
                  </div>
                )}

                {data.specs.exterior && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Exterior</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.exterior}
                      </p>
                    </div>
                  </div>
                )}

                {data.specs.interior && (
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Interior</p>
                      <p className="font-bold text-gray-900">
                        {data.specs.interior}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar - Auction Details */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Auction Details
              </h3>
              <div className="space-y-5 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-900" />
                  </div>
                  <div>
                    <p className="font-semibold">{data.auction.house}</p>
                    <p className="text-sm">{data.auction.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{data.auction.location}</p>
                    <p className="text-sm">{data.auction.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="font-medium">{data.auction.time}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-indigo-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-800 transition">
                  View Details
                </button>
                <button className="w-full border-2 border-indigo-900 text-indigo-900 font-bold py-4 rounded-xl hover:bg-indigo-50 transition">
                  Stay Alert
                </button>
                <button className="w-full border border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition">
                  Add to Watchlist
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6 text-center">
                Estimate includes buyer’s premium. Contact auction house for
                full terms and conditions.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
