import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import theme from "../theme";
import { RootStackParamList } from "../navigation/RootNavigator";

const options = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
  { id: "c", label: "Option C" },
];

const correctOption = "b";

const QuizScreen: React.FC<NativeStackScreenProps<RootStackParamList, "Quiz">> = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Quick check</Text>
      <Text style={styles.question}>Which placeholder answer is correct?</Text>

      {options.map((option) => (
        <Pressable
          key={option.id}
          style={({ pressed }) => [
            styles.option,
            pressed && styles.optionPressed,
            selected === option.id && styles.optionSelected,
          ]}
          onPress={() => setSelected(option.id)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </Pressable>
      ))}

      {selected ? (
        <Text style={styles.result}>{selected === correctOption ? "Correct" : "Try again"}</Text>
      ) : null}
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
  question: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  option: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionSelected: {
    borderColor: theme.colors.accentChina,
  },
  optionText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  result: {
    marginTop: theme.spacing.lg,
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default QuizScreen;
