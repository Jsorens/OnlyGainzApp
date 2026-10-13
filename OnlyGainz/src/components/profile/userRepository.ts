import { database, config } from "@/lib/appwrite"
import { UserProfile } from "@/Types/UserProfile";

export type DBUser = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const user: UserProfile = {
    user: {
        name: "aymb00",
        email: "aymanb@hiof.no",
    },
    firstName: "Ayman",
    lastName: "Bellamine",
    bio: "meow",
    age: 26,
    createdAt: "Today",
    location: "Fredrikstad, Norway",
    followersCount: 69,
}

export interface UserRepository {
    getById: (userId: string) => Promise<DBUser>;
    updateProfile: (userId: string, profileData: DBUser) => Promise<DBUser>;
}

export function createUserRepository(): UserRepository {
    return {
        getById: async (userId: string) => {
            try {
                const response = await database.listRows({
                    databaseId: config.db,
                    tableId: config.col.Users
                })

                console.log("Appwrite response: ", response.total);
                console.log("Total users: ", response.rows.length);

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
                    id: profileData.id,
                    name: profileData.name,
                    createdAt: profileData.createdAt,
                    updatedAt: profileData.updatedAt
                },
            });
            return profileData;
        },
    };
}

export const userRepository = createUserRepository();
