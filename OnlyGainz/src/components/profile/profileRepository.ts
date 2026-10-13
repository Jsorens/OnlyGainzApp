import { database, config } from "@/lib/appwrite"

export type DBUser = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileRepository {
    getById: (userId: string) => Promise<DBUser>;
    updateProfile: (userId: string, profileData: DBUser) => Promise<DBUser>;
}

export function createProfileRepository(): ProfileRepository {
    return {
        getById: async (userId: string) => {
            try {
                const response = await database.listRows({
                    databaseId: config.db,
                    tableId: config.col.Users
                })

                const row = response.rows.find((row: any) => row.$id === userId);
                if (!row) {
                    throw new Error("User not found");
                }

                const dbUser: DBUser = {
                    id: row.id,
                    name: row.name,
                    createdAt: row.$createdAt,
                    updatedAt: row.$updatedAt,
                };

                return dbUser;
            } catch (e) {
                console.error("Failed to fetch user:", e);
                throw e;
            }
        },
        updateProfile: async (userId: string, profileData: DBUser) => {
            const response = await database.updateRow({
                databaseId: config.db,
                tableId: config.col.Users,
                rowId: userId,
                data: {
                    name: profileData.name,
                },
            });
            return profileData;
        },
    };
}

export const profileRepository = createProfileRepository();
