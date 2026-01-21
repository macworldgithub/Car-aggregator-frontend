"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
const FALLBACK_IMAGE = "/images/ford.png";
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
}

const formatPrice = (lot: AuctionLot) => {
  if (lot.price_range?.low && lot.price_range?.high) {
    return `$${lot.price_range.low.toLocaleString()} – $${lot.price_range.high.toLocaleString()}`;
  }
  if (lot.price?.current) {
    return `$${lot.price.current.toLocaleString()}`;
  }
  return "Price on request";
};

const formatDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date TBA";

const getLocation = (loc?: string | { city?: string; state?: string }) => {
  if (!loc) return "Australia";
  if (typeof loc === "string") return loc;
  return [loc.city, loc.state].filter(Boolean).join(", ") || "Australia";
};

export default function FeaturedLots() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lots, setLots] = useState<AuctionLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    const fetchLots = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams(searchParams.toString());

        const page = Number(params.get("page") || 1);
        const limit = Number(params.get("limit") || 20);

        params.set("page", page.toString());
        params.set("limit", limit.toString());
        params.set("sort", "auction_date desc");

        const res = await fetch(
          `https://aggregator.omnisuiteai.com/api/search?${params.toString()}`,
          { cache: "no-store" },
        );

        if (!res.ok) throw new Error("Fetch failed");

        const json = await res.json();

        const results = json.results || [];
        const pag = json.pagination || {};

        const total = Number(pag.total || results.length);
        const finalLimit = Number(pag.limit || limit);

        const totalPages =
          Number(pag.totalPages) || Math.ceil(total / finalLimit) || 1;

        const currentPage = Number(pag.page || page);

        setLots(results);

        setPagination({
          page: currentPage,
          limit: finalLimit,
          total,
          totalPages,
          hasNext: pag.has_next ?? pag.hasNext ?? currentPage < totalPages,
          hasPrev: pag.has_prev ?? pag.hasPrev ?? currentPage > 1,
        });
      } catch (err) {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-900" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-16 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-600 mb-6">
          Showing {lots.length} of {pagination.total} — Page {pagination.page}{" "}
          of {pagination.totalPages}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lots.map((car) => {
            // Improved image logic with fallback
            let imageSrc = FALLBACK_IMAGE;

            if (car.images && car.images.length > 0) {
              const firstImg = car.images[0]?.split("?")[0]?.trim();
              if (firstImg && firstImg.length > 5) {
                // basic sanity check
                imageSrc = firstImg;
              }
            }

            const title =
              car.title ||
              [car.year, car.make, car.model].filter(Boolean).join(" ") ||
              "Classic Car";

            return (
              <div
                key={car._id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-shadow"
              >
                <div className="relative h-56 bg-gray-100">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Extra safety: if image fails to load → fallback
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold mb-2 line-clamp-2">{title}</h3>
                  <p className="font-extrabold text-indigo-900 mb-3">
                    {formatPrice(car)}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex gap-2 items-center">
                      <Calendar size={16} />
                      {formatDate(car.auction_end || car.auction_date)}
                    </div>
                    <div className="flex gap-2 items-center">
                      <MapPin size={16} />
                      {getLocation(car.location)}
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/auctionDetail?id=${car._id}`)}
                    className="w-full bg-indigo-900 text-white py-3 rounded-lg hover:bg-indigo-800 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={!pagination.hasPrev}
              onClick={() => handlePageChange(pagination.page - 1)}
              className="px-6 py-3 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition disabled:hover:bg-gray-200"
            >
              Previous
            </button>

            <span className="font-bold">
              Page {pagination.page} / {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNext}
              onClick={() => handlePageChange(pagination.page + 1)}
              className="px-6 py-3 bg-indigo-900 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-800 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
