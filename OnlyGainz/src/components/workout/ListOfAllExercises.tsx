import { Exercise } from "@/Types/Workout/Exercise";
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from "react-native";
import { ExerciseInfoCard } from "./ExerciseInfoCard";

interface ListOfAllExercisesProps {
    exercises: Exercise[];
    onPress: () => void;
}

//const Item = ({exercises, onPress, selected}: ListOfAllExercisesProps) => {
//    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
//        <Text style={[name, {color: textColor}]}>{item.title}</Text>
//    </TouchableOpacity>
//}

//dummy data for testing.
export const dummyExerciseData: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    type: "Weight & Reps",
    muscles: ["Chest", "Triceps", "Shoulders"],
  },
  {
    id: "2",
    name: "Squat",
    type: "Weight & Reps",
    muscles: ["Quadriceps", "Glutes", "Hamstrings"],
  },
  {
    id: "3",
    name: "Deadlift",
    type: "Weight & Reps",
    muscles: ["Hamstrings", "Glutes", "Back"],
  },
  {
    id: "4",
    name: "Overhead Press",
    type: "Weight & Reps",
    muscles: ["Shoulders", "Triceps"],
  },
  {
    id: "5",
    name: "Barbell Row",
    type: "Weight & Reps",
    muscles: ["Back", "Biceps"],
  },
  {
    id: "6",
    name: "Pull-Up",
    type: "BodyWeight & Reps",
    muscles: ["Lats", "Biceps", "Back"],
  },
  {
    id: "7",
    name: "Bicep Curl",
    type: "Weight & Reps",
    muscles: ["Biceps", "Forearms"],
  },
  {
    id: "8",
    name: "Triceps Pushdown",
    type: "Weight & Reps",
    muscles: ["Triceps"],
  },
  {
    id: "9",
    name: "Leg Extension",
    type: "Weight & Reps",
    muscles: ["Quadriceps"],
  },
  {
    id: "10",
    name: "Leg Curl",
    type: "Weight & Reps",
    muscles: ["Hamstrings"],
  },
];

const handlePress = () => {
    console.log('Button Pressed.')
}

const renderedExercise: ListRenderItem<Exercise> = ({item}) => (
  //<TouchableOpacity onPress={handlePress}>
  //  <Text>{exercises.name}</Text>
  //</TouchableOpacity>
  <ExerciseInfoCard 
    id={item.id} 
    name={item.name} 
    type={item.type} 
    muscles={item.muscles} 
    />
);


export function ListOfAllExercises(props: ListOfAllExercisesProps) {
    const { exercises } = props;
    return (
        <View>
            <FlatList 
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderedExercise}
            />
        </View>
    )
}