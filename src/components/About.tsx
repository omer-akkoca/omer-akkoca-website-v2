"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import TextButton from "@/components/TextButton";
import { useT } from "@/i18n/useLocale";

const COLLAPSED_LINES = 4;
// Height of COLLAPSED_LINES lines of `text-body` (0.8125rem × 1.625 line height,
// see globals.css).
const COLLAPSED_HEIGHT = `${COLLAPSED_LINES * 0.8125 * 1.625}rem`;

// The full text is always in the DOM (and the server HTML); collapsing only
// limits the visible height.
export default function About() {
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);
  // Ellipsis via line-clamp only once the collapse animation has finished.
  const [clamped, setClamped] = useState(true);

  const toggle = () => {
    if (!expanded) setClamped(false);
    setExpanded(!expanded);
  };

  return (
    <div className="mt-3">
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : COLLAPSED_HEIGHT }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={() => {
          if (!expanded) setClamped(true);
        }}
        className="overflow-hidden"
      >
        <p
          id="about-text"
          className={`text-body whitespace-pre-line text-justify text-subtext ${
            clamped ? "line-clamp-5" : ""
          }`}
        >
          {t("aboutText")}
        </p>
      </motion.div>
      <TextButton
        className="mt-2"
        label={t(expanded ? "readLess" : "readMore")}
        icon={expanded ? <FaChevronUp /> : <FaChevronDown />}
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls="about-text"
      />
    </div>
  );
}
