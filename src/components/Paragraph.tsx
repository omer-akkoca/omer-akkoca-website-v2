import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
};

// Body text paragraph (same look as the About text). No hooks, so it works in
// Server and Client Components.
export default function Paragraph({ children, id, className = "" }: Props) {
  return (
    <p
      id={id}
      className={`text-body whitespace-pre-line text-justify text-subtext ${className}`}
    >
      {children}
    </p>
  );
}
