import { Pressable, View, Text } from "react-native";
import { useNavigation } from "expo-router";
import { ExercisePickerScreen } from "@/components/workout/ExercisePickerScreen";

export function CreateNewWorkout() {
    const navigation = useNavigation();
    return (
        <View>
            <Pressable onPress={() => navigation.navigate(ExercisePickerScreen)}>
                <Text>Add Exercise</Text>
            </Pressable>
        </View>
    );
}