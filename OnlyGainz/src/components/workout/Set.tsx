import { WorkoutSetData } from "@/Types/Workout/WorkoutSet";
import { Exercise } from "@/Types/Workout/Exercise";
import { Text, TextInput, View } from "react-native";

interface SetProps {
    //exercise: Exercise;
    setNumber: number;
    reps: number;
    //setDuration?: number | null;
    //distance?: number | null;
    weight: number;
}

export function Set({setNumber, reps, weight}: SetProps) {
    return (
        <View>
            <Text>{setNumber}</Text>
            <TextInput placeholder={`${weight}`} />
            <TextInput placeholder={`${reps}`} />
        </View>
    );
}