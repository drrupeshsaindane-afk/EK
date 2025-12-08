import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getModuleById } from "../data/modules";
import theme from "../theme";
import { RootStackParamList } from "../navigation/RootNavigator";

const ModuleDetailsScreen: React.FC<NativeStackScreenProps<RootStackParamList, "ModuleDetails">> = ({
  route,
  navigation,
}) => {
  const { moduleId } = route.params;
  const module = getModuleById(moduleId);

  if (!module) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Module not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>{module.title}</Text>
      <Text style={styles.subtitle}>{module.subtitle}</Text>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Chapters</Text>
      </View>

      {module.chapters.map((chapter) => (
        <Pressable
          key={chapter.id}
          style={styles.chapterRow}
          onPress={() => navigation.navigate("Chapter", { chapterId: chapter.id })}
        >
          <View style={styles.chapterHeader}>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <Text style={styles.badge}>{chapter.type === "video" ? "Video" : "Story"}</Text>
          </View>
          <Text style={styles.chapterDescription}>{chapter.shortDescription}</Text>
        </Pressable>
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
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  chapterRow: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  chapterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  chapterTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  badge: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.backgroundAlt,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    fontSize: 12,
  },
  chapterDescription: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});

export default ModuleDetailsScreen;
