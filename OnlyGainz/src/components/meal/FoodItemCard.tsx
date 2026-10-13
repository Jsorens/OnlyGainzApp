import { View, Text, Pressable } from "react-native";
import type { Food } from "@/Types/Meal/Food";
import { useRouter } from "expo-router";
import { Link, router } from "expo-router";

type foodItemCardProp = {
  data: Food;
};

export function FoodItemCard({ data }: foodItemCardProp) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/foods/[foodItemId]",
          params: { foodItemId: data.id, foodItemData: JSON.stringify(data) },
        })
      }
    >
      <View style={{ padding: 15 }}>
        <Text style={{ color: "white" }}>{data.name}</Text>
        <Text style={{ color: "white" }}>{data.calories} kcal</Text>
      </View>
    </Pressable>
  );
}
