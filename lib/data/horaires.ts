import type { Messages } from "@/lib/i18n/types";

export type SpaceKind = "women" | "men" | "mixed";

export type DayScheduleId = "week" | "sunday";

type BlockDef = {
  kind: SpaceKind;
  slots: string[];
};

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
  const weekBlocks: BlockDef[] = [
    { kind: "women", slots: h.weekSlots.women },
    { kind: "mixed", slots: h.weekSlots.mixed },
    { kind: "men", slots: h.weekSlots.men },
  ];

  const sundayBlocks: BlockDef[] = [
    { kind: "men", slots: h.sundaySlots.men },
    { kind: "women", slots: h.sundaySlots.women },
  ];

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
