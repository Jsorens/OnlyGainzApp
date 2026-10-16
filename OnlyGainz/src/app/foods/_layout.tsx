import { Stack } from "expo-router";

export default function FoodsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Foods" }} />
      <Stack.Screen
        name="[foodItemId]"
        options={{ title: "Food Detail", headerShown: true }}
      />
    </Stack>
  );
}
