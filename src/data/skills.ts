import type { IconType } from "react-icons";
import {
  SiClaude,
  SiExpo,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiSwift,
  SiTypescript,
} from "react-icons/si";

export type SkillItem = {
  icon: IconType;
  label: string;
  /** Tailwind text color class for the icon (brand color token). */
  colorClass: string;
};

export const skills: SkillItem[] = [
  { icon: SiReact, label: "React Native", colorClass: "text-brand-react" },
  { icon: SiExpo, label: "Expo", colorClass: "text-text" },
  { icon: SiSwift, label: "Swift", colorClass: "text-brand-swift" },
  { icon: SiFlutter, label: "Flutter", colorClass: "text-brand-flutter" },
  { icon: SiNextdotjs, label: "Next.js", colorClass: "text-text" },
  { icon: SiTypescript, label: "TypeScript", colorClass: "text-brand-typescript" },
  { icon: SiJavascript, label: "JavaScript", colorClass: "text-brand-javascript" },
  { icon: SiGraphql, label: "GraphQL", colorClass: "text-brand-graphql" },
  { icon: SiFirebase, label: "Firebase", colorClass: "text-brand-firebase" },
  { icon: SiSupabase, label: "Supabase", colorClass: "text-brand-supabase" },
  { icon: SiGit, label: "Git", colorClass: "text-brand-git" },
  { icon: SiClaude, label: "Claude Code", colorClass: "text-brand-claude" },
];
