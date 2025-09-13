"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  User,
  Building2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Video,
  Star,
  Flag,
  Archive,
  Edit,
  Trash2,
} from "lucide-react"

// Mock data for communication activities
const mockActivities = [
  {
    id: "1",
    type: "call",
    subject: "Initial Discovery Call",
    contact: "John Smith",
    company: "Acme Corporation",
    contactId: "lead-1",
    duration: "25 minutes",
    status: "completed",
    outcome: "interested",
    notes:
      "Discussed product features and pricing. Very interested in enterprise package. Follow up with proposal next week.",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    scheduledAt: "2024-01-15T10:00:00Z",
    tags: ["discovery", "hot-lead"],
    priority: "high",
    nextAction: "Send proposal",
    nextActionDate: "2024-01-22T09:00:00Z",
  },
  {
    id: "2",
    type: "email",
    subject: "Product Demo Follow-up",
    contact: "Emily Davis",
    company: "Tech Solutions Inc",
    contactId: "lead-2",
    status: "sent",
    outcome: "pending",
    notes: "Sent detailed product information and case studies. Awaiting response.",
    createdBy: "Mike Davis",
    createdAt: "2024-01-14T14:20:00Z",
    tags: ["follow-up", "demo"],
    priority: "medium",
    nextAction: "Follow up call",
    nextActionDate: "2024-01-18T14:00:00Z",
  },
  {
    id: "3",
    type: "meeting",
    subject: "Contract Negotiation",
    contact: "Michael Brown",
    company: "Global Industries",
    contactId: "deal-1",
    duration: "45 minutes",
    status: "completed",
    outcome: "positive",
    notes: "Negotiated terms and pricing. Client agreed to most terms. Minor adjustments needed on delivery timeline.",
    createdBy: "Lisa Chen",
    createdAt: "2024-01-13T16:00:00Z",
    scheduledAt: "2024-01-13T16:00:00Z",
    tags: ["negotiation", "contract"],
    priority: "high",
    nextAction: "Send revised contract",
    nextActionDate: "2024-01-16T10:00:00Z",
  },
  {
    id: "4",
    type: "note",
    subject: "Competitor Analysis Discussion",
    contact: "Sarah Wilson",
    company: "StartupXYZ",
    contactId: "lead-4",
    status: "completed",
    outcome: "neutral",
    notes:
      "Client mentioned they're also evaluating competitors. Need to highlight our unique value proposition more clearly.",
    createdBy: "John Smith",
    createdAt: "2024-01-12T11:15:00Z",
    tags: ["competitor", "analysis"],
    priority: "medium",
    nextAction: "Prepare competitive analysis",
    nextActionDate: "2024-01-19T09:00:00Z",
  },
  {
    id: "5",
    type: "task",
    subject: "Prepare Proposal Document",
    contact: "Robert Johnson",
    company: "Enterprise Corp",
    contactId: "lead-5",
    status: "in-progress",
    outcome: "pending",
    notes: "Working on comprehensive proposal including technical specifications and pricing breakdown.",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-11T09:00:00Z",
    tags: ["proposal", "documentation"],
    priority: "high",
    nextAction: "Complete proposal",
    nextActionDate: "2024-01-17T17:00:00Z",
  },
  {
    id: "6",
    type: "call",
    subject: "Technical Requirements Review",
    contact: "David Lee",
    company: "Innovation Labs",
    contactId: "lead-6",
    duration: "35 minutes",
    status: "completed",
    outcome: "positive",
    notes: "Reviewed technical specifications and integration requirements. Client is satisfied with our capabilities.",
    createdBy: "Tom Wilson",
    createdAt: "2024-01-10T15:30:00Z",
    scheduledAt: "2024-01-10T15:00:00Z",
    tags: ["technical", "requirements"],
    priority: "high",
    nextAction: "Send technical proposal",
    nextActionDate: "2024-01-17T10:00:00Z",
  },
  {
    id: "7",
    type: "email",
    subject: "Pricing Discussion",
    contact: "Jennifer Martinez",
    company: "Growth Ventures",
    contactId: "lead-7",
    status: "sent",
    outcome: "pending",
    notes: "Sent detailed pricing breakdown and package options. Awaiting feedback on preferred package.",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-09T11:45:00Z",
    tags: ["pricing", "proposal"],
    priority: "medium",
    nextAction: "Follow up on pricing",
    nextActionDate: "2024-01-16T14:00:00Z",
  },
  {
    id: "8",
    type: "meeting",
    subject: "Stakeholder Presentation",
    contact: "Alex Thompson",
    company: "Corporate Solutions",
    contactId: "deal-2",
    duration: "60 minutes",
    status: "completed",
    outcome: "positive",
    notes: "Presented to key stakeholders. Received positive feedback and approval to move forward with pilot program.",
    createdBy: "Mike Davis",
    createdAt: "2024-01-08T14:00:00Z",
    scheduledAt: "2024-01-08T14:00:00Z",
    tags: ["presentation", "stakeholders"],
    priority: "high",
    nextAction: "Prepare pilot agreement",
    nextActionDate: "2024-01-15T09:00:00Z",
  },
  {
    id: "9",
    type: "note",
    subject: "Budget Constraints Discussion",
    contact: "Maria Rodriguez",
    company: "Budget Corp",
    contactId: "lead-8",
    status: "completed",
    outcome: "neutral",
    notes: "Client has budget constraints. Need to explore more affordable package options or payment plans.",
    createdBy: "Lisa Chen",
    createdAt: "2024-01-07T16:20:00Z",
    tags: ["budget", "constraints"],
    priority: "medium",
    nextAction: "Prepare budget-friendly options",
    nextActionDate: "2024-01-14T10:00:00Z",
  },
  {
    id: "10",
    type: "task",
    subject: "Integration Planning",
    contact: "Kevin Park",
    company: "Tech Innovators",
    contactId: "deal-3",
    status: "in-progress",
    outcome: "pending",
    notes: "Working on detailed integration plan and timeline. Coordinating with client's technical team.",
    createdBy: "Tom Wilson",
    createdAt: "2024-01-06T09:30:00Z",
    tags: ["integration", "planning"],
    priority: "high",
    nextAction: "Complete integration plan",
    nextActionDate: "2024-01-13T17:00:00Z",
  },
]

