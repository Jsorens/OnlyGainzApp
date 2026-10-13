import { Exercise } from "../types/Exercise"

export type ValidationResult = { ok: true } | { ok: false; error: string };

/*
const exerciseObject: Exercise = {
    name: "Burpees",
    description: "For jævlig",
    met: 8.0,
    difficulty: "Medium",
    muscleGroup: ["quadriceps", "glutes", "hamstrings", "calves", "pectorals", "deltiods", "triceps", "abdominals", "erector spinae", "hip flexors"],
    equipment: "None required",
}
*/

export function validateExercise(exercise: Exercise): ValidationResult  {
    const { name, description, met, difficulty, muscleGroup, equipment } = exercise;

    if (met > 22.5) {
        return { ok: false, error: "MET verdien kan ikke overstige 22.5" };
    }

    if (!(met > 0)) {
        return { ok: false, error: "MET verdien må være positiv" }
    }

    if (!(muscleGroup.length > 0)) {
        return { ok: false, error: "Muskelgrupper må være inkludert" };
    }

    return { ok: true };
}