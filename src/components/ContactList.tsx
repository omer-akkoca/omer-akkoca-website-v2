import { contacts } from "@/data/contact";

export default function ContactList() {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {contacts.map(({ icon: Icon, label, href }) => (
        <li key={href} className="min-w-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-subtext hover:text-primary"
          >
            <Icon aria-hidden className="size-3.5 shrink-0 text-text" />
            <span className="truncate">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
