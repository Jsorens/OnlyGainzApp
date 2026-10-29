import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
//import FoodLayout from "./FoodLayout";
import { Pressable, View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import type { Food } from "@/Types/Meal/Food";
// We want to be able to press the mealcard
// When the mealcard is press we wish to enter another "tab"/component

type mealCardProps = {
  mealType: string;
};
export default function MealCard({ mealType }: mealCardProps) {
  // Vi lager en state for å lagre data om mat som er spist i dette måltidet
  const router = useRouter();

  return (
    <View>
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
      <Button
        title="Add Food"
        onPress={() =>
          router.push({
            pathname: "/foods",
            params: { mealId: mealType },
          })
        }
      />
    </View>
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
