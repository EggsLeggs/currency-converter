import { cn } from "@/lib/utils"

interface Props {
	children: React.ReactNode
	className?: string
}

const Section = ({ children, className }: Props) => (
	<section className={cn("mt-2 animate-in fade-in duration-300", className)}>{children}</section>
)

export default Section
