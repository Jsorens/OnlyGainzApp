import { FoodEntry } from "../Meal/FoodEntry";
import { MealType } from "../Meal/MealType";
// This type stores the foods you have eaten for a specific meal of the day.
export type Meal = {
  id: string;
  userId: string;
  type: MealType;
  date: string;

  foods: FoodEntry[];
};
