"use client";

import img from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { stripLocale } from "@/i18n";

// Chaves de tradução para cada item da navbar
const navItemKeys = [
  { key: "nav.about", to: "about" },
  { key: "nav.education", to: "education" },
  // { key: "nav.experience", to: "experience" },
  { key: "nav.skills", to: "skills" },
  { key: "nav.projects", to: "projects" },
  { key: "nav.certificates", to: "certificates" },
  { key: "nav.contact", to: "contact" },
];

// ─── Language Toggle ──────────────────────────────────────────────────────────
function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggle = () => setLocale(locale === "en" ? "pt" : "en");

  // ✅ Label sem bandeira — apenas código do idioma
  const label = locale === "en" ? "EN" : "PT";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${locale === "en" ? "Português" : "English"}`}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-bg-tertiary
                 bg-bg-secondary hover:bg-bg-tertiary hover:border-primary-500/30 
                 transition-all duration-300 text-sm font-medium
                 text-content-secondary hover:text-primary-400 select-none"
    >
      <span>{label}</span>
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { t, localePath } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Trava o scroll do body enquanto o menu mobile está aberto e permite
  // fechá-lo com Esc (no mobile o menu cobria a página sem impedir o scroll).
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const renderLink = (item: { key: string; to: string }, isMobile = false) => {
    const label = t(item.key);
    const isHomePage = stripLocale(pathname) === "/";

    const baseClasses = isMobile
      ? "block cursor-pointer py-3 text-lg font-semibold transition-all duration-300 border-b border-bg-tertiary text-content-secondary hover:text-primary-400 hover:pl-2"
      : "cursor-pointer transition-all duration-300 relative group px-2 py-1 text-body-small font-medium";

    if (isHomePage) {
      return (
        <ScrollLink
          key={item.to}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          activeClass="!text-primary-500 !font-bold"
          className={`${baseClasses} text-content-secondary hover:text-primary-400`}
          onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
        >
          {label}
          {!isMobile && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-900 transition-all duration-300 group-hover:w-full [.text-primary-500_&]:w-full" />
          )}
        </ScrollLink>
      );
    }

    return (
      <Link
        key={item.to}
        href={localePath(`/#${item.to}`)}
        className={`${baseClasses} text-content-secondary hover:text-primary-400`}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {label}
        {!isMobile && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-900 transition-all duration-300 group-hover:w-full" />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-bg-tertiary py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between mx-auto px-4 lg:px-8">
        {/* Logo */}
        <Link
          href={localePath("/")}
          className="transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={img}
            alt="Claudinei Alves"
            width={isScrolled ? 50 : 60}
            height={isScrolled ? 50 : 60}
            className="transition-all duration-500 brightness-125 hover:brightness-150"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItemKeys.map((item) => renderLink(item))}
          <LanguageToggle />
        </div>

        {/* Mobile: Language Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-content-primary hover:bg-bg-secondary rounded-lg transition-colors border border-transparent hover:border-bg-tertiary"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <>
          {/* Backdrop: fecha o menu ao tocar fora dele */}
          <div
            className="fixed inset-0 -z-10 bg-black/40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 w-full max-h-[calc(100svh-100%)] overflow-y-auto overscroll-contain bg-bg-primary/95 backdrop-blur-2xl border-b border-bg-tertiary md:hidden animate-in slide-in-from-top duration-300">
            <div className="px-6 py-6 flex flex-col space-y-2">
              {navItemKeys.map((item) => renderLink(item, true))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
