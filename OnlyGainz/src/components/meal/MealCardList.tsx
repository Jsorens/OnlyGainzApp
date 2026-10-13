import MealCard from "@/components/meal/MealCard";
import { View } from "react-native";

// Defining each of the meals
const mealList = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function MealCardList() {
  return (
    <View>
      {mealList.map((meal) => (
        <MealCard key={meal} mealType={meal} />
      ))}
    </View>
  );
}