const activityTypes = [
  { value: "call", label: "Phone Call", icon: Phone, color: "bg-blue-100 text-blue-800" },
  { value: "email", label: "Email", icon: Mail, color: "bg-green-100 text-green-800" },
  { value: "meeting", label: "Meeting", icon: Calendar, color: "bg-purple-100 text-purple-800" },
  { value: "note", label: "Note", icon: MessageSquare, color: "bg-yellow-100 text-yellow-800" },
  { value: "task", label: "Task", icon: CheckCircle, color: "bg-orange-100 text-orange-800" },
  { value: "video", label: "Video Call", icon: Video, color: "bg-indigo-100 text-indigo-800" },
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  "in-progress": "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  sent: "bg-gray-100 text-gray-800",
}

const outcomeColors = {
  positive: "bg-green-100 text-green-800",
  neutral: "bg-yellow-100 text-yellow-800",
  negative: "bg-red-100 text-red-800",
  interested: "bg-blue-100 text-blue-800",
  pending: "bg-gray-100 text-gray-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-800",
}

export function CommunicationTracking() {
  const [activities, setActivities] = useState(mockActivities)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("timeline")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.notes.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || activity.type === selectedType
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find((t) => t.value === type)
    return activityType ? activityType.icon : MessageSquare
  }

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find((t) => t.value === type)
    return activityType ? activityType.color : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Communication Tracking</h1>
          <p className="text-muted-foreground">Track all interactions and communications with leads and customers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
          <Dialog open={isNewActivityOpen} onOpenChange={setIsNewActivityOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Log New Activity</DialogTitle>
                <DialogDescription>Record a new communication or interaction</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activityType">Activity Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith - Acme Corp</SelectItem>
                        <SelectItem value="emily-davis">Emily Davis - Tech Solutions</SelectItem>
                        <SelectItem value="michael-brown">Michael Brown - Global Industries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Activity subject or title" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="outcome">Outcome</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Detailed notes about the interaction..." rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nextAction">Next Action</Label>
                    <Input id="nextAction" placeholder="What's the next step?" />
                  </div>
                  <div>
                    <Label htmlFor="nextActionDate">Next Action Date</Label>
                    <Input id="nextActionDate" type="datetime-local" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Add tags (comma separated)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewActivityOpen(false)}>
                  Save Draft
                </Button>
                <Button onClick={() => setIsNewActivityOpen(false)}>Log Activity</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
          <TabsTrigger value="calls">Call Logs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline ({filteredActivities.length})</CardTitle>
              <CardDescription>Chronological view of all communications and interactions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto border-t">
                <div className="p-6 space-y-6">
                  {filteredActivities.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="relative">
                        {index !== filteredActivities.length - 1 && (
                          <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                        )}
                        <div className="flex gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-lg">{activity.subject}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <User className="w-3 h-3" />
                                  <span>{activity.contact}</span>
                                  <Building2 className="w-3 h-3 ml-2" />
                                  <span>{activity.company}</span>
                                  <Clock className="w-3 h-3 ml-2" />
                                  <span>{new Date(activity.createdAt).toLocaleString()}</span>
                                  {activity.duration && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <span>{activity.duration}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={statusColors[activity.status as keyof typeof statusColors]}>
                                  {activity.status}
                                </Badge>
                                <Badge className={outcomeColors[activity.outcome as keyof typeof outcomeColors]}>
                                  {activity.outcome}
                                </Badge>
                                <Badge className={priorityColors[activity.priority as keyof typeof priorityColors]}>
                                  <Flag className="w-3 h-3 mr-1" />
                                  {activity.priority}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Activity
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Star className="mr-2 h-4 w-4" />
                                      Mark Important
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="text-sm">{activity.notes}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {activity.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              {activity.nextAction && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Next: {activity.nextAction}</span>
                                  <span>({new Date(activity.nextActionDate).toLocaleDateString()})</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-xs">
                                  {activity.createdBy
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>Logged by {activity.createdBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Logs</CardTitle>
              <CardDescription>Track all phone communications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities
                    .filter((activity) => activity.type === "call")
                    .map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{call.contact}</div>
                            <div className="text-sm text-muted-foreground">{call.company}</div>
                          </div>
                        </TableCell>
                        <TableCell>{call.subject}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge className={outcomeColors[call.outcome as keyof typeof outcomeColors]}>
                            {call.outcome}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(call.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {call.createdBy
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{call.createdBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                              <DropdownMenuItem>Add to CRM</DropdownMenuItem>
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls Made</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18m</div>
                <p className="text-xs text-muted-foreground">+2m from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
