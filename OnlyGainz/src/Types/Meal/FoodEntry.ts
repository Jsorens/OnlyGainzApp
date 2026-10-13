import { Food } from "../Meal/Food";
// This type represents serving of a food. It stores macros, and serving size.
export type FoodEntry = {
  id: string;
  food: Food;

  amount: number;

  // Nutrition calculated from amount
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
