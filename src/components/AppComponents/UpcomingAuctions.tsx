"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";

interface AuctionEvent {
  date: string; // ISO string e.g. "Thu, 22 Jan 2026 05:30:00 GMT"
  house: string; // e.g. "collectingcars"
  location: string; // e.g. "Pinkenba, QLD"
  num_lots: number;
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
    tradinggarage: "Trading Garage",
  };
  return map[source?.toLowerCase() || ""] || source || "Online Auction";
};

export default function UpcomingAuctions() {
  const searchParams = useSearchParams();

  const [auctions, setAuctions] = useState<AuctionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query string from URL params
        const params = new URLSearchParams();

        const state = searchParams.get("state");
        if (state && state !== "All States") {
          params.set("state", state);
        }

        const month = searchParams.get("month"); // e.g. "2026-01"
        if (month) {
          params.set("month", month);
        }

        const auction_house = searchParams.get("auction_house");
        if (auction_house) {
          params.set("auction_house", auction_house);
        }

        const online_only = searchParams.get("online_only");
        if (online_only === "true") {
          params.set("online_only", "true");
        }

        const url = `https://aggregator.omnisuiteai.com/api/calendar?${params.toString()}`;

        const res = await fetch(url, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data: AuctionEvent[] = await res.json();
        setAuctions(data);
      } catch (err: any) {
        console.error("Calendar fetch error:", err);
        setError("Failed to load upcoming auctions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [searchParams]); // Re-fetch when filters change

  // Helper: Format date like "22 January 2026"
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Date TBA";
    }
  };

  // Extract state e.g. "QLD" from "Pinkenba, QLD"
  const getState = (location: string) => {
    const parts = location.split(",").map((p) => p.trim());
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[300px]">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 text-xl font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full">
                Upcoming Auctions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Upcoming Auctions
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Never miss a sale – complete calendar of Australia's
            </p>
            <p className="text-sm font-bold text-gray-800">
              classic car auctions
            </p>
          </div>
        </div>

        {auctions.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-xl">
              No auctions found for the selected filters.
            </p>
            <p className="mt-2">Try adjusting the state or month.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-7">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-gray-900 pr-3 leading-tight">
                      {mapSourceToHouse(auction.house)}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap shrink-0">
                      {auction.num_lots} lots
                    </span>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-base">
                        {formatDate(auction.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-base">{auction.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-base font-medium">
                        {new Date(auction.date).toLocaleTimeString("en-AU", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* You can add a real link later when you have detail page per auction */}
                  {/* <button className="mt-8 w-full bg-indigo-700 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition">
                    View Details
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}

       
        <div className="text-center mt-12">
          {/* <Link href="/calendar" className="border-2 border-indigo-900 text-indigo-900 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition text-lg inline-block">
            View Full Calendar
          </Link> */}
        </div>
      </div>
    </section>
  );
}
