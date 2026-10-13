import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { UserProvider } from "./authProvider/context/UserContext"; 

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
    <UserProvider>
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="foods/[foodItemId]"
            options={{ title: "Food Detail", headerShown: true }}
          />
          <Stack.Screen name="meals/[mealId]" options={{ headerShown: true }} />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
