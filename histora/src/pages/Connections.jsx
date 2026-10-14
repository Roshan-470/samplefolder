import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Network,
  Users,
  Landmark,
  Swords,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  GitBranch,
  X,
  Clock3,
  Globe2,
  Link2,
  Lightbulb,
} from "lucide-react";

const connectionsData = [
  {
    id: 1,
    title: "Chhatrapati Shivaji Maharaj & Shahaji Raje",
    subtitle: "Family · Maratha History",
    category: "Family",
    period: "17th Century",
    location: "Maharashtra, India",
    description:
      "Explore the relationship between Shivaji Maharaj and his father Shahaji Raje, including the political environment, military traditions, and Deccan powers that shaped Shivaji's early life.",
    people: [
      {
        name: "Shahaji Raje",
        role: "Father",
        id: null,
      },
      {
        name: "Shivaji Maharaj",
        role: "Son",
        id: "shivaji-maharaj",
      },
    ],
    eventId: "shivaji-maharaj",
    icon: Users,
    tags: ["Family", "Maratha Empire", "Leadership"],
  },
  {
    id: 2,
    title: "Mahatma Gandhi & India's Independence",
    subtitle: "Leadership · Freedom Movement",
    category: "Political",
    period: "1915–1947",
    location: "India",
    description:
      "Discover how Gandhi's philosophy of nonviolent resistance influenced major campaigns against British colonial rule and helped mobilize people across India.",
    people: [
      {
        name: "Mahatma Gandhi",
        role: "Nationalist leader",
        id: "mahatma-gandhi",
      },
      {
        name: "Indian Independence",
        role: "Historical movement",
        id: null,
      },
    ],
    eventId: "indian-independence",
    icon: Landmark,
    tags: ["Independence", "Nonviolence", "Politics"],
  },
  {
    id: 3,
    title: "Julius Caesar & The Roman Empire",
    subtitle: "Politics · Military History",
    category: "Political",
    period: "1st Century BCE",
    location: "Rome, Europe",
    description:
      "Trace how Caesar's military campaigns, political rise, and assassination contributed to the transformation of the Roman Republic and the later emergence of imperial rule.",
    people: [
      {
        name: "Julius Caesar",
        role: "Roman general",
        id: "julius-caesar",
      },
      {
        name: "Roman Empire",
        role: "Historical state",
        id: null,
      },
    ],
    eventId: "roman-empire",
    icon: Landmark,
    tags: ["Rome", "Military", "Political Change"],
  },
  {
    id: 4,
    title: "Albert Einstein & World War II",
    subtitle: "Science · Modern History",
    category: "Scientific",
    period: "1939–1945",
    location: "Europe and the United States",
    description:
      "Understand the historical context connecting Einstein's scientific reputation, his concerns about Nazi Germany, and the scientific and political developments of the Second World War.",
    people: [
      {
        name: "Albert Einstein",
        role: "Theoretical physicist",
        id: "albert-einstein",
      },
      {
        name: "World War II",
        role: "Global conflict",
        id: null,
      },
    ],
    eventId: "world-war-2",
    icon: BookOpen,
    tags: ["Science", "World War II", "Technology"],
  },
  {
    id: 5,
    title: "Cleopatra & Julius Caesar",
    subtitle: "Diplomacy · Ancient Egypt and Rome",
    category: "Political",
    period: "48–44 BCE",
    location: "Egypt and Rome",
    description:
      "Explore the political alliance between Cleopatra VII and Julius Caesar, and how their relationship unfolded during a period of major political change in the Mediterranean.",
    people: [
      {
        name: "Cleopatra VII",
        role: "Ruler of Egypt",
        id: "cleopatra",
      },
      {
        name: "Julius Caesar",
        role: "Roman leader",
        id: "julius-caesar",
      },
    ],
    eventId: "ancient-egypt",
    icon: Users,
    tags: ["Diplomacy", "Egypt", "Rome"],
  },
  {
    id: 6,
    title: "Leonardo da Vinci & The Renaissance",
    subtitle: "Art · Science · Innovation",
    category: "Cultural",
    period: "15th–16th Century",
    location: "Italy, Europe",
    description:
      "Learn how Leonardo's artistic achievements, scientific investigations, and engineering ideas reflected the Renaissance emphasis on observation, creativity, and learning.",
    people: [
      {
        name: "Leonardo da Vinci",
        role: "Artist and inventor",
        id: "leonardo-da-vinci",
      },
      {
        name: "The Renaissance",
        role: "Cultural movement",
        id: null,
      },
    ],
    eventId: "ancient-egypt",
    icon: Lightbulb,
    tags: ["Art", "Science", "Renaissance"],
  },
  {
    id: 7,
    title: "Subhas Chandra Bose & India's Freedom Struggle",
    subtitle: "Leadership · Military History",
    category: "Military",
    period: "1930s–1945",
    location: "India and Southeast Asia",
    description:
      "Explore Bose's approach to independence, his leadership of the Indian National Army, and the different strategies adopted by Indian nationalists during the Second World War.",
    people: [
      {
        name: "Subhas Chandra Bose",
        role: "Independence leader",
        id: "subhas-chandra-bose",
      },
      {
        name: "Indian Independence",
        role: "Historical movement",
        id: null,
      },
    ],
    eventId: "indian-independence",
    icon: Swords,
    tags: ["Independence", "Military", "Nationalism"],
  },
  {
    id: 8,
    title: "Isaac Newton & The Scientific Revolution",
    subtitle: "Science · Intellectual History",
    category: "Scientific",
    period: "17th Century",
    location: "England, Europe",
    description:
      "Discover how Newton's work on motion, gravity, and optics contributed to the Scientific Revolution and changed humanity's understanding of the natural world.",
    people: [
      {
        name: "Isaac Newton",
        role: "Physicist and mathematician",
        id: "isaac-newton",
      },
      {
        name: "Scientific Revolution",
        role: "Intellectual movement",
        id: null,
      },
    ],
    eventId: "roman-empire",
    icon: BookOpen,
    tags: ["Physics", "Mathematics", "Science"],
  },
];

