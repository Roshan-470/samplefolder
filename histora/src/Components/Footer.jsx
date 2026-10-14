import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import {
  Landmark,
  ArrowRight,
  Mail,
  Heart,
  Clock3,
  Map,
  Users,
  Network,
  BookOpen,
  ArrowUpRight,
  GitFork,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Frontend demonstration only; connect a backend to save subscriptions.
    setMessage("Thanks for your interest in Histora!");
    setEmail("");
  };

  const exploreLinks = [
    { name: "Explore History", path: "/explore", icon: BookOpen },
    { name: "Historical Timeline", path: "/timeline", icon: Clock3 },
    { name: "Historical Maps", path: "/map", icon: Map },
    { name: "Historical People", path: "/people", icon: Users },
    { name: "Connections", path: "/connections", icon: Network },
  ];

  const resourceLinks = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/login" },
    { name: "Create Account", path: "/signup" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: GitFork,
      href: "https://github.com/",
    },
    {
      name: "Instagram",
      icon: Globe,
      href: "https://www.instagram.com/",
    },
    {
      name: "LinkedIn",
      icon: Users,
      href: "https://www.linkedin.com/",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#e8bd73]/20 bg-[#101014] text-gray-300">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-[#e8bd73]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-16 md:px-10 lg:pt-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8bd73]/30 bg-[#e8bd73]/10">
                <Landmark size={27} className="text-[#e8bd73]" />
              </div>

              <span className="font-serif text-3xl font-bold tracking-wide text-white">
                Histor<span className="text-[#e8bd73]">a</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Discover the stories that shaped our world. Explore historical
              events, remarkable people, ancient civilizations, and the
              connections that bring history to life.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/50 hover:bg-[#e8bd73]/10 hover:text-[#e8bd73]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-3 text-sm text-gray-400 transition hover:translate-x-1 hover:text-[#e8bd73]"
                    >
                      <Icon
                        size={17}
                        className="text-[#b99b66] transition group-hover:text-[#e8bd73]"
                      />

                      {link.name}

                      <ArrowUpRight
                        size={14}
                        className="ml-auto opacity-0 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:translate-x-1 hover:text-[#e8bd73]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b99b66] transition group-hover:bg-[#e8bd73]" />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#e8bd73]">
                <Heart size={16} />
                <span className="text-sm font-semibold">Our Mission</span>
              </div>

              <p className="text-xs leading-6 text-gray-400">
                Making history accessible, visual, and meaningful for everyone.
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-bold text-white">
              Stay Curious
            </h3>

            <p className="mb-5 text-sm leading-7 text-gray-400">
              Discover fascinating historical stories and explore the past from
              a new perspective.
            </p>

            <form onSubmit={handleSubscribe}>
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Your email address
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 transition focus-within:border-[#e8bd73]/60">
                <Mail size={18} className="ml-2 shrink-0 text-gray-500" />

                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8bd73] text-[#101014] transition hover:bg-[#f2d49b]"
                >
                  <ArrowRight size={19} />
                </button>
              </div>

              {message && (
                <p
                  role="status"
                  className="mt-3 text-xs leading-5 text-[#e8bd73]"
                >
                  {message}
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Stay curious. No spam, just history.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} Histora. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
            Made with
            <Heart size={14} className="fill-[#e8bd73] text-[#e8bd73]" />
            for history lovers.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium transition hover:border-[#e8bd73]/50 hover:text-[#e8bd73]"
          >
            Back to top
            <ArrowUpRight
              size={15}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
