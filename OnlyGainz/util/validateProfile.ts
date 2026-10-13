import { DBUser, profileRepository } from "@/components/profile/profileRepository";

export type ValidationResult = { ok: true } | { ok: false; error: string };

export async function validateProfile(userId: string): Promise<ValidationResult>  {
    //const { name, description, met, difficulty, muscleGroup, equipment } = exercise;

    try {
        const profile = await profileRepository.getById(userId);
        const {id, name, createdAt, updatedAt} = profile;

        if (!id || !name || !createdAt || !updatedAt) {
            return { ok: false, error: "An undefined/empty field has been returned" };
        }

        if (name !== "Ayman") {
            return { ok: false, error:"Wrong user retrieved" };
        }

        return { ok: true };
    }
    catch (e) {
        console.log(e);
        return { ok: false, error: String(e) };
    }
};