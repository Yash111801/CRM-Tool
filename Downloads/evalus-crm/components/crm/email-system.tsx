"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Send,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Reply,
  Forward,
  Archive,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Calendar,
  Download,
  Share2,
} from "lucide-react"

// Mock data for emails
const mockEmails = [
  {
    id: "1",
    subject: "Follow-up on Product Demo",
    recipient: "john.smith@acme.com",
    recipientName: "John Smith",
    company: "Acme Corp",
    status: "sent",
    sentAt: "2024-01-15T10:30:00Z",
    openedAt: "2024-01-15T11:45:00Z",
    template: "Follow-up Template",
    content: "Thank you for attending our product demo yesterday...",
  },
  {
    id: "2",
    subject: "Proposal for Q1 Partnership",
    recipient: "sarah.johnson@techsol.com",
    recipientName: "Sarah Johnson",
    company: "Tech Solutions",
    status: "opened",
    sentAt: "2024-01-14T14:20:00Z",
    openedAt: "2024-01-14T16:30:00Z",
    template: "Proposal Template",
    content: "I hope this email finds you well. Following our conversation...",
  },
  {
    id: "3",
    subject: "Welcome to Evalus CRM",
    recipient: "mike.davis@global.com",
    recipientName: "Mike Davis",
    company: "Global Industries",
    status: "delivered",
    sentAt: "2024-01-13T09:15:00Z",
    template: "Welcome Template",
    content: "Welcome to Evalus CRM! We're excited to have you on board...",
  },
]

// Mock email templates
const emailTemplates = [
  {
    id: "1",
    name: "Welcome Template",
    subject: "Welcome to {{company_name}}",
    content:
      "Hi {{first_name}},\n\nWelcome to {{company_name}}! We're excited to have you on board.\n\nBest regards,\n{{sender_name}}",
    category: "Onboarding",
    usage: 45,
  },
  {
    id: "2",
    name: "Follow-up Template",
    subject: "Following up on our conversation",
    content:
      "Hi {{first_name}},\n\nThank you for taking the time to speak with me about {{topic}}.\n\nI wanted to follow up on our discussion and see if you have any questions.\n\nBest regards,\n{{sender_name}}",
    category: "Follow-up",
    usage: 32,
  },
  {
    id: "3",
    name: "Proposal Template",
    subject: "Proposal for {{project_name}}",
    content:
      "Dear {{first_name}},\n\nI hope this email finds you well. Following our conversation about {{project_name}}, I've prepared a detailed proposal for your review.\n\nPlease find the attached proposal document.\n\nBest regards,\n{{sender_name}}",
    category: "Sales",
    usage: 28,
  },
]

const statusColors = {
  sent: "bg-blue-100 text-blue-800",
  delivered: "bg-yellow-100 text-yellow-800",
  opened: "bg-green-100 text-green-800",
  clicked: "bg-purple-100 text-purple-800",
  bounced: "bg-red-100 text-red-800",
}

const statusIcons = {
  sent: Send,
  delivered: CheckCircle,
  opened: Eye,
  clicked: CheckCircle,
  bounced: XCircle,
}

// Template Card Component with Custom Dropdown
const TemplateCard = ({ template, onEdit, onDelete }: { template: any, onEdit: (template: any) => void, onDelete: (id: string) => void }) => {
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription>{template.subject}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{template.category}</Badge>
            <span className="text-sm text-muted-foreground">{template.usage} uses</span>
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 flex-shrink-0 hover:bg-muted"
                onClick={() => {
                  console.log("Template dropdown clicked for:", template.name)
                  setShowDropdown(!showDropdown)
                }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              {showDropdown && (
                <div className="absolute right-0 top-8 z-50 min-w-[160px] bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        onEdit(template)
                        setShowDropdown(false)
                      }}
                    >
                      Edit Template
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        console.log("Duplicate template clicked")
                        setShowDropdown(false)
                      }}
                    >
                      Duplicate
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        onDelete(template.id)
                        setShowDropdown(false)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
      </CardContent>
    </Card>
  )
}

