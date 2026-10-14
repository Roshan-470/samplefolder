import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TopicCard from "../Components/TopicCard";

import {
  Search,
  Clock3,
  Network,
  Map,
  Users,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Landmark,
  Compass,
  Sparkles,
  BookOpen,
  Globe2,
  ChevronRight,
  X,
} from "lucide-react";

import EventCard from "../Components/EventCard";
import historyData from "../data/HistoryData";

const topics = [
  {
    id: "ancient-civilizations",
    title: "Ancient Civilizations",
    description:
      "Discover the rise of ancient Egypt, Mesopotamia, Greece, and other remarkable civilizations.",
    category: "Ancient History",
    eventsCount: 24,
    icon: "civilizations",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "great-empires",
    title: "Great Empires",
    description:
      "Explore the empires that shaped politics, culture, trade, and territories across the world.",
    category: "Empires",
    eventsCount: 18,
    icon: "empires",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "world-wars",
    title: "World Wars",
    description:
      "Understand the major events, turning points, and consequences of the world wars.",
    category: "Modern History",
    eventsCount: 15,
    icon: "wars",
    image:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "scientific-discoveries",
    title: "Scientific Discoveries",
    description:
      "Discover the scientists and inventions that transformed our understanding of the world.",
    category: "Science",
    eventsCount: 20,
    icon: "science",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "indian-history",
    title: "Indian History",
    description:
      "Explore India's kingdoms, freedom movement, historical personalities, and cultural heritage.",
    category: "Indian History",
    eventsCount: 30,
    icon: "ancient",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "art-and-culture",
    title: "Art & Culture",
    description:
      "Explore the art, architecture, literature, and traditions of different historical periods.",
    category: "Culture",
    eventsCount: 16,
    icon: "art",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
  },
];
const Home = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Bookmark state
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("histora-bookmarks")) || [];
    } catch {
      return [];
    }
  });

  // Historical topics displayed in the featured section
  const featuredTopics = [
    {
      id: "ancient-egypt",
      title: "Ancient Egypt",
      period: "3100 BCE – 30 BCE",
      category: "Ancient History",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=85",
      description:
        "Explore pyramids, pharaohs, hieroglyphics, and one of the world's earliest civilizations.",
    },
    {
      id: "roman-empire",
      title: "Roman Empire",
      period: "27 BCE – 476 CE",
      category: "Ancient History",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=85",
      description:
        "Discover the empire that transformed Europe, North Africa, and the Mediterranean.",
    },
    {
      id: "french-revolution",
      title: "French Revolution",
      period: "1789 – 1799",
      category: "Revolution",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85",
      description:
        "Understand the revolution that reshaped French society and political ideas.",
    },
    {
      id: "world-war-2",
      title: "World War II",
      period: "1939 – 1945",
      category: "Modern History",
      image:
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=800&q=85",
      description:
        "Explore the events and consequences of a conflict that changed the modern world.",
    },
    {
      id: "indian-independence",
      title: "Indian Independence",
      period: "1857 – 1947",
      category: "Indian History",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85",
      description:
        "Discover India's long struggle for freedom and the people who shaped its future.",
    },
  ];

  // Features displayed in the hero section
  const features = [
    {
      title: "Timelines",
      description: "See events in order and understand the bigger picture.",
      icon: Clock3,
      path: "/timeline",
    },
    {
      title: "Connections",
      description: "Discover causes, effects, and how events are linked.",
      icon: Network,
      path: "/connections",
    },
    {
      title: "Historical Maps",
      description: "Explore where history happened around the world.",
      icon: Map,
      path: "/map",
    },
    {
      title: "People",
      description: "Learn about the key figures who shaped our world.",
      icon: Users,
      path: "/people",
    },
  ];

  // Search historical events
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return historyData.filter((event) => {
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

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  // Toggle and persist bookmarks
  const handleBookmark = (event) => {
    setBookmarks((previous) => {
      const updated = previous.includes(event.id)
        ? previous.filter((id) => id !== event.id)
        : [...previous, event.id];

      localStorage.setItem("histora-bookmarks", JSON.stringify(updated));

      return updated;
    });
  };

  // Scroll to the featured events section
  const exploreEvents = () => {
    document.getElementById("featured-events")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#101014] text-white">
      {/* ================================================== */}
      {/* HERO SECTION */}
      {/* ================================================== */}

      <section className="relative min-h-[650px] overflow-hidden lg:min-h-[690px]">
        {/* Historical Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2200&q=90"
            alt="Historic Roman architecture"
            className="h-full w-full object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#101014]/55 via-[#101014]/55 to-[#101014]" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#101014]/60 via-transparent to-[#101014]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[650px] max-w-[1400px] flex-col items-center px-5 pb-12 pt-20 text-center sm:px-8 lg:min-h-[690px] lg:pt-24">
          {/* Small Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-black/35 px-4 py-2 backdrop-blur-md">
            <Sparkles size={15} className="text-[#e8bd73]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2d49b] sm:text-sm">
              Every event tells a story
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-5xl font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Explore <span className="text-[#e8bd73]">History</span>
            <br />
            Like Never Before
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg">
            Understand the past through time, people, places, and connections.
            Discover the stories that shaped our world.
          </p>

          {/* Search Bar */}
          <div className="relative mt-9 w-full max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (searchQuery.trim()) {
                  document
                    .getElementById("search-results")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  exploreEvents();
                }
              }}
              className="flex items-center gap-3 rounded-full border border-white/50 bg-white px-5 py-3 shadow-2xl transition focus-within:border-[#e8bd73] sm:px-6 sm:py-4"
            >
              <Search size={23} className="shrink-0 text-gray-600" />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, people, places or eras..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                >
                  <X size={18} />
                </button>
              )}
            </form>

            {/* Live Search Results */}
            {searchQuery.trim() && (
              <div
                id="search-results"
                className="absolute left-0 right-0 top-full z-30 mt-3 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-[#17171d] p-3 text-left shadow-2xl"
              >
                <div className="mb-2 flex items-center justify-between px-2 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#e8bd73]">
                    Search Results
                  </span>

                  <span className="text-xs text-gray-500">
                    {filteredEvents.length} found
                  </span>
                </div>

                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e8bd73]/10">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Landmark size={20} className="text-[#e8bd73]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-white">
                          {event.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          {event.date} · {event.category}
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className="shrink-0 text-[#e8bd73]"
                      />
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center">
                    <Search size={30} className="mx-auto mb-3 text-gray-500" />

                    <p className="text-sm text-gray-300">
                      No matching events found.
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Try searching for Rome, India, revolution, or war.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hero Feature Cards */}
          <div className="mt-14 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  to={feature.path}
                  className="group flex flex-col items-center rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/40 hover:bg-black/45 sm:p-5"
                >
                  <Icon
                    size={34}
                    strokeWidth={1.6}
                    className="mb-3 text-[#f2d49b] transition duration-300 group-hover:scale-110 group-hover:text-[#e8bd73]"
                  />

                  <h3 className="font-serif text-lg font-bold text-white sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-[200px] text-center text-xs leading-5 text-gray-300 sm:text-sm">
                    {feature.description}
                  </p>

                  <ArrowUpRight
                    size={16}
                    className="mt-3 text-[#e8bd73] opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURED TOPICS */}
      {/* ================================================== */}

      <section className="relative z-10 mx-auto -mt-1 max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl border border-gray-200/10 bg-[#f5f1e9] p-5 text-[#191919] shadow-2xl sm:p-8">
          {/* Section Header */}
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8d6d37]">
                <Compass size={15} />
                Start exploring
              </div>

              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                Featured Topics
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Explore important eras and civilizations.
              </p>
            </div>

            <Link
              to="/explore"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#70552b] transition hover:text-black"
            >
              <span className="hidden sm:inline">View All</span>

              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Topic Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.id}
                to={`/events/${topic.id}`}
                className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Topic Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {topic.category}
                  </span>
                </div>

                {/* Topic Details */}
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold leading-snug transition-colors group-hover:text-[#8d6d37]">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-gray-500">
                    {topic.period}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-500">Discover more</span>

                    <ArrowUpRight
                      size={16}
                      className="text-[#8d6d37] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURED HISTORICAL EVENTS */}
      {/* ================================================== */}

      <section
        id="featured-events"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8bd73]">
              <BookOpen size={16} />
              Stories that shaped the world
            </div>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Historical Events
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              From ancient civilizations to modern revolutions, explore the
              events that changed the course of history.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[#e8bd73]/40 px-5 py-3 text-sm font-semibold text-[#e8bd73] transition hover:bg-[#e8bd73] hover:text-[#101014] sm:self-auto"
          >
            Explore All Events
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {historyData.slice(0, 6).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={bookmarks.includes(event.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        {/* Empty State */}
        {historyData.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <Landmark size={40} className="mx-auto mb-4 text-[#e8bd73]" />

            <h3 className="text-xl font-semibold text-white">
              History is waiting to be discovered
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Add historical events to your historyData.js file.
            </p>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* BOOKMARKS SECTION */}
      {/* ================================================== */}

      {bookmarks.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#1c1a17] to-[#15151b] p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8bd73]/10">
                <Bookmark size={24} className="text-[#e8bd73]" />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Your Bookmarks
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Your saved historical discoveries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {historyData
                .filter((event) => bookmarks.includes(event.id))
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isBookmarked={true}
                    onBookmark={handleBookmark}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================== */}
      {/* CALL TO ACTION */}
      {/* ================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#252018] via-[#19191e] to-[#121217] px-6 py-14 text-center sm:px-12 sm:py-20">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#e8bd73]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e8bd73]/30 bg-[#e8bd73]/10">
              <Globe2 size={32} className="text-[#e8bd73]" />
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#e8bd73]">
              The past connects us
            </p>

            <h2 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Every Moment in History
              <br />
              Has a Story to Tell.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Follow timelines, discover remarkable people, and uncover the
              connections between events that shaped our world.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={exploreEvents}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8bd73] px-7 py-3.5 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
              >
                Start Exploring
                <ArrowRight size={18} />
              </button>

              <Link
                to="/timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
              >
                View Timeline
                <Clock3 size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
