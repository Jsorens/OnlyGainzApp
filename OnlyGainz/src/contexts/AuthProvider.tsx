// pseudokode-skjelett
import React, { createContext, use, useCallback, useEffect, useState } from "react";
import User from "./types/User";
import ROLES from "./types/Role";

type Role = (typeof ROLES)[keyof typeof ROLES];

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isLoaded?: boolean;
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    logout: async() => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const resetLoading = useCallback(() => {
        setLoading(false);
        setIsLoaded(true);
    }, []);

    // Ved oppstart: restorerer eksisterende sesjon hvis brukeren var
    // logget inn fra forrige app-kjøring (token i SecureStore, cookie, o.l.)
    useEffect(() => {
        const restoreSession = async () => {
            setLoading(true);
            try {
                // pseudo:
                // const session = await authService.getCurrentSession();
                // setUser(session ? mapToUser(session) : null);
            } catch {
                setUser(null);
            } finally {
                resetLoading();
            }
        };
        restoreSession()
    }, [resetLoading]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // pseudo: kall auth-tjeneste, kast feil ved feil credentials,
            // map svaret til vår User-type og lagre i state

            // const user = await authService.login(email, password);
            // setUser(user);
            setUser({id: "6ab97cb0002e88d56906", email:"lol@.no", role: ROLES.ADMIN})
        } finally {
            resetLoading();
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        try {
            // const profile = await authService.register(email, password);
            // setUser(profile);
        } finally {
            resetLoading();
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            // await authService.logout();
            setUser(null);
        } finally {
            resetLoading();
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading: loading,
                isAdmin: user?.role === ROLES.ADMIN,
                isLoaded,
                isLoggedIn: user !== null,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = use(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}