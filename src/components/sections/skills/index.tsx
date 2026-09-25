"use client";

import { skillsData } from "@/../utils/Data/skills";
import { getSkillIcon, getSkillColor, SkillIcon } from "@/../utils/skill-icons";
import Marquee from "react-fast-marquee";
import RevealText from "@/components/RevealText";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// Componente que renderiza SVG ou Icon. É decorativo: o nome da skill já aparece ao lado.
const SkillIconRender = ({ iconData }: { iconData: SkillIcon }) => {
  if (iconData.type === "svg") {
    return (
      <Image
        src={iconData.path}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    );
  }
  const IconComponent = iconData.component;
  return <IconComponent className="w-8 h-8" aria-hidden />;
};

const SkillItem = ({
  skill,
  technologyLabel,
}: {
  skill: string;
  technologyLabel: string;
}) => {
  const iconData = getSkillIcon(skill);
  const color = getSkillColor(skill);
  const isSvg = iconData.type === "svg";

  return (
    <div className="mx-4 my-4 group">
      <div className="relative px-8 py-6 rounded-2xl border border-bg-tertiary bg-bg-secondary/50 backdrop-blur-3xl transition-all duration-500 hover:border-primary-500/30 hover:bg-bg-secondary hover:shadow-glow-sm flex items-center gap-4 shadow-card">
        <div
          className="text-3xl transition-all duration-500 group-hover:scale-110"
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`,
            color: isSvg ? undefined : color,
          }}
        >
          <SkillIconRender iconData={iconData} />
        </div>
        <div className="flex flex-col">
          <span className="text-body font-semibold text-content-primary tracking-wide uppercase group-hover:text-primary-400 transition-colors">
            {skill}
          </span>
          <span className="text-caption text-content-subtle">
            {technologyLabel}
          </span>
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-15 rounded-2xl transition-opacity duration-500 pointer-events-none blur-xl"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

function Skills() {
  const { t } = useLanguage();

  const firstHalf = skillsData.slice(0, Math.ceil(skillsData.length / 2));
  const secondHalf = skillsData.slice(Math.ceil(skillsData.length / 2));

  const technologyLabel = t("skills.technology_label");

  return (
    <section
      id="skills"
      className="relative z-50 py-24 lg:py-48 overflow-hidden"
    >
      {/* Background glows refinados */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 lg:mb-24">
          <RevealText direction="down">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-primary-500">
                <span className="w-8 h-[1px] bg-primary-500/50"></span>
                <span className="text-caption text-primary-400">
                  {t("skills.section_label")}
                </span>
                <span className="w-8 h-[1px] bg-primary-500/50"></span>
              </div>

              <h2 className="text-headline font-bold text-content-primary tracking-tight text-center">
                {t("skills.title_word1")}{" "}
                <span className="title-gradient">
                  {t("skills.title_word2")}
                </span>
              </h2>
            </div>
          </RevealText>
        </div>

        {/* Marquees */}
        <div className="flex flex-col gap-6 lg:gap-8 relative">
          <RevealText direction="right" delay={100}>
            <Marquee speed={40} gradient={false} pauseOnHover={true}>
              {firstHalf.map((skill, index) => (
                <SkillItem
                  key={`first-${index}`}
                  skill={skill}
                  technologyLabel={technologyLabel}
                />
              ))}
            </Marquee>
          </RevealText>

          <RevealText direction="left" delay={200}>
            <Marquee
              speed={35}
              gradient={false}
              pauseOnHover={true}
              direction="right"
            >
              {secondHalf.map((skill, index) => (
                <SkillItem
                  key={`second-${index}`}
                  skill={skill}
                  technologyLabel={technologyLabel}
                />
              ))}
            </Marquee>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

export default Skills;
