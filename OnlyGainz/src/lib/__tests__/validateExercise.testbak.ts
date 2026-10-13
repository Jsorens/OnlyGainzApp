/*import { describe, it, expect } from "vitest";
import { validateExercise, ValidationResult } from "../../../util/validateExercise";
import { Exercise } from "../../../types/Exercise";


describe("validateExercise", () => {
    it("avviser alt for høy MET verdi", () => {
        const name = "Burpees";
        const description = "For jævlig";
        const met = 23;
        const difficulty = "Medium";
        const muscleGroup = ["quadriceps", "glutes", "hamstrings", "calves", "pectorals", "deltiods", "triceps", "abdominals", "erector spinae", "hip flexors"]
        const equipment = "None required";

        const result = validateExercise({ name, description, met, difficulty, muscleGroup, equipment });
        expect (result.ok).toBe("MET verdien kan ikke overstige 22.5");
    });

    it("avviser tom muscleGroup felt", () => {
        const name = "Burpees";
        const description = "For jævlig";
        const met = 8.0;
        const difficulty = "Medium";
        const muscleGroup: string[] = [];
        const equipment = "None required";

        const result = validateExercise({ name, description, met, difficulty, muscleGroup, equipment });
        expect (result.ok).toBe("Passord må bestå av minst 10 tegn, og inneholde tall og symboler.");
    });

    it("avviser tom muscleGroup felt", () => {
        const name = "Burpees";
        const description = "For jævlig";
        const met = 8.0;
        const difficulty = "Medium";
        const muscleGroup = ["quadriceps", "glutes", "hamstrings", "calves", "pectorals", "deltiods", "triceps", "abdominals", "erector spinae", "hip flexors"];
        const equipment = "None required";

        const result = validateExercise({ name, description, met, difficulty, muscleGroup, equipment });
        expect (result.ok).toBe("Passord må bestå av minst 10 tegn, og inneholde tall og symboler.");
    });
  });*/