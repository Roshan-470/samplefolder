import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Landmark,
  Crown,
  Swords,
  Globe2,
  FlaskConical,
  Palette,
  BookOpen,
  ScrollText,
} from "lucide-react";

const iconMap = {
  ancient: Landmark,
  empires: Crown,
  wars: Swords,
  civilizations: Globe2,
  science: FlaskConical,
  art: Palette,
  revolutions: ScrollText,
  culture: BookOpen,
};

export default function TopicCard({ topic, index = 0, className = "" }) {
  if (!topic) return null;

  const {
    id,
    title,
    description,
    image,
    category,
    eventsCount,
    icon = "ancient",
    link,
  } = topic;

  const Icon = iconMap[icon] || Landmark;

  const destination =
    link || (id ? `/explore?topic=${encodeURIComponent(id)}` : "/explore");

  return (
    <article
      className={`group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#19191f] transition duration-500 hover:-translate-y-1 hover:border-[#e8bd73]/40 hover:shadow-2xl hover:shadow-black/30 ${className}`}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt={title || "Historical topic"}
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#27231c] via-[#19191f] to-[#101014]" />
      )}

      {/* Image overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101014] via-[#101014]/70 to-black/10 transition duration-500 group-hover:via-[#101014]/55" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e8bd73]/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Top badges */}
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8bd73]/30 bg-[#101014]/65 text-[#e8bd73] backdrop-blur-md transition duration-300 group-hover:bg-[#e8bd73] group-hover:text-black">
          <Icon size={22} strokeWidth={1.7} />
        </div>

        {category && (
          <span className="rounded-full border border-white/15 bg-[#101014]/65 px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-md">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative p-5 pt-20 sm:p-6 sm:pt-20">
        {eventsCount !== undefined && (
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#e8bd73]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8bd73]" />
            {eventsCount}{" "}
            {eventsCount === 1 ? "Historical Event" : "Historical Events"}
          </div>
        )}

        <h3 className="text-2xl font-bold leading-tight tracking-tight text-white transition duration-300 group-hover:text-[#f2d49d]">
          {title}
        </h3>

        {description && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-300">
            {description}
          </p>
        )}

        {/* Explore link */}
        <Link
          to={destination}
          aria-label={`Explore ${title}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e8bd73] transition duration-300 hover:text-[#f5d69d]"
        >
          Explore Topic
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e8bd73]/30 transition duration-300 group-hover:translate-x-1 group-hover:bg-[#e8bd73] group-hover:text-black">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </article>
  );
}
