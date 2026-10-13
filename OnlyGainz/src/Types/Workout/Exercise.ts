import { ExerciseType } from "./ExersiceType";
// Represents an exercise. Contains name, type, and muscles worked
export type Exercise = {
  id: string;
  name: string;
  type: ExerciseType;
  muscles: string[];
};
