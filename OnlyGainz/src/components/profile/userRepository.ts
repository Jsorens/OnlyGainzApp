import { database, config } from "@/lib/appwrite";
import { User } from "@/Types/Auth/User";
import { UserProfile } from "@/Types/UserProfile";

/*
const response = await database.listRows({
          databaseId: config.db,
          tableId: config.col.Foods,
})
*/

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
    //create: (realm: any) => Promise<any>;
    list: () => Promise<UserProfile>;
    //create: () => Promise<UserProfile>;
    updateProfile: (profileData: UserProfile) => Promise<UserProfile>
}

export function createUserRepository(db: UserProfile): UserRepository {
    let dbMutable = db;

    return {
        list: async () => {
            return db;
        },
        updateProfile: async (profileData: UserProfile) => {
            dbMutable = profileData;
            console.log(dbMutable);
            return dbMutable;
        },
    };
}

export const userRepository = createUserRepository(user);

