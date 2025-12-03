// components/FeaturedLots.tsx
"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Calendar, MapPin } from "lucide-react";

const featuredCars = [
  {
    id: 1,
    image: "/images/car1.png",
    title: "1977 Holden Torana A9X",
    price: "$280,000 - $320,000",
    badge: "No Reserve",
    badgeColor: "bg-red-600",
    date: "Dec 8, 2025",
    location: "Sydney, NSW",
    auctionHouse: "via Shannons",
  },
  {
    id: 2,
    image: "/images/car2.png",
    title: "1971 Ford Falcon XY GT-HO",
    price: "$950,000 - $1,100,000",
    badge: "Matching Numbers",
    badgeColor: "bg-orange-600",
    date: "Dec 15, 2025",
    location: "Melbourne, VIC",
    auctionHouse: "via Lloyds Auctions",
  },
  {
    id: 3,
    image: "/images/car3.png",
    title: "1968 Holden Monaro GTS 327",
    price: "$185,000 - $220,000",
    badge: "Restored",
    badgeColor: "bg-green-600",
    date: "Dec 12, 2025",
    location: "Brisbane, QLD",
    auctionHouse: "via Grays",
  },
  {
    id: 4,
    image: "/images/car4.png",
    title: "1969 Ford Mustang Fastback",
    price: "$145,000 - $175,000",
    badge: "No Reserve",
    badgeColor: "bg-red-600",
    date: "Dec 20, 2025",
    location: "Perth, WA",
    auctionHouse: "via Pickles",
  },
];

export default function Featured() {
  const router = useRouter();
  return (
    <section className="py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded- rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.title}
                  width={600}
                  height={400}
                  className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <span
                  className={`${car.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full absolute top-4 left-4 shadow-lg`}
                >
                  {car.badge}
                </span>
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-md">
                  <Heart className="w-5 h-5 text-gray-700 hover:fill-red-500 hover:text-red-500 transition" />
                </button>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {car.title}
                </h3>
                <p className="text-xl font-extrabold text-indigo-900 mb-4">
                  {car.price}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{car.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {car.auctionHouse}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/auctionDetail")}
                  className="w-full bg-indigo-900 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition active:scale-95"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-indigo-900 text-white font-bold px-12 py-4 rounded-xl hover:bg-indigo-800 transition text-lg">
            View All List
          </button>
        </div>
      </div>
    </section>
  );
}
