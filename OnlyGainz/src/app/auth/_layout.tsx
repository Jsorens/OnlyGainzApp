import Logo from "@/features/shared/Logo";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function LogoHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: 10 }]}>
      <Logo width={150} height={150} />
    </View>
  );
}

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#131312" } }}>
      <Stack.Screen
        name="login"
        options={{ header: () => <LogoHeader />, headerShown: true }}
      />
      <Stack.Screen
        name="register"
        options={{ header: () => <LogoHeader />, headerShown: true }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#100f0f",
    alignItems: "center",
    paddingBottom: 1,
  },
});
