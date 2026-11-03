// contexts/MealsContext.tsx
// her defiinerer vi en context for appen. Denne skal lagre tilstanden om kalorier enn så lenge.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useMealsAPI } from "@/api/meals-api";
import { useAuth } from "@/contexts/AuthProvider";
import type { Food } from "@/Types/Meal/Food";
import type { Macros } from "@/Types/Meal/Macros";
import { MealLog } from "@/Types/Meal/MealLog";
import { account } from "@/lib/appwrite";

type MealsContextType = {
  meals: MealLog[];
  date: Date | null;
  addFood: (food: Food, quantity: number, mealType: string) => void;
  removeFood: (id: string) => void;
  getMacros: () => Macros;
  getMeals: (mealType: string, selectedDate: Date) => MealLog[];
  setDate: (date: Date | null) => void;
};

export const MealsContext = createContext<MealsContextType | undefined>(
  undefined,
);

export function MealsProvider({ children }: { children: ReactNode }) {
  const { logMeal, getMealLogs, deleteMeal } = useMealsAPI();
  // Holder på state og funksjonene
  const [consumedMeals, setConsumedMeals] = useState<MealLog[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [macros, setMacros] = useState<Macros>({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  // Vi lager en funksjon for å kalkulere macros

  // Kjøres for hver rerender, vi lener oss på rerender.

  const { user } = useAuth();

  useEffect(() => {
    const fetchMeals = async () => {
      if (!user || !selectedDate) {
        setConsumedMeals([]);
        return;
      }
      let cancelled = false;
      try {
        const meals = await getMealLogs();
        if (!cancelled) setConsumedMeals(meals);
      } catch (e) {
        console.error("Kunne ikke hente måltider", e);
      }
      return () => {
        cancelled = true;
      };
    };
    fetchMeals();
  }, [user, selectedDate]);

  function getMacros(date: Date): Macros {
    return consumedMeals.reduce(
      (total, meal) => {
        if (meal?.date && meal.date.toDateString() === date.toDateString()) {
          total.calories +=
            (meal.foodItem?.macros?.calories ?? 0) * (meal.quantity ?? 0);
          total.carbs +=
            (meal.foodItem?.macros?.carbs ?? 0) * (meal.quantity ?? 0);
          total.protein +=
            (meal.foodItem?.macros?.protein ?? 0) * (meal.quantity ?? 0);
          total.fat += (meal.foodItem?.macros?.fat ?? 0) * (meal.quantity ?? 0);
        }
        // Runder først til slutt, slik at vi unngår avrundingsfeil underveis
        return {
          calories: Math.round(total.calories * 10) / 10,
          carbs: Math.round(total.carbs * 10) / 10,
          protein: Math.round(total.protein * 10) / 10,
          fat: Math.round(total.fat * 10) / 10,
        };
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    );
  }

  async function addFood(food: Food, quantity: number, mealType: string) {
    // Legger til en matoppføring
    // While id is the same as already existing id's
    const result: Partial<MealLog> = {
      quantity: quantity,
      foodItem: food,
      date: new Date(selectedDate ?? new Date()),
      type: mealType,
    };

    const loggedMeal = await logMeal(result as MealLog);
    setConsumedMeals(
      (previous: MealLog[]) =>
        [...previous, loggedMeal as MealLog] as MealLog[],
    );
  }

  // Funksjon for å fjerne måltid
  async function removeFood(id: string) {
    await deleteMeal(id);
    setConsumedMeals(
      (previousMeals: MealLog[]) =>
        previousMeals.filter((meal) => meal?.id !== id) as MealLog[],
    );
  }

  function getMeals(mealType: string, selectedDate: Date): MealLog[] {
    if (!selectedDate) throw new Error("No date provided");

    return consumedMeals.filter(
      (meal) =>
        meal?.type === mealType &&
        meal?.date?.toDateString() === selectedDate.toDateString(),
    ) as MealLog[];
  }
  return (
    <MealsContext.Provider
      value={{
        meals: consumedMeals,
        date: selectedDate,
        addFood,
        removeFood,
        getMacros: () => getMacros(selectedDate ?? new Date()),
        getMeals,
        setDate: setSelectedDate,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);

  if (!context) {
    throw new Error("useMeals must be used within a MealsProvider");
  }

  return context;
}
