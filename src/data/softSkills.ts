import type { IconType } from "react-icons";
import {
  FaArrowsRotate,
  FaBookOpen,
  FaClock,
  FaComments,
  FaHandshake,
  FaMagnifyingGlass,
  FaPuzzlePiece,
} from "react-icons/fa6";
import type { TranslationKey } from "@/i18n/T";

export type SoftSkillItem = {
  icon: IconType;
  labelKey: TranslationKey;
};

export const softSkills: SoftSkillItem[] = [
  { icon: FaComments, labelKey: "softSkillCommunication" },
  { icon: FaHandshake, labelKey: "softSkillCollaboration" },
  { icon: FaPuzzlePiece, labelKey: "softSkillProblemSolving" },
  { icon: FaMagnifyingGlass, labelKey: "softSkillCuriosity" },
  { icon: FaClock, labelKey: "softSkillTimeManagement" },
  { icon: FaArrowsRotate, labelKey: "softSkillAdaptability" },
  { icon: FaBookOpen, labelKey: "softSkillContinuousLearning" },
];
