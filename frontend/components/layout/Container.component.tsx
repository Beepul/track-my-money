import React from "react";

export default function ContainerComponent ({children, cn}: {children: React.ReactNode, cn?: React.HTMLAttributes<HTMLElement>['className']}) {
    return (
        <div className={`container mx-auto px-4 py-3 md:px-6 md:py-4 ${cn} `}>
            {children}
        </div>
    )
}