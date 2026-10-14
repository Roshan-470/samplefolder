import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Clock3,
  Network,
  Map,
  Users,
  Sparkles,
  ArrowUpRight,
  X,
} from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Feature cards
  const features = [
    {
      title: "Timelines",
      description: "Explore history through time.",
      icon: Clock3,
      path: "/timeline",
    },
    {
      title: "Connections",
      description: "Discover links between events.",
      icon: Network,
      path: "/connections",
    },
    {
      title: "Historical Maps",
      description: "Explore historical places.",
      icon: Map,
      path: "/map",
    },
    {
      title: "People",
      description: "Meet the people who shaped history.",
      icon: Users,
      path: "/people",
    },
  ];

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#101014] text-white lg:min-h-[720px]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2200&q=90"
          alt="Historic Roman architecture"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#101014]/65 via-[#101014]/60 to-[#101014]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101014]/60 via-transparent to-[#101014]/40" />

      {/* Main Content */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-16 pt-24 text-center sm:px-8 sm:pt-28 lg:px-10 lg:pt-32">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/40 bg-black/30 px-4 py-2 backdrop-blur-md">
          <Sparkles size={16} className="text-[#e8bd73]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2d49b] sm:text-sm">
            Every event tells a story
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Explore <span className="text-[#e8bd73]">History</span>
          <br />
          Like Never Before
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg">
          Discover the stories, people, and civilizations that shaped our world.
          Travel through time and experience history from a new perspective.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-9 flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/40 bg-white p-2 pl-5 shadow-2xl transition focus-within:border-[#e8bd73] sm:pl-6"
        >
          <Search size={22} className="shrink-0 text-gray-500" />

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, people, places or eras..."
            aria-label="Search historical events"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-[#e8bd73] px-5 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b] sm:px-7"
          >
            Search
          </button>
        </form>

        {/* Feature Cards */}
        <div className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.path}
                className="group flex flex-col items-center rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#e8bd73]/50 hover:bg-black/50"
              >
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 transition duration-300 group-hover:border-[#e8bd73]/50 group-hover:bg-[#e8bd73]/20">
                  <Icon
                    size={30}
                    strokeWidth={1.7}
                    className="text-[#e8bd73] transition group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h2 className="font-serif text-lg font-bold text-white sm:text-xl">
                  {feature.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-center text-xs leading-5 text-gray-300 sm:text-sm">
                  {feature.description}
                </p>

                {/* Arrow */}
                <ArrowUpRight
                  size={17}
                  className="mt-3 text-[#e8bd73] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
