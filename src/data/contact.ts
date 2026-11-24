import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaLocationDot, FaPhone } from "react-icons/fa6";

export type ContactItem = {
  icon: IconType;
  label: string;
  href: string;
};

const mapsQuery = encodeURIComponent("Meclis Mahallesi Asi Sokak, Sancaktepe, İstanbul");

export const contacts: ContactItem[] = [
  { icon: FaPhone, label: "+90 534 623 52 70", href: "tel:+905346235270" },
  {
    icon: FaLocationDot,
    label: "Sancaktepe/İstanbul",
    href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  },
  { icon: FaLinkedin, label: "linkedin/omerakkoca", href: "https://www.linkedin.com/in/omerakkoca/" },
  { icon: FaEnvelope, label: "omerakkoca1042@gmail.com", href: "mailto:omerakkoca1042@gmail.com" },
  { icon: FaGithub, label: "github/omer-akkoca", href: "https://github.com/omer-akkoca" },
  { icon: FaInstagram, label: "instagram/omer_akkoca", href: "https://www.instagram.com/omer_akkoca/" },
];
