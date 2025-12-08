import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CHINA_IMAGE_URL, INDIA_IMAGE_URL } from "../config";
import theme from "../theme";
import { useRootContext } from "../context/RootContext";
import { RootStackParamList } from "../navigation/RootNavigator";

type RootCardProps = {
  title: string;
  flag: string;
  imageUrl: string;
  caption: string;
  onPress: () => void;
};

const RootCard: React.FC<RootCardProps> = ({ title, flag, imageUrl, caption, onPress }) => (
  <Pressable style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>
        {flag} {title}
      </Text>
    </View>
    <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="contain" />
    <Text style={styles.cardCaption}>{caption}</Text>
  </Pressable>
);

const ParentRootScreen: React.FC<NativeStackScreenProps<RootStackParamList, "ParentRoot">> = ({
  navigation,
}) => {
  const { setCurrentRoot } = useRootContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose your roots</Text>
      <RootCard
        title="India"
        flag="🇮🇳"
        imageUrl={INDIA_IMAGE_URL}
        caption="Explore stories from India"
        onPress={() => {
          setCurrentRoot("india");
          navigation.navigate("ParentHome");
        }}
      />
      <RootCard
        title="China"
        flag="🇨🇳"
        imageUrl={CHINA_IMAGE_URL}
        caption="Explore stories from China"
        onPress={() => {
          setCurrentRoot("china");
          navigation.navigate("ParentHome");
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    textAlign: "left",
  },
  card: {
    backgroundColor: theme.colors.cardDark,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  cardHeader: {
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.sm,
  },
  cardCaption: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});

export default ParentRootScreen;
