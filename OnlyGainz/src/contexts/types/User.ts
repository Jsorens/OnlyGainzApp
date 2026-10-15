import ROLES from "./Role";

type User = {
  id: string;
  email: string;
  role: (typeof ROLES)[keyof typeof ROLES];
};

export default User;