import { View, Text, TextInput } from "react-native";
import FoodItemList from "@/components/meal/FoodItemList";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function FoodScreen() {
  console.log("FoodScreen rendered");
  return (
    <View>
      <Text>Søk etter matvarer</Text>
      <TextInput />
      <FoodItemList />
    </View>
  );
}
