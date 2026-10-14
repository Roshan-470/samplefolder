import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Users,
  Crown,
  Sword,
  FlaskConical,
  BookOpen,
  Globe2,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Bookmark,
  X,
  Sparkles,
  Landmark,
  GraduationCap,
  Heart,
} from "lucide-react";

const peopleData = [
  {
    id: "shivaji-maharaj",
    name: "Chhatrapati Shivaji Maharaj",
    title: "Founder of the Maratha Kingdom",
    period: "1630 – 1680",
    category: "Kings & Warriors",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=85",
    description:
      "Chhatrapati Shivaji Maharaj established the Maratha kingdom and developed an effective administration, military strategy, and fort-based defence system.",
    achievements: [
      "Established the Maratha kingdom",
      "Developed innovative military strategies",
      "Built an effective administrative system",
    ],
    eventId: "shivaji-maharaj",
  },
  {
    id: "mahatma-gandhi",
    name: "Mahatma Gandhi",
    title: "Leader of India's Independence Movement",
    period: "1869 – 1948",
    category: "Leaders",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=85",
    description:
      "Mahatma Gandhi became a leading figure in India's independence movement and advocated nonviolent resistance and civil disobedience.",
    achievements: [
      "Led major nonviolent campaigns",
      "Promoted civil disobedience",
      "Influenced movements for civil rights",
    ],
    eventId: "indian-independence",
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
    period: "1879 – 1955",
    category: "Scientists",
    country: "Germany / United States",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=85",
    description:
      "Albert Einstein developed the theory of relativity and made major contributions to modern physics, changing how scientists understand space, time, and gravity.",
    achievements: [
      "Developed special relativity",
      "Formulated general relativity",
      "Received the 1921 Nobel Prize in Physics",
    ],
    eventId: "world-war-2",
  },
  {
    id: "cleopatra",
    name: "Cleopatra VII",
    title: "Queen of Ptolemaic Egypt",
    period: "69 BCE – 30 BCE",
    category: "Kings & Warriors",
    country: "Egypt",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=85",
    description:
      "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt. Her reign was shaped by diplomacy, political alliances, and conflict with Rome.",
    achievements: [
      "Ruled during a transformative period in Egyptian history",
      "Used diplomacy to maintain political influence",
      "Left a lasting legacy in historical literature and art",
    ],
    eventId: "ancient-egypt",
  },
  {
    id: "isaac-newton",
    name: "Isaac Newton",
    title: "Mathematician and Physicist",
    period: "1643 – 1727",
    category: "Scientists",
    country: "England",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85",
    description:
      "Isaac Newton formulated the laws of motion and universal gravitation and made foundational contributions to mathematics and optics.",
    achievements: [
      "Formulated three laws of motion",
      "Developed the law of universal gravitation",
      "Advanced mathematical and optical research",
    ],
    eventId: "industrial-revolution",
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    title: "Artist, Inventor and Polymath",
    period: "1452 – 1519",
    category: "Thinkers & Artists",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=85",
    description:
      "Leonardo da Vinci combined art, engineering, anatomy, and scientific observation, becoming one of the best-known figures of the Italian Renaissance.",
    achievements: [
      "Created the Mona Lisa",
      "Painted The Last Supper",
      "Produced influential engineering and anatomical studies",
    ],
    eventId: "renaissance",
  },
  {
    id: "julius-caesar",
    name: "Julius Caesar",
    title: "Roman General and Statesman",
    period: "100 BCE – 44 BCE",
    category: "Kings & Warriors",
    country: "Roman Republic",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=85",
    description:
      "Julius Caesar was a Roman general and political leader whose military campaigns and rise to power transformed the Roman Republic.",
    achievements: [
      "Led the Roman conquest of Gaul",
      "Introduced significant calendar reforms",
      "Played a major role in the transition from republic to empire",
    ],
    eventId: "roman-empire",
  },
  {
    id: "subhas-chandra-bose",
    name: "Subhas Chandra Bose",
    title: "Indian Independence Leader",
    period: "1897 – 1945",
    category: "Leaders",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=85",
    description:
      "Subhas Chandra Bose was a prominent Indian nationalist who sought to end British rule and led the Indian National Army during World War II.",
    achievements: [
      "Led the Indian National Army",
      "Organised international support for India's independence",
      "Became an influential figure in India's freedom struggle",
    ],
    eventId: "indian-independence",
  },
];

const categories = [
  "All",
  "Kings & Warriors",
  "Leaders",
  "Scientists",
  "Thinkers & Artists",
];

const categoryIcons = {
  "Kings & Warriors": Sword,
  Leaders: Crown,
  Scientists: FlaskConical,
  "Thinkers & Artists": GraduationCap,
};

