import { education } from "@/data/education";
import T from "@/i18n/T";

export default function Education() {
  return (
    <ul className="mt-3 flex flex-col gap-4">
      {education.map(({ id, schoolKey, fieldKey, startYear, endYear }) => (
        <li key={id}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-entry font-medium text-text">
              <T k={schoolKey} />
            </h3>
            <p className="text-entry shrink-0 text-subtext">
              {startYear} – {endYear}
            </p>
          </div>
          <p className="text-entry text-muted">
            <T k={fieldKey} />
          </p>
        </li>
      ))}
    </ul>
  );
}
