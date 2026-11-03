// API for logging meals
import type { Food } from "@/Types/Meal/Food";
import type { MealLog } from "@/Types/Meal/MealLog";
import { account, config, database } from "@/lib/appwrite";
import { ID, Models, Query } from "react-native-appwrite";

type MealRow = {
  userId: string;
  type: string;
  date: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number;
  unit: Food["servingUnit"];
  quantity: number;
};

function toRow(meal: MealLog, userId: string): MealRow {
  const f = meal.foodItem;
  return {
    userId,
    type: meal.type,
    date: meal.date.toISOString(),
    foodName: f.name ?? "Ukjent",
    calories: Math.round(f.macros?.calories ?? 0),
    protein: f.macros?.protein ?? 0,
    carbs: f.macros?.carbs ?? 0,
    fat: f.macros?.fat ?? 0,
    servingSize: 100,
    unit: "g",
    quantity: meal.quantity,
  };
}

function fromRow(row: Models.Row & MealRow): MealLog {
  return {
    id: row.$id,
    userId: row.userId,
    type: row.type,
    date: new Date(row.date),
    quantity: row.quantity,
    foodItem: {
      name: row.foodName,
      servingSize: 100,
      servingUnit: "g",
      macros: {
        calories: row.calories,
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
      },
    },
  };
}

interface MealsAPI {
  logMeal(meal: Partial<MealLog>): Promise<MealLog>;
  getMealLogs(): Promise<MealLog[]>;
  deleteMeal(id: string): Promise<void>;
}

export function useMealsAPI(): MealsAPI {
  return {
    logMeal: logMealAppwrite,
    getMealLogs: getMealsAppwrite,
    deleteMeal: deleteMealAppwrite,
  };
}

async function logMealAppwrite(meal: Partial<MealLog>): Promise<MealLog> {
  const user = await account.get(); // kaster hvis ikke innlogget

  if (!user.$id) {
    throw new Error("User not authenticated");
  }

  const row = await database.createRow<Models.Row & MealRow>({
    databaseId: config.db,
    tableId: config.col.Meals,
    rowId: ID.unique(),
    data: toRow(meal as MealLog, user.$id),
  });

  return fromRow(row);
}

async function getMealsAppwrite(): Promise<MealLog[]> {
  const user = await account.get();
  if (!user.$id) {
    throw new Error("User not authenticated");
  }
  const res = await database.listRows<Models.Row & MealRow>({
    databaseId: config.db,
    tableId: config.col.Meals,
    queries: [
      Query.equal("userId", user.$id),
      Query.orderDesc("date"),
      Query.limit(100),
    ],
  });

  console.log("Fetched meals:", res.rows);

  return res.rows.map(fromRow);
}

async function deleteMealAppwrite(id: string): Promise<void> {
  const user = await account.get(); // kaster hvis brukeren ikke er innlogget

  if (!user.$id) {
    throw new Error("User not authenticated");
  } else if (!id) {
    throw new Error("Invalid meal ID");
  }

  await database.deleteRow({
    databaseId: config.db,
    tableId: config.col.Meals,
    rowId: id,
  });
}
