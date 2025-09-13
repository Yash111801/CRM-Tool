"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Target, CircleDollarSign, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"

const salesData = [
  { month: "Jan", revenue: 45000, leads: 120, deals: 8 },
  { month: "Feb", revenue: 52000, leads: 140, deals: 12 },
  { month: "Mar", revenue: 48000, leads: 110, deals: 9 },
  { month: "Apr", revenue: 61000, leads: 160, deals: 15 },
  { month: "May", revenue: 55000, leads: 145, deals: 11 },
  { month: "Jun", revenue: 67000, leads: 180, deals: 18 },
]

const conversionData = [
  { stage: "Leads", count: 1245, conversion: 100 },
  { stage: "Qualified", count: 435, conversion: 35 },
  { stage: "Proposal", count: 174, conversion: 14 },
  { stage: "Negotiation", count: 87, conversion: 7 },
  { stage: "Closed Won", count: 52, conversion: 4.2 },
]

const sourceData = [
  { name: "Website", value: 35, color: "#3B82F6" },
  { name: "Referral", value: 25, color: "#EAB308" },
  { name: "Cold Call", value: 20, color: "#F97316" },
  { name: "Social Media", value: 15, color: "#22C55E" },
  { name: "Email", value: 5, color: "#EF4444" },
]

const teamPerformance = [
  { name: "Sarah Johnson", deals: 18, revenue: 245000, target: 200000 },
  { name: "Mike Davis", deals: 15, revenue: 198000, target: 180000 },
  { name: "Lisa Chen", deals: 12, revenue: 156000, target: 150000 },
  { name: "John Wilson", deals: 10, revenue: 134000, target: 140000 },
]

export function Analytics() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Insights and performance metrics for your sales team</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Last 6 Months</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,73,00,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="w-3 h-3 mr-1 text-accent" />
              +12.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="w-3 h-3 mr-1 text-destructive" />
              -0.8% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5,25,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="w-3 h-3 mr-1 text-accent" />
              +5.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 days</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="w-3 h-3 mr-1 text-accent" />
              -3 days from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            {salesData && salesData.length > 0 ? (
              <div style={{ width: '100%', height: '300px' }}>
                <AreaChart width={400} height={300} data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of leads by source</CardDescription>
          </CardHeader>
          <CardContent>
            {sourceData && sourceData.length > 0 ? (
              <div style={{ width: '100%', height: '300px' }}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No data available
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sourceData.map((source, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-muted-foreground">{source.name}</span>
                  <span className="text-sm font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead conversion through sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            {conversionData && conversionData.length > 0 ? (
              <div style={{ width: '100%', height: '300px' }}>
                <BarChart width={400} height={300} data={conversionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual sales rep performance vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.deals} deals • {formatCurrency(member.revenue)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round((member.revenue / member.target) * 100)}%</div>
                      <div className="text-xs text-muted-foreground">of {formatCurrency(member.target)}</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((member.revenue / member.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Lead & Deal Activity</CardTitle>
          <CardDescription>Combined view of leads generated and deals closed</CardDescription>
        </CardHeader>
        <CardContent>
          {salesData && salesData.length > 0 ? (
            <div style={{ width: '100%', height: '300px' }}>
              <LineChart width={400} height={300} data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#EAB308"
                  strokeWidth={2}
                  name="Leads Generated"
                />
                <Line type="monotone" dataKey="deals" stroke="#22C55E" strokeWidth={2} name="Deals Closed" />
              </LineChart>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
