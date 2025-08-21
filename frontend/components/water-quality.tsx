"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, Sector } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartStyle } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "Water Usage & Quality Dashboard"

const barData = [
  { month: "July", usage: 1200 },
  { month: "August", usage: 1400 },
  { month: "September", usage: 1000 },
  { month: "October", usage: 1300 },
]

const pieData = [
  { source: "River", value: 50, fill: "var(--chart-)" },
  { source: "Groundwater", value: 30, fill: "var(--chart-2)" },
  { source: "Rainwater", value: 20, fill: "var(--chart-3)" },
]

const waterIndex = 82 // Example Water Safety Index

const chartConfig = {
  usage: { label: "Water Usage", color: "var(--chart-1)" },
  river: { label: "River", color: "var(--chart-1)" },
  groundwater: { label: "Groundwater", color: "var(--chart-2)" },
  rainwater: { label: "Rainwater", color: "var(--chart-3)" },
} satisfies ChartConfig

export function WaterQualityChart() {
  const [activeSource, setActiveSource] = React.useState(pieData[0].source)

  const activeIndex = React.useMemo(
    () => pieData.findIndex((item) => item.source === activeSource),
    [activeSource]
  )

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Water Usage & Quality</CardTitle>
        <CardDescription>Monthly water usage and source distribution</CardDescription>
      </CardHeader>

      {/* Bar chart: Water usage */}
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-60">
          <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      {/* Pie chart: Water source distribution */}
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="w-full max-w-xs aspect-square">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="source"
              innerRadius={50}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
              onClick={(entry) => setActiveSource(entry.source)}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Water Safety Index */}
      <CardFooter className="flex flex-col items-start">
        <div className="text-lg font-bold">Water Safety Index: {waterIndex}</div>
        <div className="text-muted-foreground text-sm">
          0–50: Poor | 51–70: Fair | 71–85: Good | 86–100: Excellent
        </div>
      </CardFooter>
    </Card>
  )
}