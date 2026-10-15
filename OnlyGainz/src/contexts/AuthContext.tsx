import { useContext, createContext, useState, useEffect } from "react";
import { Text, View } from "react-native"
import { account } from "@/lib/appwrite";
import User from "./types/User";
import ROLES from "./types/Role";
import { Models } from "react-native-appwrite";

type Role = (typeof ROLES)[keyof typeof ROLES];

type AuthContextType = {
    user: Models.User | null;
    session: Models.Session | null;
    loading?: boolean;
    login: ({email, password}: LoginProps) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    login: async () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
}

type LoginProps = {
    email: string;
    password: string;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<Models.User | null>(null);
    const [session, setSession] = useState<Models.Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        checkAuth();
    };

    const checkAuth = async () => {
        try {
            const response = await account.get();
            setUser(response);
            const session = await account.getSession("current");
            setSession(session);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const login = async ({ email, password }: LoginProps) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(
                email,
                password
            );
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const contextData = { session, user, login, };
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };