import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#FFFFFF",
    background: "#3f3d3d",
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={CustomTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="foods/index"
          options={{
            title: "Search Food",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="foods/[foodItemId]"
          options={{ title: "Food Detail", headerShown: true }}
        />
      </Stack>
    </ThemeProvider>
  );
}
