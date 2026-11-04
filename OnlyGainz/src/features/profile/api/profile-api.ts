import { database, config } from "@/lib/appwrite";
import { Profile } from "../types/Profile";

export interface ProfileRepository {
  getById: (userId: string) => Promise<Profile>;
  updateProfile: (userId: string, profileData: Profile) => Promise<Profile>;
}

export function createProfileRepository(): ProfileRepository {
  return {
    getById: async (userId: string) => {
      try {
        // henter fra Users tabell
        const userResponse = await database.listRows({
          databaseId: config.db,
          tableId: config.col.Users,
        });

        const userRow = userResponse.rows.find(
          (row: any) => row.$id === userId,
        );
        if (!userRow) {
          throw new Error("User not found");
        }

        // henter fra Profiles tabell
        const profileResponse = await database.listRows({
          databaseId: config.db,
          tableId: config.col.Profiles,
        });

        const profileRow = profileResponse.rows.find(
          (row: any) => row.$id === userId,
        );
        if (!profileRow) {
          throw new Error("Profile not found");
        }

        const dbUser: Profile = {
          id: userRow.id,
          name: userRow.name,
          bio: profileRow.bio,
          age: profileRow.age,
          city: profileRow.city,
          country: profileRow.country,
          //updatedAt: row.$updatedAt,
        };

        return dbUser;
      } catch (e) {
        throw e;
      }
    },
    updateProfile: async (userId: string, profileData: Profile) => {
      const userResponse = await database.updateRow({
        databaseId: config.db,
        tableId: config.col.Users,
        rowId: userId,
        data: {
          name: profileData.name,
        },
      });

      const profileResponse = await database.updateRow({
        databaseId: config.db,
        tableId: config.col.Profiles,
        rowId: userId,
        data: {
          bio: profileData.bio,
          age: Number(profileData.age),
          city: profileData.city,
          country: profileData.country,
        },
      });

      return profileData;
    },
  };
}

export const profileRepository = createProfileRepository();
