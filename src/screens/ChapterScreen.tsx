import React, { useEffect } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getChapterById } from "../data/modules";
import theme from "../theme";
import { useRootContext } from "../context/RootContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Feather } from "@expo/vector-icons";

const ChapterScreen: React.FC<NativeStackScreenProps<RootStackParamList, "Chapter">> = ({
  route,
  navigation,
}) => {
  const { chapterId } = route.params;
  const chapter = getChapterById(chapterId);
  const { currentProfileName, setLastViewedChapterForProfile } = useRootContext();

  useEffect(() => {
    if (currentProfileName) {
      setLastViewedChapterForProfile(currentProfileName, chapterId);
    }
  }, [chapterId, currentProfileName, setLastViewedChapterForProfile]);

  if (!chapter) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Chapter not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>{chapter.title}</Text>

      {chapter.type === "video" && chapter.videoUrl ? (
        <Pressable style={styles.videoCard} onPress={() => Linking.openURL(chapter.videoUrl!)}>
          <Feather name="play" size={20} color={theme.colors.textPrimary} />
          <Text style={styles.videoText}>Play video</Text>
        </Pressable>
      ) : null}

      {chapter.type === "story" ? (
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{chapter.shortDescription}</Text>
        </View>
      ) : null}

      <Pressable style={styles.quizButton} onPress={() => navigation.navigate("Quiz", { chapterId })}>
        <Text style={styles.quizButtonText}>Test your quotient</Text>
      </Pressable>
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
    marginBottom: theme.spacing.lg,
  },
  videoCard: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  videoText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  storyBox: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  storyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  quizButton: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  quizButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ChapterScreen;
