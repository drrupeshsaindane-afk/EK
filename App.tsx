import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { RootProvider } from "./src/context/RootContext";
import theme from "./src/theme";

const App = () => {
  return (
    <SafeAreaProvider>
      <RootProvider>
        <StatusBar style="light" backgroundColor={theme.colors.backgroundDark} />
        <RootNavigator />
      </RootProvider>
    </SafeAreaProvider>
  );
};

export default App;
