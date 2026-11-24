import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
};

export default function Section({ id, title, action, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className="scroll-mt-16"
    >
      {(title || action) && (
        <div className="flex items-baseline justify-between gap-4">
          {title && (
            <h2 id={titleId} className="text-section font-medium text-text">
              {title}
            </h2>
          )}
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
