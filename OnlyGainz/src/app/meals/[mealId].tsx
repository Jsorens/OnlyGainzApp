// This represents a single food item.
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import type { Food } from "@/Types/Meal/Food";
import type { Meal } from "@/Types/Meal/Meal";
import FoodScreen from "@/app/foods";
import { useMeals } from "@/contexts/OnlyGainzContext";

export default function MealDetail() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();

  const { meals } = useMeals();

  const mealByType = meals.filter((meal) => meal.type === mealId);

  // Hent alle matvarene fra måltidene med riktig type
  const loggedFoods: Food[] = mealByType.flatMap((meal) => meal.foods);

  console.log("Rendered", mealId, "Page");

  return (
    <View>
      <Stack.Screen options={{ title: mealId }} />
      {loggedFoods.map((food, index) => (
        <View key={`${food.id}-${index}`}>
          <Text>
            {food.name}
            {"\n"}Calories: {food.calories} kcal
            {"\n"}Protein: {food.protein} g{"\n"}Carbs: {food.carbs} g{"\n"}Fat:{" "}
            {food.fat} g
          </Text>

          <Text>
            Serving: {food.servingSize} {food.servingUnit}
          </Text>
        </View>
      ))}
      <Text>Her skal maten fra {mealId} vises </Text>
    </View>
  );
}