const categories = [
  "All",
  "Family",
  "Political",
  "Military",
  "Scientific",
  "Cultural",
];

export default function Connections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedConnection, setSelectedConnection] = useState(null);

  const filteredConnections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return connectionsData.filter((connection) => {
      const matchesCategory =
        activeCategory === "All" || connection.category === activeCategory;

      const searchableText = [
        connection.title,
        connection.subtitle,
        connection.description,
        connection.period,
        connection.location,
        ...connection.tags,
        ...connection.people.map((person) => person.name),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#101014] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,189,115,0.13),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-[#e8bd73]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd73]">
                <Network size={15} />
                The Historical Network
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                History is a web of{" "}
                <span className="text-[#e8bd73]">connections.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Every historical figure, event, and movement is connected.
                Explore the relationships that shaped civilizations and discover
                how one moment in history influenced another.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#explore-connections"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#e8bd73] px-6 py-3.5 font-semibold text-black transition hover:bg-[#f2d49d]"
                >
                  Explore Connections
                  <ArrowRight size={18} />
                </a>

                <Link
                  to="/people"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
                >
                  Discover People
                  <Users size={18} />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-7">
                <Stat value={connectionsData.length} label="Connections" />
                <Stat value={categories.length - 1} label="Categories" />
                <Stat value="Global" label="Historical Scope" />
              </div>
            </div>

            {/* Decorative network graphic */}
            <div className="relative mx-auto flex aspect-square w-full max-w-[470px] items-center justify-center">
              <div className="absolute h-[82%] w-[82%] rounded-full border border-[#e8bd73]/10" />
              <div className="absolute h-[62%] w-[62%] rounded-full border border-[#e8bd73]/20" />
              <div className="absolute h-[42%] w-[42%] rounded-full border border-[#e8bd73]/25" />

              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <g
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1.2"
                  fill="none"
                >
                  <line x1="200" y1="200" x2="200" y2="55" />
                  <line x1="200" y1="200" x2="326" y2="120" />
                  <line x1="200" y1="200" x2="340" y2="275" />
                  <line x1="200" y1="200" x2="200" y2="350" />
                  <line x1="200" y1="200" x2="65" y2="280" />
                  <line x1="200" y1="200" x2="70" y2="115" />
                  <line x1="200" y1="55" x2="326" y2="120" />
                  <line x1="326" y1="120" x2="340" y2="275" />
                  <line x1="340" y1="275" x2="200" y2="350" />
                  <line x1="200" y1="350" x2="65" y2="280" />
                  <line x1="65" y1="280" x2="70" y2="115" />
                  <line x1="70" y1="115" x2="200" y2="55" />
                </g>
              </svg>

              <Network size={72} strokeWidth={1.2} className="text-[#e8bd73]" />

              <NetworkNode className="left-[42%] top-[4%]" label="Events" />
              <NetworkNode className="right-[4%] top-[25%]" label="People" />
              <NetworkNode className="bottom-[25%] right-[1%]" label="Ideas" />
              <NetworkNode className="bottom-[2%] left-[42%]" label="Empires" />
              <NetworkNode className="bottom-[24%] left-[1%]" label="Culture" />
              <NetworkNode className="left-[3%] top-[24%]" label="Science" />

              <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8bd73]/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro cards */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
            Think Beyond Dates
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Discover how history connects.
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            History becomes easier to understand when we connect people,
            political movements, scientific discoveries, and major events.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ConceptCard
            icon={Users}
            title="People & Relationships"
            description="Explore family ties, alliances, rivalries, and the relationships between influential historical figures."
          />

          <ConceptCard
            icon={Globe2}
            title="Events & Civilizations"
            description="Understand how wars, revolutions, empires, and political changes influenced one another."
          />

          <ConceptCard
            icon={Lightbulb}
            title="Ideas & Discoveries"
            description="Trace the development of scientific ideas, cultural movements, and innovations through time."
          />
        </div>
      </section>

      {/* Search and connections */}
      <section
        id="explore-connections"
        className="border-t border-white/10 bg-[#141418]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              Explore the Network
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Historical Connections
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Search for a person, event, location, or historical concept.
              Select a connection to explore its details.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search people, events, ideas, or places..."
                className="w-full rounded-xl border border-white/10 bg-[#1b1b21] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#e8bd73]/50"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Network size={18} className="text-[#e8bd73]" />
              {filteredConnections.length} results
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "border-[#e8bd73] bg-[#e8bd73] text-black"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-[#e8bd73]/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filteredConnections.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredConnections.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                  onOpen={() => setSelectedConnection(connection)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#19191f] px-6 py-16 text-center">
              <Search size={36} className="mx-auto mb-5 text-gray-500" />

              <h3 className="text-xl font-semibold">No connections found</h3>

              <p className="mt-3 text-sm text-gray-400">
                Try a different search term or choose another category.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e8bd73] px-5 py-3 font-semibold text-black transition hover:bg-[#f2d49d]"
              >
                Clear Filters
                <X size={17} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              How to Explore
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              One connection can reveal a bigger story.
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Start with a personality or event and follow the relationships
              around it. Each connection provides another way to understand the
              forces that shaped the past.
            </p>

            <Link
              to="/timeline"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-[#e8bd73] transition hover:text-[#f5d69d]"
            >
              Explore the Timeline
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-4">
            <StepCard
              number="01"
              title="Choose a connection"
              description="Select a historical relationship that interests you."
            />

            <StepCard
              number="02"
              title="Understand the context"
              description="Explore the people, period, and circumstances behind it."
            />

            <StepCard
              number="03"
              title="Follow the history"
              description="Continue to related biographies and historical events."
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedConnection && (
        <ConnectionModal
          connection={selectedConnection}
          onClose={() => setSelectedConnection(null)}
        />
      )}

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#17171c]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              Your Journey Continues
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Every connection tells a story.
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Explore the people and events behind the world's history.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/people"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
            >
              <Users size={18} />
              People
            </Link>

            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e8bd73] px-5 py-3 font-semibold text-black transition hover:bg-[#f2d49d]"
            >
              Timeline
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------ Reusable Components ------------------ */

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-[#e8bd73]">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function NetworkNode({ className, label }) {
  return (
    <div
      className={`absolute flex h-[76px] w-[76px] flex-col items-center justify-center rounded-2xl border border-[#e8bd73]/30 bg-[#17171c]/95 shadow-xl shadow-black/20 sm:h-[88px] sm:w-[88px] ${className}`}
    >
      <Network size={20} className="mb-1.5 text-[#e8bd73]" />
      <span className="text-xs font-semibold text-gray-200">{label}</span>
    </div>
  );
}

function ConceptCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#17171c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/40">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-[#e8bd73]">
        <Icon size={23} />
      </div>

      <h3 className="mb-3 text-lg font-semibold">{title}</h3>

      <p className="text-sm leading-7 text-gray-400">{description}</p>
    </div>
  );
}

function ConnectionCard({ connection, onOpen }) {
  const Icon = connection.icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#19191f] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/40 hover:bg-[#1d1c20]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-[#e8bd73]">
          <Icon size={23} />
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400">
          {connection.category}
        </span>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#e8bd73]">
        {connection.subtitle}
      </p>

      <h3 className="text-xl font-bold leading-snug transition group-hover:text-[#e8bd73]">
        {connection.title}
      </h3>

      <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
        {connection.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {connection.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock3 size={14} />
          {connection.period}
        </div>

        <button
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e8bd73] transition hover:text-[#f5d69d]"
        >
          Explore
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-[#17171c] p-5 sm:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-sm font-bold text-[#e8bd73]">
        {number}
      </div>

      <div>
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-sm leading-7 text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function ConnectionModal({ connection, onClose }) {
  const Icon = connection.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connection-modal-title"
        className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#19191f] shadow-2xl shadow-black/40"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 sm:p-8">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-[#e8bd73]">
              <Icon size={24} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd73]">
              {connection.category} Connection
            </p>

            <h2
              id="connection-modal-title"
              className="text-2xl font-bold leading-snug sm:text-3xl"
            >
              {connection.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close connection details"
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-[#e8bd73]/40 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <p className="text-sm leading-8 text-gray-300 sm:text-base">
            {connection.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#e8bd73]">
                <Clock3 size={17} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Historical Period
                </span>
              </div>

              <p className="text-sm text-gray-200">{connection.period}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#e8bd73]">
                <Globe2 size={17} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Location
                </span>
              </div>

              <p className="text-sm text-gray-200">{connection.location}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <GitBranch size={18} className="text-[#e8bd73]" />
              Connected Figures & Topics
            </h3>

            <div className="space-y-3">
              {connection.people.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8bd73]/10 text-[#e8bd73]">
                      <Users size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{person.name}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  {person.id ? (
                    <Link
                      to={`/people/${person.id}`}
                      onClick={onClose}
                      aria-label={`View ${person.name} biography`}
                      className="shrink-0 rounded-lg p-2 text-[#e8bd73] transition hover:bg-[#e8bd73]/10"
                    >
                      <ArrowUpRight size={19} />
                    </Link>
                  ) : (
                    <span className="shrink-0 text-xs text-gray-500">
                      Topic
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {connection.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <Link
              to={`/events/${connection.eventId}`}
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e8bd73] px-5 py-3 font-semibold text-black transition hover:bg-[#f2d49d]"
            >
              Explore Related Event
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
