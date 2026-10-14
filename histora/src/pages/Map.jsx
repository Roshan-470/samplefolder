import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "../styles/Map.css";

import {
  Search,
  MapPin,
  Globe2,
  Landmark,
  Clock3,
  ArrowUpRight,
  ArrowRight,
  X,
  SlidersHorizontal,
  Compass,
  Sparkles,
  Navigation,
  RotateCcw,
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

/* --------------------------------------------------
   HISTORICAL LOCATIONS
-------------------------------------------------- */

const historicalLocations = [
  {
    id: "ancient-egypt",
    title: "Ancient Egyptian Civilization",
    category: "Ancient History",
    period: "3100 BCE – 30 BCE",
    location: "Giza, Egypt",
    coordinates: [29.9792, 31.1342],
    description:
      "Explore the civilization of ancient Egypt, known for its pyramids, monumental architecture, hieroglyphic writing, and powerful pharaohs.",
    eventId: "ancient-egypt",
    tags: ["Egypt", "Pyramids", "Ancient Civilization"],
  },
  {
    id: "roman-empire",
    title: "The Roman Empire",
    category: "Ancient History",
    period: "27 BCE – 476 CE",
    location: "Rome, Italy",
    coordinates: [41.9028, 12.4964],
    description:
      "Discover the Roman world through its political institutions, military expansion, engineering, architecture, and cultural influence.",
    eventId: "roman-empire",
    tags: ["Rome", "Empire", "Architecture"],
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    category: "Revolutions",
    period: "1789 – 1799",
    location: "Paris, France",
    coordinates: [48.8566, 2.3522],
    description:
      "Explore the revolution that transformed France and challenged established ideas about monarchy, citizenship, and political authority.",
    eventId: "french-revolution",
    tags: ["France", "Revolution", "Politics"],
  },
  {
    id: "world-war-2",
    title: "World War II",
    category: "Modern History",
    period: "1939 – 1945",
    location: "Berlin, Germany",
    coordinates: [52.52, 13.405],
    description:
      "Learn about the global conflict that reshaped international politics, societies, borders, and institutions.",
    eventId: "world-war-2",
    tags: ["World War II", "Germany", "Global Conflict"],
  },
  {
    id: "indian-independence",
    title: "Indian Independence",
    category: "Indian History",
    period: "1857 – 1947",
    location: "New Delhi, India",
    coordinates: [28.6139, 77.209],
    description:
      "Explore the long struggle against British colonial rule, involving political movements, public mobilization, and diverse approaches to independence.",
    eventId: "indian-independence",
    tags: ["India", "Freedom Movement", "Independence"],
  },
  {
    id: "shivaji-maharaj",
    title: "Chhatrapati Shivaji Maharaj",
    category: "Indian History",
    period: "1630 – 1680",
    location: "Raigad Fort, Maharashtra, India",
    coordinates: [18.2333, 73.45],
    description:
      "Explore the history of Shivaji Maharaj and the development of Maratha power, including the strategic importance of forts in the Sahyadri mountains.",
    eventId: "shivaji-maharaj",
    tags: ["Maharashtra", "Maratha History", "Fort"],
  },
  {
    id: "battle-of-panipat",
    title: "Third Battle of Panipat",
    category: "Indian History",
    period: "1761",
    location: "Panipat, Haryana, India",
    coordinates: [29.3909, 76.9635],
    description:
      "Discover one of the major battles of eighteenth-century Indian history and its consequences for regional political power.",
    eventId: null,
    tags: ["India", "Battle", "18th Century"],
  },
  {
    id: "indus-valley",
    title: "Indus Valley Civilization",
    category: "Ancient History",
    period: "c. 2600 BCE – 1900 BCE",
    location: "Mohenjo-daro, present-day Pakistan",
    coordinates: [27.3294, 68.1386],
    description:
      "Explore a major Bronze Age civilization known for urban planning, drainage systems, craft production, and extensive trade networks.",
    eventId: null,
    tags: ["Indus Valley", "Archaeology", "Bronze Age"],
  },
  {
    id: "athens",
    title: "Classical Athens",
    category: "Ancient History",
    period: "5th–4th Century BCE",
    location: "Athens, Greece",
    coordinates: [37.9838, 23.7275],
    description:
      "Explore the city associated with major developments in philosophy, drama, art, and political thought in the ancient Greek world.",
    eventId: null,
    tags: ["Greece", "Philosophy", "Democracy"],
  },
  {
    id: "great-wall",
    title: "The Great Wall of China",
    category: "Ancient History",
    period: "Various periods",
    location: "Northern China",
    coordinates: [40.4319, 116.5704],
    description:
      "Discover the history of defensive walls built and expanded by successive Chinese states and dynasties over many centuries.",
    eventId: null,
    tags: ["China", "Architecture", "Defence"],
  },
  {
    id: "meiji-restoration",
    title: "Meiji Restoration",
    category: "Modern History",
    period: "1868",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    description:
      "Explore the political transformation that restored imperial rule in Japan and began a period of rapid institutional and industrial change.",
    eventId: null,
    tags: ["Japan", "Modernization", "Politics"],
  },
  {
    id: "machu-picchu",
    title: "Machu Picchu",
    category: "Ancient History",
    period: "15th Century",
    location: "Cusco Region, Peru",
    coordinates: [-13.1631, -72.545],
    description:
      "Explore the Inca archaeological site in the Andes, known for its sophisticated stonework and mountain setting.",
    eventId: null,
    tags: ["Inca", "Peru", "Architecture"],
  },
];

const categories = [
  "All",
  "Ancient History",
  "Indian History",
  "Revolutions",
  "Modern History",
];

/* --------------------------------------------------
   CUSTOM MAP MARKER
-------------------------------------------------- */

const createMarkerIcon = (active = false) =>
  L.divIcon({
    className: "histora-marker-wrapper",
    html: `
      <div class="histora-marker ${active ? "histora-marker-active" : ""}">
        <div class="histora-marker-dot"></div>
        <div class="histora-marker-pulse"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

/* --------------------------------------------------
   MAP CONTROLLER
-------------------------------------------------- */

function MapController({ selectedLocation, resetSignal }) {
  const map = useMap();

  useMemo(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation.coordinates, 6, {
        duration: 1.2,
      });
    }
  }, [selectedLocation, map]);

  useMemo(() => {
    if (resetSignal > 0) {
      map.flyTo([25, 15], 2, {
        duration: 1,
      });
    }
  }, [resetSignal, map]);

  return null;
}

/* --------------------------------------------------
   MAIN MAP PAGE
-------------------------------------------------- */

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredLocations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return historicalLocations.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const searchableText = [
        item.title,
        item.category,
        item.period,
        item.location,
        item.description,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [searchQuery, activeCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedLocation(null);
    setResetSignal((value) => value + 1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,189,115,0.12),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-[#e8bd73]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8bd73]">
                <Globe2 size={15} />
                Historical Atlas
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                History, mapped{" "}
                <span className="text-[#e8bd73]">across the world.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Travel across civilizations, explore historic places, and
                discover where the events that shaped our world unfolded.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-[#19191f] p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8bd73]/10 text-[#e8bd73]">
                <MapPin size={24} />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {historicalLocations.length}
                </p>
                <p className="text-sm text-gray-500">Historical locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP AREA */}
      <section className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search historical places, events, or civilizations..."
              className="w-full rounded-xl border border-white/10 bg-[#19191f] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#e8bd73]/50"
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

          <button
            onClick={() => setShowFilters((value) => !value)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-4 text-sm font-semibold transition ${
              showFilters
                ? "border-[#e8bd73] bg-[#e8bd73]/10 text-[#e8bd73]"
                : "border-white/10 bg-[#19191f] text-gray-300 hover:border-[#e8bd73]/40"
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#19191f] px-5 py-4 text-sm font-semibold text-gray-300 transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-5 rounded-2xl border border-white/10 bg-[#19191f] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Historical Categories
            </p>

            <div className="flex flex-wrap gap-2">
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
          </div>
        )}

        {/* Results summary */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Compass size={17} className="text-[#e8bd73]" />
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredLocations.length}
            </span>{" "}
            historical locations
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="h-2 w-2 rounded-full bg-[#e8bd73]" />
            Click a marker to explore
          </div>
        </div>

        {/* Interactive map */}
        <div className="histora-map-shell relative overflow-hidden rounded-2xl border border-white/10 bg-[#17171c]">
          <MapContainer
            center={[25, 15]}
            zoom={2}
            minZoom={2}
            maxZoom={12}
            scrollWheelZoom={true}
            worldCopyJump={true}
            className="histora-leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController
              selectedLocation={selectedLocation}
              resetSignal={resetSignal}
            />

            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={createMarkerIcon(selectedLocation?.id === location.id)}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                <Popup className="histora-popup">
                  <div className="histora-popup-content">
                    <span className="histora-popup-category">
                      {location.category}
                    </span>

                    <h3>{location.title}</h3>

                    <p className="histora-popup-location">
                      <MapPin size={13} />
                      {location.location}
                    </p>

                    <p className="histora-popup-period">
                      <Clock3 size={13} />
                      {location.period}
                    </p>

                    <p className="histora-popup-description">
                      {location.description}
                    </p>

                    {location.eventId ? (
                      <Link
                        to={`/events/${location.eventId}`}
                        className="histora-popup-link"
                      >
                        Explore Event
                        <ArrowUpRight size={15} />
                      </Link>
                    ) : (
                      <span className="histora-popup-note">
                        Historical location
                      </span>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map count badge */}
          <div className="pointer-events-none absolute left-4 top-4 z-[400] rounded-xl border border-white/10 bg-[#101014]/90 px-4 py-3 backdrop-blur-md">
            <p className="text-xs text-gray-500">Visible locations</p>
            <p className="mt-1 text-xl font-bold text-[#e8bd73]">
              {filteredLocations.length}
            </p>
          </div>

          {/* Map controls */}
          <button
            onClick={() => {
              setSelectedLocation(null);
              setResetSignal((value) => value + 1);
            }}
            className="absolute bottom-5 right-5 z-[400] flex items-center gap-2 rounded-xl border border-white/10 bg-[#101014]/95 px-4 py-3 text-sm font-semibold text-gray-200 shadow-xl backdrop-blur-md transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
          >
            <Navigation size={17} />
            World View
          </button>

          {filteredLocations.length === 0 && (
            <div className="absolute inset-0 z-[450] flex items-center justify-center bg-[#101014]/70 p-6 backdrop-blur-sm">
              <div className="max-w-sm rounded-2xl border border-white/10 bg-[#19191f] p-8 text-center">
                <Search size={34} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold">No locations found</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Try another search or reset the filters to see all historical
                  locations.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-5 rounded-xl bg-[#e8bd73] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f2d49d]"
                >
                  Reset Map
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LOCATION LIST */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              Explore the Archives
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Discover Historical Places
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Select a location to focus the map, or open a related event to
              continue exploring.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {filteredLocations.length} places found
          </span>
        </div>

        {filteredLocations.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                onSelect={() => handleLocationSelect(location)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#19191f] p-10 text-center">
            <p className="text-gray-400">
              No historical locations match your current filters.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-white/10 bg-[#151519]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              Keep Exploring
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Every place has a story.
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Discover the people and events that transformed civilizations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
            >
              <Clock3 size={18} />
              Timeline
            </Link>

            <Link
              to="/people"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e8bd73] px-5 py-3 font-semibold text-black transition hover:bg-[#f2d49d]"
            >
              Explore People
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------------------
   LOCATION CARD
-------------------------------------------------- */

function LocationCard({ location, isSelected, onSelect }) {
  return (
    <article
      className={`rounded-2xl border bg-[#19191f] p-6 transition duration-300 hover:-translate-y-1 ${
        isSelected
          ? "border-[#e8bd73]/70 shadow-lg shadow-[#e8bd73]/5"
          : "border-white/10 hover:border-[#e8bd73]/40"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-[#e8bd73]">
          <Landmark size={23} />
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400">
          {location.category}
        </span>
      </div>

      <h3 className="text-xl font-bold leading-snug">{location.title}</h3>

      <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
        <MapPin size={16} className="mt-0.5 shrink-0 text-[#e8bd73]" />
        <span>{location.location}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
        <Clock3 size={15} />
        {location.period}
      </div>

      <p className="mt-5 text-sm leading-7 text-gray-400">
        {location.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {location.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
        <button
          onClick={onSelect}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
        >
          <Compass size={17} />
          Locate on Map
        </button>

        {location.eventId && (
          <Link
            to={`/events/${location.eventId}`}
            aria-label={`Explore ${location.title}`}
            className="inline-flex items-center justify-center rounded-xl bg-[#e8bd73] px-4 py-3 text-black transition hover:bg-[#f2d49d]"
          >
            <ArrowUpRight size={18} />
          </Link>
        )}
      </div>
    </article>
  );
}
