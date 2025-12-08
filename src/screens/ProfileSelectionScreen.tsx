import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/Avatar";
import theme from "../theme";
import { useRootContext } from "../context/RootContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Profile = {
  name: "Parent" | "Child 1" | "Child 2";
};

const profiles: Profile[] = [
  { name: "Parent" },
  { name: "Child 1" },
  { name: "Child 2" },
];

const ProfileSelectionScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "ProfileSelection">
> = ({ navigation }) => {
  const { setCurrentProfileName } = useRootContext();
  const [avatarUris, setAvatarUris] = useState<Record<string, string | undefined>>({});

  const pickImage = useCallback(async (profileName: string) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow media permissions to set an avatar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatarUris((prev) => ({ ...prev, [profileName]: result.assets[0].uri }));
    }
  }, []);

  const handleProfilePress = (name: string) => {
    setCurrentProfileName(name);
    if (name === "Parent") {
      navigation.navigate("ParentRoot");
    } else {
      navigation.navigate("KidsHome", { profileName: name });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Who is watching?</Text>
      <View style={styles.avatarColumn}>
        {profiles.map((profile) => (
          <Avatar
            key={profile.name}
            name={profile.name}
            avatarUri={avatarUris[profile.name]}
            onPress={() => handleProfilePress(profile.name)}
            onEdit={() => pickImage(profile.name)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundDark,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xl,
  },
  avatarColumn: {
    width: "100%",
    alignItems: "center",
  },
});

export default ProfileSelectionScreen;
