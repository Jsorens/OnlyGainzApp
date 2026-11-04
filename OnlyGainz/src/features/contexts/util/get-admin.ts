// src/lib/get-admin.ts (or similar)
import { ADMIN_TEAM_ID, teams } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";

export async function getIsAdmin(userId: string): Promise<boolean> {
  //console.log("[getIsAdmin] checking user", userId, "against team", ADMIN_TEAM_ID);
  try {
    const memberships: Models.MembershipList = await teams.listMemberships(ADMIN_TEAM_ID);

    //console.log("[getIsAdmin] memberships:", JSON.stringify(memberships, null, 2));

    const isAdmin = memberships.memberships.some(
        (membership) => membership.userId === userId,
    );

    //console.log("[getIsAdmin] result:", isAdmin);
    return isAdmin;
    } catch (e) {
        return false;
    }
}
