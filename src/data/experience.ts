import type { TranslationKey } from "@/i18n/T";

export type ExperienceItem = {
  id: string;
  /** Company name; a proper noun, so not translated. */
  company: string;
  /** Logo path under /public (shown 50×50). */
  logo: string;
  roleKey: TranslationKey;
  employmentTypeKey: TranslationKey;
  /** Short summary of the work, shown under company · type. */
  descriptionKey: TranslationKey;
  /** ISO year-month, e.g. "2023-09". */
  startDate: string;
  /** ISO year-month; omit for the current job ("Present"). */
  endDate?: string;
};

// Newest first.
export const experience: ExperienceItem[] = [
  {
    id: "isinolacak",
    company: "İşin Olacak",
    logo: "/experience/isinolacak.png",
    roleKey: "roleReactNativeDeveloper",
    employmentTypeKey: "employmentFullTime",
    descriptionKey: "experienceIsinolacakDesc",
    startDate: "2025-06",
    endDate: "2025-10",
  },
  {
    id: "appril",
    company: "Appril Digital",
    logo: "/experience/appril_digital.jpeg",
    roleKey: "roleMobileDeveloperFlutter",
    employmentTypeKey: "employmentFreelance",
    descriptionKey: "experienceApprilDesc",
    startDate: "2024-10",
    endDate: "2025-02",
  },
  {
    id: "coino",
    company: "CoinO",
    logo: "/experience/coino.png",
    roleKey: "roleReactNativeDeveloper",
    employmentTypeKey: "employmentFullTime",
    descriptionKey: "experienceCoinoDesc",
    startDate: "2023-05",
    endDate: "2024-09",
  },
  {
    id: "sellmify-freelance",
    company: "Sellmify",
    logo: "/experience/sellmify.png",
    roleKey: "roleFrontendReactNativeDeveloper",
    employmentTypeKey: "employmentFreelance",
    descriptionKey: "experienceSellmifyFreelanceDesc",
    startDate: "2023-09",
    endDate: "2024-01",
  },
  {
    id: "noxarc",
    company: "Noxarc",
    logo: "/experience/noxarc.jpeg",
    roleKey: "roleReactNativeDeveloper",
    employmentTypeKey: "employmentFullTime",
    descriptionKey: "experienceNoxarcDesc",
    startDate: "2022-07",
    endDate: "2023-03",
  },
  {
    id: "sellmify-fulltime",
    company: "Sellmify",
    logo: "/experience/sellmify.png",
    roleKey: "roleFrontendReactNativeDeveloper",
    employmentTypeKey: "employmentFullTime",
    descriptionKey: "experienceSellmifyFulltimeDesc",
    startDate: "2021-12",
    endDate: "2022-06",
  },
];
