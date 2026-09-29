import { describe, it, expect } from "vitest";
import { validateExercise, ValidationResult } from "../../util/validateExercise";
import { Exercise } from "../../types/Exercise";

describe("validateExercise", () => {
    it("avviser alt for høy MET verdi", () => {

        const exercise: Exercise = {
            name: "Burpees",
            description: "For jævlig",
            met: 23,
            difficulty: "Medium",
            muscleGroup: ["quadriceps", "glutes", "hamstrings", "calves", "pectorals", "deltiods", "triceps", "abdominals", "erector spinae", "hip flexors"],
            equipment: "None required",
        }

        const result: ValidationResult = validateExercise(exercise);
        expect (result.error).toBe("MET verdien kan ikke overstige 22.5");
    });

    it("avviser tom muscleGroup felt", () => {
        const exercise: Exercise = {
            name: "Burpees",
            description: "For jævlig",
            met: 8,
            difficulty: "Medium",
            muscleGroup: [],
            equipment: "None required",
        }
        
        const result = validateExercise(exercise);
        expect (result.error).toBe("Muskelgrupper må være inkludert");
    });

        it("avviser exercise uten gyldig verdi", () => {
        const exercise: Exercise = {
            name: "Burpees",
            description: "For jævlig",
            met: -1,
            difficulty: "Medium",
            muscleGroup: [],
            equipment: "None required",
        }
        
        const result = validateExercise(exercise);
        expect (result.error).toBe("MET verdien må være positiv");
    });
});