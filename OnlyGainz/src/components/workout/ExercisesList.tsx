import { Exercise } from "@/Types/Workout/Exercise";
import { FlatList, View } from "react-native";

interface ListOfAllExercisesProps {
    exercises: Exercise[];
}

export function ListOfAllExercises({exercises}: ListOfAllExercisesProps) {
    return (
        <View>
            <FlatList 
                data={exercises}
                renderItem={({ item }) => {item}}
                
            />
        </View>
    )
}