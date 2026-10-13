import { Exercise } from "@/Types/Workout/Exercise";
import { Text, View } from "react-native";

export function ExerciseInfoCard(props: Exercise) {
    const { id, name, type, muscles} = props;
    return (
        <View>
            <Text>{name}</Text>
            <Text>{type}</Text>
            <Text>{muscles.join(", ")}</Text>
        </View>
    );
}