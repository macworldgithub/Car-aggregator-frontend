"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Filter, Search } from "lucide-react";

const quickFilters = [
  "No Reserve",
  "Holden Muscle Cars",
  "Ford GT Falcons",
  "Pre-1970",
  "Under $100k",
];

export default function AdvancedSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    title: searchParams.get("title") || "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    year_min: searchParams.get("year_min") || "",
    year_max: searchParams.get("year_max") || "",
    price_min: searchParams.get("price_min") || "",
    price_max: searchParams.get("price_max") || "",
    state: searchParams.get("state") || "",
    auction_house: searchParams.get("auction_house") || "",
    no_reserve: searchParams.get("no_reserve") === "true",
    body_style: searchParams.get("body_style") || "",
    transmission: searchParams.get("transmission") || "",
    newly_added: searchParams.get("newly_added") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, no_reserve: e.target.checked }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.title.trim()) params.set("title", filters.title.trim());
    if (filters.make.trim()) params.set("make", filters.make.trim());
    if (filters.model.trim()) params.set("model", filters.model.trim());
    if (filters.year_min.trim()) params.set("year_min", filters.year_min.trim());
    if (filters.year_max.trim()) params.set("year_max", filters.year_max.trim());
    if (filters.price_min.trim()) params.set("price_min", filters.price_min.trim());
    if (filters.price_max.trim()) params.set("price_max", filters.price_max.trim());
    if (filters.state.trim()) params.set("state", filters.state.trim());
    if (filters.auction_house.trim()) params.set("auction_house", filters.auction_house.trim());
    if (filters.body_style.trim()) params.set("body_style", filters.body_style.trim());
    if (filters.transmission.trim()) params.set("transmission", filters.transmission.trim());
    if (filters.newly_added.trim()) params.set("newly_added", filters.newly_added.trim());

    // no_reserve only if checked
    if (filters.no_reserve) {
      params.set("no_reserve", "true");
    }

    // Default sort if none set
    if (!params.has("sort")) params.set("sort", "auction_date desc");

    // Pagination defaults (page 1, limit 20)
    if (!params.has("page")) params.set("page", "1");
    if (!params.has("limit")) params.set("limit", "20");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      make: "",
      model: "",
      year_min: "",
      year_max: "",
      price_min: "",
      price_max: "",
      state: "",
      auction_house: "",
      no_reserve: false,
      body_style: "",
      transmission: "",
      newly_added: "",
    });
    router.push(pathname, { scroll: false });
    setIsFilterOpen(false);
  };

  const handleQuickFilter = (filter: string) => {
    let updated = { ...filters };

    if (filter === "No Reserve") updated.no_reserve = true;
    if (filter === "Pre-1970") updated.year_max = "1969";
    if (filter === "Under $100k") updated.price_max = "100000";

    setFilters(updated);

    setTimeout(() => {
      const params = new URLSearchParams();

      if (updated.title.trim()) params.set("title", updated.title.trim());
      if (updated.make.trim()) params.set("make", updated.make.trim());
      if (updated.model.trim()) params.set("model", updated.model.trim());
      if (updated.year_min.trim()) params.set("year_min", updated.year_min.trim());
      if (updated.year_max.trim()) params.set("year_max", updated.year_max.trim());
      if (updated.price_min.trim()) params.set("price_min", updated.price_min.trim());
      if (updated.price_max.trim()) params.set("price_max", updated.price_max.trim());
      if (updated.state.trim()) params.set("state", updated.state.trim());
      if (updated.auction_house.trim()) params.set("auction_house", updated.auction_house.trim());
      if (updated.body_style.trim()) params.set("body_style", updated.body_style.trim());
      if (updated.transmission.trim()) params.set("transmission", updated.transmission.trim());
      if (updated.newly_added.trim()) params.set("newly_added", updated.newly_added.trim());

      if (updated.no_reserve) params.set("no_reserve", "true");

      if (!params.has("sort")) params.set("sort", "auction_date desc");
      if (!params.has("page")) params.set("page", "1");
      if (!params.has("limit")) params.set("limit", "20");

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 100);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Advanced Search</h2>
          <p className="text-gray-600">Find your dream classic with our comprehensive search engine</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Title Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="title"
                value={filters.title}
                onChange={handleChange}
                placeholder="Search by keyword or title..."
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

            <button
              onClick={applyFilters}
              className="px-12 py-5 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 transition"
            >
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {quickFilters.map((item) => (
              <button
                key={item}
                onClick={() => handleQuickFilter(item)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-900 transition font-medium text-sm"
              >
                {item}
              </button>
            ))}
          </div>

          {isFilterOpen && (
            <div className="mt-10 pt-8 border-t-2 border-gray-200 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Make
                  </label>
                  <input
                    name="make"
                    value={filters.make}
                    onChange={handleChange}
                    placeholder="e.g. Holden"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Model
                  </label>
                  <input
                    name="model"
                    value={filters.model}
                    onChange={handleChange}
                    placeholder="e.g. Falcon, Torana"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year From
                    </label>
                    <input
                      name="year_min"
                      type="number"
                      value={filters.year_min}
                      onChange={handleChange}
                      placeholder="e.g. 1960"
                      className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year To
                    </label>
                    <input
                      name="year_max"
                      type="number"
                      value={filters.year_max}
                      onChange={handleChange}
                      placeholder="e.g. 1980"
                      className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Min
                    </label>
                    <input
                      name="price_min"
                      type="number"
                      value={filters.price_min}
                      onChange={handleChange}
                      placeholder="e.g. 10000"
                      className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Max
                    </label>
                    <input
                      name="price_max"
                      type="number"
                      value={filters.price_max}
                      onChange={handleChange}
                      placeholder="e.g. 500000"
                      className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    name="state"
                    value={filters.state}
                    onChange={handleChange}
                    placeholder="e.g. NSW, VIC"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Auction House
                  </label>
                  <input
                    name="auction_house"
                    value={filters.auction_house}
                    onChange={handleChange}
                    placeholder="e.g. Shannons, Grays"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Body Style
                  </label>
                  <input
                    name="body_style"
                    value={filters.body_style}
                    onChange={handleChange}
                    placeholder="e.g. Sedan, Coupe"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transmission
                  </label>
                  <input
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleChange}
                    placeholder="e.g. Manual, Automatic"
                    className="w-full px-5 py-4 bg-gray-100 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <input
                    type="checkbox"
                    id="no_reserve"
                    checked={filters.no_reserve}
                    onChange={handleCheckbox}
                    className="h-6 w-6 text-indigo-900 rounded"
                  />
                  <label
                    htmlFor="no_reserve"
                    className="text-base font-medium text-gray-800"
                  >
                    Only No Reserve Auctions
                  </label>
                </div>
              </div>

              <div className="flex justify-center gap-8 pt-8">
                <button
                  onClick={resetFilters}
                  className="px-12 py-4 border-2 border-indigo-900 text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition"
                >
                  Reset & Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="px-12 py-4 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
