import { Food } from "@/Types/Meal/Food";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import ServingSize from "@/components/food/ServingSize";
import { useState } from "react";
import { MealLog } from "@/Types/Meal/MealLog";

export default function EditMealScreen() {
  // Vi deconstruncter den innsendte dataen
  const { mealLog, mealId } = useLocalSearchParams<{
    mealLog?: string;
    mealId?: string;
  }>();
  console.log(mealLog);

  let data: MealLog;
  if (!mealLog) {
    return <Text>Invalid food data</Text>;
  }

  // Vi parser dataen til å være et food item
  try {
    data = JSON.parse(mealLog) as MealLog;
  } catch {
    return <Text>Invalid food data</Text>;
  }

  const [quantity, setQuantity] = useState(String(data.quantity));
  // Konverterer fra string til number
  const numQuantity = Number(quantity) || 0;

  return (
    <View>
      <Text>{data.foodItem.name}</Text>
      <Text>
        Kcal: {data.foodItem.macros.calories * numQuantity} | protein:
        {data.foodItem.macros.protein * numQuantity} | carbs:
        {data.foodItem.macros.carbs * numQuantity}| fat:{" "}
        {data.foodItem.macros.fat * numQuantity}
      </Text>
      <Text>
        Serving: {data.foodItem.servingSize * numQuantity}{" "}
        {data.foodItem.servingUnit}
      </Text>

      <Text>Quantity:</Text>

      <ServingSize amount={quantity} setAmount={setQuantity} />
    </View>
  );
}
