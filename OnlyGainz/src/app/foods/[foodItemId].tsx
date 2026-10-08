// This represents a single food item.
import { View, Text } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import type { Food } from "@/Types/Meal/Food";

export default function foodDetail() {
  const { foodItemData } = useLocalSearchParams<{
    foodItemData?: string;
  }>();

  if (!foodItemData) {
    return <Text>Food data not found</Text>;
  }

  let data: Food;

  try {
    data = JSON.parse(foodItemData) as Food;
  } catch {
    return <Text>Invalid food data</Text>;
  }

  console.log("Food detail rendered");
  return (
    <View>
      <Text>{data.name}</Text>
      <Text>
        Kcal: {data.calories} | protein: {data.protein} | carbs: {data.carbs} |
        fat {data.fat}
      </Text>
      <Text>
        Serving: {data.servingSize} {data.servingUnit}
      </Text>
    </View>
  );
}
