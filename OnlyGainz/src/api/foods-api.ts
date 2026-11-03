import { config, database } from "@/lib/appwrite";
import { Food } from "@/Types/Meal/Food";

// Dette enedepunket er en ai-generert nettside for å hente matdata fra OnlyGainz API og brukes til å hente informasjon om matvarer.
// URI for OnlyGainz API endpoint for foods.
const URI = "https://onlygainz.onlygainzapp.workers.dev/api/v1/foods";
// Asynkron function for fetching food data from the appwrite database
export async function getFoodsAppwrite(): Promise<Food[] | undefined> {
  try {
    const response = await database.listRows({
      databaseId: config.db,
      tableId: config.col.Foods,
    });

    //console.log("Appwrite response:", response.total);
    //console.log("Number of foods:", response.rows.length);

    // Parsing the data from the table to an array of type Food.

    const foodData: Food[] = response.rows.map((food) => ({
      id: food.$id,
      name: food.name,
      macros: {
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      },

      servingSize: food.servingSize,
      servingUnit: food.servingUnit,
    }));

    // Changing the state of the component
    return foodData;
  } catch (error) {
    console.error("Failed to fetch foods", error);
  } finally {
    console.log({ message: "Data fetched successfully!", status: 200 });
  }
}

export async function getFoodsAPI(): Promise<Food[] | undefined> {
  const res = await fetch(URI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch foods from API");
  }

  const result = await res.json();

  const data: Food[] = result.data.map((food: any) => ({
    id: food.id,
    name: food.name,
    macros: {
      calories: food.caloriesPer100g,
      protein: Math.round(food.proteinPer100g * 10) / 10,
      carbs: Math.round(food.carbsPer100g * 10) / 10,
      fat: Math.round(food.fatPer100g * 10) / 10,
    },
    servingSize: 100,
    servingUnit: "g",
  }));

  if (!data) {
    throw new Error("Kunne ikke hente matvarer");
  }

  return data || [];
}

export async function getFoodByIdAppwrite(
  id: string,
): Promise<Food | undefined> {
  try {
    const response = await database.getRow({
      databaseId: config.db,
      tableId: config.col.Foods,
      rowId: id,
    });

    if (!response) return undefined;

    const food: Food = {
      id: response.$id,
      name: response.name,
      macros: {
        calories: response.calories,
        protein: response.protein,
        carbs: response.carbs,
        fat: response.fat,
      },
      servingSize: response.servingSize,
      servingUnit: response.servingUnit,
    };

    return food;
  } catch (error) {
    console.error("Failed to fetch food by ID", error);
    return undefined;
  }
}
