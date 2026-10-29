// This represents a single food item.
import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import { useEffect, useReducer, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import type { Food } from "@/Types/Meal/Food";
import FoodScreen from "@/app/foods";
import { useMeals } from "@/contexts/MealsContext";
import { router } from "expo-router";
import { MealLog } from "@/Types/Meal/MealLog";
export default function MealDetail() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();
  const { getMeals, removeFood } = useMeals();
  // Tilstanden for måltid som er her
  const [, setTick] = useState(0);

  const { date: selectedDate } = useMeals();
  if (!selectedDate) return false;

  const loggedFoods = getMeals(mealId, selectedDate);

  console.log("Rendered", mealId, "Page");

  const handleRemove = (id: string) => {
    removeFood(id);
    setTick((ticket) => ticket + 1);
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: mealId }} />
      <ScrollView>
        {loggedFoods.map((log, index) => (
          <View key={`${log.foodItem.id}-${index}`}>
            <Text>
              {log.foodItem.name}
              {"\n"}Calories: {log.foodItem.macros.calories * log.quantity} kcal
              {"\n"}Protein: {log.foodItem.macros.protein * log.quantity} g
              {"\n"}
              Carbs: {log.foodItem.macros.carbs * log.quantity} g{"\n"}
              Fat: {log.foodItem.macros.fat * log.quantity} g
            </Text>
            <Text>
              Serving: {log.foodItem.servingSize * log.quantity}{" "}
              {log.foodItem.servingUnit}
            </Text>
            <Button title="Remove" onPress={() => handleRemove(log.id)} />
            <Button
              title="Edit"
              onPress={() =>
                router.push({
                  pathname: "/meals/editMeal",
                  params: {
                    mealLog: JSON.stringify(log),
                    mealId: mealId,
                  },
                })
              }
            />
          </View>
        ))}
      </ScrollView>
      <Text>Her skal maten fra {mealId} vises </Text>
    </SafeAreaView>
  );
}
