import { View, Text, Pressable, Button } from "react-native";
import type { Food } from "@/Types/Meal/Food";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { type NutritionDaily } from "@/Types/Meal/NutritionDaily";
import { config, database } from "@/lib/appwrite";
import { useMeals } from "@/contexts/MealsContext";

// Oppsummering av dagens Nutrition
export default function DailyNutritionSummary() {
  // Vi lagrer alle states her inne
  const { getMacros } = useMeals();

  const { calories, protein, carbs, fat } = getMacros();
  return (
    <View>
      <Text>
        Calories: {calories} , Protein: {protein} , carbs: {carbs}, fat: {fat},
      </Text>
    </View>
  );
}
