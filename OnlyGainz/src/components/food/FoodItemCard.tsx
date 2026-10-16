import { View, Text, Pressable, Button } from "react-native";
import type { Food } from "@/Types/Meal/Food";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Link, router } from "expo-router";
import { useMeals } from "@/contexts/OnlyGainzContext";

type foodItemCardProp = {
  data: Food;
  mealType: string;
};

// Food item
// When we press it it will redirect us to another page where we can see more detail
// It will contain a button that adds the item to the meal
export function FoodItemCard({ data, mealType }: foodItemCardProp) {
  const router = useRouter();
  const { addFood } = useMeals();
  return (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/foods/[foodItemId]",
            params: {
              foodItemId: data.id,
              foodItemData: JSON.stringify(data),
              mealId: mealType,
            },
          })
        }
      >
        <View style={{ padding: 15 }}>
          <Text style={{ color: "white" }}>{data.name}</Text>
          <Text style={{ color: "white" }}>{data.macros.calories} kcal</Text>
        </View>
      </Pressable>
      <Button title="Add" onPress={() => addFood(data, 1, mealType)} />
    </View>
  );
}
