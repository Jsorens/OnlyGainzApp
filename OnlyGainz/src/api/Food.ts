import { config, database } from "@/lib/appwrite";
import { Food } from "@/Types/Meal/Food";

// Asynkron function for fetching food data from the appwrite database
export async function getFoods(): Promise<Food[] | undefined> {
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
