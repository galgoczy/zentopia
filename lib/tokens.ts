// Brand tokens — punchier palette is the default (set via tailwind.config + here mirrored for inline access).

export const Z = {
  offwhite: "#FAFAF7",
  white: "#FFFFFF",
  forest: "#0F1F1A",
  forestDeep: "#081310",
  lime: "#C8FF6B",
  slate: "#5A6F66",
  hairline: "#E8E4D8",
  // punchier palette (chosen default)
  ember: "#F08947",
  sky: "#5B92FF",
  violet: "#A289FF",
  coral: "#FF6F8C",
  sunshine: "#FFC83A",
} as const;

export type AccentKey = "ember" | "sky" | "violet" | "coral" | "sunshine";
