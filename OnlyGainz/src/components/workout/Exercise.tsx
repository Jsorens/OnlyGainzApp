import { Pressable, Text, View } from "react-native";
import { Set } from "./Set";
import { Exercise } from "@/Types/Workout/Exercise";

interface ExerciseProps {
    exercise: Exercise;
    setNumber: number;
    reps: number;
    weight: number;
}

export function Exercise({exercise, setNumber, reps, weight}: ExerciseProps) {
    return (
        <View>
            <Text>{exercise.name}</Text>
            <Set
                setNumber={setNumber}
                reps={reps}
                weight={weight}
            />

            <Pressable>
                
            </Pressable>
        </View>
    );
}