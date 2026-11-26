import Image from "next/image";
import { FaDownload } from "react-icons/fa6";
import coverImage from "../../public/cover.jpeg";
import profilePhoto from "../../public/profile.jpg";
import TextButton from "@/components/TextButton";
import T from "@/i18n/T";
import { siteConfig } from "@/lib/site";

// Photo + name/title + CV download.
// Below `sm`: a cover banner on top, the photo overlapping its bottom edge
// (half of its 100px height), then name/title/CV stacked and centered.
// From `sm` up: no cover, photo on the left with the text column on its right.
export default function Hero() {
  return (
    <div className="flex flex-col">
      <Image
        src={coverImage}
        alt=""
        sizes="100vw"
        className="h-auto w-full rounded-xl object-cover sm:hidden"
      />
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Image
          src={profilePhoto}
          alt={siteConfig.name}
          width={100}
          height={100}
          preload
          className="relative -mt-12.5 size-25 shrink-0 rounded-full object-cover shadow-md ring-4 ring-background sm:mt-0 sm:ring-0"
        />
        <div className="flex min-w-0 flex-col items-center sm:items-start">
          <h1 className="text-name text-text font-medium">
            {siteConfig.displayName}
          </h1>
          <h2 className="text-title text-subtext">
            <T k="jobTitle" />
          </h2>
          <TextButton
            href="/Omer_Akkoca_React_Native_Developer_CV.pdf"
            download
            label={<T k="downloadCv" />}
            icon={<FaDownload />}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}
