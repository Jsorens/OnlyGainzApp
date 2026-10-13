import { WorkoutSetData } from "./WorkoutSet";
export type Workout = {
  date: string;
  duration: string;
  exersices: WorkoutSetData[];
};
