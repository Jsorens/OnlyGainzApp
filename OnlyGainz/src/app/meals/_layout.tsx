import { Stack } from "expo-router";

export default function MealsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[mealId]"
        options={{
          title: "Måltid",
        }}
      />
      <Stack.Screen
        name="editMeal"
        options={{
          presentation: "card",
        }}
      />
    </Stack>
  );
}
