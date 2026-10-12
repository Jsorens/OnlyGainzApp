import { Exercise } from "./Exercise";
export interface WorkoutSetData {
    exercise: Exercise;
    setNumber: number;
    reps: number;
    //setDuration?: number | null;
    //distance?: number | null;
    weight: number;
}