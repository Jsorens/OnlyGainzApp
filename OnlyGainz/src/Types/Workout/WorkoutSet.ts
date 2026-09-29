import { Exercise } from "./Exercise";
export type WorkoutSets = {
  exercise: Exercise;
  reps?: number;
  setDuration?: number;
  distance?: number;
  weight?: number;
};
