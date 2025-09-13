"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Building2,
  MapPin,
  Calendar,
  Download,
  Share2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockContacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    jobTitle: "CEO",
    location: "New York, NY",
    lastContact: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@techsol.com",
    phone: "+1 (555) 987-6543",
    company: "Tech Solutions Inc",
    jobTitle: "CTO",
    location: "San Francisco, CA",
    lastContact: "2024-01-14",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@global.com",
    phone: "+1 (555) 456-7890",
    company: "Global Industries",
    jobTitle: "VP of Sales",
    location: "Chicago, IL",
    lastContact: "2024-01-10",
    status: "Inactive",
  },
]

export function ContactManagement() {
  const [contacts, setContacts] = useState(mockContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewContactOpen, setIsNewContactOpen] = useState(false)

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExport = () => {
    console.log("[v0] Export contacts clicked")
    const csvContent = [
      ["Name", "Email", "Phone", "Company", "Job Title", "Location", "Status", "Last Contact"].join(","),
      ...filteredContacts.map((contact) =>
        [
          contact.name,
          contact.email,
          contact.phone,
          contact.company,
          contact.jobTitle,
          contact.location,
          contact.status,
          contact.lastContact,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-export-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    console.log("[v0] Share contacts clicked")
    const shareText = `Evalus CRM - Contact Management\nSharing ${filteredContacts.length} contacts from contact management\n${window.location.href}`

    if (navigator.share && navigator.canShare) {
      const shareData = {
        title: "Evalus CRM - Contact Management",
        text: `Sharing ${filteredContacts.length} contacts from contact management`,
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
              .then(() => alert("Contact data copied to clipboard!"))
              .catch(() => {
                // Final fallback - create a text area and copy
                const textArea = document.createElement("textarea")
                textArea.value = shareText
                document.body.appendChild(textArea)
                textArea.select()
                try {
                  document.execCommand("copy")
                  alert("Contact data copied to clipboard!")
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
          .then(() => alert("Contact data copied to clipboard!"))
          .catch(() => alert("Unable to copy to clipboard. Please copy the URL manually."))
      } else {
        alert("Sharing not supported in this browser. Please copy the URL manually.")
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground">Manage your business contacts and relationships</p>
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
          <Button onClick={() => setIsNewContactOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{contacts.filter((c) => c.status === "Active").length}</div>
            <p className="text-sm text-muted-foreground">Active Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{new Set(contacts.map((c) => c.company)).size}</div>
            <p className="text-sm text-muted-foreground">Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {
                contacts.filter((c) => {
                  const lastContact = new Date(c.lastContact)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return lastContact >= weekAgo
                }).length
              }
            </div>
            <p className="text-sm text-muted-foreground">Recent Contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search contacts by name, company, or email..."
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

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contacts ({filteredContacts.length})</CardTitle>
          <CardDescription>A comprehensive list of your business contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company & Role</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.jobTitle}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{contact.company}</div>
                        <div className="text-sm text-muted-foreground">{contact.jobTitle}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      {contact.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={contact.status === "Active" ? "default" : "secondary"}
                      className={contact.status === "Active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(contact.lastContact).toLocaleDateString()}
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
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Contact
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Contact Modal */}
      <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New Contact</DialogTitle>
            <DialogDescription>Add a new contact to your CRM system</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactName" className="text-right">
                  Name *
                </Label>
                <Input id="contactName" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactEmail" className="text-right">
                  Email *
                </Label>
                <Input id="contactEmail" placeholder="john@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactPhone" className="text-right">
                  Phone
                </Label>
                <Input id="contactPhone" placeholder="+1 (555) 123-4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactCompany" className="text-right">
                  Company
                </Label>
                <Input id="contactCompany" placeholder="Acme Corp" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jobTitle" className="text-right">
                  Job Title
                </Label>
                <Input id="jobTitle" placeholder="CEO" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" placeholder="New York, NY" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactStatus" className="text-right">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactNotes" className="text-right">
                  Notes
                </Label>
                <Textarea id="contactNotes" placeholder="Additional notes..." className="col-span-3" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewContactOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsNewContactOpen(false)}>Create Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
