import { useContext, createContext, useState, useEffect } from "react";
import { AppwriteUserSchema, UserSchema, User } from "./schemas/user-schema";
import {
  AppwriteSessionSchema,
  SessionSchema,
  Session,
} from "./schemas/session-schema";
import { account } from "@/lib/appwrite";
import { Models, ID } from "react-native-appwrite";
import { getIsAdmin } from "./util/get-admin";
import { useProfileAPI } from "@/features/profile/api/profile-api";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean | null;
  register: ({ email, password, name }: RegisterProps) => Promise<void>;
  login: ({ email, password }: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

type RegisterProps = {
  email: string;
  password: string;
  name: string;
};

type LoginProps = {
  email: string;
  password: string;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { createProfile } = useProfileAPI();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    checkAuth();
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const rawSession = await account.getSession("current");
      const rawUser = await account.get();

      const sessionResult = AppwriteSessionSchema.safeParse(rawSession);
      const userResult = AppwriteUserSchema.safeParse(rawUser);

      if (!sessionResult.success || !userResult.success) {
        console.log("Zod validation failed ", {
          userError: userResult.success ? null : userResult.error,
          sessionErrorFromCheckAuth: sessionResult.success
            ? null
            : sessionResult.error,
        });
        setSession(null);
        setUser(null);
        setIsAdmin(null);
        return;
      }

      const parsedSession = SessionSchema.parse(sessionResult.data);
      const parsedUser = UserSchema.parse(userResult.data);

      const admin = await getIsAdmin(parsedUser.$id);

      setSession(parsedSession);
      setUser(parsedUser);
      setIsAdmin(admin);
    } catch (error) {
      console.log("checkAuth error: ", error);
      setSession(null);
      setUser(null);
      setIsAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, name }: RegisterProps) => {
    setLoading(true);
    try {
      const accountResult = await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      //const userId = accountResult.$id;

      await login({ email, password });
    } catch (error) {
      console.log("Register error: ", error);
    } finally {
      setLoading(false);
    }
    await createProfile();
  };

  const login = async ({ email, password }: LoginProps) => {
    setLoading(true);
    try {
      const rawSession = await account.createEmailPasswordSession(
        email,
        password,
      );
      const rawUser = await account.get();

      const sessionResult = AppwriteSessionSchema.safeParse(rawSession);
      const userResult = AppwriteUserSchema.safeParse(rawUser);

      if (!sessionResult.success || !userResult.success) {
        console.log("Zod validation failed on login", {
          sessionError: sessionResult.success ? null : sessionResult.error,
          userError: userResult.success ? null : userResult.error,
        });
        return;
      }

      const parsedSession = SessionSchema.parse(sessionResult.data);
      const parsedUser = UserSchema.parse(userResult.data);

      const admin = await getIsAdmin(parsedUser.$id);

      setSession(parsedSession);
      setUser(parsedUser);
      setIsAdmin(admin);
    } catch (error) {
      console.log("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("Logout error: ", error);
    } finally {
      setSession(null);
      setUser(null);
      setIsAdmin(null);
      setLoading(false);
    }
  };

  const contextData = {
    session,
    user,
    isAdmin,
    loading,
    register,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
