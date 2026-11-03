import { Food } from "../Meal/Food";
export type MealLog = {
  id: string;
  type: string;
  date: Date;
  userId: string;
  quantity: number;
  foodItem: Partial<Food>;
};
