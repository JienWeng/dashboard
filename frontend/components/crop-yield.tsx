"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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

export const description = "Crop growth and yield chart"

const chartData = [
  { date: "2024-07-01", yield: 3500 },
  { date: "2024-07-02", yield: 3520 },
  { date: "2024-07-03", yield: 3490 },
  { date: "2024-07-04", yield: 3550 },
  { date: "2024-07-05", yield: 3600 },
  { date: "2024-07-06", yield: 3580 },
  { date: "2024-07-07", yield: 3620 },
  { date: "2024-07-08", yield: 3640 },
  { date: "2024-07-09", yield: 3590 },
  { date: "2024-07-10", yield: 3650 },
  { date: "2024-07-11", yield: 3700 },
  { date: "2024-07-12", yield: 3680 },
  { date: "2024-07-13", yield: 3720 },
  { date: "2024-07-14", yield: 3750 },
  { date: "2024-07-15", yield: 3710 },
  { date: "2024-07-16", yield: 3770 },
  { date: "2024-07-17", yield: 3800 },
  { date: "2024-07-18", yield: 3850 },
  { date: "2024-07-19", yield: 3820 },
  { date: "2024-07-20", yield: 3870 },
  { date: "2024-07-21", yield: 3900 },
  { date: "2024-07-22", yield: 3920 },
  { date: "2024-07-23", yield: 3890 },
  { date: "2024-07-24", yield: 3950 },
  { date: "2024-07-25", yield: 3980 },
  { date: "2024-07-26", yield: 4000 },
  { date: "2024-07-27", yield: 3970 },
  { date: "2024-07-28", yield: 4020 },
  { date: "2024-07-29", yield: 4050 },
  { date: "2024-07-30", yield: 4080 },
  { date: "2024-07-31", yield: 4060 },
  { date: "2024-08-01", yield: 4100 },
  { date: "2024-08-02", yield: 4120 },
  { date: "2024-08-03", yield: 4090 },
  { date: "2024-08-04", yield: 4140 },
  { date: "2024-08-05", yield: 4180 },
  { date: "2024-08-06", yield: 4200 },
  { date: "2024-08-07", yield: 4170 },
  { date: "2024-08-08", yield: 4230 },
  { date: "2024-08-09", yield: 4260 },
  { date: "2024-08-10", yield: 4280 },
  { date: "2024-08-11", yield: 4250 },
  { date: "2024-08-12", yield: 4300 },
  { date: "2024-08-13", yield: 4330 },
  { date: "2024-08-14", yield: 4360 },
  { date: "2024-08-15", yield: 4320 },
  { date: "2024-08-16", yield: 4380 },
  { date: "2024-08-17", yield: 4420 },
  { date: "2024-08-18", yield: 4450 },
  { date: "2024-08-19", yield: 4430 },
  { date: "2024-08-20", yield: 4480 },
  { date: "2024-08-21", yield: 4520 },
  { date: "2024-08-22", yield: 4540 },
  { date: "2024-08-23", yield: 4500 },
  { date: "2024-08-24", yield: 4550 },
  { date: "2024-08-25", yield: 4580 },
  { date: "2024-08-26", yield: 4620 },
  { date: "2024-08-27", yield: 4600 },
  { date: "2024-08-28", yield: 4650 },
  { date: "2024-08-29", yield: 4680 },
  { date: "2024-08-30", yield: 4700 },
  { date: "2024-08-31", yield: 4670 },
];

const chartConfig = {
  yield: {
    label: "Yield (kg/acre)",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function CropGrowthChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d") // shorten by default on mobile
    }
  }, [isMobile])

  const filteredData = chartData // small dataset so no filter needed here

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Crop Growth and Yield</CardTitle>
        <CardDescription>
          Current expected yield: <strong>350 kg/acre</strong>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
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
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillYield" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-yield)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-yield)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="yield"
              type="natural"
              fill="url(#fillYield)"
              stroke="var(--color-yield)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}