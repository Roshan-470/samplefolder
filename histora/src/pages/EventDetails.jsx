import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  Landmark,
  MapPin,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import historyData from "../data/HistoryData";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("histora-bookmarks") || "[]");
    } catch {
      return [];
    }
  });

  const [copied, setCopied] = useState(false);

  // Find the selected historical event.
  const event = historyData.find((item) => String(item.id) === String(id));

  // Update page title when event changes.
  useEffect(() => {
    document.title = event
      ? `${event.title} | Histora`
      : "Event Not Found | Histora";

    return () => {
      document.title = "Histora";
    };
  }, [event]);

  // Handle a missing or invalid event ID.
  if (!event) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#101014] px-5 text-white">
        <div className="max-w-lg text-center">
          <Landmark size={60} className="mx-auto mb-6 text-[#e8bd73]" />

          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            Event Not Found
          </h1>

          <p className="mt-4 leading-7 text-gray-400">
            We couldn't find this historical event. It may have been removed or
            the link may be incorrect.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e8bd73] px-6 py-3 font-semibold text-[#101014] transition hover:bg-[#f2d49b]"
          >
            <ArrowLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // Bookmark toggle.
  const isBookmarked = bookmarks.includes(event.id);

  const handleBookmark = () => {
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((bookmarkId) => bookmarkId !== event.id)
      : [...bookmarks, event.id];

    setBookmarks(updatedBookmarks);

    localStorage.setItem("histora-bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Share the event.
  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Discover ${event.title} on Histora.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share this event:", error);
      }
    }
  };

  // Other events, excluding the current event.
  const relatedEvents = historyData
    .filter((item) => item.id !== event.id)
    .sort((a, b) => {
      const aMatch = a.category === event.category ? 1 : 0;

      const bMatch = b.category === event.category ? 1 : 0;

      return bMatch - aMatch;
    })
    .slice(0, 3);

  // Placeholder content for details not yet included in historyData.js.
  const historicalTimeline = [
    {
      year: event.date,
      title: "Historical Background",
      description:
        "Understand the political, social, and cultural conditions that shaped this event.",
    },
    {
      year: "Key Developments",
      title: "Major Turning Points",
      description:
        "Explore the important developments, decisions, and people associated with this event.",
    },
    {
      year: "Historical Legacy",
      title: "Long-Term Impact",
      description:
        "Examine how this event influenced later generations and the course of history.",
    },
  ];

  const causes = [
    "Political and social conditions preceding the event.",
    "Economic pressures and conflicts of interest.",
    "Decisions made by important historical figures.",
  ];

  const consequences = [
    "Changes in political or social structures.",
    "Influence on subsequent historical developments.",
    "A lasting impact on people, institutions, and culture.",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#101014] text-white">
      {/* ================================================ */}
      {/* HERO SECTION */}
      {/* ================================================ */}

      <section className="relative min-h-[500px] overflow-hidden md:min-h-[580px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#29251e] to-[#101014]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/75 to-[#101014]/30" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#101014]/70 via-transparent to-[#101014]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[500px] max-w-[1400px] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 md:min-h-[580px] md:pb-16 lg:px-10">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-5 top-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73] sm:left-8 lg:left-10"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          {/* Category */}
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-full border border-[#e8bd73]/40 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#f2d49b] backdrop-blur-md">
              {event.category}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-gray-300 sm:text-sm">
              <Sparkles size={15} className="text-[#e8bd73]" />
              Historical Archive
            </span>
          </div>

          {/* Event Title */}
          <h1 className="max-w-5xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {event.title}
          </h1>

          {/* Short Description */}
          <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg">
            {event.description}
          </p>

          {/* Event Metadata */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#e8bd73]" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#e8bd73]" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBookmark}
              aria-pressed={isBookmarked}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                isBookmarked
                  ? "bg-[#e8bd73] text-[#101014]"
                  : "border border-[#e8bd73]/50 bg-[#e8bd73]/10 text-[#f2d49b] hover:bg-[#e8bd73] hover:text-[#101014]"
              }`}
            >
              <Bookmark
                size={18}
                className={isBookmarked ? "fill-current" : ""}
              />

              {isBookmarked ? "Bookmarked" : "Save Event"}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}

              {copied ? "Link Copied" : "Share Event"}
            </button>
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* EVENT OVERVIEW */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Date */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#17171d] p-5 transition hover:border-[#e8bd73]/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8bd73]/10">
              <CalendarDays size={24} className="text-[#e8bd73]" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Historical Period
              </p>

              <p className="mt-1 font-semibold text-white">{event.date}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#17171d] p-5 transition hover:border-[#e8bd73]/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8bd73]/10">
              <Globe2 size={24} className="text-[#e8bd73]" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Location
              </p>

              <p className="mt-1 font-semibold text-white">{event.location}</p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#17171d] p-5 transition hover:border-[#e8bd73]/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8bd73]/10">
              <Landmark size={24} className="text-[#e8bd73]" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Category
              </p>

              <p className="mt-1 font-semibold text-white">{event.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Article */}
          <article className="min-w-0">
            {/* Overview */}
            <section className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-[#e8bd73]" />

                <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                  Historical Overview
                </h2>
              </div>

              <p className="text-sm leading-8 text-gray-400 sm:text-base">
                {event.description}
              </p>

              <p className="mt-5 text-sm leading-8 text-gray-400 sm:text-base">
                Every historical event emerges from a unique combination of
                circumstances, decisions, and developments. Studying this event
                helps us understand the people, institutions, and ideas that
                shaped its historical context.
              </p>

              <p className="mt-5 text-sm leading-8 text-gray-400 sm:text-base">
                By examining the background, major developments, and long-term
                consequences, we can better understand how historical events
                influence societies and connect to broader changes across time.
              </p>
            </section>

            {/* Historical Timeline */}
            <section className="mb-12">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8bd73]/10">
                  <Clock3 size={23} className="text-[#e8bd73]" />
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                    Key Developments
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Explore the event's historical progression.
                  </p>
                </div>
              </div>

              <div className="relative ml-3 border-l border-[#e8bd73]/30 pl-7">
                {historicalTimeline.map((item, index) => (
                  <div key={item.title} className="relative pb-9 last:pb-0">
                    {/* Timeline Marker */}
                    <div className="absolute -left-[35px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#e8bd73] bg-[#101014]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#e8bd73]" />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-[#e8bd73]">
                      {item.year}
                    </span>

                    <h3 className="mt-2 text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Causes and Consequences */}
            <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Causes */}
              <div className="rounded-2xl border border-white/10 bg-[#17171d] p-6">
                <h3 className="mb-5 flex items-center gap-3 font-serif text-xl font-bold">
                  <Users size={23} className="text-[#e8bd73]" />
                  Causes
                </h3>

                <ul className="space-y-4">
                  {causes.map((cause, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8bd73]" />

                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consequences */}
              <div className="rounded-2xl border border-white/10 bg-[#17171d] p-6">
                <h3 className="mb-5 flex items-center gap-3 font-serif text-xl font-bold">
                  <Landmark size={23} className="text-[#e8bd73]" />
                  Consequences
                </h3>

                <ul className="space-y-4">
                  {consequences.map((consequence, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8bd73]" />

                      {consequence}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Historical Significance */}
            <section className="rounded-2xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#211e18] to-[#17171d] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8bd73]/10">
                  <Sparkles size={25} className="text-[#e8bd73]" />
                </div>

                <div>
                  <h2 className="font-serif text-xl font-bold sm:text-2xl">
                    Why This Event Matters
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Studying {event.title} provides an opportunity to examine
                    historical change, human decisions, and the relationship
                    between past events and the world we live in today.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Information */}
            <div className="rounded-2xl border border-white/10 bg-[#17171d] p-6">
              <h3 className="mb-5 font-serif text-xl font-bold">
                Event Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#e8bd73]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Date / Period</p>

                    <p className="mt-1 text-sm font-medium text-gray-200">
                      {event.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#e8bd73]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Location</p>

                    <p className="mt-1 text-sm font-medium text-gray-200">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Landmark
                    size={18}
                    className="mt-0.5 shrink-0 text-[#e8bd73]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">Historical Category</p>

                    <p className="mt-1 text-sm font-medium text-gray-200">
                      {event.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={handleBookmark}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e8bd73]/30 px-4 py-3 text-sm font-semibold text-[#e8bd73] transition hover:bg-[#e8bd73]/10"
                >
                  <Bookmark
                    size={17}
                    className={isBookmarked ? "fill-current" : ""}
                  />

                  {isBookmarked ? "Remove Bookmark" : "Save for Later"}
                </button>
              </div>
            </div>

            {/* Explore Other Sections */}
            <div className="rounded-2xl border border-white/10 bg-[#17171d] p-6">
              <h3 className="mb-5 font-serif text-xl font-bold">
                Explore More
              </h3>

              <div className="space-y-3">
                <Link
                  to="/timeline"
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#e8bd73]/30 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-[#e8bd73]">
                    <Clock3 size={18} />
                    Historical Timeline
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 transition group-hover:text-[#e8bd73]"
                  />
                </Link>

                <Link
                  to="/people"
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#e8bd73]/30 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-[#e8bd73]">
                    <Users size={18} />
                    Historical People
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 transition group-hover:text-[#e8bd73]"
                  />
                </Link>

                <Link
                  to="/connections"
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#e8bd73]/30 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-[#e8bd73]">
                    <Users size={18} />
                    Historical Connections
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 transition group-hover:text-[#e8bd73]"
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================================================ */}
      {/* RELATED EVENTS */}
      {/* ================================================ */}

      {relatedEvents.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8bd73]">
                Continue discovering
              </p>

              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                Related Historical Events
              </h2>

              <p className="mt-3 text-sm text-gray-400">
                Explore more stories from history.
              </p>
            </div>

            <Link
              to="/explore"
              className="hidden items-center gap-2 text-sm font-semibold text-[#e8bd73] transition hover:gap-3 sm:inline-flex"
            >
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEvents.map((relatedEvent) => (
              <Link
                key={relatedEvent.id}
                to={`/events/${relatedEvent.id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#17171d] transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/40"
              >
                <div className="relative h-48 overflow-hidden">
                  {relatedEvent.image ? (
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#202027]">
                      <Landmark size={36} className="text-[#e8bd73]" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#e8bd73]">
                    {relatedEvent.category}
                  </p>

                  <h3 className="mt-2 font-serif text-xl font-bold transition group-hover:text-[#e8bd73]">
                    {relatedEvent.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {relatedEvent.date}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#e8bd73]">
                    Read Story
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================================================ */}
      {/* BOTTOM CTA */}
      {/* ================================================ */}

      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-8 sm:px-8 lg:px-10">
        <div className="rounded-3xl border border-[#e8bd73]/20 bg-gradient-to-r from-[#211e18] to-[#17171d] px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Keep Exploring the Past
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            Every event is part of a bigger story. Discover the people, places,
            and historical connections behind it.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8bd73] px-6 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b]"
            >
              Explore History
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
            >
              Back to Home
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetails;
