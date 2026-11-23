import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { AlertCircle, AlertTriangle, Trash } from "lucide-react";

export default function SettingDangerZone(){
    return (
        <div className="">
            <div className="bg-white p-12 rounded-md max-w-[950px] m-auto shadow-lg">
                <form action="">
                    <FieldGroup>
                        <FieldSet className="items-center">
                            <div className="bg-red-100/50 h-24 w-24 min-w-24 flex items-center justify-center rounded-full">
                                <AlertTriangle size={40} className="text-red-400"/>
                            </div>
                            <div>
                                <p className="font-semibold text-xl mb-2 text-center">Danger Zone</p>
                                <p className="text-t2m-text-secondary text-center">
                                    Irreversible and destructive actions.
                                </p>
                            </div>
                            <div className="flex items-center border-2 border-red-600/50 bg-red-100/50 rounded-lg p-6 gap-6">
                                <div>
                                    <p className="font-semibold text-lg mb-2">Delete Account</p>
                                    <p className="text-t2m-text-secondary">
                                        Once you delete your account, there is no going back.
                                    </p>
                                </div>
                                <Button size={"lg"} className="bg-red-600/80 hover:bg-red-600/70 cursor-pointer"><Trash /> Delete Account</Button>
                            </div>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}