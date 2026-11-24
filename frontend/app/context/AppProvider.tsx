"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react"

import type { User, UserPreference } from "@/app/dashboard/api"

type AppContextType = {
    user: User
    setUser: (user: User) => void

    preferences: UserPreference
    setPreferences: (preferences: UserPreference) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({
    children,
    initialUser,
    initialPreferences
}: {
    children: ReactNode
    initialUser: User
    initialPreferences: UserPreference
}) => {
    const [user, setUser] = useState(initialUser)
    const [preferences, setPreferences] = useState(initialPreferences)


    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            preferences.theme === "DARK"
        );

        return () => {
            document.documentElement.classList.remove("dark");
        };
    }, [preferences.theme]);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                preferences,
                setPreferences
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("useApp must be used within AppProvider")
    }

    return context
}