import { ProfileRepository, profileRepository } from "./profile-repository";
import { DBUser } from "./profile-repository";

export interface ProfileService {
    getById: (userId: string) => Promise<DBUser>;
    updateProfile: (userId: string, profileData: DBUser) => Promise<DBUser>;
}

export function createProfileService(_repository: ProfileRepository) {
    return {
        async getById(id: string) {
            try {
                const user = await _repository.getById(id);
                return user;
            }
            catch (e) {
                throw e;
            }
        },

        async updateProfile(id: string, profile: DBUser) {
            const updated = await _repository.updateProfile(id, profile);
            return updated;
        }
    }
}

export const profileService = createProfileService(profileRepository)