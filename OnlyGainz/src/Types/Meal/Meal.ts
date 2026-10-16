import { MealLog } from "../Meal/MealLog";
import { MealType } from "../Meal/MealType";

// This type stores the foods you have eaten for a specific meal of the day.
export type Meal = {
  type: string;
  foods: MealLog[];
};
