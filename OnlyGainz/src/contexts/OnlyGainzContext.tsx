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
import type { Macros } from "@/Types/Meal/Macros";
import { MealLog } from "@/Types/Meal/MealLog";

type OnlyGainzContextType = {
  meals: Meal[];
  addFood: (food: Food, quantity: number, mealType: string) => void;
  removeFood: (id: string, mealType: string) => void;
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
        meal.foods.forEach((log) => {
          total.calories += log.foodItem.macros.calories;
          total.carbs += log.foodItem.macros.carbs;
          total.protein += log.foodItem.macros.protein;
          total.fat += log.foodItem.macros.fat;
        });

        return total;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );

    setMacros(totals);
  }, [consumedMeals]);

  function getMacros(): Macros {
    return consumedMeals.reduce(
      (total, meal) => {
        meal.foods.forEach((log) => {
          total.calories += log.foodItem.macros.calories * log.quantity;
          total.carbs += log.foodItem.macros.carbs * log.quantity;
          total.protein += log.foodItem.macros.protein * log.quantity;
          total.fat += log.foodItem.macros.fat * log.quantity;
        });
        return total;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    );
  }

  function addFood(food: Food, quantity: number, mealType: string) {
    // Legger til en matoppføring
    // While id is the same as already existing id's
    let randomId: string;
    let exists: boolean;
    do {
      randomId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      exists = consumedMeals.some((meal) => {
        meal.foods.some((log) => log.id === randomId);
      });
    } while (exists);

    const result: MealLog = {
      id: randomId,
      quantity: quantity,
      foodItem: food,
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
  function removeFood(id: string, mealType: string) {
    setConsumedMeals((previousMeals) =>
      previousMeals.map((meal) => {
        if (meal.type !== mealType) {
          return meal;
        }

        return {
          ...meal,
          foods: meal.foods.filter((log) => log.id !== id),
        };
      }),
    );
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
