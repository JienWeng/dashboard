"use client"

import { useEffect, useState } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { ThreeDCarousel } from "@/components/3d-carousel"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import data from "./data.json"

export default function Page() {
  const username = "Ali"
  const [time, setTime] = useState(new Date())
  const [timeRange, setTimeRange] = useState("30d")
  const timeRangeToDays = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
}

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6 py-4 md:gap-6 md:py-6">
              {/* Main 2-column layout */}
              <div className="flex gap-6 px-6 lg:px-6">
                {/* Left column */}
                <div className="w-1/3 flex flex-col gap-6">
                  {/* Greeting */}
                  <div className="p-4">
                    <h1 className="text-4xl font-bold tracking-tight">
                      Good Morning, {username}
                    </h1>
                    <p className="text-muted-foreground text-lg mt-2">
                      {time.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })} ·{" "}
                      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </p>
                  </div>

                  {/* Carousel below greeting */}
                  <div className="w-full">
                    <ThreeDCarousel />
                  </div>
                </div>

                {/* Right column */}
                <div className="w-2/3 flex flex-col gap-6">
                <Slider defaultValue={[33]} max={100} step={1} /><span>          
                  <ToggleGroup
                    type="single"
                    value={timeRange}
                    onValueChange={setTimeRange}
                    variant="outline"
                    className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                  >
                    <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                    <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                    <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                  </ToggleGroup>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                      className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                      size="sm"
                      aria-label="Select a value"
                    >
                      <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="90d" className="rounded-lg">
                        Last 3 months
                      </SelectItem>
                      <SelectItem value="30d" className="rounded-lg">
                        Last 30 days
                      </SelectItem>
                      <SelectItem value="7d" className="rounded-lg">
                        Last 7 days
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  </span>
                  <SectionCards timeRange={timeRange} />
                  <ChartAreaInteractive />
                </div>
              </div>

              {/* Full width DataTable below */}
              <div className="px-4 lg:px-6">
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}