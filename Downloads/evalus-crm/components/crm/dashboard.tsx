"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  CircleDollarSign,
  Calendar,
  Phone,
  Mail,
  Plus,
  Download,
  RefreshCw,
  Filter,
  MoreVertical,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardProps {
  userRole?: string
}

const getRoleDashboardConfig = (userRole: string) => {
  switch (userRole) {
    case "super-admin":
      return {
        title: "Super Admin Dashboard",
        subtitle: "Platform overview and system management",
        showAllKPIs: true,
        showTeamPerformance: true,
        showSystemMetrics: true,
        showClientActivity: true,
        actions: ["new-lead", "export", "system-settings"],
      }
    case "manager":
      return {
        title: "Manager Dashboard",
        subtitle: "Team performance and sales analytics",
        showAllKPIs: true,
        showTeamPerformance: true,
        showSystemMetrics: false,
        showClientActivity: false,
        actions: ["export", "team-report"],
      }
    case "sales-executive":
      return {
        title: "Sales Dashboard",
        subtitle: "Your leads, deals, and performance metrics",
        showAllKPIs: false,
        showTeamPerformance: false,
        showSystemMetrics: false,
        showClientActivity: false,
        actions: ["new-lead", "new-rfp", "create-quote"],
      }
    case "client":
      return {
        title: "Client Portal",
        subtitle: "Your projects, RFPs, and quotes overview",
        showAllKPIs: false,
        showTeamPerformance: false,
        showSystemMetrics: false,
        showClientActivity: true,
        actions: ["submit-rfp", "view-quotes"],
      }
    default:
      return {
        title: "Dashboard",
        subtitle: "Welcome to Evalus CRM",
        showAllKPIs: true,
        showTeamPerformance: true,
        showSystemMetrics: false,
        showClientActivity: false,
        actions: ["new-lead"],
      }
  }
}

const clientData = {
  activeRFPs: 3,
  pendingQuotes: 2,
  approvedProjects: 1,
  totalBudget: 250000,
  recentRFPs: [
    { id: "RFP-001", title: "Website Development", status: "in-review", submittedDate: "2024-01-10" },
    { id: "RFP-002", title: "Mobile App", status: "pending", submittedDate: "2024-01-08" },
    { id: "RFP-003", title: "CRM Integration", status: "approved", submittedDate: "2024-01-05" },
  ],
  recentQuotes: [
    { id: "QT-001", project: "Website Development", amount: "₹4,37,500", status: "sent", validUntil: "2024-02-01" },
    { id: "QT-002", project: "Mobile App", amount: "₹6,50,000", status: "approved", validUntil: "2024-02-15" },
  ],
}

const salesData = [
  { month: "Jan", revenue: 45000, leads: 120, deals: 25, conversion: 20.8 },
  { month: "Feb", revenue: 52000, leads: 140, deals: 32, conversion: 22.9 },
  { month: "Mar", revenue: 48000, leads: 110, deals: 28, conversion: 25.5 },
  { month: "Apr", revenue: 61000, leads: 160, deals: 38, conversion: 23.8 },
  { month: "May", revenue: 55000, leads: 145, deals: 35, conversion: 24.1 },
  { month: "Jun", revenue: 67000, leads: 180, deals: 42, conversion: 23.3 },
]

const dealStages = [
  { name: "Qualified", value: 35, count: 42, color: "#3B82F6" },
  { name: "Proposal", value: 25, count: 30, color: "#EAB308" },
  { name: "Negotiation", value: 20, count: 24, color: "#F97316" },
  { name: "Closed Won", value: 20, count: 24, color: "#22C55E" },
]

const leadSources = [
  { source: "Website", leads: 450, conversion: 28.5, revenue: 10375000 },
  { source: "Referral", leads: 320, conversion: 35.2, revenue: 8134000 },
  { source: "Cold Call", leads: 280, conversion: 18.7, revenue: 5561000 },
  { source: "Social Media", leads: 195, conversion: 22.1, revenue: 3154000 },
]

const recentActivities = [
  {
    id: 1,
    type: "call",
    contact: "John Smith",
    company: "Acme Corp",
    time: "2 hours ago",
    status: "completed",
    duration: "15 min",
  },
  {
    id: 2,
    type: "email",
    contact: "Sarah Johnson",
    company: "Tech Solutions",
    time: "4 hours ago",
    status: "sent",
    subject: "Proposal Follow-up",
  },
  {
    id: 3,
    type: "meeting",
    contact: "Mike Davis",
    company: "Global Industries",
    time: "1 day ago",
    status: "completed",
    duration: "45 min",
  },
  {
    id: 4,
    type: "call",
    contact: "Lisa Chen",
    company: "Innovation Labs",
    time: "2 days ago",
    status: "missed",
    duration: "0 min",
  },
  {
    id: 5,
    type: "email",
    contact: "Robert Wilson",
    company: "StartupXYZ",
    time: "3 days ago",
    status: "opened",
    subject: "Product Demo",
  },
]

