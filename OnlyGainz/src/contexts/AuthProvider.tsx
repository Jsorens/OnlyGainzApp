import { useContext, createContext, useState, useEffect } from "react";
import { Text, View } from "react-native"
import { account, teams } from "@/lib/appwrite";
import { Models, ID } from "react-native-appwrite";
import { getIsAdmin } from "./util/get-admin";

type AuthContextType = {
    user: Models.User | null;
    session: Models.Session | null;
    loading: boolean;
    isAdmin: boolean | null;
    register: ({email, password, name}: RegisterProps) => Promise<void>;
    login: ({email, password}: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
}

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
}

type RegisterProps = {
    email: string;
    password: string;
    name: string;
}

type LoginProps = {
    email: string;
    password: string;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Models.User | null>(null);
    const [session, setSession] = useState<Models.Session | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        checkAuth();
    };

    const checkAuth = async () => {
        setLoading(true);
        try {
            const user = await account.get();
            const session = await account.getSession("current");
            const admin = await getIsAdmin(user.$id);

            setUser(user);
            setSession(session);
            setIsAdmin(admin);
        } catch (error) {
            console.log("checkAuth error: ", error);
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, password, name }: RegisterProps) => {
        setLoading(true);
        try {
            await account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });
            await login({ email, password });
        } catch (error) {
            console.log("Register error: ", error)
        } finally {
            setLoading(false);
        }
    }

    const login = async ({ email, password }: LoginProps) => {
        setLoading(true);
        try {
            const session = await account.createEmailPasswordSession(
                email,
                password
            );
            const user = await account.get();
            const admin = await getIsAdmin(user.$id);
            console.log("[AuthProvider] login: user", user.$id, "isAdmin:", admin);

            setSession(session);
            setUser(user);
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


    const contextData = { session, user, isAdmin, loading, register, login, logout };
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };