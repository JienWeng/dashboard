import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { MapComponent } from "@/components/map-component" 
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// app/page.tsx
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* TOP ROW: MAP + CHART */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
                {/* MAP - Will be a separate component */}
                <div className="lg:col-span-2">
                  <MapComponent /> {/* You'll create this later */}
                </div>
                
                {/* CHART - Existing component */}
                <div className="lg:col-span-1">
                  <ChartAreaInteractive />
                </div>
              </div>

              {/* SECTION CARDS - Only contains the metric cards */}
              <SectionCards />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}