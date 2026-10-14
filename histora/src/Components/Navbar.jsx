import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {
  Landmark,
  Search,
  Menu,
  X,
  Clock3,
  Map,
  Users,
  Network,
  House,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", path: "/", icon: House },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "Timeline", path: "/timeline", icon: Clock3 },
    { name: "Map", path: "/map", icon: Map },
    { name: "People", path: "/people", icon: Users },
    { name: "Connections", path: "/connections", icon: Network },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      window.location.href = `/explore?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#101014]/95 text-white shadow-lg backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setIsMenuOpen(false)}
        >
          <Landmark size={31} strokeWidth={2.2} className="text-[#e8bd73]" />

          <span className="font-serif text-2xl font-bold tracking-wide sm:text-3xl">
            Histor<span className="text-[#e8bd73]">a</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-3 py-3 text-sm font-medium transition-all duration-300 xl:px-4 ${
                  isActive
                    ? "text-[#e8bd73]"
                    : "text-gray-300 hover:text-[#e8bd73]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#e8bd73] xl:left-4 xl:right-4" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
            className="rounded-full p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-[#e8bd73]"
          >
            {isSearchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          {/* Sign In */}
          <Link
            to="/login"
            className="hidden rounded-lg border border-[#bfa16a]/70 px-5 py-2 text-sm font-semibold text-[#f2d49b] transition duration-300 hover:bg-[#e8bd73] hover:text-[#101014] sm:inline-flex"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="rounded-lg p-2 text-gray-200 transition hover:bg-white/10 hover:text-[#e8bd73] lg:hidden"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </nav>

      {/* Search Panel */}
      {isSearchOpen && (
        <div className="border-t border-white/10 bg-[#15151b] px-5 py-4">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-gray-800 transition focus-within:border-[#e8bd73]"
          >
            <Search size={20} className="shrink-0 text-gray-500" />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, people, places or eras..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
              autoFocus
            />

            <button
              type="submit"
              className="rounded-full bg-[#17171d] px-4 py-2 text-sm font-semibold text-[#e8bd73] transition hover:bg-[#303039]"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#101014] px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#e8bd73]/10 text-[#e8bd73]"
                        : "text-gray-300 hover:bg-white/5 hover:text-[#e8bd73]"
                    }`
                  }
                >
                  <Icon size={19} />
                  {link.name}
                </NavLink>
              );
            })}

            {/* Mobile Sign In */}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-lg bg-[#e8bd73] px-4 py-3 text-sm font-bold text-[#101014] transition hover:bg-[#f2d49b] sm:hidden"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
