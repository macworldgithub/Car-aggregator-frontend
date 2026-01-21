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
import Image from "next/image";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

        const res = await fetch(
          `https://aggregator.omnisuiteai.com/api/lot/${lotId}`,
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          },
        );

        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        setLot(data);

        // Set first image as default main image
        if (data.images?.length > 0) {
          setSelectedImage(data.images[0].split("?")[0]);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to load vehicle details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotDetail();
  }, [lotId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !lot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-6">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-red-600 mb-6">Oops!</h2>
          <p className="text-xl text-gray-700 mb-8">
            {error || "Lot not found"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-10 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const cleanImages = lot.images?.map((img) => img.split("?")[0]) || [];
  const mainImage =
    selectedImage || cleanImages[0] || "/images/fallback-car.jpg";

  const formatPrice = () => {
    if (!lot.price_range?.low) return "Price on request";
    if (lot.price_range.low === lot.price_range.high) {
      return `$${lot.price_range.low.toLocaleString()}`;
    }
    return `$${lot.price_range.low.toLocaleString()} – $${lot.price_range.high.toLocaleString()}`;
  };

  const badges = [
    lot.reserve === "No" && { text: "No Reserve", color: "bg-red-600" },
    lot.status && { text: lot.status.replace("_", " "), color: "bg-amber-600" },
  ].filter(Boolean) as { text: string; color: string }[];

  const vehicleInfo = [
    { label: "Make", value: lot.make || "—" },
    { label: "Model", value: lot.model || "—" },
    { label: "Year", value: lot.year ? String(lot.year) : "—" },
    {
      label: "Odometer",
      value: lot.odometer || lot.specs?.odometer || "Not specified",
    },
  ].filter((item) => item.value !== "—");

  const formatDate = (dateStr?: string | null) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Date TBA";

  const getLocation = (loc?: string | { city?: string; state?: string }) => {
    if (!loc) return "Australia";
    if (typeof loc === "string") return loc;
    return [loc.city, loc.state].filter(Boolean).join(", ") || "Australia";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero / Gallery + Key Info Section */}
        <section className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left: Main Image + Info */}
            <div className="lg:col-span-3 flex flex-col">
              {/* Main Image */}
              <div className="relative aspect-[4/3] md:aspect-[16/9] bg-gray-100">
                <Image
                  src={mainImage}
                  alt={lot.title || "Vehicle"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Title + Price + Badges */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                      {lot.title ||
                        `${lot.year || ""} ${lot.make || ""} ${lot.model || ""}`.trim()}
                    </h1>

                    <div className="flex flex-wrap gap-3 mt-5">
                      {badges.map((b, i) => (
                        <span
                          key={i}
                          className={`px-6 py-2 rounded-full text-sm font-bold text-white shadow-sm ${b.color}`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>

                    <p className="text-xl md:text-3xl font-extrabold text-indigo-700 mt-6">
                      {formatPrice()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle Specs Cards */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {vehicleInfo.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="mx-auto w-14 h-14 bg-indigo-100/80 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        {index === 0 && (
                          <Car className="w-7 h-7 text-indigo-700" />
                        )}
                        {index === 1 && (
                          <Wrench className="w-7 h-7 text-indigo-700" />
                        )}
                        {index === 2 && (
                          <Calendar className="w-7 h-7 text-indigo-700" />
                        )}
                        {index === 3 && (
                          <Gauge className="w-7 h-7 text-indigo-700" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {item.label}
                      </p>
                      <p className="text-md font-bold text-gray-900 mt-2">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 border-l border-gray-100 flex flex-col">
              {cleanImages.length > 0 && (
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    More Images
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                    {cleanImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === img
                            ? "border-indigo-600 shadow-lg scale-105"
                            : "border-transparent hover:border-indigo-300 hover:shadow"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Auction Details
                </h3>
                <div className="space-y-6 text-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-indigo-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {mapSourceToHouse(lot.source)}
                      </p>
                      <p className="text-gray-600">
                        {formatDate(lot.auction_date || lot.auction_end)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-indigo-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {getLocation(lot.location)}
                      </p>
                      <p className="text-gray-600">Online & In-Person</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-indigo-700" />
                    </div>
                    <p className="font-semibold text-lg">2:00 PM AEDT</p>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <a
                    href={lot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-indigo-600 text-white font-bold py-4 rounded-xl text-center hover:bg-indigo-700 transition shadow-md"
                  >
                    View on {mapSourceToHouse(lot.source)}
                  </a>
                  {/* <button className="w-full border-2 border-indigo-600 text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition">
                    Stay Alert
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition">
                    Add to Watchlist
                  </button> */}
                </div>

                <p className="text-xs text-gray-500 mt-8 text-center">
                  Estimate includes buyer’s premium. Contact auction house for
                  full terms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
