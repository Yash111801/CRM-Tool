"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MoreHorizontal, CircleDollarSign, Calendar, Building2, User, TrendingUp, Download, Share2 } from "lucide-react"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

const pipelineStages = [
  { id: "qualified", name: "Qualified", color: "bg-blue-500", chartColor: "#3B82F6" },
  { id: "proposal", name: "Proposal Sent", color: "bg-yellow-500", chartColor: "#EAB308" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-500", chartColor: "#F97316" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-500", chartColor: "#22C55E" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-500", chartColor: "#EF4444" },
]

// Chart data for revenue trend
const revenueTrendData = [
  { month: "Jan", revenue: 240000, leads: 45 },
  { month: "Feb", revenue: 320000, leads: 52 },
  { month: "Mar", revenue: 280000, leads: 38 },
  { month: "Apr", revenue: 410000, leads: 67 },
  { month: "May", revenue: 350000, leads: 55 },
  { month: "Jun", revenue: 480000, leads: 72 },
  { month: "Jul", revenue: 520000, leads: 68 },
  { month: "Aug", revenue: 450000, leads: 61 },
  { month: "Sep", revenue: 380000, leads: 49 },
  { month: "Oct", revenue: 420000, leads: 58 },
  { month: "Nov", revenue: 390000, leads: 54 },
  { month: "Dec", revenue: 460000, leads: 63 },
]

const mockDeals = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "Acme Corporation",
    contact: "John Smith",
    value: 125000,
    probability: 75,
    stage: "negotiation",
    owner: "Sarah Johnson",
    closeDate: "2024-02-15",
  },
  {
    id: "2",
    title: "Cloud Migration Project",
    company: "Tech Solutions Inc",
    contact: "Emily Davis",
    value: 85000,
    probability: 60,
    stage: "proposal",
    owner: "Mike Davis",
    closeDate: "2024-02-28",
  },
  {
    id: "3",
    title: "Security Audit Services",
    company: "Global Industries",
    contact: "Michael Brown",
    value: 45000,
    probability: 90,
    stage: "qualified",
    owner: "Lisa Chen",
    closeDate: "2024-02-10",
  },
  {
    id: "4",
    title: "Data Analytics Platform",
    company: "Innovation Labs",
    contact: "Lisa Chen",
    value: 200000,
    probability: 40,
    stage: "proposal",
    owner: "John Wilson",
    closeDate: "2024-03-15",
  },
]

