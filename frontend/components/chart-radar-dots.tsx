"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with dots"

const chartData = [
    { substance: "Nitrogen", amount: 186 },
    { substance: "CO2", amount: 305 },
    { substance: "Organic Substance", amount: 237 },
    { substance: "WPI", amount: 273 },
    { substance: "Organic Substance 2", amount: 237 },
    { substance: "WPI 2", amount: 273 },
]

const chartConfig = {
  amount: {
    label: "amount",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartRadarDots() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-64 p-4 rounded-xl flex items-center justify-center">
      <RadarChart width={500} height={500} data={chartData}>
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="substance" />
        <PolarGrid />
        <Radar
          dataKey="amount"
          fill="var(--primary)"
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  )
}