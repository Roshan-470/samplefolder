import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  ArrowUpRight,
  Clock3,
  Users,
  MapPin,
  Command,
} from "lucide-react";

import historyData from "../data/HistoryData";

const peopleData = [
  {
    id: "shivaji-maharaj",
    name: "Chhatrapati Shivaji Maharaj",
    category: "Historical Personality",
  },
  {
    id: "mahatma-gandhi",
    name: "Mahatma Gandhi",
    category: "Historical Personality",
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    category: "Historical Personality",
  },
  {
    id: "cleopatra",
    name: "Cleopatra VII",
    category: "Historical Personality",
  },
  {
    id: "isaac-newton",
    name: "Isaac Newton",
    category: "Historical Personality",
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    category: "Historical Personality",
  },
  {
    id: "julius-caesar",
    name: "Julius Caesar",
    category: "Historical Personality",
  },
  {
    id: "subhas-chandra-bose",
    name: "Subhas Chandra Bose",
    category: "Historical Personality",
  },
];

const quickLinks = [
  {
    label: "Explore History",
    description: "Discover historical events",
    path: "/explore",
    icon: Clock3,
  },
  {
    label: "Historical Personalities",
    description: "Explore influential people",
    path: "/people",
    icon: Users,
  },
  {
    label: "Historical Map",
    description: "Discover history by location",
    path: "/map",
    icon: MapPin,
  },
];

export default function SearchBar({
  placeholder = "Search history, people, events...",
  className = "",
  autoFocus = false,
  onResultSelect,
}) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = query.trim().toLowerCase();

  const eventResults = normalizedQuery
    ? historyData
        .filter((event) => {
          const searchableText = [
            event.title,
            event.category,
            event.date,
            event.location,
            event.description,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(normalizedQuery);
        })
        .slice(0, 5)
        .map((event) => ({
          id: event.id,
          title: event.title,
          category: event.category || "Historical Event",
          path: `/events/${event.id}`,
          type: "event",
          icon: Clock3,
        }))
    : [];

  const personResults = normalizedQuery
    ? peopleData
        .filter((person) => person.name.toLowerCase().includes(normalizedQuery))
        .slice(0, 5)
        .map((person) => ({
          id: person.id,
          title: person.name,
          category: person.category,
          path: `/people/${person.id}`,
          type: "person",
          icon: Users,
        }))
    : [];

  const results = [...personResults, ...eventResults].slice(0, 7);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
      inputRef.current?.focus();
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    navigate(`/explore?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleResultClick = (result) => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);

    onResultSelect?.(result);

    navigate(result.path);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);

      if (results.length > 0) {
        setActiveIndex((previous) =>
          previous < results.length - 1 ? previous + 1 : 0,
        );
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (results.length > 0) {
        setActiveIndex((previous) =>
          previous > 0 ? previous - 1 : results.length - 1,
        );
      }
    }

    if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      handleResultClick(results[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search input */}
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center rounded-xl border bg-[#19191f] transition duration-200 ${
          isOpen
            ? "border-[#e8bd73]/60 shadow-lg shadow-black/20"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <Search
          size={20}
          className={`ml-4 shrink-0 transition ${
            isOpen ? "text-[#e8bd73]" : "text-gray-500"
          }`}
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search historical events and people"
          aria-expanded={isOpen}
          className="h-14 min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-gray-500"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="mr-2 rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={17} />
          </button>
        ) : (
          <div className="mr-3 hidden items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-gray-500 sm:flex">
            <Command size={12} />
            <span>K</span>
          </div>
        )}

        <button
          type="submit"
          aria-label="Submit search"
          className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8bd73] text-black transition hover:bg-[#f2d49d]"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Search dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-[100] mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#19191f] shadow-2xl shadow-black/40">
          {normalizedQuery ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Search Results
                </p>

                <span className="text-xs text-gray-600">
                  {results.length} found
                </span>
              </div>

              {results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => {
                    const Icon = result.icon;

                    return (
                      <button
                        type="button"
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                          activeIndex === index
                            ? "bg-[#e8bd73]/10"
                            : "hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e8bd73]/15 bg-[#e8bd73]/10 text-[#e8bd73]">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-100">
                            {result.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {result.category}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={17}
                          className="shrink-0 text-gray-600"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <Search size={28} className="mx-auto mb-3 text-gray-600" />

                  <p className="text-sm font-medium text-gray-300">
                    No results found
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Try another name, event, or historical period.
                  </p>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="mt-4 text-sm font-semibold text-[#e8bd73] hover:text-[#f5d69d]"
                  >
                    Search all history
                  </button>
                </div>
              )}

              <div className="border-t border-white/10 px-4 py-3">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex w-full items-center justify-between text-sm text-gray-400 transition hover:text-[#e8bd73]"
                >
                  <span>Search all history for "{query.trim()}"</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Quick Navigation
                </p>
              </div>

              <div className="p-2">
                {quickLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        navigate(item.path);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.04]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[#e8bd73]">
                        <Icon size={19} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-200">
                          {item.label}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <ArrowUpRight size={16} className="text-gray-600" />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-xs text-gray-500">
                <Search size={14} />
                Search events and personalities across Histora
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
