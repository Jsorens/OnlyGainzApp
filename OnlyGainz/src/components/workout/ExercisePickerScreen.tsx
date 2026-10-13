import { dummyExerciseData, ListOfAllExercises } from "./ListOfAllExercises";

//the screen displaying the list of all the exercises the user can choose between.
//exercises needs to contain an api call for fetching relevant data from the DB, and onPress needs to add exercise to a workout.
export function ExercisePickerScreen() {
    return (
        <ListOfAllExercises 
            exercises={dummyExerciseData}
            onPress={() => console.log("Exercise Pressed.")}
        />
    );
}