import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, CalendarDays, ArrowUpRight, MapPin } from "lucide-react";

const EventCard = ({ event, onBookmark, isBookmarked = false }) => {
  const [imageError, setImageError] = useState(false);

  // Handle missing event data
  if (!event) return null;

  const {
    id,
    title = "Untitled Historical Event",
    date = "Date unknown",
    description = "Discover the story behind this historical event.",
    image,
    category = "History",
    location = "Unknown location",
  } = event;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onBookmark) {
      onBookmark(event);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17171d] transition-all duration-500 hover:-translate-y-2 hover:border-[#e8bd73]/50 hover:shadow-[0_15px_45px_rgba(232,189,115,0.08)]">
      {/* Event Image */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        {!imageError && image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#29251e] via-[#19191f] to-[#101014]">
            <CalendarDays
              size={48}
              strokeWidth={1.2}
              className="text-[#e8bd73]/50"
            />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-[#e8bd73]/30 bg-black/60 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#f2d49b] backdrop-blur-md">
          {category}
        </span>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark event"}
          aria-pressed={isBookmarked}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            isBookmarked
              ? "border-[#e8bd73] bg-[#e8bd73] text-[#101014]"
              : "border-white/20 bg-black/50 text-white hover:border-[#e8bd73] hover:text-[#e8bd73]"
          }`}
        >
          <Bookmark size={18} className={isBookmarked ? "fill-current" : ""} />
        </button>

        {/* Event Date */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
          <CalendarDays size={16} className="text-[#e8bd73]" />
          <span>{date}</span>
        </div>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <Link
          to={`/events/${id}`}
          className="mb-3 font-serif text-xl font-bold leading-snug text-white transition-colors duration-300 hover:text-[#e8bd73]"
        >
          {title}
        </Link>

        {/* Location */}
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
          <MapPin size={15} className="shrink-0 text-[#b99b66]" />
          <span>{location}</span>
        </div>

        {/* Description */}
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-gray-400">
          {description}
        </p>

        {/* Footer / Read More */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Discover history
          </span>

          <Link
            to={`/events/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8bd73] transition-all duration-300 hover:gap-3"
          >
            Read More
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
