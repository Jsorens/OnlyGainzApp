import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, useColorScheme } from "react-native";
import { Stack, useRouter, useSegments, Redirect } from "expo-router";
import AuthProvider, { useAuth } from "@/contexts/AuthProvider";
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

export function AppLayoutInner() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loading) return;

    const root = segments[0] as string | undefined;
    const protectedRoots = ["(tabs)", "foods", "meals"];


    const inApp = protectedRoots.includes(root ?? "");
    const inAuth = segments[0] === "auth";

    if (!session && inApp) {  // not logged in and inside (tabs) or root
      router.replace("/auth/login");
    }
    else if (session && inAuth) {
      router.replace("/(tabs)");
    }
  }, [loading, session, segments]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="foods/[foodItemId]"
          options={{ title: "Food Detail", headerShown: true }}
        />
        <Stack.Screen name="meals/[mealId]" options={{ headerShown: true }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <AppLayoutInner />
    </AuthProvider>
  )
}
