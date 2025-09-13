"use client"

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Lock,
  Bell,
  Zap,
  Save,
  MoreHorizontal,
  UserPlus,
  Trash2,
  Edit,
  Download,
  Phone,
  AlertTriangle,
  XCircle,
  Key,
} from "lucide-react"

const mockIntegrations = [
  { name: "Email Integration", status: "connected", lastSync: "2024-01-15T10:00:00Z", health: "good" },
  { name: "Phone System", status: "disconnected", lastSync: null, health: "error" },
  { name: "Calendar Sync", status: "connected", lastSync: "2024-01-15T09:30:00Z", health: "good" },
  { name: "Slack Integration", status: "connected", lastSync: "2024-01-15T10:15:00Z", health: "warning" },
  { name: "Zapier Webhooks", status: "connected", lastSync: "2024-01-15T10:05:00Z", health: "good" },
]

export function Settings() {
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("profile")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false)
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false)

  const [integrationDialog, setIntegrationDialog] = useState<{
    open: boolean
    integration: string
    action: string
  } | null>(null)

  const [integrationConfig, setIntegrationConfig] = useState({
    emailServer: "smtp.gmail.com",
    emailPort: "587",
    phoneApiKey: "",
    calendarProvider: "google",
    slackWebhook: "",
    zapierApiKey: "",
  })

  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@evalus.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Sales Manager",
    bio: "Experienced sales manager with 8+ years in B2B software sales.",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    leadAssignment: true,
    dealUpdates: true,
    taskReminders: true,
    teamUpdates: true,
    loginNotifications: true,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
  })

  const [system, setSystem] = useState({
    autoBackup: true,
  })

  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
    message: "",
  })

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@evalus.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Mike Davis",
      email: "mike.davis@evalus.com",
      role: "Sales Manager",
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      permissions: ["leads", "deals", "contacts"],
    },
    {
      id: "3",
      name: "Lisa Chen",
      email: "lisa.chen@evalus.com",
      role: "Sales Rep",
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      permissions: ["leads", "contacts"],
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@evalus.com",
      role: "Sales Rep",
      status: "inactive",
      lastLogin: "2024-01-10T14:20:00Z",
      permissions: ["leads"],
    },
  ])

  const handleSaveProfile = () => {
    console.log("[v0] Profile saved with data:", profileData)
    toast({
      title: "Profile Saved",
      description: `Profile saved! Name: ${profileData.firstName} ${profileData.lastName}`,
    })
  }

  const handleChangeAvatar = () => {
    console.log("[v0] Change avatar clicked")
    toast({
      title: "Avatar Change",
      description: "Avatar upload functionality would open here",
    })
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveNotifications = () => {
    console.log("[v0] Notifications saved:", notifications)
    toast({
      title: "Notifications Saved",
      description: "Notification preferences saved!",
    })
  }

  const handleUpdatePassword = () => {
    console.log("[v0] Password update clicked")
    toast({
      title: "Password Updated",
      description: "Password updated successfully!",
    })
  }

  const handleEnableTwoFactor = () => {
    console.log("[v0] Two-factor authentication enabled")
    setSecurity((prev) => ({ ...prev, twoFactorEnabled: true }))
    toast({
      title: "Two-Factor Authentication Enabled",
      description: "Two-factor authentication enabled!",
    })
  }

  const handleIntegrationAction = (integration: string, action: string) => {
    console.log(`[v0] ${action} clicked for ${integration}`)
    setIntegrationDialog({
      open: true,
      integration,
      action,
    })
  }

  const handleIntegrationChange = (field: string, value: string) => {
    setIntegrationConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveIntegrationConfig = () => {
    if (!integrationDialog) return

    console.log(`[v0] Saving ${integrationDialog.action} for ${integrationDialog.integration}`)
    toast({
      title: `${integrationDialog.action} Successful`,
      description: `${integrationDialog.integration} has been ${integrationDialog.action.toLowerCase()}d successfully`,
    })
    setIntegrationDialog(null)
  }

  const handleCreateBackup = () => {
    console.log("[v0] Create backup clicked")
    setIsBackupDialogOpen(false)
    toast({
      title: "Backup Created",
      description: "Backup created successfully!",
    })
  }

  const handleGenerateApiKey = () => {
    console.log("[v0] Generate API key clicked")
    setIsApiDialogOpen(false)
    toast({
      title: "API Key Generated",
      description: "New API key generated!",
    })
  }

  const handleSendInvitation = () => {
    if (!inviteForm.email || !inviteForm.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simulate sending invitation
    console.log("[v0] Sending invitation to:", inviteForm.email, "as", inviteForm.role)

    const newMember = {
      id: Date.now().toString(), // Simple ID generation
      name: inviteForm.email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()), // Generate name from email
      email: inviteForm.email,
      role:
        inviteForm.role === "admin"
          ? "Admin"
          : inviteForm.role === "manager"
            ? "Sales Manager"
            : inviteForm.role === "rep"
              ? "Sales Rep"
              : "Viewer",
      status: "pending", // New members start as pending
      lastLogin: new Date().toISOString(),
      permissions:
        inviteForm.role === "admin"
          ? ["all"]
          : inviteForm.role === "manager"
            ? ["leads", "deals", "contacts"]
            : inviteForm.role === "rep"
              ? ["leads", "contacts"]
              : ["leads"],
    }

    setTeamMembers((prev) => [...prev, newMember])

    toast({
      title: "Team Member Invited",
      description: `${newMember.name} (${inviteForm.email}) has been invited as ${newMember.role} and added to your team with pending status.`,
    })

    // Reset form and close dialog
    setInviteForm({ email: "", role: "", message: "" })
    setIsInviteDialogOpen(false)
  }

  const handleInviteFormChange = (field: string, value: string) => {
    setInviteForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveAppearance = () => {
    console.log("[v0] Appearance preferences saved")
    toast({
      title: "Appearance Saved",
      description: "Appearance preferences saved!",
    })
  }

  const handleExportData = () => {
    console.log("[v0] Export data clicked")

    const exportData = {
      profile: profileData,
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: true,
        weeklyReports: true,
        monthlyReports: false,
      },
      teamMembers: teamMembers,
      integrations: mockIntegrations,
      exportedAt: new Date().toISOString(),
      version: "1.0.0",
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `evalus-crm-settings-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Data Exported Successfully",
      description: "Your CRM settings and data have been exported to a JSON file.",
    })
  }

  const handleTeamAction = (action: string, memberId: string) => {
    console.log(`[v0] ${action} clicked for member with ID: ${memberId}`)
    toast({
      title: `${action} Successful`,
      description: `Action ${action} performed successfully for member with ID: ${memberId}`,
    })
  }

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your CRM preferences and configuration</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800">
            <User className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                  <AvatarImage src="https://example.com/avatar.jpg" alt="Avatar" />
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" onClick={handleChangeAvatar}>
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={profileData.jobTitle}
                  onChange={(e) => handleProfileChange("jobTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                />
              </div>

              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage team members, roles, and permissions</CardDescription>
              </div>
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>Send an invitation to join your CRM team</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="inviteEmail">Email Address</Label>
                      <Input
                        id="inviteEmail"
                        placeholder="colleague@company.com"
                        value={inviteForm.email}
                        onChange={(e) => handleInviteFormChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="inviteRole">Role</Label>
                      <Select value={inviteForm.role} onValueChange={(value) => handleInviteFormChange("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Sales Manager</SelectItem>
                          <SelectItem value="rep">Sales Rep</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="inviteMessage">Personal Message (Optional)</Label>
                      <Input
                        id="inviteMessage"
                        placeholder="Welcome to our team!"
                        value={inviteForm.message}
                        onChange={(e) => handleInviteFormChange("message", e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSendInvitation}>Send Invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{member.role}</Badge>
                        <Badge
                          className={
                            member.status === "active"
                              ? "bg-green-100 text-green-800"
                              : member.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {member.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last login: {new Date(member.lastLogin).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          {member.permissions.slice(0, 2).map((perm) => (
                            <Badge key={perm} variant="secondary" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                          {member.permissions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{member.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleTeamAction("Edit Permissions", member.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTeamAction("Reset Password", member.id)}>
                              <Lock className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleTeamAction("Remove Member", member.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about CRM activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates about leads and deals</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get push notifications for urgent activities</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lead Assignment</Label>
                    <p className="text-sm text-muted-foreground">Notify when new leads are assigned to you</p>
                  </div>
                  <Switch
                    checked={notifications.leadAssignment}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, leadAssignment: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deal Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when deals change status</p>
                  </div>
                  <Switch
                    checked={notifications.dealUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dealUpdates: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders for upcoming tasks</p>
                  </div>
                  <Switch
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, taskReminders: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Team Member Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new team members join</p>
                  </div>
                  <Switch
                    checked={notifications.teamUpdates || true}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, teamUpdates: checked }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your CRM with external services and monitor their health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {mockIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {integration.name.includes("Email") && <Mail className="w-4 h-4" />}
                        {integration.name.includes("Phone") && <Phone className="w-4 h-4" />}
                        {integration.name.includes("Calendar") && <Bell className="w-4 h-4" />}
                        {integration.name.includes("Slack") && <Bell className="w-4 h-4" />}
                        {integration.name.includes("Zapier") && <Zap className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge
                            className={
                              integration.status === "connected"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {integration.status}
                          </Badge>
                          {integration.lastSync && (
                            <span>Last sync: {new Date(integration.lastSync).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.health === "good" && <Bell className="w-4 h-4 text-green-600" />}
                      {integration.health === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                      {integration.health === "error" && <XCircle className="w-4 h-4 text-red-600" />}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleIntegrationAction(
                            integration.name,
                            integration.status === "connected" ? "Configure" : "Connect",
                          )
                        }
                      >
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button onClick={handleUpdatePassword}>Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" onClick={handleEnableTwoFactor}>
                    {security.twoFactorEnabled ? "Enabled" : "Enable"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={notifications.loginNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, loginNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Monitor system performance and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Performance</span>
                    <span>98%</span>
                  </div>
                  <div className="h-2 bg-green-100 rounded-full">
                    <div className="h-2 bg-green-600 rounded-full w-[98%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span>145ms</span>
                  </div>
                  <div className="h-2 bg-green-100 rounded-full">
                    <div className="h-2 bg-green-600 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span>67%</span>
                  </div>
                  <div className="h-2 bg-green-100 rounded-full">
                    <div className="h-2 bg-green-600 rounded-full w-[67%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Backup and data management options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Backup</p>
                    <p className="text-sm text-muted-foreground">Daily automated backups</p>
                  </div>
                  <Switch
                    checked={system.autoBackup}
                    onCheckedChange={(checked) => setSystem((prev) => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Retention</p>
                    <p className="text-sm text-muted-foreground">Keep data for 7 years</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert("Data retention configuration opened")}>
                    Configure
                  </Button>
                </div>
                <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Data Backup</DialogTitle>
                      <DialogDescription>Export your CRM data for backup or migration</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Backup Type</Label>
                        <Select defaultValue="full">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Backup</SelectItem>
                            <SelectItem value="leads">Leads Only</SelectItem>
                            <SelectItem value="deals">Deals Only</SelectItem>
                            <SelectItem value="contacts">Contacts Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Format</Label>
                        <Select defaultValue="csv">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="xlsx">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateBackup}>Create Backup</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage API keys, webhooks, and integrations</CardDescription>
              </div>
              <Dialog open={isApiDialogOpen} onOpenChange={setIsApiDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate API Key</DialogTitle>
                    <DialogDescription>Create a new API key for external integrations</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="keyName">Key Name</Label>
                      <Input id="keyName" placeholder="Integration Name" />
                    </div>
                    <div>
                      <Label htmlFor="keyPermissions">Permissions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select permissions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read Only</SelectItem>
                          <SelectItem value="write">Read & Write</SelectItem>
                          <SelectItem value="admin">Full Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleGenerateApiKey}>Generate Key</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Production API Key</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">eval_prod_••••••••••••••••</p>
                  <p className="text-xs text-muted-foreground mt-1">Created: Jan 15, 2024 • Last used: 2 hours ago</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Development API Key</h4>
                    <Badge variant="outline">Inactive</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">eval_dev_••••••••••••••••</p>
                  <p className="text-xs text-muted-foreground mt-1">Created: Jan 10, 2024 • Last used: Never</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Webhook Endpoints</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Lead Created</p>
                      <p className="text-xs text-muted-foreground">https://api.example.com/webhooks/leads</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Button variant="ghost" size="sm" onClick={() => alert("Edit webhook configuration")}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => alert("Add new webhook endpoint")}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your CRM interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveAppearance}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={integrationDialog?.open || false} onOpenChange={(open) => !open && setIntegrationDialog(null)}>
        <DialogContent className="max-w-md">
          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-4 pr-4">
              <DialogHeader>
                <DialogTitle>
                  {integrationDialog?.action} {integrationDialog?.integration}
                </DialogTitle>
                <DialogDescription>
                  {integrationDialog?.action === "Configure"
                    ? `Update settings for ${integrationDialog?.integration}`
                    : `Connect ${integrationDialog?.integration} to your CRM`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {integrationDialog?.integration === "Email Integration" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="emailServer">SMTP Server</Label>
                      <Input
                        id="emailServer"
                        value={integrationConfig.emailServer}
                        onChange={(e) => handleIntegrationChange("emailServer", e.target.value)}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailPort">Port</Label>
                      <Input
                        id="emailPort"
                        value={integrationConfig.emailPort}
                        onChange={(e) => handleIntegrationChange("emailPort", e.target.value)}
                        placeholder="587"
                      />
                    </div>
                  </>
                )}

                {integrationDialog?.integration === "Phone System" && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneApiKey">API Key</Label>
                    <Input
                      id="phoneApiKey"
                      type="password"
                      value={integrationConfig.phoneApiKey}
                      onChange={(e) => handleIntegrationChange("phoneApiKey", e.target.value)}
                      placeholder="Enter your phone system API key"
                    />
                  </div>
                )}

                {integrationDialog?.integration === "Calendar Sync" && (
                  <div className="space-y-2">
                    <Label htmlFor="calendarProvider">Calendar Provider</Label>
                    <Select
                      value={integrationConfig.calendarProvider}
                      onValueChange={(value) => handleIntegrationChange("calendarProvider", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Calendar</SelectItem>
                        <SelectItem value="outlook">Outlook Calendar</SelectItem>
                        <SelectItem value="apple">Apple Calendar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {integrationDialog?.integration === "Slack Integration" && (
                  <div className="space-y-2">
                    <Label htmlFor="slackWebhook">Webhook URL</Label>
                    <Input
                      id="slackWebhook"
                      value={integrationConfig.slackWebhook}
                      onChange={(e) => handleIntegrationChange("slackWebhook", e.target.value)}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                )}

                {integrationDialog?.integration === "Zapier Webhooks" && (
                  <div className="space-y-2">
                    <Label htmlFor="zapierApiKey">Zapier API Key</Label>
                    <Input
                      id="zapierApiKey"
                      type="password"
                      value={integrationConfig.zapierApiKey}
                      onChange={(e) => handleIntegrationChange("zapierApiKey", e.target.value)}
                      placeholder="Enter your Zapier API key"
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIntegrationDialog(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveIntegrationConfig}>
                  {integrationDialog?.action === "Configure" ? "Save Changes" : "Connect"}
                </Button>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
