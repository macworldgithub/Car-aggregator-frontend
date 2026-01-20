"use client";

import CarDetail from "@/src/components/AppComponents/CarDetail";
import CarGallery from "@/src/components/AppComponents/CarGallery";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

export default function AuctionDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [auctionLot, setAuctionLot] = useState<AuctionLot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No auction ID provided");
      setLoading(false);
      return;
    }

    const fetchAuctionDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the search API with id filter to get the specific auction
        const res = await fetch(
          `https://aggregator.omnisuiteai.com/api/search?id=${id}`,
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          },
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const json = await res.json();

        // Assuming it returns {results: [item]}
        const item = json.results?.[0];
        if (!item) throw new Error("Auction not found");

        setAuctionLot(item);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 flex justify-center items-center">
        <div className="text-center text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  if (!auctionLot) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 flex justify-center items-center">
        <div className="text-center text-gray-600">Auction not found</div>
      </div>
    );
  }

  return (
    <div>
      <CarGallery images={auctionLot.images} />
      <CarDetail auctionLot={auctionLot} />
    </div>
  );
}
