import { Food } from "../../food/types/Food";
export type MealLog = {
  id: string;
  type: string;
  date: Date;
  userId: string;
  quantity: number;
  foodItem: Partial<Food>;
};