export function EmailSystem() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isTemplateOpen, setIsTemplateOpen] = useState(false)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [templates, setTemplates] = useState(emailTemplates)
  
  const [newTemplateData, setNewTemplateData] = useState({
    name: "",
    subject: "",
    content: "",
    category: "General"
  })

  const filteredEmails = mockEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExport = () => {
    console.log("[v0] Export emails clicked")
    const csvContent = [
      ["Subject", "Recipient", "Company", "Status", "Sent Date", "Opened Date", "Template"].join(","),
      ...filteredEmails.map((email) =>
        [
          email.subject,
          email.recipientName,
          email.company,
          email.status,
          new Date(email.sentAt).toLocaleDateString(),
          email.openedAt ? new Date(email.openedAt).toLocaleDateString() : "Not opened",
          email.template,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `email-communications-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    console.log("[v0] Share emails clicked")
    const shareText = `Evalus CRM - Email Communications\nSharing ${filteredEmails.length} email communications from ${activeTab} tab\n${window.location.href}`

    if (navigator.share && navigator.canShare()) {
      const shareData = {
        title: "Evalus CRM - Email Communications",
        text: `Sharing ${filteredEmails.length} email communications from ${activeTab} tab`,
        url: window.location.href,
      }

      navigator
        .share(shareData)
        .then(() => console.log("[v0] Share successful"))
        .catch((error) => {
          console.log("[v0] Share failed, using clipboard fallback:", error)
          // Fallback to clipboard
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(shareText)
              .then(() => alert("Email data copied to clipboard!"))
              .catch(() => {
                // Final fallback - create a text area and copy
                const textArea = document.createElement("textarea")
                textArea.value = shareText
                document.body.appendChild(textArea)
                textArea.select()
                try {
                  document.execCommand("copy")
                  alert("Email data copied to clipboard!")
                } catch (err) {
                  alert("Unable to share or copy. Please copy the URL manually.")
                }
                document.body.removeChild(textArea)
              })
          } else {
            alert("Sharing not supported. Please copy the URL manually.")
          }
        })
    } else {
      // Direct clipboard fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(shareText)
          .then(() => alert("Email data copied to clipboard!"))
          .catch(() => alert("Unable to copy to clipboard. Please copy the URL manually."))
      } else {
        alert("Sharing not supported in this browser. Please copy the URL manually.")
      }
    }
  }

  const handleNewTemplate = () => {
    console.log("[v0] New Template button clicked")
    setNewTemplateData({
      name: "",
      subject: "",
      content: "",
      category: "General"
    })
    setIsNewTemplateOpen(true)
  }

  const handleEditTemplate = (template: any) => {
    console.log("[v0] Edit Template clicked for:", template.name)
    setSelectedTemplate(template)
    setNewTemplateData({
      name: template.name,
      subject: template.subject,
      content: template.content,
      category: template.category
    })
    setIsEditTemplateOpen(true)
  }

  const handleSaveTemplate = () => {
    if (!newTemplateData.name || !newTemplateData.subject || !newTemplateData.content) {
      alert("Please fill in all required fields")
      return
    }

    if (isEditTemplateOpen && selectedTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(template => 
        template.id === selectedTemplate.id 
          ? { ...template, ...newTemplateData }
          : template
      ))
      console.log("[v0] Template updated:", newTemplateData.name)
    } else {
      // Create new template
      const newTemplate = {
        id: (templates.length + 1).toString(),
        ...newTemplateData,
        usage: 0
      }
      setTemplates(prev => [...prev, newTemplate])
      console.log("[v0] New template created:", newTemplateData.name)
    }

    setIsNewTemplateOpen(false)
    setIsEditTemplateOpen(false)
    setSelectedTemplate(null)
    setNewTemplateData({
      name: "",
      subject: "",
      content: "",
      category: "General"
    })
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log("[v0] Delete template clicked for ID:", templateId)
    setTemplates(prev => prev.filter(template => template.id !== templateId))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Email Communication</h1>
          <p className="text-muted-foreground">Manage email campaigns and communications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Email Templates</DialogTitle>
                <DialogDescription>Manage your email templates for consistent communication</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Input placeholder="Search templates..." className="max-w-sm" />
                    <Button onClick={handleNewTemplate}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Template
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {templates.map((template) => (
                      <TemplateCard 
                        key={template.id} 
                        template={template} 
                        onEdit={handleEditTemplate}
                        onDelete={handleDeleteTemplate}
                      />
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Compose Email
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
                <DialogDescription>Send a new email to your leads or contacts</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Input id="to" placeholder="recipient@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="template">Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Email subject" />
                  </div>
                  <div>
                    <Label htmlFor="content">Message</Label>
                    <Textarea id="content" placeholder="Type your message here..." rows={8} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Add Recipients
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Send
                    </Button>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Save Draft
                </Button>
                <Button onClick={() => setIsComposeOpen(false)}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Email Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Emails ({filteredEmails.length})</CardTitle>
              <CardDescription>Track your email communications and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmails.map((email) => {
                    const StatusIcon = statusIcons[email.status as keyof typeof statusIcons]
                    return (
                      <TableRow key={email.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {email.recipientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{email.recipientName}</div>
                              <div className="text-sm text-muted-foreground">{email.company}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium truncate">{email.subject}</div>
                            <div className="text-sm text-muted-foreground truncate">{email.content}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[email.status as keyof typeof statusColors]}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {email.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(email.sentAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {email.openedAt ? new Date(email.openedAt).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{email.template}</Badge>
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
                                View Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="mr-2 h-4 w-4" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Forward className="mr-2 h-4 w-4" />
                                Forward
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2%</div>
                <p className="text-xs text-muted-foreground">+0.8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">-0.3% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Template Dialog */}
      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>Create a new email template for consistent communication</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input 
                    id="template-name" 
                    value={newTemplateData.name}
                    onChange={(e) => setNewTemplateData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name" 
                  />
                </div>
                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select 
                    value={newTemplateData.category} 
                    onValueChange={(value) => setNewTemplateData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="template-subject">Subject *</Label>
                <Input 
                  id="template-subject" 
                  value={newTemplateData.subject}
                  onChange={(e) => setNewTemplateData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject" 
                />
              </div>
              <div>
                <Label htmlFor="template-content">Content *</Label>
                <Textarea 
                  id="template-content" 
                  value={newTemplateData.content}
                  onChange={(e) => setNewTemplateData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter email content. Use {{variable_name}} for dynamic content..."
                  rows={8} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use variables like {`{{first_name}}`}, {`{{company_name}}`}, {`{{sender_name}}`} for personalization
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>Edit the email template</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-template-name">Template Name *</Label>
                  <Input 
                    id="edit-template-name" 
                    value={newTemplateData.name}
                    onChange={(e) => setNewTemplateData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name" 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-template-category">Category</Label>
                  <Select 
                    value={newTemplateData.category} 
                    onValueChange={(value) => setNewTemplateData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-template-subject">Subject *</Label>
                <Input 
                  id="edit-template-subject" 
                  value={newTemplateData.subject}
                  onChange={(e) => setNewTemplateData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject" 
                />
              </div>
              <div>
                <Label htmlFor="edit-template-content">Content *</Label>
                <Textarea 
                  id="edit-template-content" 
                  value={newTemplateData.content}
                  onChange={(e) => setNewTemplateData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter email content. Use {{variable_name}} for dynamic content..."
                  rows={8} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use variables like {`{{first_name}}`}, {`{{company_name}}`}, {`{{sender_name}}`} for personalization
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>Update Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
