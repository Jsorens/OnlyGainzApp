import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, useColorScheme } from "react-native";
import { Stack, useRouter, useSegments, Redirect } from "expo-router";
import AuthProvider, { useAuth } from "@/features/contexts/AuthProvider";
import { useEffect } from "react";
import { MealsProvider } from "@/features/contexts/MealsContext";

SplashScreen.preventAutoHideAsync();

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#FFFFFF",
    background: "#161616",
  },
};

export function RootLayoutInner() {
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

    if (!session && inApp) {
      // not logged in and inside (tabs) or root
      router.replace("/auth/login");
    } else if (session && inAuth) {
      router.replace("/(tabs)");
    }
  }, [loading, session, segments]);

  if (loading) {
    return <ActivityIndicator />;
  }

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
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </MealsProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}
