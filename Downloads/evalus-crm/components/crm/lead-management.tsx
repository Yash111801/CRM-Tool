"use client"

import { useState, useRef } from "react"
import * as XLSX from "xlsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Building2,
  Target,
  Star,
  Clock,
  Users,
  Download,
  Upload,
  Eye,
  BookmarkPlus,
  Share2,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"

const mockLeads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    source: "Website",
    status: "New",
    value: "₹2,08,000",
    owner: "Sarah Johnson",
    createdAt: "2024-01-15",
    score: 85,
    slaStatus: "on-time",
    slaDeadline: "2024-01-17T10:00:00Z",
    lastActivity: "2024-01-15T14:30:00Z",
    priority: "high",
    tags: ["enterprise", "hot-lead"],
    qualification: "qualified",
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@techsol.com",
    phone: "+1 (555) 987-6543",
    company: "Tech Solutions Inc",
    source: "Referral",
    status: "Qualified",
    value: "₹3,75,000",
    owner: "Mike Davis",
    createdAt: "2024-01-14",
    score: 92,
    slaStatus: "overdue",
    slaDeadline: "2024-01-15T16:00:00Z",
    lastActivity: "2024-01-14T11:20:00Z",
    priority: "high",
    tags: ["referral", "decision-maker"],
    qualification: "qualified",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@global.com",
    phone: "+1 (555) 456-7890",
    company: "Global Industries",
    source: "Cold Call",
    status: "Contacted",
    value: "₹1,25,000",
    owner: "Lisa Chen",
    createdAt: "2024-01-13",
    score: 65,
    slaStatus: "on-time",
    slaDeadline: "2024-01-16T09:00:00Z",
    lastActivity: "2024-01-13T16:45:00Z",
    priority: "medium",
    tags: ["cold-outreach"],
    qualification: "unqualified",
  },
]

const customViews = [
  { id: "all", name: "All Leads", count: 1245, isDefault: true },
  { id: "my-leads", name: "My Leads", count: 89, isDefault: false },
  { id: "hot-leads", name: "Hot Leads", count: 24, isDefault: false },
  { id: "overdue-sla", name: "Overdue SLA", count: 12, isDefault: false },
  { id: "high-score", name: "High Score (80+)", count: 45, isDefault: false },
]

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Qualified: "bg-green-100 text-green-800",
  Lost: "bg-red-100 text-red-800",
}

const slaColors = {
  "on-time": "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  "at-risk": "bg-yellow-100 text-yellow-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-800",
}

