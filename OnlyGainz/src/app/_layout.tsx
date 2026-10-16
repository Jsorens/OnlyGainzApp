import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";

import { MealsProvider } from "@/contexts/MealsContext";

SplashScreen.preventAutoHideAsync();

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#FFFFFF",
    background: "#3f3d3d",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={CustomTheme}>
      <MealsProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Back", headerShown: false }}
          />

          <Stack.Screen name="foods" options={{ headerShown: false }} />
          <Stack.Screen name="meals" options={{ headerShown: false }} />
        </Stack>
      </MealsProvider>
    </ThemeProvider>
  );
}
