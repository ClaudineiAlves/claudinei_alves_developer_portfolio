// src/components/Footer.tsx
"use client";

import { personalData } from "@/../utils/Data/PersonalData";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.about"), to: "about" },
    { label: t("nav.education"), to: "education" },
    { label: t("nav.experience"), to: "experience" },
    { label: t("nav.skills"), to: "skills" },
    { label: t("nav.projects"), to: "projects" },
    { label: t("nav.certificates"), to: "certificates" },
    { label: t("nav.contact"), to: "contact" },
  ];

  return (
    <footer className="bg-bg-primary border-t border-bg-tertiary text-content-secondary">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="w-fit group">
              <Image
                src="/logo.png"
                alt="Claudinei Alves Logo"
                width={100}
                height={100}
                className="brightness-125 group-hover:brightness-150 transition-all"
              />
            </Link>
            <p className="text-body-small text-content-muted leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-caption text-content-subtle mb-6 uppercase tracking-widest">
              {t("footer.nav_title")}
            </h2>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <ScrollLink
                    to={item.to}
                    smooth
                    duration={500}
                    className="text-body-small text-content-secondary hover:text-primary-400 transition-all cursor-pointer font-medium hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-caption text-content-subtle mb-6 uppercase tracking-widest">
                {t("footer.connect_title")}
              </h2>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${personalData.email}`}
                  className="text-body-small text-content-secondary hover:text-primary-400 transition-all font-medium"
                >
                  {personalData.email}
                </a>
                <a
                  href={`tel:${personalData.phone}`}
                  className="text-body-small text-content-secondary hover:text-primary-400 transition-all font-medium"
                >
                  {personalData.phone}
                </a>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href={personalData.github}
                target="_blank"
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-bg-secondary hover:bg-primary-500/10 text-content-secondary hover:text-primary-400 transition-all border border-bg-tertiary hover:border-primary-500/30"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-bg-secondary hover:bg-primary-500/10 text-content-secondary hover:text-primary-400 transition-all border border-bg-tertiary hover:border-primary-500/30"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href={personalData.Instagram}
                target="_blank"
                aria-label="Instagram"
                className="p-2.5 rounded-lg bg-bg-secondary hover:bg-primary-500/10 text-content-secondary hover:text-primary-400 transition-all border border-bg-tertiary hover:border-primary-500/30"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-bg-tertiary flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-content-subtle">
          <p>
            &copy;{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            Claudinei Alves. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-2">
            {t("footer.made_with")}{" "}
            <Heart
              size={14}
              className="text-primary-500 fill-primary-500 animate-pulse"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
