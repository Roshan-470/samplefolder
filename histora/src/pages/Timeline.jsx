import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Clock3,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Landmark,
  X,
  History,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import historyData from "../data/HistoryData";

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("oldest");

  // Historical categories
  const categories = [
    "All",
    ...new Set(historyData.map((event) => event.category).filter(Boolean)),
  ];

  // Convert historical dates into sortable values.
  // BCE dates are represented as negative numbers.
  const getYearValue = (date) => {
    if (!date) return 0;

    const text = String(date).toUpperCase();

    const match = text.match(/(\d[\d,]*)\s*(BCE|BC|CE|AD)?/);

    if (!match) return 0;

    const year = Number(match[1].replace(/,/g, ""));
    const era = match[2];

    return era === "BCE" || era === "BC" ? -year : year;
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = historyData.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const searchableText = [
        event.title,
        event.date,
        event.category,
        event.location,
        event.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      const yearA = getYearValue(a.date);
      const yearB = getYearValue(b.date);

      return sortOrder === "oldest" ? yearA - yearB : yearB - yearA;
    });
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <main className="min-h-screen bg-[#101014] text-white">
      {/* ================================================ */}
      {/* HERO SECTION */}
      {/* ================================================ */}

      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#e8bd73]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-[#e8bd73]/5 px-4 py-2">
            <History size={16} className="text-[#e8bd73]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8bd73]">
              Journey Through Time
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            History Through
            <br />
            <span className="text-[#e8bd73]">The Ages</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">
            Travel across centuries and discover the events, civilizations, and
            people that shaped our world. Every moment has a story worth
            exploring.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
            <div>
              <p className="font-serif text-3xl font-bold text-[#e8bd73]">
                {historyData.length}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Historical Events
              </p>
            </div>

            <div>
              <p className="font-serif text-3xl font-bold text-[#e8bd73]">
                {categories.length - 1}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Categories
              </p>
            </div>

            <div>
              <p className="font-serif text-3xl font-bold text-[#e8bd73]">
                5000+
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Years of History
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* FILTERS AND SEARCH */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-white/10 bg-[#17171d] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#101014] px-4 py-3 transition focus-within:border-[#e8bd73]/50 lg:max-w-md">
              <Search size={20} className="shrink-0 text-[#e8bd73]" />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search historical events..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="text-gray-400 transition hover:text-white"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  aria-label="Sort timeline"
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#101014] py-3 pl-4 pr-10 text-sm text-gray-300 outline-none transition focus:border-[#e8bd73]/50 sm:w-auto"
                >
                  <option value="oldest">Oldest First</option>

                  <option value="newest">Newest First</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortOrder("oldest");
                }}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Explore by category
            </p>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-300 sm:text-sm ${
                    selectedCategory === category
                      ? "border-[#e8bd73] bg-[#e8bd73] text-[#101014]"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* TIMELINE */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-10">
        {/* Timeline Heading */}
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd73]">
              <Sparkles size={15} />
              The historical journey
            </div>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Explore the Timeline
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Showing {filteredEvents.length} of {historyData.length} events
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            {sortOrder === "oldest" ? (
              <ArrowDown size={17} className="text-[#e8bd73]" />
            ) : (
              <ArrowUp size={17} className="text-[#e8bd73]" />
            )}

            {sortOrder === "oldest"
              ? "Chronological order"
              : "Reverse chronological order"}
          </div>
        </div>

        {/* Timeline Items */}
        {filteredEvents.length > 0 ? (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-[#e8bd73]/70 via-[#e8bd73]/25 to-transparent md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10 md:space-y-14">
              {filteredEvents.map((event, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <article key={event.id} className="relative pl-10 md:pl-0">
                    {/* Timeline Dot */}
                    <div className="absolute left-[4px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#e8bd73] bg-[#101014] shadow-[0_0_15px_rgba(232,189,115,0.25)] md:left-1/2 md:-translate-x-1/2" />

                    {/* Event Card Position */}
                    <div
                      className={`md:grid md:grid-cols-2 md:gap-14 ${
                        isLeft ? "" : ""
                      }`}
                    >
                      {/* Date Marker */}
                      <div
                        className={`mb-4 md:mb-0 md:flex md:items-start ${
                          isLeft
                            ? "md:justify-end md:pr-10 md:text-right"
                            : "md:col-start-2 md:row-start-1 md:justify-start md:pl-10 md:text-left"
                        }`}
                      >
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/20 bg-[#e8bd73]/5 px-4 py-2 ${
                            isLeft ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <CalendarDays size={15} className="text-[#e8bd73]" />

                          <span className="text-sm font-semibold text-[#f2d49b]">
                            {event.date || "Date unknown"}
                          </span>
                        </div>
                      </div>

                      {/* Event Card */}
                      <div
                        className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#17171d] transition duration-500 hover:-translate-y-1 hover:border-[#e8bd73]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] ${
                          isLeft
                            ? "md:col-start-1 md:row-start-1 md:mr-10"
                            : "md:col-start-2 md:row-start-1 md:ml-10"
                        }`}
                      >
                        {/* Event Image */}
                        {event.image ? (
                          <div className="relative h-52 overflow-hidden">
                            <img
                              src={event.image}
                              alt={event.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#17171d] via-transparent to-transparent" />

                            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-[#f2d49b] backdrop-blur-md">
                              {event.category || "History"}
                            </span>
                          </div>
                        ) : (
                          <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-[#29251e] to-[#101014]">
                            <Landmark size={40} className="text-[#e8bd73]/60" />
                          </div>
                        )}

                        {/* Event Content */}
                        <div className="p-5 sm:p-6">
                          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                            <MapPin size={14} className="text-[#e8bd73]" />

                            <span>{event.location || "Location unknown"}</span>
                          </div>

                          <h3 className="font-serif text-xl font-bold leading-snug transition group-hover:text-[#e8bd73] sm:text-2xl">
                            {event.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-400">
                            {event.description ||
                              "Discover the story behind this historical event."}
                          </p>

                          {/* Read More */}
                          <div className="mt-5 border-t border-white/10 pt-4">
                            <Link
                              to={`/events/${event.id}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8bd73] transition hover:gap-3"
                            >
                              Explore Event
                              <ArrowUpRight size={17} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-white/10 bg-[#17171d] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8bd73]/10">
              <Search size={30} className="text-[#e8bd73]" />
            </div>

            <h3 className="font-serif text-2xl font-bold">
              No Historical Events Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-400">
              We couldn't find any events matching your search. Try a different
              keyword or select another category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-[#e8bd73] px-6 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
            >
              Show All Events
            </button>
          </div>
        )}
      </section>

      {/* ================================================ */}
      {/* BOTTOM CTA */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#211e18] to-[#17171d] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#e8bd73]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e8bd73]/30 bg-[#e8bd73]/10">
              <Clock3 size={28} className="text-[#e8bd73]" />
            </div>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              History Never Stops
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Every event connects to another story. Continue exploring the
              people, places, and ideas that shaped our world.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8bd73] px-6 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
              >
                Explore History
                <ArrowUpRight size={17} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Timeline;
