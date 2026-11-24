import type { TranslationKey } from "@/i18n/T";

export type EducationItem = {
  id: string;
  schoolKey: TranslationKey;
  fieldKey: TranslationKey;
  startYear: number;
  endYear: number;
};

export const education: EducationItem[] = [
  {
    id: "ktu",
    schoolKey: "educationKtuSchool",
    fieldKey: "educationKtuField",
    startYear: 2018,
    endYear: 2023,
  },
];