const teamPerformance = [
  { name: "Sarah Johnson", deals: 12, target: 15, revenue: 12035000, calls: 89, emails: 156 },
  { name: "Mike Davis", deals: 10, target: 12, revenue: 9960000, calls: 76, emails: 134 },
  { name: "Lisa Chen", deals: 8, target: 10, revenue: 7885000, calls: 65, emails: 98 },
  { name: "John Smith", deals: 6, target: 8, revenue: 6474000, calls: 54, emails: 87 },
]

export function Dashboard({ userRole = "sales-executive" }: DashboardProps) {
  const [dateRange, setDateRange] = useState("30d")
  const [chartType, setChartType] = useState("bar")
  const [refreshing, setRefreshing] = useState(false)

  const dashboardConfig = getRoleDashboardConfig(userRole)

  const handleRefresh = () => {
    console.log("[v0] Dashboard refresh triggered")
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const handleExport = () => {
    console.log("[v0] Export dashboard data triggered")

    const dashboardData = {
      kpis: {
        totalRevenue: 328000,
        activeLeads: 1245,
        conversionRate: 24.8,
        dealsClosed: 89,
      },
      salesData,
      dealStages,
      leadSources,
      teamPerformance,
      dateRange,
      exportedAt: new Date().toISOString(),
    }

    const jsonContent = JSON.stringify(dashboardData, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dashboard-export-${dateRange}-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleRoleAction = (action: string) => {
    console.log(`[v0] ${action} action triggered for role: ${userRole}`)
    switch (action) {
      case "new-lead":
        alert("Opening new lead form...")
        break
      case "new-rfp":
        alert("Opening RFP creation form...")
        break
      case "create-quote":
        alert("Opening quote creation form...")
        break
      case "submit-rfp":
        alert("Opening RFP submission form...")
        break
      case "view-quotes":
        alert("Opening quotes overview...")
        break
      case "system-settings":
        alert("Opening system settings...")
        break
      case "team-report":
        alert("Generating team performance report...")
        break
      default:
        alert(`${action} functionality coming soon...`)
    }
  }

  const handleFilter = () => {
    console.log("[v0] Filter activities triggered")
    alert("Opening activity filters...")
  }

  const renderClientKPIs = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active RFPs</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{clientData.activeRFPs}</div>
          <p className="text-xs text-muted-foreground mt-2">Submitted this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{clientData.pendingQuotes}</div>
          <p className="text-xs text-muted-foreground mt-2">Awaiting your review</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved Projects</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{clientData.approvedProjects}</div>
          <p className="text-xs text-muted-foreground mt-2">In progress</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">₹{clientData.totalBudget.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">Across all projects</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderSalesExecutiveKPIs = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">47</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 mr-1 text-accent" />
            +5 this week
          </div>
          <Progress value={65} className="mt-2 h-1" />
          <p className="text-xs text-muted-foreground mt-1">65% of monthly target</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Deals</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">12</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 mr-1 text-accent" />
            +2 this week
          </div>
          <p className="text-xs text-muted-foreground mt-2">Target: 15 deals</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Revenue</CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">₹12,08,000</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 mr-1 text-accent" />
            +18% this month
          </div>
          <Progress value={80} className="mt-2 h-1" />
          <p className="text-xs text-muted-foreground mt-1">80% of monthly target</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activities</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground mt-2">Calls & emails this week</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{dashboardConfig.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{dashboardConfig.subtitle}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <div className="flex gap-2 sm:gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex-1 sm:flex-none bg-transparent hover:bg-accent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
          <div className="flex gap-2 sm:gap-3">
            {dashboardConfig.actions.includes("export") && (
              <Button
                variant="outline"
                className="flex-1 sm:flex-none bg-transparent hover:bg-accent"
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
            {dashboardConfig.actions.includes("new-lead") && (
              <Button className="flex-1 sm:flex-none hover:bg-primary/90" onClick={() => handleRoleAction("new-lead")}>
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">New Lead</span>
              </Button>
            )}
            {dashboardConfig.actions.includes("submit-rfp") && (
              <Button
                className="flex-1 sm:flex-none hover:bg-primary/90"
                onClick={() => handleRoleAction("submit-rfp")}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Submit RFP</span>
              </Button>
            )}
            {dashboardConfig.actions.includes("create-quote") && (
              <Button
                className="flex-1 sm:flex-none hover:bg-primary/90"
                onClick={() => handleRoleAction("create-quote")}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Create Quote</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {userRole === "client" && renderClientKPIs()}
      {userRole === "sales-executive" && renderSalesExecutiveKPIs()}
      {(userRole === "manager" || userRole === "super-admin") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">₹2,73,00,000</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-accent" />
                +12.5% from last month
              </div>
              <Progress value={75} className="mt-2 h-1" />
              <p className="text-xs text-muted-foreground mt-1">75% of monthly target</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">1,245</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-accent" />
                +8.2% from last month
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  New: 342
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Qualified: 903
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">24.8%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="w-3 h-3 mr-1 text-destructive" />
                -2.1% from last month
              </div>
              <p className="text-xs text-muted-foreground mt-2">Industry avg: 22.3%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">89</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-accent" />
                +15.3% from last month
              </div>
              <p className="text-xs text-muted-foreground mt-2">Avg deal: ₹3,07,000</p>
            </CardContent>
          </Card>
        </div>
      )}

      {userRole !== "client" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">Revenue Trend</CardTitle>
                <CardDescription className="text-sm">Monthly revenue and lead generation</CardDescription>
              </div>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-full sm:w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] sm:h-[300px]">
                {salesData && salesData.length > 0 ? (
                  <div style={{ width: '100%', height: '100%' }}>
                    {chartType === "bar" && (
                      <BarChart width={400} height={250} data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#3B82F6" />
                      </BarChart>
                    )}
                    {chartType === "line" && (
                      <LineChart width={400} height={250} data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    )}
                    {chartType === "area" && (
                      <AreaChart width={400} height={250} data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deal Pipeline</CardTitle>
              <CardDescription className="text-sm">Distribution of deals by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] sm:h-[300px]">
                {dealStages && dealStages.length > 0 ? (
                  <div style={{ width: '100%', height: '100%' }}>
                    <PieChart width={400} height={250}>
                      <Pie
                        data={dealStages}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dealStages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No data available
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">
                {dealStages.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">{stage.name}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium">{stage.count}</span>
                      <span className="text-xs text-muted-foreground ml-1">({stage.value}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lead Sources Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lead Sources Performance</CardTitle>
          <CardDescription className="text-sm">Analysis of lead generation channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leadSources.map((source, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm sm:text-base truncate">{source.source}</h4>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {source.leads}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Conversion</span>
                    <span className="font-medium">{source.conversion}%</span>
                  </div>
                  <Progress value={source.conversion} className="h-2" />
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">₹{source.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription className="text-sm">Latest interactions with leads and customers</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto bg-transparent hover:bg-accent"
              onClick={handleFilter}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activity.type === "call" && <Phone className="w-4 h-4 text-primary" />}
                    {activity.type === "email" && <Mail className="w-4 h-4 text-primary" />}
                    {activity.type === "meeting" && <Calendar className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <p className="font-medium text-sm truncate">{activity.contact}</p>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "missed"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs w-fit"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{activity.company}</p>
                    {activity.subject && <p className="text-xs text-muted-foreground truncate">"{activity.subject}"</p>}
                    {activity.duration && (
                      <p className="text-xs text-muted-foreground">Duration: {activity.duration}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Team Performance</CardTitle>
              <CardDescription className="text-sm">Top performers this month</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>View Options</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => console.log("[v0] Sort by Revenue")}>Sort by Revenue</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Sort by Deals")}>Sort by Deals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Sort by Activity")}>
                  Sort by Activity
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("[v0] Export Report")}>Export Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium block truncate">{member.name}</span>
                        <p className="text-xs text-muted-foreground">₹{member.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {member.deals}/{member.target}
                    </span>
                  </div>
                  <Progress value={(member.deals / member.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{member.calls} calls</span>
                    <span>{member.emails} emails</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {userRole === "client" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent RFPs</CardTitle>
              <CardDescription className="text-sm">Your submitted requests for proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientData.recentRFPs.map((rfp) => (
                  <div key={rfp.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{rfp.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {rfp.id} • {rfp.submittedDate}
                      </p>
                    </div>
                    <Badge
                      variant={
                        rfp.status === "approved" ? "default" : rfp.status === "in-review" ? "secondary" : "outline"
                      }
                    >
                      {rfp.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Quotes</CardTitle>
              <CardDescription className="text-sm">Quotes received for your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientData.recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{quote.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {quote.id} • Valid until {quote.validUntil}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{quote.amount}</p>
                      <Badge variant={quote.status === "approved" ? "default" : "secondary"}>{quote.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
