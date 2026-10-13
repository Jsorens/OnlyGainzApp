import { useState } from "react";
import { Link, useRouter } from "expo-router";
//import FoodLayout from "./FoodLayout";
import { Pressable, View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import type { Food } from "@/Types/Meal/Food";
// We want to be able to press the mealcard
// When the mealcard is press we wish to enter another "tab"/component
export default function MealCard({ mealType }: { mealType: string }) {
  // Vi lager en state for å lagre data om mat som er spist i dette måltidet
  const router = useRouter();
  const [foods, setFoods] = useState<Food[]>([]);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/meals/[mealId]",
          params: { mealId: mealType },
        })
      }
    >
      <View style={{ padding: 15 }}>
        <Text style={{ color: "white" }}>{mealType}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "white",
  },
  text: {
    color: "white",
  },
});
