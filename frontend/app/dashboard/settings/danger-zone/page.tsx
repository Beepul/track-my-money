
import { Button } from "@/components/ui/button";
import {
    FieldGroup,
    FieldSet,
} from "@/components/ui/field";
import { AlertTriangle, Trash } from "lucide-react";

export default function SettingDangerZone() {
    return (
        <div className="w-full">
            <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[950px] mx-auto shadow-sm">
                <FieldGroup>
                    <FieldSet className="items-center">

                        {/* Warning Icon */}
                        <div className="bg-red-100/50 dark:bg-red-950/40 h-24 w-24 min-w-24 flex items-center justify-center rounded-full">
                            <AlertTriangle
                                size={40}
                                className="text-red-500 dark:text-red-400"
                            />
                        </div>

                        {/* Header */}
                        <div>
                            <p className="font-semibold text-xl mb-2 text-center text-foreground">
                                Danger Zone
                            </p>

                            <p className="text-t2m-text-secondary text-center">
                                Irreversible and destructive actions.
                            </p>
                        </div>

                        {/* Delete Account Section */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-2 border-red-600/50 dark:border-red-800 bg-red-100/50 dark:bg-red-950/30 rounded-lg p-6 gap-6">
                            <div>
                                <p className="font-semibold text-lg mb-2 text-foreground">
                                    Delete Account
                                </p>

                                <p className="text-t2m-text-secondary">
                                    Once you delete your account, there is no going back.
                                </p>
                            </div>

                            <Button
                                type="button"
                                size="lg"
                                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 cursor-pointer shrink-0"
                            >
                                <Trash size={16} />
                                Delete Account
                            </Button>
                        </div>
                    </FieldSet>
                </FieldGroup>
            </div>
        </div>
    );
}
