import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: ReactNode;
  children?: ReactNode;
};

export default function Section({ id, title, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className="scroll-mt-16"
    >
      {title && (
        <h2 id={titleId} className="text-section font-medium text-text">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
