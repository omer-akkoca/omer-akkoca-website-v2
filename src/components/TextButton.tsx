import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type TextButtonProps = {
  /** Required visible text, e.g. `<T k="readMore" />` or `t("readMore")`. */
  label: ReactNode;
  /** Optional icon shown to the right of the text, e.g. `<FaArrowRight />`. */
  icon?: ReactNode;
  /** Renders a `next/link` when set, otherwise a `<button>`. */
  href?: string;
  onClick?: () => void;
  /** Extra classes for outer spacing, e.g. "mt-2". */
  className?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-expanded" | "aria-controls"
>;

// The hover underline is a bottom border on the whole element (not
// text-decoration), so it runs continuously under both the text and the icon.
const BASE_CLASS =
  "inline-flex cursor-pointer items-center gap-1 border-b border-transparent text-caption font-medium text-primary hover:border-current";

// No hooks, so it works in both Server and Client Components.
// `onClick` can only be passed from Client Components.
export default function TextButton({
  label,
  icon,
  href,
  onClick,
  className,
  ...aria
}: TextButtonProps) {
  const classes = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;
  const content = (
    <>
      <span>{label}</span>
      {icon && (
        <span aria-hidden className="shrink-0">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...aria}>
      {content}
    </button>
  );
}
