import { View, Text, TextInput, SafeAreaView } from "react-native";
import FoodItemList from "@/components/food/FoodItemList";
import type { Food } from "@/Types/Meal/Food";
import { useLocalSearchParams } from "expo-router";
import CameraButton from "@/components/food/Camera";
import { SearchField } from "@/components/food/SearchField";
import { getFoodsAPI } from "@/api/foods-api";
import { useState, useEffect } from "react";

// This represents the screen for foods
export default function FoodScreen() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();

  const fetchMethod = getFoodsAPI;
  // We check if the food item is rendered
  console.log("Food item list rendered - ", mealId);
  const [searchText, setSearchText] = useState("");
  // We change the state of the list.
  const [foods, setFoods] = useState<Food[]>([]);

  const filteredFoods = foods.filter((food) =>
    // Metode for å filtrere matvarer basert på søketekst
    // Sjekker om matvarenavn inkluderer søketeksten (case-insensitive)
    food.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
    //console.log("Search text changed: ", text);
  };

  useEffect(() => {
    // Fetches the list of foods from the API when the component mounts
    // and updates the state with the retrieved data
    const fetchFoods = async () => {
      // Asynkron function for fetching food data from the appwrite database
      try {
        const response = await fetchMethod();
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

  console.log("FoodScreen rendered - ", mealId);
  return (
    <SafeAreaView>
      <CameraButton />
      <SearchField value={searchText} onChange={onChangeSearchText} />
      {isLoading ? (
        <SafeAreaView>
          <Text>Loading foods...</Text>
        </SafeAreaView>
      ) : null}
      {!isLoading && foods.length > 0 && (
        <FoodItemList item={filteredFoods} mealType={mealId} />
      )}
      {!isLoading && foods.length === 0 && <Text>No foods found.</Text>}
    </SafeAreaView>
  );
}

// Added export for potential use in other parts of the app
