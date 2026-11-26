import { FaDownload } from "react-icons/fa6";
import T from "@/i18n/T";

// Plain <a download> (not next/link): it downloads a static file from public/.
// No hooks, so it works in Server Components.
export default function DownloadCvButton() {
  return (
    <a
      href="/Omer_Akkoca_React_Native_Developer_CV.pdf"
      download
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-cv-button font-medium text-on-primary shadow-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <FaDownload aria-hidden className="shrink-0" />
      <span>
        <T k="downloadCv" />
      </span>
    </a>
  );
}
