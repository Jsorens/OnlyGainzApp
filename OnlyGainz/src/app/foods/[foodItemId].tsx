// This represents a single food item.
import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import type { Food } from "@/Types/Meal/Food";
import type { MealType } from "@/Types/Meal/MealType";
import { useMeals } from "@/contexts/OnlyGainzContext";
import ServingSize from "@/components/meal/ServingSize";

// This represents the page for details about a certain food
export default function foodDetail() {
  const { foodItemData, mealId } = useLocalSearchParams<{
    foodItemData?: string;
    mealId?: string;
  }>();

  const { addFood } = useMeals();

  if (!foodItemData) {
    return <Text>Food data not found</Text>;
  }

  let data: Food;

  try {
    data = JSON.parse(foodItemData) as Food;
  } catch {
    return <Text>Invalid food data</Text>;
  }

  // Jeg ønsker å definere hvor mye av en food jeg ønsker å legge til
  const [quantity, setQuantity] = useState("1");

  // Konverterer fra string til number
  const numQuantity = Number(quantity) || 0;

  const recalculateMacros = (): Food => {
    const newCalories = data.calories * numQuantity;
    const newCarbs = data.carbs * numQuantity;
    const newProtein = data.protein * numQuantity;
    const newFat = data.fat * numQuantity;
    const newServingSize = data.servingSize * numQuantity;

    return {
      ...data,
      calories: newCalories,
      carbs: newCarbs,
      protein: newProtein,
      fat: newFat,
      servingSize: newServingSize,
    };
  };

  console.log("Food detail rendered - ", mealId);
  return (
    <View>
      <Text>{data.name}</Text>
      <Text>
        Kcal: {data.calories * numQuantity} | protein:
        {data.protein * numQuantity} | carbs:{data.carbs * numQuantity}
      </Text>
      <Text>
        Serving: {data.servingSize * numQuantity} {data.servingUnit}
      </Text>

      <Text>Quantity:</Text>

      <ServingSize amount={quantity} setAmount={setQuantity} />

      <Button
        title="Add"
        onPress={() => {
          if (typeof mealId === "string") {
            addFood(data, numQuantity, mealId);
            console.log("Legger til matvare", data.name, "til", mealId);
          }
        }}
      />
    </View>
  );
}
