"use client";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
const auctions = [
  {
    id: 1,
    title: "Shannons December Classic Auction",
    lots: 45,
    date: "December 15, 2025",
    location: "Melbourne, VIC – In-Person & Online",
    time: "10:00 AM AEDT",
    buttonStyle: "solid",
  },
  {
    id: 2,
    title: "Lloyds Classic Car Auction",
    lots: 62,
    date: "December 20, 2025",
    location: "Sydney, NSW – In-Person & Online",
    time: "2:00 PM AEDT",
    buttonStyle: "outline",
  },
  {
    id: 3,
    title: "Pickles Prestige & Classics",
    lots: 38,
    date: "December 28, 2025",
    location: "Brisbane, QLD – Online Only",
    time: "11:00 AM AEDT",
    buttonStyle: "solid",
  },
  {
    id: 4,
    title: "Grays Classic Car Auction",
    lots: 52,
    date: "January 5, 2026",
    location: "Adelaide, SA – In-Person & Online",
    time: "1:00 PM AEDT",
    buttonStyle: "solid",
  },
];

export default function UpcomingAuctions() {
  const router = useRouter();
  return (
    <section className="py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full">
                Next 30 Days
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

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900 pr-4">
                    {auction.title}
                  </h3>
                  <span className="bg-red-100 text-red-700 text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap">
                    {auction.lots} lots
                  </span>
                </div>

                <div className="space-y-4  text-gray-600">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">{auction.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">{auction.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {auction.time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/auctionDetail")}
                  className={`mt-8 w-full font-semibold py-3.5 rounded-xl transition-all ${
                    auction.buttonStyle === "solid"
                      ? "bg-indigo-900 text-white hover:bg-indigo-800 active:scale-95"
                      : "border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50"
                  }`}
                >
                  View Auction Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Calendar Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-indigo-900 text-indigo-900 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition text-lg">
            View Full Calendar
          </button>
        </div>
      </div>
    </section>
  );
}
