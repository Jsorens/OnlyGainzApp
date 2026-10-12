import { View, Text, TextInput, SafeAreaView } from "react-native";
import FoodItemList from "@/components/meal/FoodItemList";
import { useLocalSearchParams } from "expo-router";
import CameraButton from "@/components/meal/Camera";

// This represents the screen for foods
export default function FoodScreen() {
  const { mealId } = useLocalSearchParams<{
    mealId: string;
  }>();
  console.log("FoodScreen rendered - ", mealId);
  return (
    <View>
      <CameraButton />
      <TextInput />
      <FoodItemList mealType={mealId} />
    </View>
  );
}
