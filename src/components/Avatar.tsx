import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../theme";

type AvatarProps = {
  name: string;
  avatarUri?: string;
  onPress: () => void;
  onEdit?: () => void;
};

const AVATAR_SIZE = 96;

const Avatar: React.FC<AvatarProps> = ({ name, avatarUri, onPress, onEdit }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Pressable style={styles.container} onPress={onPress} onLongPress={onEdit}>
      <View style={styles.avatarWrapper}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
        )}
        {onEdit ? (
          <Pressable style={styles.editButton} onPress={onEdit} hitSlop={8}>
            <MaterialIcons name="edit" size={18} color={theme.colors.textPrimary} />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: theme.spacing.sm,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: theme.colors.cardDark,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.cardDark,
  },
  initials: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  editButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  name: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Avatar;
