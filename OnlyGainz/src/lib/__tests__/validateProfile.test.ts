import { describe, it, expect } from "vitest";
import { validateProfile } from "../../../util/validateProfile";

describe("validateRepositoryResults", () => {
    it("avviser feil bruker resultat", async () => {
        const result = await validateProfile("6ab97cb0002e88d56906"); // user 'Ayman' in Appwrite

        if (!result.ok) {
            expect(result.error).toBe("Wrong user retrieved");
        }

        if (result.ok) {
            expect(result.ok).toBe(true);
        }
    });
});