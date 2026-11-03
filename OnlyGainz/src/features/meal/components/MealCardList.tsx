import { Food } from "@/features/food/types/Food";
import { useState } from "react";
import { View } from "react-native";
import MealCard from "@/features/meal/components/MealCard";
// Defining each of the meals
const mealList = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function MealCardList() {
  const [consumedMeals, setConsumedMeals] = useState<Food[]>([]);

  return (
    <View>
      {mealList.map((meal) => (
        <MealCard key={meal} mealType={meal} />
      ))}
    </View>
  );
}
