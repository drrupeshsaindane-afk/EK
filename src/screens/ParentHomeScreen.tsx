import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import theme, { heading1, heading2, bodyText } from "../theme";
import { useRootContext } from "../context/RootContext";
import { getModulesByRoot } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ParentHome">;

const ParentHomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    currentRoot,
    currentProfileName,
    setCurrentProfileName,
  } = useRootContext();

  const rootLabel = useMemo(() => {
    if (currentRoot === "india") return "India";
    if (currentRoot === "china") return "China";
    return "Choose a root";
  }, [currentRoot]);

  const modules = currentRoot ? getModulesByRoot(currentRoot) : [];

  const handleProfileSelect = (name: string) => {
    setCurrentProfileName(name);
  };

  const handleModulePress = (moduleId: string) => {
    navigation.navigate("ModuleDetails", { moduleId });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <Text style={[heading1, styles.headingText]}>
            Welcome back, Parent
          </Text>
          {/* Root label – only "India" or "China" now */}
          <Text style={styles.rootLabel}>{rootLabel}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Subscription summary</Text>
          <Text style={styles.cardLine}>Status: Active placeholder</Text>
          <Text style={styles.cardLine}>Plan: Basic</Text>
        </View>

        <View style={styles.profileRow}>
          {["Parent", "Child 1", "Child 2"].map((name) => {
            const isActive = currentProfileName === name;
            return (
              <Pressable
                key={name}
                style={[
                  styles.profileChip,
                  isActive && styles.profileChipActive,
                ]}
                onPress={() => handleProfileSelect(name)}
              >
                <Text
                  style={[
                    styles.profileChipText,
                    isActive && styles.profileChipTextActive,
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[heading2, styles.sectionTitle]}>Modules</Text>

        {modules.map((m) => (
          <ModuleCard
            key={m.id}
            title={m.title}
            subtitle={m.subtitle}
            hasVideo={m.chapters.some((c) => c.type === "video")}
            hasStory={m.chapters.some((c) => c.type === "story")}
            onPress={() => handleModulePress(m.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  headerBlock: {
    marginBottom: theme.spacing.lg,
  },
  headingText: {
    marginBottom: theme.spacing.sm,
  },
  rootLabel: {
    ...bodyText,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    ...heading2,
    marginBottom: theme.spacing.sm,
  },
  cardLine: {
    ...bodyText,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  profileChip: {
    borderRadius: 999,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  profileChipActive: {
    backgroundColor: theme.colors.accentIndia,
    borderColor: theme.colors.accentIndia,
  },
  profileChipText: {
    ...bodyText,
    color: theme.colors.textSecondary,
  },
  profileChipTextActive: {
    color: "#1F2933",
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
});

export default ParentHomeScreen;
