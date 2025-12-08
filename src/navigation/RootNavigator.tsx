import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "../theme";
import SplashScreen from "../screens/SplashScreen";
import ProfileSelectionScreen from "../screens/ProfileSelectionScreen";
import ParentRootScreen from "../screens/ParentRootScreen";
import ParentHomeScreen from "../screens/ParentHomeScreen";
import KidsHomeScreen from "../screens/KidsHomeScreen";
import ModuleDetailsScreen from "../screens/ModuleDetailsScreen";
import ChapterScreen from "../screens/ChapterScreen";
import QuizScreen from "../screens/QuizScreen";

export type RootStackParamList = {
  Splash: undefined;
  ProfileSelection: undefined;
  ParentRoot: undefined;
  ParentHome: undefined;
  KidsHome: { profileName: string };
  ModuleDetails: { moduleId: string };
  Chapter: { chapterId: string };
  Quiz: { chapterId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.backgroundDark },
          headerTintColor: theme.colors.textPrimary,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ProfileSelection"
          component={ProfileSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ParentRoot" component={ParentRootScreen} />
        <Stack.Screen name="ParentHome" component={ParentHomeScreen} />
        <Stack.Screen name="KidsHome" component={KidsHomeScreen} />
        <Stack.Screen name="ModuleDetails" component={ModuleDetailsScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
