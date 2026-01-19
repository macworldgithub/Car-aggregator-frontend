// components/AppComponents/AdvancedSearch.tsx

"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

const quickFilters = [
  "No Reserve",
  "Holden Muscle Cars",
  "Ford GT Falcons",
  "Pre-1970",
  "Under $100k",
];

export default function AdvancedSearch() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Advanced Search
          </h2>
          <p className="text-gray-600">
            Find your dream classic with our comprehensive search engine
          </p>
        </div>

        {/* Main Search Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Search Bar + Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-14 pr-6 py-5 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition whitespace-nowrap"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter</span>
            </button>

            <button className="px-12 py-5 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 transition">
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
            {quickFilters.map((item) => (
              <button
                key={item}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-900 transition font-medium text-sm"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Advanced Filters - Toggle */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isFilterOpen ? "mt-10 pt-8 border-t-2 border-gray-200" : "h-0"
            }`}
          >
            {isFilterOpen && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Make */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Make
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200">
                      <option>All Makes</option>
                      <option>Holden</option>
                      <option>Ford</option>
                    </select>
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>All Models</option>
                    </select>
                  </div>

                  {/* Year Range */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        From
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1960"
                        className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        To
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1980"
                        className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Min
                      </label>
                      <input
                        type="text"
                        placeholder="$10,000"
                        className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max
                      </label>
                      <input
                        type="text"
                        placeholder="$500,000"
                        className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* State & Auction House */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>All States</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Auction House
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>All houses</option>
                    </select>
                  </div>

                  {/* Body Style, Transmission, Additional */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Body Style
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>All Style</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Transmission
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>All Types</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-100 rounded-xl">
                      <option>Options</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6">
                  <button className="px-10 py-4 border-2 border-indigo-900 text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition">
                    Cancel
                  </button>
                  <button className="px-12 py-4 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 transition">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
