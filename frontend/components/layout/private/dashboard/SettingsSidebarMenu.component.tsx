
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserRoundCog,
} from "lucide-react";
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
        className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer transition-colors duration-200 ${
          isSettingsActive
            ? "bg-t2m-bg-primary text-t2m-primary"
            : "text-t2m-text-secondary hover:bg-accent hover:text-t2m-primary"
        }`}
      >
        <span className="flex items-center gap-3">
          <Settings size={18} />
          Settings
        </span>

        <ChevronDown
          size={16}
          className="transition-transform duration-200 [[data-state=open]>&]:rotate-180"
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-8 mt-2 space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          const className = `
            flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200
            ${
              active
                ? item.danger
                  ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                  : "bg-t2m-bg-primary text-t2m-primary font-medium"
                : item.danger
                  ? "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  : "text-t2m-text-secondary hover:bg-accent hover:text-t2m-primary"
            }
          `;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={className}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
