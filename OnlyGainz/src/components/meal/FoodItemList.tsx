import { View, ScrollView, Text, FlatList, Pressable } from "react-native";
import { database, config } from "@/lib/appwrite";
import type { Food } from "@/Types/Meal/Food";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { useRouter } from "expo-router";
import { FoodItemCard } from "./FoodItemCard";

// This is just a basic test for displaying the food in the database.
export default function FoodItemList() {
  // We check if the food item is rendered
  console.log("Food item list rendererd");

  // We change the state of the list.
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Asynkron function for fetching food data from the appwrite database
    const getFoods = async () => {
      try {
        const response = await database.listRows({
          databaseId: config.db,
          tableId: config.col.Foods,
        });

        console.log("Appwrite response:", response);
        console.log("Number of foods:", response.rows.length);

        // Parsing the data from the table to an array of type Food.
        const foodData: Food[] = response.rows.map((food) => ({
          id: food.$id,
          name: food.name,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          servingSize: food.servingSize,
          servingUnit: food.servingUnit,
        }));

        // Changing the state of the component
        setFoods(foodData);
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setIsLoading(false);
        console.log("Data fetched successfully!", 200);
      }
    };

    getFoods();
  }, []);

  if (isLoading) {
    return <Text>Loading foods...</Text>;
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FoodItemCard data={item} />}
      ListEmptyComponent={<Text>No foods found.</Text>}
    />
  );
}
