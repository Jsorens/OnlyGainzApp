import { Text, FlatList } from "react-native";
import type { Food } from "@/features/food/types/Food";
import { useEffect, useState } from "react";
import { FoodItemCard } from "./FoodItemCard";
import { getFoodsAPI } from "@/features/food/api/foods-api";

type foodItemListProp = {
  item: Food[];
  mealType: string;
};
// This is just a basic test for displaying the food in the database.
export default function FoodItemList({ item, mealType }: foodItemListProp) {
  return (
    <FlatList
      data={item}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FoodItemCard data={item} mealType={mealType} />
      )}
      ListEmptyComponent={<Text>No foods found.</Text>}
    />
  );
}
