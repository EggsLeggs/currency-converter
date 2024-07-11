"use client"
 
import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
 
export function ModeToggle() {
const [mounted, setMounted] = React.useState(false)
const { setTheme, theme } = useTheme()


  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { label: 'System', value: 'system', icon: <MonitorIcon/> },
    { label: 'Light', value: 'light', icon: <SunIcon/> },
    { label: 'Dark', value: 'dark', icon: <MoonIcon/> },
  ]

  if (!theme) setTheme("system")

  const cycleTheme = () => {
    const nextTheme = themes[(themes.findIndex(t => t.value === theme) + 1) % themes.length]
    setTheme(nextTheme.value)
  }
 
  return (
    <Button variant="outline" onClick={cycleTheme} className="gap-2 min-w-[10rem]">
        <div className="[&>*]:w-5 [&>*]:h-5">
            {themes.find(t => t.value === theme)?.icon}
        </div>
        <span>
            {themes.find(t => t.value === theme)?.label}
        </span>
        <span className="sr-only">Click to toggle theme</span>
    </Button>
  )
}