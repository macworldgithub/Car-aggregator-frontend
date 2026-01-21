"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Gauge,
  Car,
  Wrench,
  Loader2,
} from "lucide-react";
import CarGallery from "./CarGallery";

interface LotDetail {
  _id: string;
  title?: string;
  year?: number;
  make?: string;
  model?: string;
  images?: string[];
  price_range?: { low?: number; high?: number };
  reserve?: string;
  description?: string;
  provenance?: string;
  auction_date?: string;
  auction_end?: string;
  location?: string | { city?: string; state?: string };
  source?: string;
  url?: string;
  odometer?: string;
  specs?: {
    engine?: string;
    transmission?: string;
    odometer?: string;
    bodyStyle?: string;
    exterior?: string;
    interior?: string;
  };
  status?: string;
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

export default function AuctionDetailPage() {
  const searchParams = useSearchParams();
  const lotId = searchParams.get("id");

  const [lot, setLot] = useState<LotDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lotId) {
      setError("No lot ID provided");
      setLoading(false);
      return;
    }

    const fetchLotDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://aggregator.omnisuiteai.com/api/lot/${lotId}`;

        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch lot: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();
        setLot(data);
      } catch (err: any) {
        console.error("Detail fetch error:", err);
        setError("Failed to load vehicle details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotDetail();
  }, [lotId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-900" />
      </div>
    );
  }

  if (error || !lot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-xl text-gray-700 mb-6">
            {error || "Lot not found"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  const formatPrice = () => {
    if (lot.price_range?.low && lot.price_range?.high) {
      if (lot.price_range.low === lot.price_range.high) {
        return `$${lot.price_range.low.toLocaleString()}`;
      }
      return `$${lot.price_range.low.toLocaleString()} – $${lot.price_range.high.toLocaleString()}`;
    }
    return "Price on request";
  };

  const getBadges = () => {
    const badges: { text: string; color: string }[] = [];
    if (lot.reserve === "No")
      badges.push({ text: "No Reserve", color: "bg-red-600" });
    if (lot.status)
      badges.push({
        text: lot.status.replace("_", " "),
        color: "bg-amber-600",
      });
    return badges;
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Date TBA";
    try {
      return new Date(dateStr).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Date TBA";
    }
  };

  const getLocation = (loc?: string | { city?: string; state?: string }) => {
    if (!loc) return "Australia";
    if (typeof loc === "string") return loc;
    const parts = [loc.city, loc.state].filter(Boolean);
    return parts.length ? parts.join(", ") : "Australia";
  };

  const cleanImages = lot.images?.map((img) => img.split("?")[0]) || [];

  const badges = getBadges();

  const vehicleInfo = [
    { label: "Make", value: lot.make || "—" },
    { label: "Model", value: lot.model || "—" },
    { label: "Year", value: lot.year || "—" },
    {
      label: "Odometer",
      value: lot.odometer || lot.specs?.odometer || "Not specified",
    },
  ].filter((item) => item.value !== "—");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <CarGallery images={cleanImages} />

        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                {lot.title ||
                  `${lot.year || ""} ${lot.make || ""} ${lot.model || ""}`.trim()}
              </h1>

              <div className="flex flex-wrap gap-3 mt-4">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className={`px-5 py-2 rounded-full text-sm font-bold text-white ${b.color}`}
                  >
                    {b.text}
                  </span>
                ))}
              </div>

              <p className="text-3xl md:text-4xl font-extrabold text-indigo-900 mt-4">
                {formatPrice()}
              </p>
            </div>

            <button className="p-4 border border-gray-300 rounded-full hover:bg-gray-50 transition shrink-0">
              <Heart className="w-8 h-8 text-gray-600 hover:text-red-500 hover:fill-red-500 transition" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {vehicleInfo.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100 hover:border-indigo-200 transition"
              >
                <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  {index === 0 && <Car className="w-6 h-6 text-indigo-700" />}
                  {index === 1 && (
                    <Wrench className="w-6 h-6 text-indigo-700" />
                  )}
                  {index === 2 && (
                    <Calendar className="w-6 h-6 text-indigo-700" />
                  )}
                  {index === 3 && <Gauge className="w-6 h-6 text-indigo-700" />}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
          <div className="lg:col-span-2 space-y-10">
          
            {lot.specs && Object.keys(lot.specs).length > 0 && (
              <section className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Full Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
     
                  {lot.specs.engine && (
                    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Engine</p>
                        <p className="font-bold text-gray-900">
                          {lot.specs.engine}
                        </p>
                      </div>
                    </div>
                  )}
     
                </div>
              </section>
            )}
          </div>

    
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
                    <p className="font-semibold">
                      {mapSourceToHouse(lot.source)}
                    </p>
                    <p className="text-sm">
                      {formatDate(lot.auction_date || lot.auction_end)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{getLocation(lot.location)}</p>
                    <p className="text-sm">In-Person & Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="font-medium">2:00 PM AEDT</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href={lot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-indigo-900 text-white font-bold py-4 rounded-xl text-center hover:bg-indigo-800 transition"
                >
                  View on {mapSourceToHouse(lot.source)}
                </a>
                <button className="w-full border-2 border-indigo-900 text-indigo-900 font-bold py-4 rounded-xl hover:bg-indigo-50 transition">
                  Stay Alert
                </button>
                <button className="w-full border border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition">
                  Add to Watchlist
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6 text-center">
                Estimate includes buyer’s premium. Contact auction house for
                full terms.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
