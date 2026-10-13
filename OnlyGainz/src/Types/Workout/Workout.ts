import { WorkoutSets } from "./WorkoutSet";
export type Workout = {
  date: string;
  duration: string;
  exersices: WorkoutSets[];
};
