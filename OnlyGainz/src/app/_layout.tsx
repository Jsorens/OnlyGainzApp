import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, useColorScheme } from "react-native";
import { Stack, useRouter, useSegments, Redirect } from "expo-router";
import AuthProvider from "@/contexts/AuthProvider";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#FFFFFF",
    background: "#2f2f2f",
  },
};

export default function AppLayout() {
  //const { isLoaded, isLoggedIn, isAdmin, login } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="foods/[foodItemId]"
            options={{ title: "Food Detail", headerShown: true }}
          />
          <Stack.Screen name="meals/[mealId]" options={{ headerShown: true }} />
          <Stack.Screen 
            name="admin"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
