import { TextStyle } from "react-native";

const theme = {
  colors: {
    // Deep navy background
    backgroundDark: "#020617",
    // Slight variation if needed for headers/alt areas
    backgroundAlt: "#030712",
    // Lighter bluish-gray for cards and avatar circles so they stand out
    cardDark: "#111827",
    accentIndia: "#f97316",
    accentChina: "#38bdf8",
    textPrimary: "#f9fafb",
    textSecondary: "#9ca3af",
    borderSubtle: "#1f2937",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 20,
  },
};

export type Theme = typeof theme;

export const heading1: TextStyle = {
  fontSize: 26,
  fontWeight: "700",
  color: theme.colors.textPrimary,
};

export const heading2: TextStyle = {
  fontSize: 20,
  fontWeight: "600",
  color: theme.colors.textPrimary,
};

export const bodyText: TextStyle = {
  fontSize: 15,
  color: theme.colors.textSecondary,
};

export default theme;
