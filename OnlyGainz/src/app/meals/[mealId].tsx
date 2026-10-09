// This represents a single food item.
import { View, Text } from "react-native";
import { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import type { Food } from "@/Types/Meal/Food";
import FoodScreen from "@/app/foods";

export default function MealDetail() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();
  console.log("Rendered", mealId, "Page");
  return (
    <View>
      <Stack.Screen options={{ title: mealId }} />

      <FoodScreen />
    </View>
  );
}
