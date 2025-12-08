import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getModulesByRoot } from "../data/modules";
import theme from "../theme";
import ModuleCard from "../components/ModuleCard";
import { useRootContext } from "../context/RootContext";
import { RootStackParamList } from "../navigation/RootNavigator";

const profiles = ["Parent", "Child 1", "Child 2"];

const ParentHomeScreen: React.FC<NativeStackScreenProps<RootStackParamList, "ParentHome">> = ({
  navigation,
}) => {
  const { currentRoot, setCurrentProfileName } = useRootContext();
  const modules = currentRoot ? getModulesByRoot(currentRoot) : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Welcome back, Parent</Text>
      <Text style={styles.subHeading}>
        Current root: {currentRoot ? (currentRoot === "india" ? "India" : "China") : "None"}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Subscription summary</Text>
        <Text style={styles.cardText}>Status: Active placeholder</Text>
        <Text style={styles.cardText}>Plan: Basic</Text>
      </View>

      <View style={styles.chipRow}>
        {profiles.map((profile) => (
          <Pressable
            key={profile}
            style={({ pressed }) => [
              styles.chip,
              pressed && styles.chipPressed,
              profile === "Parent" && styles.chipActive,
            ]}
            onPress={() => setCurrentProfileName(profile)}
          >
            <Text style={styles.chipText}>{profile}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Modules</Text>
      </View>

      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          title={module.title}
          subtitle={module.subtitle}
          hasStory={module.chapters.some((c) => c.type === "story")}
          hasVideo={module.chapters.some((c) => c.type === "video")}
          onPress={() => navigation.navigate("ModuleDetails", { moduleId: module.id })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
  },
  content: {
    padding: theme.spacing.lg,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  subHeading: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  chipRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  chip: {
    backgroundColor: theme.colors.backgroundAlt,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  chipActive: {
    backgroundColor: theme.colors.cardDark,
  },
  chipPressed: {
    opacity: 0.8,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionHeader: {
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ParentHomeScreen;
