// contexts/MealsContext.tsx
// her defiinerer vi en context for appen. Denne skal lagre tilstanden om kalorier enn så lenge.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Food } from "@/Types/Meal/Food";
import type { Meal } from "@/Types/Meal/Meal";

type Macros = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

type OnlyGainzContextType = {
  meals: Meal[];
  addFood: (food: Food, quantity: number, mealType: string) => void;
  removeFood: (id: string) => void;
  getMacros: () => Macros;
};

export const OnlyGainzContext = createContext<OnlyGainzContextType | undefined>(
  undefined,
);

export function MealsProvider({ children }: { children: ReactNode }) {
  // Holder på state og funksjonene
  const [consumedMeals, setConsumedMeals] = useState<Meal[]>([]);
  const [macros, setMacros] = useState<Macros>({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  // Vi lager en funksjon for å kalkulere macros

  // Kjøres for hver rerender, vi lener oss på rerender.
  useEffect(() => {
    const totals = consumedMeals.reduce(
      (total, meal) => {
        meal.foods.forEach((food) => {
          total.calories += food.calories;
          total.carbs += food.carbs;
          total.protein += food.protein;
          total.fat += food.fat;
        });

        return total;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );

    setMacros(totals);
  }, [consumedMeals]);

  function getMacros() {
    return macros;
  }

  function addFood(food: Food, quantity: number, mealType: string) {
    const result: Food = {
      ...food,
      calories: food.calories * quantity,
      carbs: food.carbs * quantity,
      protein: food.protein * quantity,
      fat: food.fat * quantity,
      servingSize: food.servingSize * quantity,
    };

    setConsumedMeals((previous) => [
      ...previous,
      {
        type: mealType,
        foods: [result],
      },
    ]);
  }

  // Funksjon for å fjerne måltid
  function removeFood(id: string) {
    throw console.error("Method not implemented");
  }

  return (
    <OnlyGainzContext.Provider
      value={{ meals: consumedMeals, addFood, removeFood, getMacros }}
    >
      {children}
    </OnlyGainzContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(OnlyGainzContext);

  if (!context) {
    throw new Error("useMeals must be used within a MealsProvider");
  }

  return context;
}
