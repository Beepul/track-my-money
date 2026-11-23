"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Settings, ShieldCheck, SlidersHorizontal, TriangleAlert, UserLock, UserRoundCog } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function SettingsSidebarMenu() {
  const pathname = usePathname();

  const settingsItems = [
    {
      title: "Account",
      href: "/dashboard/settings/account",
      icon: UserRoundCog,
    },
    {
      title: "Security",
      href: "/dashboard/settings/security",
      icon: ShieldCheck,
    },
    {
      title: "Preferences",
      href: "/dashboard/settings/preferences",
      icon: SlidersHorizontal,
    },
    {
      title: "Danger Zone",
      href: "/dashboard/settings/danger-zone",
      icon: TriangleAlert,
      danger: true,
    },
  ];

  const isSettingsActive = pathname.startsWith("/dashboard/settings");

  return (
    <Collapsible defaultOpen={isSettingsActive}>
      <CollapsibleTrigger
        className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer ${
          isSettingsActive
            ? "bg-t2m-bg-primary text-t2m-primary"
            : "text-t2m-text-secondary hover:bg-gray-50"
        }`}
      >
        <span className="flex items-center gap-3">
          <Settings size={18} />
          Settings
        </span>

        <ChevronDown size={16} />
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-8 mt-2 space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          const className = `
            flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
            ${
              active
                ? item.danger
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-100 text-t2m-primary"
                : item.danger
                ? "text-red-500 hover:bg-red-50"
                : "hover:bg-gray-50"
            }
          `;

          return active ? (
            <div key={item.href} className={className}>
              <Icon size={18} />
              {item.title}
            </div>
          ) : (
            <Link key={item.href} href={item.href} className={className}>
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}