export function LeadManagement() {
  const [leads, setLeads] = useState(mockLeads)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [activeView, setActiveView] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isSlaDialogOpen, setIsSlaDialogOpen] = useState(false)
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  const [filterPriority, setFilterPriority] = useState<string[]>([])
  const [scoreRange, setScoreRange] = useState([0, 100])
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importPreview, setImportPreview] = useState<any[]>([])
  const [importMapping, setImportMapping] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    priority: "",
    score: 50,
    notes: "",
    businessStream: "",
    typeOfProject: "",
    customProjectType: "",
    projectName: ""
  })

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(lead.status)
    const matchesPriority = filterPriority.length === 0 || filterPriority.includes(lead.priority)
    const matchesScore = lead.score >= scoreRange[0] && lead.score <= scoreRange[1]

    return matchesSearch && matchesStatus && matchesPriority && matchesScore
  })

  const handleBulkAssign = (owner: string) => {
    setLeads(leads.map((lead) => (selectedLeads.includes(lead.id) ? { ...lead, owner } : lead)))
    setSelectedLeads([])
  }

  const handleBulkStatusUpdate = (status: string) => {
    setLeads(leads.map((lead) => (selectedLeads.includes(lead.id) ? { ...lead, status } : lead)))
    setSelectedLeads([])
  }

  const handleShare = () => {
    console.log("[v0] Share leads clicked")
    const shareData = {
      title: "Evalus CRM - Lead Management",
      text: `Sharing ${filteredLeads.length} leads from ${activeView} view`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData).catch(console.error)
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard
        .writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        .then(() => alert("Lead data copied to clipboard!"))
        .catch(() => alert("Unable to share. Please copy the URL manually."))
    }
  }

  const handleExport = () => {
    console.log("[v0] Export leads clicked")
    const csvContent = [
      ["Name", "Email", "Company", "Status", "Score", "Value", "Owner"].join(","),
      ...filteredLeads.map((lead) =>
        [lead.name, lead.email, lead.company, lead.status, lead.score, lead.value, lead.owner].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${activeView}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File upload triggered")
    const file = event.target.files?.[0]
    if (!file) {
      console.log("No file selected")
      return
    }
    console.log("File selected:", file.name, file.type)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        if (jsonData.length === 0) {
          alert("The Excel file is empty")
          return
        }

        // Get headers (first row)
        const headers = jsonData[0] as string[]
        const rows = jsonData.slice(1) as any[][]

        // Auto-map common column names
        const autoMapping: Record<string, string> = {}
        headers.forEach((header, index) => {
          const lowerHeader = header?.toLowerCase() || ''
          if (lowerHeader.includes('name') && !lowerHeader.includes('company')) {
            autoMapping[header] = 'name'
          } else if (lowerHeader.includes('email')) {
            autoMapping[header] = 'email'
          } else if (lowerHeader.includes('phone') || lowerHeader.includes('mobile')) {
            autoMapping[header] = 'phone'
          } else if (lowerHeader.includes('company')) {
            autoMapping[header] = 'company'
          } else if (lowerHeader.includes('source')) {
            autoMapping[header] = 'source'
          } else if (lowerHeader.includes('status')) {
            autoMapping[header] = 'status'
          } else if (lowerHeader.includes('value') || lowerHeader.includes('amount')) {
            autoMapping[header] = 'value'
          } else if (lowerHeader.includes('owner') || lowerHeader.includes('assigned')) {
            autoMapping[header] = 'owner'
          } else if (lowerHeader.includes('priority')) {
            autoMapping[header] = 'priority'
          } else if (lowerHeader.includes('score')) {
            autoMapping[header] = 'score'
          }
        })

        setImportMapping(autoMapping)
        setImportPreview(rows.slice(0, 10)) // Show first 10 rows for preview
        setIsImportDialogOpen(true)
      } catch (error) {
        console.error("Error reading Excel file:", error)
        alert("Error reading Excel file. Please make sure it's a valid Excel file.")
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleImportLeads = () => {
    if (importPreview.length === 0) return

    const newLeads = importPreview.map((row, index) => {
      const lead: any = {
        id: (leads.length + index + 1).toString(),
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Import",
        status: "New",
        value: "₹0",
        owner: "Unassigned",
        createdAt: new Date().toISOString().split('T')[0],
        score: 50,
        slaStatus: "on-time",
        slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date().toISOString(),
        priority: "medium",
        tags: ["imported"],
        qualification: "unqualified",
      }

      // Map the data based on import mapping
      Object.entries(importMapping).forEach(([excelColumn, leadField]) => {
        const columnIndex = Object.keys(importMapping).indexOf(excelColumn)
        const value = row[columnIndex]
        
        if (value !== undefined && value !== null && value !== '') {
          switch (leadField) {
            case 'name':
              lead.name = String(value)
              break
            case 'email':
              lead.email = String(value)
              break
            case 'phone':
              lead.phone = String(value)
              break
            case 'company':
              lead.company = String(value)
              break
            case 'source':
              lead.source = String(value)
              break
            case 'status':
              lead.status = String(value)
              break
            case 'value':
              const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[₹,]/g, ''))
              lead.value = `₹${numValue.toLocaleString('en-IN')}`
              break
            case 'owner':
              lead.owner = String(value)
              break
            case 'priority':
              lead.priority = String(value).toLowerCase()
              break
            case 'score':
              const score = typeof value === 'number' ? value : parseInt(String(value))
              lead.score = Math.min(100, Math.max(0, score))
              break
          }
        }
      })

      // Generate name from email if name is empty
      if (!lead.name && lead.email) {
        lead.name = lead.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }

      return lead
    })

    setLeads(prev => [...prev, ...newLeads])
    setIsImportDialogOpen(false)
    setImportPreview([])
    setImportMapping({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    alert(`Successfully imported ${newLeads.length} leads!`)
    console.log(`[v0] Imported ${newLeads.length} leads from Excel file`)
  }

  const handleCreateLead = () => {
    if (!newLeadData.name || !newLeadData.email || !newLeadData.company) {
      alert("Please fill in all required fields (Client Name, Email, Company)")
      return
    }

    const newLead = {
      id: (leads.length + 1).toString(),
      name: newLeadData.name,
      email: newLeadData.email,
      phone: newLeadData.phone,
      company: newLeadData.company,
      source: newLeadData.source || "Manual Entry",
      status: "New",
      value: "₹0",
      owner: "Unassigned",
      createdAt: new Date().toISOString().split('T')[0],
      score: newLeadData.score,
      slaStatus: "on-time",
      slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date().toISOString(),
      priority: newLeadData.priority || "medium",
      tags: ["new-lead"],
      qualification: "unqualified",
      businessStream: newLeadData.businessStream,
      typeOfProject: newLeadData.typeOfProject === "other" ? newLeadData.customProjectType : newLeadData.typeOfProject,
      projectName: newLeadData.projectName
    }

    setLeads(prev => [...prev, newLead])
    setIsNewLeadOpen(false)
    setNewLeadData({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "",
      priority: "",
      score: 50,
      notes: "",
      businessStream: "",
      typeOfProject: "",
      customProjectType: "",
      projectName: ""
    })
    
    alert(`Successfully created lead: ${newLead.name}`)
    console.log(`[v0] Created new lead:`, newLead)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground">Manage and track your sales leads with advanced features</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {
            console.log("Import button clicked")
            fileInputRef.current?.click()
          }}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isSlaDialogOpen} onOpenChange={setIsSlaDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                SLA Rules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Service Level Agreement Rules</DialogTitle>
                <DialogDescription>Configure response time requirements for different lead types</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current SLA Rules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">High Priority Leads</p>
                          <p className="text-sm text-muted-foreground">Response within 2 hours</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">2 hours</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Medium Priority Leads</p>
                          <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">24 hours</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Low Priority Leads</p>
                          <p className="text-sm text-muted-foreground">Response within 72 hours</p>
                        </div>
                        <Badge className="bg-gray-100 text-gray-800">72 hours</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Assignment Rules
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Lead Assignment Rules</DialogTitle>
                <DialogDescription>Configure automatic lead distribution rules</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Assignment Rules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Round Robin Assignment</p>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Distribute leads evenly among sales team</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Geographic Assignment</p>
                          <Badge variant="outline">Inactive</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Assign leads based on territory</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog open={isNewLeadOpen} onOpenChange={setIsNewLeadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Lead</DialogTitle>
                <DialogDescription>Add a new lead to your pipeline with advanced qualification</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Client Name *
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="col-span-3"
                      value={newLeadData.name}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email *
                    </Label>
                    <Input 
                      id="email" 
                      placeholder="john@example.com" 
                      className="col-span-3"
                      value={newLeadData.email}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567" 
                      className="col-span-3"
                      value={newLeadData.phone}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company *
                    </Label>
                    <Input 
                      id="company" 
                      placeholder="Acme Corp" 
                      className="col-span-3"
                      value={newLeadData.company}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="businessStream" className="text-right">
                      Business Stream
                    </Label>
                    <Input 
                      id="businessStream" 
                      placeholder="Lead owner" 
                      className="col-span-3"
                      value={newLeadData.businessStream}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, businessStream: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeOfProject" className="text-right">
                      Type of Project
                    </Label>
                    <Select 
                      value={newLeadData.typeOfProject} 
                      onValueChange={(value) => setNewLeadData(prev => ({ ...prev, typeOfProject: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical-writing">Medical Writing</SelectItem>
                        <SelectItem value="rwe-study">RWE Study</SelectItem>
                        <SelectItem value="platform-service">Platform Service</SelectItem>
                        <SelectItem value="survey">Survey</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newLeadData.typeOfProject === "other" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="customProjectType" className="text-right">
                        Specify Project Type
                      </Label>
                      <Input 
                        id="customProjectType" 
                        placeholder="Enter custom project type" 
                        className="col-span-3"
                        value={newLeadData.customProjectType}
                        onChange={(e) => setNewLeadData(prev => ({ ...prev, customProjectType: e.target.value }))}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectName" className="text-right">
                      Project Name
                    </Label>
                    <Input 
                      id="projectName" 
                      placeholder="Enter project name" 
                      className="col-span-3"
                      value={newLeadData.projectName}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, projectName: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="source" className="text-right">
                      Source
                    </Label>
                    <Select 
                      value={newLeadData.source} 
                      onValueChange={(value) => setNewLeadData(prev => ({ ...prev, source: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="cold-call">Cold Call</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select 
                      value={newLeadData.priority} 
                      onValueChange={(value) => setNewLeadData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="score" className="text-right">
                      Lead Score
                    </Label>
                    <div className="col-span-3">
                      <Slider 
                        value={[newLeadData.score]} 
                        onValueChange={(value) => setNewLeadData(prev => ({ ...prev, score: value[0] }))}
                        max={100} 
                        step={1} 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Current score: {newLeadData.score}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Additional notes..." 
                      className="col-span-3"
                      value={newLeadData.notes}
                      onChange={(e) => setNewLeadData(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewLeadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateLead}>
                  Create Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <div className="flex items-center justify-between">
          <TabsList>
            {customViews.map((view) => (
              <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-2">
                {view.name}
                <Badge variant="secondary" className="text-xs">
                  {view.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2">
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save View
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Custom View</DialogTitle>
                  <DialogDescription>Save current filters and settings as a custom view</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="viewName">View Name</Label>
                    <Input id="viewName" placeholder="My Custom View" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="public" />
                    <Label htmlFor="public">Make this view public</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsViewDialogOpen(false)}>Save View</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <TabsContent value={activeView} className="space-y-4">
          {/* Enhanced Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search leads by name, company, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                      <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="p-4 space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Status</Label>
                          <div className="space-y-2 mt-2">
                            {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                              <div key={status} className="flex items-center space-x-2">
                                <Checkbox
                                  id={status}
                                  checked={filterStatus.includes(status)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFilterStatus([...filterStatus, status])
                                    } else {
                                      setFilterStatus(filterStatus.filter((s) => s !== status))
                                    }
                                  }}
                                />
                                <Label htmlFor={status} className="text-sm">
                                  {status}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Priority</Label>
                          <div className="space-y-2 mt-2">
                            {["high", "medium", "low"].map((priority) => (
                              <div key={priority} className="flex items-center space-x-2">
                                <Checkbox
                                  id={priority}
                                  checked={filterPriority.includes(priority)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFilterPriority([...filterPriority, priority])
                                    } else {
                                      setFilterPriority(filterPriority.filter((p) => p !== priority))
                                    }
                                  }}
                                />
                                <Label htmlFor={priority} className="text-sm capitalize">
                                  {priority}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Lead Score Range</Label>
                          <div className="mt-2">
                            <Slider
                              value={scoreRange}
                              onValueChange={setScoreRange}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>{scoreRange[0]}</span>
                              <span>{scoreRange[1]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {selectedLeads.length > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">{selectedLeads.length} leads selected</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleBulkAssign("Sarah Johnson")}>
                          Assign to Sarah Johnson
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAssign("Mike Davis")}>
                          Assign to Mike Davis
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Contacted")}>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Qualified")}>
                          Mark as Qualified
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={() => setSelectedLeads([])}>
                      Clear Selection
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
              <CardDescription>
                Advanced lead management with scoring, SLA tracking, and bulk operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedLeads.length === filteredLeads.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLeads(filteredLeads.map((lead) => lead.id))
                          } else {
                            setSelectedLeads([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLeads([...selectedLeads, lead.id])
                            } else {
                              setSelectedLeads(selectedLeads.filter((id) => id !== lead.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="flex gap-1 mt-1">
                              {lead.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          {lead.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status as keyof typeof statusColors]}>{lead.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12">
                            <Progress value={lead.score} className="h-2" />
                          </div>
                          <span className="text-sm font-medium">{lead.score}</span>
                          {lead.score >= 80 && <Star className="w-3 h-3 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[lead.priority as keyof typeof priorityColors]}>
                          {lead.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={slaColors[lead.slaStatus as keyof typeof slaColors]}>
                            {lead.slaStatus === "overdue" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {lead.slaStatus === "on-time" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {lead.slaStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{lead.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {lead.owner
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{lead.owner}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Target className="mr-2 h-4 w-4" />
                              Convert to Deal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="mr-2 h-4 w-4" />
                              Update Score
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Import Leads from Excel</DialogTitle>
            <DialogDescription>
              Review and map your Excel columns to lead fields. Preview shows first 10 rows.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {/* Column Mapping */}
              <div>
                <h3 className="text-lg font-medium mb-4">Column Mapping</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(importMapping).map(([excelColumn, leadField]) => (
                    <div key={excelColumn} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Excel Column</Label>
                        <div className="text-sm text-muted-foreground">{excelColumn}</div>
                      </div>
                      <div className="text-muted-foreground">→</div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Lead Field</Label>
                        <Select
                          value={leadField}
                          onValueChange={(value) => {
                            setImportMapping(prev => ({
                              ...prev,
                              [excelColumn]: value
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="source">Source</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="value">Value</SelectItem>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="score">Score</SelectItem>
                            <SelectItem value="skip">Skip Column</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Table */}
              <div>
                <h3 className="text-lg font-medium mb-4">Preview (First 10 rows)</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(importMapping).map((column) => (
                          <TableHead key={column} className="text-xs">
                            {column}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importPreview.map((row, index) => (
                        <TableRow key={index}>
                          {Object.keys(importMapping).map((column, colIndex) => (
                            <TableCell key={colIndex} className="text-xs">
                              {row[colIndex] || '-'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportLeads}>
              Import {importPreview.length} Leads
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
