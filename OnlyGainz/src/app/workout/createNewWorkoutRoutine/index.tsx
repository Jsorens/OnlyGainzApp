import { Pressable, View, Text } from "react-native";
import { router, useNavigation } from "expo-router";
import { ExercisePickerScreen } from "@/components/workout/ExercisePickerScreen";

export default function CreateNewWorkoutRoutine() {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Halla</Text>
        </View>
    );
}

/*</View><Pressable onPress={() => 
                router.navigate({
                    pathname: '',
                })
            >
                <Text>Add Exercise</Text>
            </Pressable></Pressable>*/