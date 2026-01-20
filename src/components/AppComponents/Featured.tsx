"use client";

import { useRouter } from "next/navigation";
import { Heart, Calendar, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface AuctionLot {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  images: string[];
  price?: { current?: number; starting?: number };
  price_range?: { low?: number; high?: number };
  reserve?: "Yes" | "No" | string;
  auction_date?: string | null;
  auction_end?: string | null;
  location?: string | { city?: string; state?: string };
  source?: string;
  url?: string;
}

const mapSourceToHouse = (source?: string): string => {
  const map: Record<string, string> = {
    shannons: "Shannons",
    lloydsonline: "Lloyds Auctions",
    grays: "Grays",
    pickles: "Pickles",
    allbids: "Allbids",
    carbids: "Carbids",
    bennettsclassicauctions: "Bennetts Classic Auctions",
    collectingcars: "Collecting Cars",
    seven82motors: "Seven82Motors",
  };
  return map[source?.toLowerCase() || ""] || source || "Online Auction";
};

const formatPrice = (lot: AuctionLot): string => {
  if (lot.price_range?.low != null && lot.price_range?.high != null) {
    return `$${lot.price_range.low.toLocaleString()} – $${lot.price_range.high.toLocaleString()}`;
  }
  if (lot.price?.current != null) {
    return `$${lot.price.current.toLocaleString()}`;
  }
  return "Price on request";
};

const getBadge = (lot: AuctionLot) => {
  if (lot.reserve === "No") return { text: "No Reserve", color: "bg-red-600" };
  if (lot.reserve === "Yes")
    return { text: "Reserve Met", color: "bg-orange-600" };
  return null;
};

const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "Date TBA";
  try {
    return new Date(dateStr).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Date TBA";
  }
};

const getLocation = (
  loc?: string | { city?: string; state?: string },
): string => {
  if (!loc) return "Australia";
  if (typeof loc === "string") return loc;
  const parts = [loc.city, loc.state].filter(Boolean);
  return parts.length ? parts.join(", ") : "Australia";
};

export default function FeaturedLots() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lots, setLots] = useState<AuctionLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        // Get all possible filters from URL
        const filterKeys = [
          "make",
          "model",
          "year_min",
          "year_max",
          "price_min",
          "price_max",
          "state",
          "auction_house",
          "no_reserve",
          "body_style",
          "transmission",
          "newly_added",
          "sort",
        ];

        filterKeys.forEach((key) => {
          const value = searchParams.get(key);
          if (value !== null) {
            params.set(key, value);
          }
        });

        // Default behavior when no filters are applied
        if (params.toString() === "") {
          params.set("newly_added", "14d");
          params.set("sort", "auction_date desc");
        }

        // Try to get more items (if API supports)
        params.set("limit", "100");

        const url = `https://aggregator.omnisuiteai.com/api/search?${params.toString()}`;

        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();

        // Filter valid lots
        const validLots = Array.isArray(data)
          ? data.filter(
              (item) =>
                item.title?.trim() || (item.make?.trim() && item.model?.trim()),
            )
          : [];

        setLots(validLots);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load lots");
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, [searchParams]); // Re-fetch when URL params change

  return (
    <section className="py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Featured Lots
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Newly catalogued hero cars from Australia's
            </p>
            <p className="text-sm font-bold text-gray-800">
              premier auction houses
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-900" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-8 py-3 bg-indigo-900 text-white rounded-xl hover:bg-indigo-800"
            >
              Try Again
            </button>
          </div>
        ) : lots.length === 0 ? (
          <div className="text-center py-16 text-gray-600 text-lg">
            No matching vehicles found
          </div>
        ) : (
          <div className="space-y-10">
            <p className="text-center text-gray-700 font-medium">
              Showing {lots.length} classic cars
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {lots.map((car) => {
                const primaryImage =
                  car.images?.[0]?.split("?")[0] ||
                  "/images/placeholder-car.jpg";
                const displayTitle =
                  car.title?.trim() ||
                  [car.year, car.make, car.model]
                    .filter(Boolean)
                    .join(" ")
                    .trim() ||
                  "Classic Vehicle";
                const badge = getBadge(car);

                return (
                  <div
                    key={car._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={primaryImage}
                        alt={displayTitle}
                        className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {badge && (
                        <span
                          className={`${badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full absolute top-4 left-4 shadow-lg uppercase`}
                        >
                          {badge.text}
                        </span>
                      )}
                      <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-md">
                        <Heart className="w-5 h-5 text-gray-700 hover:fill-red-500 hover:text-red-500 transition" />
                      </button>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {displayTitle}
                      </h3>
                      <p className="text-xl font-extrabold text-indigo-900 mb-4">
                        {formatPrice(car)}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(car.auction_end || car.auction_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{getLocation(car.location)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          via {mapSourceToHouse(car.source)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          router.push(`/auctionDetail?id=${car._id}`)
                        }
                        className="w-full bg-indigo-900 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
