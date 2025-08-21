"use client"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Harvest",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartLine() {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-64 p-4 rounded-xl flex items-center justify-center"
    >
      <ComposedChart width={500} height={500} data={chartData}>
        {/* --- Gradient only for bars --- */}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />

        {/* Bar with gradient fade */}
        <Bar dataKey="desktop" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />

        {/* Line with solid color */}
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="var(--chart-4)"
          strokeWidth={3}
          dot={{ r: 4, fill: "var(--chart-4)" }}
        />
      </ComposedChart>
    </ChartContainer>
  )
}