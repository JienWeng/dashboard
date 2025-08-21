// SectionCards.tsx
import { useEffect, useState } from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { ChartLine } from "@/components/chart-line"
import { ChartRadarDots } from "@/components/chart-radar-dots"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SectionCardsProps {
  timeRange: string
}

export function SectionCards({ timeRange }: SectionCardsProps) {
  const [dashboardData, setDashboardData] = useState<any>(null)

  const timeRangeToDays = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
  }

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const days = timeRangeToDays[timeRange] || 30
        const res = await fetch(`http://localhost:8000/api/dashboard?days=${days}`)
        const data = await res.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }

    fetchDashboard()
  }, [timeRange]) // run whenever the selection changes

  if (!dashboardData) return <div>Loading dashboard...</div>

  return (
    <div className="grid grid-cols-1 gap-6 @xl/main:grid-cols-2">
      {/* Harvest Card */}
      <Card>
        <CardHeader>
          <CardDescription>Harvest Trend</CardDescription>
          <CardTitle>
            {dashboardData.harvestSummary.totalHarvest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            <span> kg/acre</span>
          </CardTitle>
          <CardAction>
            <Badge>
              {dashboardData.harvestSummary.trend.startsWith("-") ? <IconTrendingDown /> : <IconTrendingUp />}
              {dashboardData.harvestSummary.trend}
            </Badge>
          </CardAction>
        </CardHeader>
        <ChartLine data={dashboardData.monthlyHarvest} />
      </Card>

      {/* Soil Health Card */}
      <Card>
        <CardHeader>
          <CardDescription>Soil Health Metrics</CardDescription>
          <CardTitle>{dashboardData.soilHealth.healthScore.toFixed(0)}</CardTitle>
          <CardAction>
            <Badge>
              {dashboardData.soilHealth.healthTrend.startsWith("-") ? <IconTrendingDown /> : <IconTrendingUp />}
              {dashboardData.soilHealth.healthTrend}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter>
          <ChartRadarDots data={dashboardData.soilHealth.chartData} />
        </CardFooter>
      </Card>
    </div>
  )
}