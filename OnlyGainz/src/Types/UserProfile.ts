import { Role } from "./Auth/Role";
//import { User } from "./Auth/User";

type User = {
    name: string;
    email: string;
}

export type UserProfile = {
  //user: Omit<User, "password">; // pass fortsatt på å ikke returnere pass fra repository
  user: User
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  createdAt: string; //Date;
  location: string;
  role?: Role;
  followersCount: number;
}