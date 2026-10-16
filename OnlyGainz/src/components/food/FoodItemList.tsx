import { Text, FlatList } from "react-native";
import { database, config } from "@/lib/appwrite";
import type { Food } from "@/Types/Meal/Food";
import { useEffect, useState } from "react";
import { FoodItemCard } from "./FoodItemCard";
import { useLocalSearchParams } from "expo-router";
import { getFoods } from "@/api/Food";

type foodItemListProp = {
  mealType: string;
};
// This is just a basic test for displaying the food in the database.
export default function FoodItemList({ mealType }: foodItemListProp) {
  // We check if the food item is rendered
  console.log("Food item list rendered - ", mealType);

  // We change the state of the list.
  const [foods, setFoods] = useState<Food[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchFoods = async () => {
      // Asynkron function for fetching food data from the appwrite database
      try {
        const response = await getFoods();
        setFoods(response ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (isLoading) {
    return <Text>Loading foods...</Text>;
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FoodItemCard data={item} mealType={mealType} />
      )}
      ListEmptyComponent={<Text>No foods found.</Text>}
    />
  );
}
