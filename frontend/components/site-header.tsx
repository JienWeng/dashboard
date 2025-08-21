import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  // Example farmer variable
  const farmerName = "Farmer Ali"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-4 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-4 lg:px-12">

        {/* Team Name */}
        <h1 className="text-lg font-semibold">NPNG Farmer Dashboard</h1>

        {/* Push avatar to the right */}
        <div className="ml-auto flex items-center gap-2">

          {/* Mode Toggle */}
          <ModeToggle />

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt={farmerName} />
            <AvatarFallback>{farmerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{farmerName}</span>
        </div>
      </div>
    </header>
  )
}