const People = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("histora-people-favorites") || "[]",
      );
    } catch {
      return [];
    }
  });

  // Search and filter personalities
  const filteredPeople = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return peopleData.filter((person) => {
      const matchesCategory =
        selectedCategory === "All" || person.category === selectedCategory;

      const searchableText = [
        person.name,
        person.title,
        person.period,
        person.category,
        person.country,
        person.description,
        ...person.achievements,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  // Toggle favourite
  const toggleFavorite = (personId) => {
    setFavorites((previous) => {
      const updated = previous.includes(personId)
        ? previous.filter((id) => id !== personId)
        : [...previous, personId];

      localStorage.setItem("histora-people-favorites", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <main className="min-h-screen bg-[#101014] text-white">
      {/* ================================================ */}
      {/* HERO SECTION */}
      {/* ================================================ */}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#e8bd73]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-[#e8bd73]/5 px-4 py-2">
            <Sparkles size={16} className="text-[#e8bd73]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8bd73]">
              The People Who Shaped History
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Great Minds.
            <br />
            <span className="text-[#e8bd73]">Timeless Legacies.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">
            Discover the kings, scientists, revolutionaries, artists, and
            thinkers whose ideas and actions changed the course of human
            history.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
            <div>
              <p className="font-serif text-3xl font-bold text-[#e8bd73]">
                {peopleData.length}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Personalities
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
              <p className="font-serif text-3xl font-bold text-[#e8bd73]">∞</p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                Stories to Discover
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* SEARCH AND FILTERS */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-white/10 bg-[#17171d] p-5 sm:p-6">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#101014] px-4 py-3 transition focus-within:border-[#e8bd73]/50">
            <Search size={20} className="shrink-0 text-[#e8bd73]" />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search personalities, achievements or countries..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="text-gray-400 transition hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Filters */}
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
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
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
      {/* PEOPLE GRID */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd73]">
              <Users size={16} />
              Historical Personalities
            </div>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Explore Great Personalities
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Showing {filteredPeople.length} of {peopleData.length}{" "}
              personalities
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="self-start rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73] sm:self-auto"
          >
            Reset Filters
          </button>
        </div>

        {/* Cards */}
        {filteredPeople.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPeople.map((person) => {
              const Icon = categoryIcons[person.category] || Landmark;

              const isFavorite = favorites.includes(person.id);

              return (
                <article
                  key={person.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#17171d] transition duration-500 hover:-translate-y-2 hover:border-[#e8bd73]/40 hover:shadow-[0_15px_45px_rgba(232,189,115,0.07)]"
                >
                  {/* Profile Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17171d] via-black/10 to-black/20" />

                    {/* Category */}
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                      <Icon size={14} className="text-[#e8bd73]" />

                      <span className="text-xs font-medium text-[#f2d49b]">
                        {person.category}
                      </span>
                    </div>

                    {/* Favourite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(person.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${person.name} from favourites`
                          : `Add ${person.name} to favourites`
                      }
                      aria-pressed={isFavorite}
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition ${
                        isFavorite
                          ? "border-[#e8bd73] bg-[#e8bd73] text-[#101014]"
                          : "border-white/20 bg-black/50 text-white hover:border-[#e8bd73] hover:text-[#e8bd73]"
                      }`}
                    >
                      <Bookmark
                        size={18}
                        className={isFavorite ? "fill-current" : ""}
                      />
                    </button>

                    {/* Period */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                      <CalendarDays size={15} className="text-[#e8bd73]" />

                      {person.period}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex h-full flex-col p-5">
                    <h3 className="font-serif text-xl font-bold leading-snug text-white transition group-hover:text-[#e8bd73]">
                      {person.name}
                    </h3>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#e8bd73]">
                      {person.title}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} />

                      <span>{person.country}</span>
                    </div>

                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-400">
                      {person.description}
                    </p>

                    {/* Achievements */}
                    <div className="mt-5">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
                        <Sparkles size={14} className="text-[#e8bd73]" />
                        Key Achievements
                      </h4>

                      <ul className="space-y-2">
                        {person.achievements.slice(0, 2).map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-2 text-xs leading-5 text-gray-400"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8bd73]" />

                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs text-gray-500">
                        {person.period}
                      </span>

                      <Link
                        to={`/people/${person.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8bd73] transition hover:gap-3"
                      >
                        Biography
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                    {/* Related Event */}
                    <Link
                      to={`/events/${person.eventId}`}
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-gray-400 transition hover:border-[#e8bd73]/30 hover:bg-[#e8bd73]/5 hover:text-[#e8bd73]"
                    >
                      <BookOpen size={15} />
                      Explore Related Event
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-white/10 bg-[#17171d] px-6 py-16 text-center">
            <Users size={42} className="mx-auto mb-5 text-[#e8bd73]" />

            <h3 className="font-serif text-2xl font-bold">
              No Personalities Found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-400">
              Try another name, country, achievement, or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-[#e8bd73] px-6 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
            >
              Show All Personalities
            </button>
          </div>
        )}
      </section>

      {/* ================================================ */}
      {/* FAVOURITES */}
      {/* ================================================ */}

      {favorites.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#211e18] to-[#17171d] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8bd73]/10">
                <Heart size={24} className="text-[#e8bd73]" />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Your Favourite Personalities
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {favorites.length} saved personalities
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {peopleData
                .filter((person) => favorites.includes(person.id))
                .map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => {
                      setSearchQuery(person.name);
                      setSelectedCategory("All");

                      window.scrollTo({
                        top: 450,
                        behavior: "smooth",
                      });
                    }}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-4 transition hover:border-[#e8bd73]/40 hover:bg-white/10"
                  >
                    <img
                      src={person.image}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <span className="text-sm font-medium text-gray-200">
                      {person.name}
                    </span>

                    <Bookmark
                      size={14}
                      className="fill-[#e8bd73] text-[#e8bd73]"
                    />
                  </button>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================ */}
      {/* BOTTOM CTA */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#211e18] to-[#17171d] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#e8bd73]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e8bd73]/30 bg-[#e8bd73]/10">
              <Landmark size={28} className="text-[#e8bd73]" />
            </div>

            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Discover the Stories Behind Greatness
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Every great personality is connected to a bigger historical story.
              Explore the events and ideas that shaped their lives and changed
              our world.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8bd73] px-6 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
              >
                Explore Timeline
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

export default People;
