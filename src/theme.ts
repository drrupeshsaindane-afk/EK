import { TextStyle } from "react-native";

const theme = {
  colors: {
    // Main background – rich purple
    backgroundDark: "#680385",
    // Slight variation for alt areas
    backgroundAlt: "#53026A",
    // Card / avatar background – darker, so it still stands out
    cardDark: "#3D044F",
    // Accents
    accentIndia: "#FFD166",
    accentChina: "#5FE3FF",
    textPrimary: "#FDF4FF",
    textSecondary: "#E9D5FF",
    borderSubtle: "#A855F7",
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

// Preferred font – will use system fallback if not available on device
const baseFontFamily = "Bookman Old Style";

export const heading1: TextStyle = {
  fontFamily: baseFontFamily,
  fontSize: 26,
  fontWeight: "700",
  color: theme.colors.textPrimary,
};

export const heading2: TextStyle = {
  fontFamily: baseFontFamily,
  fontSize: 20,
  fontWeight: "600",
  color: theme.colors.textPrimary,
};

export const bodyText: TextStyle = {
  fontFamily: baseFontFamily,
  fontSize: 15,
  color: theme.colors.textSecondary,
};

export default theme;
