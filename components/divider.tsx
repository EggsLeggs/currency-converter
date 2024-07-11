import { cn } from "@/lib/utils"
import * as React from "react"

const Divider = React.forwardRef<
    HTMLHRElement,
    React.HTMLAttributes<HTMLHRElement>
    >(({ className, ...props }, ref) => (
    <hr
        ref={ref}
        className={cn("border-t border-divider", className)}
        {...props}
    />
))
Divider.displayName = "Divider"

export { Divider }
