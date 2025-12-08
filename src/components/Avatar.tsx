import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../theme";

type AvatarProps = {
  name: string;
  avatarUri?: string;
  onPress: () => void;
  onEdit?: () => void;
};

const AVATAR_SIZE = 96;

const getInitials = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return "";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ name, avatarUri, onPress, onEdit }) => {
  const initials = getInitials(name);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.avatarWrapper}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
        )}

        {onEdit && (
          <Pressable style={styles.editButton} onPress={onEdit}>
            <MaterialIcons
              name="edit"
              size={18}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        )}
      </View>

      <Text style={styles.label}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: theme.spacing.lg,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.colors.borderSubtle,
  },
  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: theme.colors.cardDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.borderSubtle,
  },
  initials: {
    color: theme.colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.backgroundAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  label: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Avatar;
