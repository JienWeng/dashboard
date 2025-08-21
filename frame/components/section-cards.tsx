// components/section-cards.tsx
import { IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-3">
      
      {/* RECOMMENDATION STEPS CARD WITH PERCENTAGE BARS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recommendation Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-blue-700">1</span>
              </div>
              <span className="text-sm font-medium">Optimize Conversion Funnel</span>
            </div>
            <p className="text-xs text-gray-600 ml-7 mb-2">23% drop detected in stage 3</p>
            <div className="ml-7 bg-gray-200 rounded-full h-1.5 w-full">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-blue-700">2</span>
              </div>
              <span className="text-sm font-medium">Update User Onboarding</span>
            </div>
            <p className="text-xs text-gray-600 ml-7 mb-2">42% of users skip tutorial</p>
            <div className="ml-7 bg-gray-200 rounded-full h-1.5 w-full">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-blue-700">3</span>
              </div>
              <span className="text-sm font-medium">Scale Infrastructure</span>
            </div>
            <p className="text-xs text-gray-600 ml-7 mb-2">API latency increased by 200ms</p>
            <div className="ml-7 bg-gray-200 rounded-full h-1.5 w-full">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOTAL REVENUE CARD */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">$1,250.00</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
              <IconTrendingUp className="w-3 h-3 mr-1" />
              +12.5%
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1 pt-3">
          <div className="text-xs text-gray-600">this month</div>
          <div className="text-xs font-medium">Trending up this month</div>
        </CardFooter>
      </Card>

      {/* PERFORMANCE SUMMARY CARD */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">Active Accounts</span>
            <span className="font-semibold">45,678</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">Growth Rate</span>
            <span className="font-semibold text-green-600">+4.5%</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">Completion</span>
            <span className="font-semibold">92%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Satisfaction</span>
            <span className="font-semibold">4.8/5</span>
          </div>
        </CardContent>
        <CardFooter className="pt-3">
          <div className="text-xs text-gray-500">Overall performance exceeding targets</div>
        </CardFooter>
      </Card>

    </div>
  )
}