import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ModuleCard from "../components/ModuleCard";
import { getModulesByRoot } from "../data/modules";
import theme from "../theme";
import { useRootContext } from "../context/RootContext";
import { RootStackParamList } from "../navigation/RootNavigator";

const KidsHomeScreen: React.FC<NativeStackScreenProps<RootStackParamList, "KidsHome">> = ({
  route,
  navigation,
}) => {
  const { profileName } = route.params;
  const { currentRoot, lastViewedChapterIdByProfile } = useRootContext();
  const modules = currentRoot ? getModulesByRoot(currentRoot) : [];
  const lastChapterId = lastViewedChapterIdByProfile[profileName];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Hi, {profileName}</Text>

      {lastChapterId ? (
        <Pressable
          style={styles.continueCard}
          onPress={() => navigation.navigate("Chapter", { chapterId: lastChapterId })}
        >
          <Text style={styles.cardTitle}>Continue</Text>
          <Text style={styles.cardText}>Jump back into your last chapter.</Text>
        </Pressable>
      ) : null}

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
    marginBottom: theme.spacing.lg,
  },
  continueCard: {
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
    marginBottom: theme.spacing.xs,
  },
  cardText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
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

export default KidsHomeScreen;
