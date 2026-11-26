import Image from "next/image";
import profilePhoto from "../../public/profile.jpg";
import About from "@/components/About";
import ContactList from "@/components/ContactList";
import DownloadCvButton from "@/components/DownloadCvButton";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Section from "@/components/Section";
import SkillList from "@/components/SkillList";
import { skills } from "@/data/skills";
import { softSkills } from "@/data/softSkills";
import T from "@/i18n/T";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 sm:px-6 py-4 sm:py-6">
      <Section id="hero">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Image
              src={profilePhoto}
              alt={siteConfig.name}
              width={100}
              height={100}
              preload
              className="size-25 shrink-0 rounded-full object-cover shadow-md"
            />
            <div className="min-w-0">
              <h1 className="text-name text-text font-medium">
                {siteConfig.displayName}
              </h1>
              <h2 className="text-title text-subtext">
                <T k="jobTitle" />
              </h2>
            </div>
          </div>
          <DownloadCvButton />
        </div>
      </Section>

      <Section id="contact">
        <ContactList />
      </Section>
      <Section id="about" title={<T k="about" />}>
        <About />
      </Section>
      <Section id="experience" title={<T k="experience" />}>
        <Experience />
      </Section>
      <Section id="skills" title={<T k="skills" />}>
        <SkillList
          items={skills.map(({ icon, label, colorClass }) => ({
            id: label,
            icon,
            label,
            colorClass,
          }))}
        />
      </Section>
      <Section id="soft-skills" title={<T k="softSkills" />}>
        <SkillList
          items={softSkills.map(({ icon, labelKey }) => ({
            id: labelKey,
            icon,
            label: <T k={labelKey} />,
            colorClass: "text-text",
          }))}
        />
      </Section>
      <Section id="education" title={<T k="education" />}>
        <Education />
      </Section>
    </main>
  );
}
