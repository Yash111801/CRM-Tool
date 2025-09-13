"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Plus, Eye, Edit, Send, Clock, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RFPManagementProps {
  userRole: string
}

export function RFPManagement({ userRole }: RFPManagementProps) {
  const { toast } = useToast()
  const [showNewRFP, setShowNewRFP] = useState(false)
  const [showViewRFP, setShowViewRFP] = useState(false)
  const [selectedRFP, setSelectedRFP] = useState<any>(null)
  const [rfpData, setRfpData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    requirements: "",
    category: "",
  })

  const mockRFPs = [
    {
      id: "RFP-001",
      title: "Website Development Project",
      client: "TechCorp Inc.",
      status: "pending",
      budget: "₹4,17,000",
      deadline: "2024-02-15",
      submittedDate: "2024-01-10",
      description: "Complete website redesign with modern UI/UX",
    },
    {
      id: "RFP-002",
      title: "Mobile App Development",
      client: "StartupXYZ",
      status: "in-review",
      budget: "₹6,25,000",
      deadline: "2024-03-01",
      submittedDate: "2024-01-08",
      description: "Cross-platform mobile application for e-commerce",
    },
    {
      id: "RFP-003",
      title: "CRM System Integration",
      client: "Enterprise Solutions",
      status: "approved",
      budget: "₹10,00,000",
      deadline: "2024-04-30",
      submittedDate: "2024-01-05",
      description: "Custom CRM integration with existing systems",
    },
  ]

  const handleCreateRFP = () => {
    if (!rfpData.title || !rfpData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "RFP Created",
      description: `RFP "${rfpData.title}" has been created successfully`,
    })

    setShowNewRFP(false)
    setRfpData({
      title: "",
      description: "",
      budget: "",
      deadline: "",
      requirements: "",
      category: "",
    })
  }

  const handleViewRFP = (rfp: any) => {
    setSelectedRFP(rfp)
    setShowViewRFP(true)
  }

  // Filter RFPs by status
  const pendingRFPs = mockRFPs.filter(rfp => rfp.status === "pending")
  const inReviewRFPs = mockRFPs.filter(rfp => rfp.status === "in-review")
  const approvedRFPs = mockRFPs.filter(rfp => rfp.status === "approved")

  // Component to render RFP cards
  const renderRFPCards = (rfps: any[]) => {
    if (rfps.length === 0) {
      return (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No RFPs found</p>
        </div>
      )
    }

    return (
      <div className="grid gap-4">
        {rfps.map((rfp) => (
          <Card key={rfp.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{rfp.title}</h3>
                  <p className="text-sm text-muted-foreground">{rfp.client}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(rfp.status)}>
                  {getStatusIcon(rfp.status)}
                  <span className="ml-1 capitalize">{rfp.status}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{rfp.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>
                    <strong>Budget:</strong> {rfp.budget}
                  </span>
                  <span>
                    <strong>Deadline:</strong> {rfp.deadline}
                  </span>
                  <span>
                    <strong>Submitted:</strong> {rfp.submittedDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewRFP(rfp)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {userRole === "sales-executive" && (
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Respond
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-review":
        return <Eye className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">RFP Management</h1>
          <p className="text-muted-foreground">
            {userRole === "client" ? "Submit and track your RFP requests" : "Manage and respond to RFP submissions"}
          </p>
        </div>
        {(userRole === "client" || userRole === "sales-executive") && (
          <Dialog open={showNewRFP} onOpenChange={setShowNewRFP}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {userRole === "client" ? "Submit RFP" : "Create RFP"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{userRole === "client" ? "Submit New RFP" : "Create New RFP"}</DialogTitle>
                <DialogDescription>Fill in the details for your request for proposal</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[500px] pr-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        value={rfpData.title}
                        onChange={(e) => setRfpData({ ...rfpData, title: e.target.value })}
                        placeholder="Enter project title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={rfpData.category}
                        onValueChange={(value) => setRfpData({ ...rfpData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="software-integration">Software Integration</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={rfpData.description}
                      onChange={(e) => setRfpData({ ...rfpData, description: e.target.value })}
                      placeholder="Describe your project requirements"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Input
                        id="budget"
                        value={rfpData.budget}
                        onChange={(e) => setRfpData({ ...rfpData, budget: e.target.value })}
                        placeholder="e.g., ₹4,17,000 - ₹8,33,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Project Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={rfpData.deadline}
                        onChange={(e) => setRfpData({ ...rfpData, deadline: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Technical Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={rfpData.requirements}
                      onChange={(e) => setRfpData({ ...rfpData, requirements: e.target.value })}
                      placeholder="List specific technical requirements, technologies, or constraints"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowNewRFP(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRFP}>
                      <Send className="h-4 w-4 mr-2" />
                      Submit RFP
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All RFPs</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderRFPCards(mockRFPs)}
        </TabsContent>

        <TabsContent value="pending">
          {renderRFPCards(pendingRFPs)}
        </TabsContent>

        <TabsContent value="in-review">
          {renderRFPCards(inReviewRFPs)}
        </TabsContent>

        <TabsContent value="approved">
          {renderRFPCards(approvedRFPs)}
        </TabsContent>
      </Tabs>

      {/* View RFP Dialog */}
      <Dialog open={showViewRFP} onOpenChange={setShowViewRFP}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>RFP Details</DialogTitle>
            <DialogDescription>
              View detailed information about this RFP
            </DialogDescription>
          </DialogHeader>
          {selectedRFP && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">RFP ID</Label>
                  <p className="text-sm text-muted-foreground">{selectedRFP.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge variant="outline" className={getStatusColor(selectedRFP.status)}>
                      {getStatusIcon(selectedRFP.status)}
                      <span className="ml-1 capitalize">{selectedRFP.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRFP.title}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Client</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRFP.client}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Budget</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedRFP.budget}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Deadline</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedRFP.deadline}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRFP.description}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Submitted Date</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRFP.submittedDate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
