import { database, config, account } from "@/lib/appwrite";
import { Profile } from "../types/Profile";

type ProfileRow = {
  $id: string;
  name: string;
  bio: string;
  age: number;
  city: string;
  country: string;
};

export interface ProfileAPI {
  getProfileInfo: () => Promise<Profile>;
  updateProfile: (profileData: Profile) => Promise<Profile>;
  createProfile: () => Promise<void>;
}

export function useProfileAPI(): ProfileAPI {
  return { getProfileInfo, updateProfile, createProfile };
}

const getProfileInfo = async () => {
  try {
    const user = await account.get(); // kaster hvis ikke innlogget

    if (!user.$id) {
      throw new Error("User not authenticated");
    }

    // henter fra Profiles tabell
    const profileResponse = await database.listRows({
      databaseId: config.db,
      tableId: config.col.Profiles,
    });

    const profileRow = profileResponse.rows.find(
      (row: any) => row.$id === user.$id,
    );
    if (!profileRow) {
      throw new Error("Profile not found");
    }

    const ProfileInfo: Profile = {
      name: profileRow.name,
      bio: profileRow.bio,
      birthday: profileRow.birthday,
      calorieGoal: profileRow.calorieGoal,
      city: profileRow.city,
      country: profileRow.country,
    };

    return ProfileInfo;
  } catch (e) {
    throw e;
  }
};
const updateProfile = async (profileData: Profile) => {
  const user = await account.get(); // kaster hvis ikke innlogget

  if (!user.$id) {
    throw new Error("User not authenticated");
  }
  const userResponse = await database.updateRow({
    databaseId: config.db,
    tableId: config.col.Profiles,
    rowId: user.$id,
    data: {
      name: profileData.name,
    },
  });

  const profileResponse = await database.updateRow({
    databaseId: config.db,
    tableId: config.col.Profiles,
    rowId: user.$id,
    data: {
      bio: profileData.bio,
      birthday: profileData.birthday,
      calorieGoal: profileData.calorieGoal,
      city: profileData.city,
      country: profileData.country,
    },
  });

  return profileData;
};

const createProfile = async () => {
  const user = await account.get(); // kaster hvis ikke innlogget

  if (!user.$id) {
    throw new Error("User not authenticated");
  }

  await database.createRow({
    databaseId: config.db,
    tableId: config.col.Profiles,
    rowId: user.$id,
    data: {
      name: user.name ?? "",
      bio: "",
      birthday: null,
      city: "",
      country: "",
    },
  });
};
