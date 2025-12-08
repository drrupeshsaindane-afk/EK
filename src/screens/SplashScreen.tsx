import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../theme";
import { LOGO_IMAGE_URL } from "../config";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Splash LOGO_IMAGE_URL:", LOGO_IMAGE_URL);

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "ProfileSelection" as never }],
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: LOGO_IMAGE_URL }}
        resizeMode="contain"
        style={styles.logo}
        onLoad={() => {
          console.log("Splash logo loaded successfully");
        }}
        onError={(e) => {
          console.log("Splash logo failed to load", e.nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
});

export default SplashScreen;
