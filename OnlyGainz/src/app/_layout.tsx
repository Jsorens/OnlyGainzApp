import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="create-workout-page"
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="workout-page"
          options={{headerShown: false}}
        />
      </Stack>
    </ThemeProvider>
  );
}
