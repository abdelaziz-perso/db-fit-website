import type { Messages } from "@/lib/i18n/types";

export type SpaceKind = "women" | "men" | "mixed";

export type DayScheduleId = "week" | "sunday";

type BlockDef = {
  kind: SpaceKind;
  slots: string[];
};

const weekBlocks: BlockDef[] = [
  {
    kind: "women",
    slots: ["09:00 – 11:00", "18:00 – 20:00"],
  },
  {
    kind: "mixed",
    slots: ["13:00 – 18:00"],
  },
  {
    kind: "men",
    slots: ["11:00 – 13:00", "20:00 – 23:00"],
  },
];

const sundayBlocks: BlockDef[] = [
  {
    kind: "men",
    slots: ["10:00 – 12:30"],
  },
  {
    kind: "women",
    slots: ["12:30 – 15:00"],
  },
];

function labelForKind(h: Messages["horaires"], kind: SpaceKind): string {
  switch (kind) {
    case "women":
      return h.spaceWomen;
    case "men":
      return h.spaceMen;
    default:
      return h.spaceMixed;
  }
}

export type LocalizedDaySchedule = {
  id: DayScheduleId;
  label: string;
  description: string;
  blocks: {
    kind: SpaceKind;
    label: string;
    slots: string[];
  }[];
};

export function getLocalizedSchedules(h: Messages["horaires"]): LocalizedDaySchedule[] {
  return [
    {
      id: "week",
      label: h.weekTab,
      description: h.weekDescription,
      blocks: weekBlocks.map((b) => ({
        ...b,
        label: labelForKind(h, b.kind),
      })),
    },
    {
      id: "sunday",
      label: h.sundayTab,
      description: h.sundayDescription,
      blocks: sundayBlocks.map((b) => ({
        ...b,
        label: labelForKind(h, b.kind),
      })),
    },
  ];
}
