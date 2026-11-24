"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Check } from "lucide-react";
import { updateUserPreferenceAction } from "@/app/dashboard/actions";
import { useApp } from "@/app/context/AppProvider";

export default function ThemeToggler() {
    const { preferences, setPreferences } = useApp();
    const [isSaving, setIsSaving] = useState(false);

    const changeTheme = async (theme: "LIGHT" | "DARK") => {
        if (isSaving || preferences.theme === theme) return;

        setIsSaving(true);

        try {
            const response = await updateUserPreferenceAction({ theme });

            if (response.success && response.data) {
                setPreferences(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Failed to update theme", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" disabled={isSaving}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onSelect={() => changeTheme("LIGHT")}
                    disabled={isSaving}
                >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                    {preferences.theme === "LIGHT" && (
                        <Check className="ml-auto h-4 w-4" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={() => changeTheme("DARK")}
                    disabled={isSaving}
                >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                    {preferences.theme === "DARK" && (
                        <Check className="ml-auto h-4 w-4" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}