export function DealPipeline() {
  const [deals, setDeals] = useState(mockDeals)
  const [showNewDealForm, setShowNewDealForm] = useState(false)
  const [showMoveStageDialog, setShowMoveStageDialog] = useState(false)
  const [showChangeStatusDialog, setShowChangeStatusDialog] = useState(false)
  const [showEditDealDialog, setShowEditDealDialog] = useState(false)
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [newDealStage, setNewDealStage] = useState("")
  const [noteText, setNoteText] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    contact: "",
    value: "",
    probability: "50",
    stage: "qualified",
    owner: "",
    closeDate: "",
  })


  const handleNewDeal = (stageId?: string) => {
    console.log("[v0] New Deal button clicked", stageId ? `for stage: ${stageId}` : "from header")
    if (stageId) {
      setFormData((prev) => ({ ...prev, stage: stageId }))
      setNewDealStage(stageId)
    }
    setShowNewDealForm(true)
  }

  const handleSubmitDeal = () => {
    if (!formData.title || !formData.company || !formData.value) {
      alert("Please fill in all required fields")
      return
    }

    const newDeal = {
      id: (deals.length + 1).toString(),
      title: formData.title,
      company: formData.company,
      contact: formData.contact,
      value: Number.parseInt(formData.value),
      probability: Number.parseInt(formData.probability),
      stage: formData.stage,
      owner: formData.owner,
      closeDate: formData.closeDate,
    }

    setDeals((prev) => [...prev, newDeal])
    setShowNewDealForm(false)
    setFormData({
      title: "",
      company: "",
      contact: "",
      value: "",
      probability: "50",
      stage: "qualified",
      owner: "",
      closeDate: "",
    })
    console.log("[v0] New deal created:", newDeal)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMoveStage = (deal: any) => {
    console.log("Move stage clicked for deal:", deal.title)
    setSelectedDeal(deal)
    setNewDealStage(deal.stage)
    setShowMoveStageDialog(true)
  }

  const handleChangeStatus = (deal: any) => {
    console.log("Change status clicked for deal:", deal.title)
    setSelectedDeal(deal)
    setNewDealStage(deal.stage)
    setShowChangeStatusDialog(true)
  }

  const handleEditDeal = (deal: any) => {
    console.log("Edit deal clicked for:", deal.title)
    setSelectedDeal(deal)
    setFormData({
      title: deal.title,
      company: deal.company,
      contact: deal.contact,
      value: deal.value.toString(),
      probability: deal.probability.toString(),
      stage: deal.stage,
      owner: deal.owner,
      closeDate: deal.closeDate,
    })
    setShowEditDealDialog(true)
  }

  const handleAddNote = (deal: any) => {
    console.log("Add note clicked for:", deal.title)
    setSelectedDeal(deal)
    setNoteText("")
    setShowAddNoteDialog(true)
  }

  const handleConfirmMoveStage = () => {
    if (!selectedDeal || !newDealStage) return

    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === selectedDeal.id ? { ...deal, stage: newDealStage } : deal
      )
    )

    setShowMoveStageDialog(false)
    setSelectedDeal(null)
    setNewDealStage("")
    console.log(`[v0] Deal ${selectedDeal.title} moved to ${pipelineStages.find(s => s.id === newDealStage)?.name}`)
  }

  const handleConfirmChangeStatus = () => {
    if (!selectedDeal || !newDealStage) return

    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === selectedDeal.id ? { ...deal, stage: newDealStage } : deal
      )
    )

    setShowChangeStatusDialog(false)
    setSelectedDeal(null)
    setNewDealStage("")
    console.log(`[v0] Deal ${selectedDeal.title} status changed to ${pipelineStages.find(s => s.id === newDealStage)?.name}`)
  }

  const handleSubmitEditDeal = () => {
    if (!selectedDeal || !formData.title || !formData.company || !formData.value) {
      alert("Please fill in all required fields")
      return
    }

    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === selectedDeal.id
          ? {
              ...deal,
              title: formData.title,
              company: formData.company,
              contact: formData.contact,
              value: Number.parseInt(formData.value),
              probability: Number.parseInt(formData.probability),
              stage: formData.stage,
              owner: formData.owner,
              closeDate: formData.closeDate,
            }
          : deal
      )
    )

    setShowEditDealDialog(false)
    setSelectedDeal(null)
    setFormData({
      title: "",
      company: "",
      contact: "",
      value: "",
      probability: "50",
      stage: "qualified",
      owner: "",
      closeDate: "",
    })
    console.log(`[v0] Deal ${selectedDeal.title} updated successfully`)
  }

  const handleSubmitNote = () => {
    if (!selectedDeal || !noteText.trim()) {
      alert("Please enter a note")
      return
    }

    // In a real app, you'd save this to a backend
    console.log(`[v0] Note added to deal ${selectedDeal.title}: ${noteText}`)
    alert(`Note added to ${selectedDeal.title}: "${noteText}"`)
    
    setShowAddNoteDialog(false)
    setSelectedDeal(null)
    setNoteText("")
  }


  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId)
  }

  // Prepare data for pie chart
  const getDealDistributionData = () => {
    const data = pipelineStages.map(stage => {
      const stageDeals = getDealsByStage(stage.id)
      return {
        name: stage.name,
        value: stageDeals.length,
        fill: stage.chartColor
      }
    }).filter(item => item.value > 0) // Only include segments with deals
    console.log("Pie chart data:", data)
    return data
  }

  // Color array for pie chart
  const COLORS = ['#3B82F6', '#EAB308', '#F97316', '#22C55E', '#EF4444']

  // Test data for pie chart - only include segments with values > 0
  const testPieData = [
    { name: 'Qualified', value: 1, fill: '#3B82F6' },
    { name: 'Proposal Sent', value: 2, fill: '#EAB308' },
    { name: 'Negotiation', value: 1, fill: '#F97316' }
  ]

  // Custom tooltip for revenue chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Revenue: {formatCurrency(payload[0]?.value || 0)}
          </p>
          <p className="text-green-600">
            Leads: {payload[1]?.value || 0}
          </p>
        </div>
      )
    }
    return null
  }

  // Regular Deal Card Component
  const DealCard = ({ deal }: { deal: any }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false)
        }
      }

      if (showDropdown) {
        document.addEventListener('mousedown', handleClickOutside)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [showDropdown])

    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm leading-tight pr-2">{deal.title}</h4>
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 flex-shrink-0 hover:bg-muted"
                onClick={() => {
                  console.log("Dropdown trigger clicked for:", deal.title)
                  setShowDropdown(!showDropdown)
                }}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
              {showDropdown && (
                <div className="absolute right-0 top-6 z-50 min-w-[160px] bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        handleEditDeal(deal)
                        setShowDropdown(false)
                      }}
                    >
                      Edit Deal
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        console.log("Move Stage menu item clicked for:", deal.title)
                        handleMoveStage(deal)
                        setShowDropdown(false)
                      }}
                    >
                      Move Stage
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        console.log("Change Status menu item clicked for:", deal.title)
                        handleChangeStatus(deal)
                        setShowDropdown(false)
                      }}
                    >
                      Change Status
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        handleAddNote(deal)
                        setShowDropdown(false)
                      }}
                    >
                      Add Note
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        console.log("Delete Deal clicked")
                        setShowDropdown(false)
                      }}
                    >
                      Delete Deal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{deal.company}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{deal.contact}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">{formatCurrency(deal.value)}</div>
            <Badge variant="outline" className="text-xs">
              {deal.probability}%
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 min-w-0">
              <Avatar className="w-4 h-4 flex-shrink-0">
                <AvatarFallback className="text-[8px]">
                  {deal.owner
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground truncate">{deal.owner}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{new Date(deal.closeDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const getStageValue = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleExport = () => {
    console.log("[v0] Export deals clicked")
    const csvContent = [
      ["Title", "Company", "Contact", "Value", "Probability", "Stage", "Owner", "Close Date"].join(","),
      ...deals.map((deal) =>
        [
          deal.title,
          deal.company,
          deal.contact,
          deal.value,
          `${deal.probability}%`,
          pipelineStages.find((s) => s.id === deal.stage)?.name || deal.stage,
          deal.owner,
          deal.closeDate,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `deal-pipeline-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    console.log("[v0] Share deals clicked")
    const shareData = {
      title: "Evalus CRM - Deal Pipeline",
      text: `Sharing ${deals.length} deals from pipeline with total value of ${formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0))}`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData).catch(console.error)
    } else {
      navigator.clipboard
        .writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        .then(() => alert("Deal pipeline data copied to clipboard!"))
        .catch(() => alert("Unable to share. Please copy the URL manually."))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deal Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="w-4 h-4 mr-2" />
                Test Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Test Item 1</DropdownMenuItem>
              <DropdownMenuItem>Test Item 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => handleNewDeal()}>
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Total Pipeline</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Weighted Value</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {formatCurrency(deals.reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Active Deals</span>
            </div>
            <div className="text-2xl font-bold mt-2">{deals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Avg. Deal Size</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Distribution of Deals by Stage
            </CardTitle>
            <CardDescription>Visual breakdown of deals across pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <PieChart width={400} height={320}>
                <Pie
                  data={getDealDistributionData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value}`}
                  outerRadius={80}
                  innerRadius={20}
                  dataKey="value"
                >
                  {getDealDistributionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-green-600" />
              Monthly Revenue & Lead Generation
            </CardTitle>
            <CardDescription>Revenue trends and lead generation over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <LineChart width={400} height={320} data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="revenue"
                  orientation="left"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000)}k`}
                />
                <YAxis 
                  yAxisId="leads"
                  orientation="right"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                  name="Revenue (₹)"
                />
                <Line
                  yAxisId="leads"
                  type="monotone"
                  dataKey="leads"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#22C55E", strokeWidth: 2 }}
                  name="Leads Generated"
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-4">
          {pipelineStages.map((stage) => {
            const stageDeals = getDealsByStage(stage.id)
            const stageValue = getStageValue(stage.id)

            return (
              <div key={stage.id} className="w-[320px] flex-shrink-0">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {stageDeals.length}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{formatCurrency(stageValue)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full px-6 pb-6">
                      <div className="space-y-3">
                        {stageDeals.map((deal) => (
                          <DealCard key={deal.id} deal={deal} />
                        ))}

                        <Button
                          variant="ghost"
                          className="w-full h-8 text-xs text-muted-foreground border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                          onClick={() => handleNewDeal(stage.id)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Deal
                        </Button>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* New Deal Modal */}
      <Dialog open={showNewDealForm} onOpenChange={setShowNewDealForm}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Deal</DialogTitle>
            <DialogDescription>Add a new deal to your pipeline. Fill in the details below.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="col-span-3"
                  placeholder="Company name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  className="col-span-3"
                  placeholder="Contact person"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value *
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal value"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="probability" className="text-right">
                  Probability
                </Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange("probability", e.target.value)}
                  className="col-span-3"
                  placeholder="Win probability %"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stage" className="text-right">
                  Stage
                </Label>
                <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipelineStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="owner" className="text-right">
                  Owner
                </Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => handleInputChange("owner", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal owner"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="closeDate" className="text-right">
                  Close Date
                </Label>
                <Input
                  id="closeDate"
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) => handleInputChange("closeDate", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDealForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitDeal}>Create Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Stage Dialog */}
      <Dialog open={showMoveStageDialog} onOpenChange={setShowMoveStageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Move Deal to Different Stage</DialogTitle>
            <DialogDescription>
              Select the new stage for "{selectedDeal?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newStage" className="text-right">
                New Stage
              </Label>
              <Select value={newDealStage} onValueChange={setNewDealStage}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select new stage" />
                </SelectTrigger>
                <SelectContent>
                  {pipelineStages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        {stage.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedDeal && (
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium">Current Stage</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${pipelineStages.find(s => s.id === selectedDeal.stage)?.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {pipelineStages.find(s => s.id === selectedDeal.stage)?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveStageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmMoveStage} disabled={!newDealStage || newDealStage === selectedDeal?.stage}>
              Move Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={showChangeStatusDialog} onOpenChange={setShowChangeStatusDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Deal Status</DialogTitle>
            <DialogDescription>
              Update the status for "{selectedDeal?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newStatus" className="text-right">
                New Status
              </Label>
              <Select value={newDealStage} onValueChange={setNewDealStage}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {pipelineStages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        {stage.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedDeal && (
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium">Current Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${pipelineStages.find(s => s.id === selectedDeal.stage)?.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {pipelineStages.find(s => s.id === selectedDeal.stage)?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeStatusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmChangeStatus} disabled={!newDealStage || newDealStage === selectedDeal?.stage}>
              Change Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Deal Dialog */}
      <Dialog open={showEditDealDialog} onOpenChange={setShowEditDealDialog}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
            <DialogDescription>Update the deal details below.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-company" className="text-right">
                  Company *
                </Label>
                <Input
                  id="edit-company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="col-span-3"
                  placeholder="Company name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="edit-contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  className="col-span-3"
                  placeholder="Contact person"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value *
                </Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal value"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-probability" className="text-right">
                  Probability
                </Label>
                <Input
                  id="edit-probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange("probability", e.target.value)}
                  className="col-span-3"
                  placeholder="Win probability %"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stage" className="text-right">
                  Stage
                </Label>
                <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipelineStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-owner" className="text-right">
                  Owner
                </Label>
                <Input
                  id="edit-owner"
                  value={formData.owner}
                  onChange={(e) => handleInputChange("owner", e.target.value)}
                  className="col-span-3"
                  placeholder="Deal owner"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-closeDate" className="text-right">
                  Close Date
                </Label>
                <Input
                  id="edit-closeDate"
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) => handleInputChange("closeDate", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDealDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEditDeal}>Update Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add a note for "{selectedDeal?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <textarea
                id="note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="col-span-3 min-h-[100px] p-2 border border-gray-300 rounded-md resize-none"
                placeholder="Enter your note here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddNoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
