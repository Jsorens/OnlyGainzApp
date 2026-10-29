import { Food } from "../Meal/Food";
export type MealLog = {
  id: string;
  type: string;
  date: Date;
  quantity: number;
  foodItem: Food;
};
