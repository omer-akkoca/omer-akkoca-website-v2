import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export type SkillListItem = {
  id: string;
  icon: IconType;
  label: ReactNode;
  /** Tailwind text color class for the icon (a theme token). */
  colorClass: string;
};

// Icon + label grid used by the Skills and Soft Skills sections.
export default function SkillList({ items }: { items: SkillListItem[] }) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ id, icon: Icon, label, colorClass }) => (
        <li
          key={id}
          className="flex min-w-0 items-center gap-2 text-sm text-subtext"
        >
          <Icon aria-hidden className={`size-3.5 shrink-0 ${colorClass}`} />
          <span className="truncate">{label}</span>
        </li>
      ))}
    </ul>
  );
}
