import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LOGO_IMAGE_URL } from "../config";
import theme from "../theme";
import { RootStackParamList } from "../navigation/RootNavigator";

const SplashScreen: React.FC<NativeStackScreenProps<RootStackParamList, "Splash">> = ({
  navigation,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    console.log("Loading logo from", LOGO_IMAGE_URL);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    Animated.timing(scale, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "ProfileSelection" as never }],
      });
    }, 2200);

    return () => clearTimeout(timeout);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: LOGO_IMAGE_URL }}
        resizeMode="contain"
        style={[styles.logo, { opacity, transform: [{ scale }] }]}
        onError={(e) => console.log("Failed to load logo", e.nativeEvent.error)}
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
