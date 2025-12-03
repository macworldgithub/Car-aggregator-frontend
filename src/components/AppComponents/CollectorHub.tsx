// components/CollectorHub.tsx

import { Search, Calendar, Bell, Archive, TrendingUp, Zap } from "lucide-react";

const features = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Comprehensive Search",
    desc: "Find any classic car currently at auction across Australia with powerful filters and instant results",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Master Calendar",
    desc: "See all upcoming auctions in one place with filtering by state, auction house, and sale type",
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Smart Alerts",
    desc: "Get notified instantly when cars matching your criteria appear or when auctions are about to start",
  },
  {
    icon: <Archive className="w-8 h-8" />,
    title: "Sold Price Archive",
    desc: "Research actual sale prices from 2022 onwards to make informed buying and selling decisions",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Market Analytics",
    desc: "Track price trends, heat indexes, and market movements for specific makes and models",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-Time Updates",
    desc: "New catalogues visible within 4 hours, live bidding updates, and accurate hammer prices",
  },
];

export default function CollectorHub() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge + Heading */}
        <div className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-5 py-2 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Collector Auction Hub
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The most complete and accurate directory of classic cars at auction
            in Australia
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition-colors">
                <div className="text-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
