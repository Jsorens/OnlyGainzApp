import MealCard from "@/components/meal/MealCard";
import { Food } from "@/Types/Meal/Food";
import { useState } from "react";
import { View } from "react-native";

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
