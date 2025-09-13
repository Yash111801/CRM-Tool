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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Eye, Edit, Send, CircleDollarSign, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuoteManagementProps {
  userRole: string
}

export function QuoteManagement({ userRole }: QuoteManagementProps) {
  const { toast } = useToast()
  const [showNewQuote, setShowNewQuote] = useState(false)
  const [showViewQuote, setShowViewQuote] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [quoteData, setQuoteData] = useState({
    rfpId: "",
    clientName: "",
    projectTitle: "",
    totalAmount: "",
    validUntil: "",
    description: "",
    lineItems: [{ description: "", quantity: 1, rate: "", amount: "" }],
  })

  const mockQuotes = [
    {
      id: "QT-001",
      rfpId: "RFP-001",
      clientName: "TechCorp Inc.",
      projectTitle: "Website Development Project",
      totalAmount: "₹4,37,500",
      status: "sent",
      validUntil: "2024-02-01",
      createdDate: "2024-01-12",
      description: "Complete website redesign with modern UI/UX and responsive design",
    },
    {
      id: "QT-002",
      rfpId: "RFP-002",
      clientName: "StartupXYZ",
      projectTitle: "Mobile App Development",
      totalAmount: "₹6,50,000",
      status: "approved",
      validUntil: "2024-02-15",
      createdDate: "2024-01-10",
      description: "Cross-platform mobile application for e-commerce with payment integration",
    },
    {
      id: "QT-003",
      rfpId: "RFP-003",
      clientName: "Enterprise Solutions",
      projectTitle: "CRM System Integration",
      totalAmount: "₹10,42,000",
      status: "revision-requested",
      validUntil: "2024-03-01",
      createdDate: "2024-01-08",
      description: "Custom CRM integration with existing ERP and accounting systems",
    },
  ]

  const addLineItem = () => {
    setQuoteData({
      ...quoteData,
      lineItems: [...quoteData.lineItems, { description: "", quantity: 1, rate: "", amount: "" }],
    })
  }

  const updateLineItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...quoteData.lineItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    if (field === "quantity" || field === "rate") {
      const quantity = field === "quantity" ? Number(value) : updatedItems[index].quantity
      const rate = field === "rate" ? Number(value) : Number(updatedItems[index].rate)
      updatedItems[index].amount = (quantity * rate).toString()
    }

    setQuoteData({ ...quoteData, lineItems: updatedItems })
  }

  const handleCreateQuote = () => {
    if (!quoteData.clientName || !quoteData.projectTitle || !quoteData.totalAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Quote Created",
      description: `Quote for "${quoteData.projectTitle}" has been created successfully`,
    })

    setShowNewQuote(false)
    setQuoteData({
      rfpId: "",
      clientName: "",
      projectTitle: "",
      totalAmount: "",
      validUntil: "",
      description: "",
      lineItems: [{ description: "", quantity: 1, rate: "", amount: "" }],
    })
  }

  const handleQuoteAction = (action: string, quoteId: string) => {
    toast({
      title: "Quote Action",
      description: `Quote ${quoteId} has been ${action}`,
    })
  }

  const handleViewQuote = (quote: any) => {
    setSelectedQuote(quote)
    setShowViewQuote(true)
  }

  // Filter quotes by status
  const sentQuotes = mockQuotes.filter(quote => quote.status === "sent")
  const approvedQuotes = mockQuotes.filter(quote => quote.status === "approved")
  const revisionRequestedQuotes = mockQuotes.filter(quote => quote.status === "revision-requested")

  // Component to render quote cards
  const renderQuoteCards = (quotes: any[]) => {
    if (quotes.length === 0) {
      return (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No quotes found</p>
        </div>
      )
    }

    return (
      <div className="grid gap-4">
        {quotes.map((quote) => (
          <Card key={quote.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CircleDollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{quote.projectTitle}</CardTitle>
                    <CardDescription>
                      {quote.clientName} • {quote.id}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(quote.status)}>
                  {getStatusIcon(quote.status)}
                  <span className="ml-1 capitalize">{quote.status.replace("-", " ")}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{quote.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span>
                    <strong>Amount:</strong> {quote.totalAmount}
                  </span>
                  <span>
                    <strong>Valid Until:</strong> {quote.validUntil}
                  </span>
                  <span>
                    <strong>Created:</strong> {quote.createdDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewQuote(quote)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {userRole === "client" && quote.status === "sent" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuoteAction("revision requested", quote.id)}
                      >
                        Request Revision
                      </Button>
                      <Button size="sm" onClick={() => handleQuoteAction("approved", quote.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </>
                  )}
                  {userRole === "sales-executive" && (
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
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
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "revision-requested":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="h-4 w-4" />
      case "sent":
        return <Send className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "revision-requested":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quote Management</h1>
          <p className="text-muted-foreground">
            {userRole === "client" ? "Review and manage your project quotes" : "Create and manage client quotes"}
          </p>
        </div>
        {userRole === "sales-executive" && (
          <Dialog open={showNewQuote} onOpenChange={setShowNewQuote}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Quote</DialogTitle>
                <DialogDescription>Generate a detailed quote for your client's project</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[600px] pr-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={quoteData.clientName}
                        onChange={(e) => setQuoteData({ ...quoteData, clientName: e.target.value })}
                        placeholder="Enter client name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rfpId">Related RFP</Label>
                      <Input
                        id="rfpId"
                        value={quoteData.rfpId}
                        onChange={(e) => setQuoteData({ ...quoteData, rfpId: e.target.value })}
                        placeholder="RFP-001"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={quoteData.projectTitle}
                      onChange={(e) => setQuoteData({ ...quoteData, projectTitle: e.target.value })}
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={quoteData.description}
                      onChange={(e) => setQuoteData({ ...quoteData, description: e.target.value })}
                      placeholder="Describe the project scope and deliverables"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Line Items</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-20">Qty</TableHead>
                          <TableHead className="w-24">Rate</TableHead>
                          <TableHead className="w-24">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quoteData.lineItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input
                                value={item.description}
                                onChange={(e) => updateLineItem(index, "description", e.target.value)}
                                placeholder="Item description"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateLineItem(index, "quantity", Number(e.target.value))}
                                min="1"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.rate}
                                onChange={(e) => updateLineItem(index, "rate", e.target.value)}
                                placeholder="0.00"
                              />
                            </TableCell>
                            <TableCell>
                              <Input value={item.amount} readOnly className="bg-muted" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalAmount">Total Amount *</Label>
                      <Input
                        id="totalAmount"
                        value={quoteData.totalAmount}
                        onChange={(e) => setQuoteData({ ...quoteData, totalAmount: e.target.value })}
                        placeholder="₹0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={quoteData.validUntil}
                        onChange={(e) => setQuoteData({ ...quoteData, validUntil: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowNewQuote(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateQuote}>
                      <Send className="h-4 w-4 mr-2" />
                      Create Quote
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
          <TabsTrigger value="all">All Quotes</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="revision-requested">Needs Revision</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderQuoteCards(mockQuotes)}
        </TabsContent>

        <TabsContent value="sent">
          {renderQuoteCards(sentQuotes)}
        </TabsContent>

        <TabsContent value="approved">
          {renderQuoteCards(approvedQuotes)}
        </TabsContent>

        <TabsContent value="revision-requested">
          {renderQuoteCards(revisionRequestedQuotes)}
        </TabsContent>
      </Tabs>

      {/* View Quote Dialog */}
      <Dialog open={showViewQuote} onOpenChange={setShowViewQuote}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>
              View detailed information about this quote
            </DialogDescription>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Quote ID</Label>
                  <p className="text-sm text-muted-foreground">{selectedQuote.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge variant="outline" className={getStatusColor(selectedQuote.status)}>
                      {getStatusIcon(selectedQuote.status)}
                      <span className="ml-1 capitalize">{selectedQuote.status.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Client Name</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedQuote.clientName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">RFP ID</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedQuote.rfpId}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Project Title</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedQuote.projectTitle}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedQuote.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Total Amount</Label>
                  <p className="text-sm text-muted-foreground mt-1 font-semibold text-lg">{selectedQuote.totalAmount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Valid Until</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedQuote.validUntil}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Created Date</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedQuote.createdDate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
