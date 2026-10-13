import React, { createContext, useContext, useState } from "react";

type UserContextValue = {
    userId: string | null;
    setUserId: (id: string | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>("6ab97cb0002e88d56906"); // assume logged in for now

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextValue => {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return ctx;
};

export default UserContext;