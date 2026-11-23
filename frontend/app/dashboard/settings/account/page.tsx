import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Camera } from "lucide-react"
import Image from "next/image"
import { GetMyProfileApi } from "../../api"
import AccountSettingForm from "@/components/layout/private/settings/AccountSettingForm.component"

export default async function SettingAccount(){
    const userProfile = await GetMyProfileApi()
    if(!userProfile.success){
        alert("Please try loggin in again")
    }
    return (
        <div className="">
            <AccountSettingForm user={userProfile.data} />
        </div>
    )
}