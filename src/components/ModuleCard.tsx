import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import theme from "../theme";

type ModuleCardProps = {
  title: string;
  subtitle: string;
  hasVideo?: boolean;
  hasStory?: boolean;
  onPress: () => void;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ title, subtitle, hasVideo, hasStory, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconRow}>
          {hasVideo ? <Feather name="play-circle" size={18} color={theme.colors.accentChina} /> : null}
          {hasStory ? (
            <Ionicons
              name="book-outline"
              size={18}
              color={theme.colors.accentIndia}
              style={hasVideo ? styles.iconSpacing : undefined}
            />
          ) : null}
        </View>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: theme.spacing.sm,
  },
});

export default ModuleCard;
