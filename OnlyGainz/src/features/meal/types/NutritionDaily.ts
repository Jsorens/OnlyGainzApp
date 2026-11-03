export type NutritionDaily = {
  // Type for storing daily nutrition. Keeps track of calories and macros.
  date: string;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  calorieGoal?: number;
  proteinGoal?: number;
  carbGoal?: number;
  fatGoal?: number;
};
