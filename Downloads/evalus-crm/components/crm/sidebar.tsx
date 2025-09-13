"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  LayoutDashboard,
  Users,
  Target,
  Building2,
  BarChart3,
  Settings,
  Phone,
  Mail,
  Calendar,
  Bell,
  MessageSquare,
  FileText,
  CircleDollarSign,
  LogOut,
  Shield,
  UserCheck,
  User,
} from "lucide-react"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  userRole?: string
  onLogout?: () => void
}

const getRoleBasedNavigation = (userRole: string) => {
  const baseNavigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["super-admin", "manager", "sales-executive", "client"],
    },
  ]

  const roleSpecificNavigation = {
    "super-admin": [
      { id: "leads", label: "Leads", icon: Users, badge: "24" },
      { id: "deals", label: "Deals", icon: Target, badge: "12" },
      { id: "contacts", label: "Contacts", icon: Building2 },
      { id: "emails", label: "Emails", icon: Mail, badge: "8" },
      { id: "communications", label: "Communications", icon: MessageSquare, badge: "15" },
      { id: "rfp", label: "RFP Management", icon: FileText },
      { id: "quotes", label: "Quote Management", icon: CircleDollarSign },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
    ],
    manager: [
      { id: "leads", label: "Leads", icon: Users, badge: "24" },
      { id: "deals", label: "Deals", icon: Target, badge: "12" },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "rfp", label: "RFP Overview", icon: FileText },
      { id: "quotes", label: "Quote Reports", icon: CircleDollarSign },
    ],
    "sales-executive": [
      { id: "leads", label: "Leads", icon: Users, badge: "24" },
      { id: "deals", label: "Deals", icon: Target, badge: "12" },
      { id: "contacts", label: "Contacts", icon: Building2 },
      { id: "emails", label: "Emails", icon: Mail, badge: "8" },
      { id: "communications", label: "Communications", icon: MessageSquare, badge: "15" },
      { id: "rfp", label: "RFP Management", icon: FileText },
      { id: "quotes", label: "Quotes & Estimates", icon: CircleDollarSign },
    ],
    client: [
      { id: "rfp", label: "My RFPs", icon: FileText, badge: "3" },
      { id: "quotes", label: "Quotes Received", icon: CircleDollarSign, badge: "2" },
    ],
  }

  const quickActions = {
    "super-admin": [
      { id: "call", label: "Make Call", icon: Phone, isAction: true },
      { id: "email-action", label: "Send Email", icon: Mail, isAction: true },
      { id: "meeting", label: "Schedule Meeting", icon: Calendar, isAction: true },
    ],
    manager: [{ id: "meeting", label: "Schedule Meeting", icon: Calendar, isAction: true }],
    "sales-executive": [
      { id: "call", label: "Make Call", icon: Phone, isAction: true },
      { id: "email-action", label: "Send Email", icon: Mail, isAction: true },
      { id: "meeting", label: "Schedule Meeting", icon: Calendar, isAction: true },
    ],
    client: [],
  }

  const navigation = [
    ...baseNavigation,
    ...(roleSpecificNavigation[userRole as keyof typeof roleSpecificNavigation] || []),
  ]

  const actions = quickActions[userRole as keyof typeof quickActions] || []

  if (actions.length > 0) {
    navigation.push({ id: "divider", label: "", icon: null })
    navigation.push(...actions)
  }

  return navigation
}

const getRoleInfo = (userRole: string) => {
  const roleConfig = {
    "super-admin": { icon: Shield, label: "Super Admin", color: "text-red-600" },
    manager: { icon: Users, label: "Manager", color: "text-blue-600" },
    "sales-executive": { icon: UserCheck, label: "Sales Executive", color: "text-green-600" },
    client: { icon: User, label: "Client", color: "text-purple-600" },
  }
  return roleConfig[userRole as keyof typeof roleConfig] || roleConfig["client"]
}

export function Sidebar({ activeView, onViewChange, userRole = "client", onLogout }: SidebarProps) {
  const navigation = getRoleBasedNavigation(userRole)
  const roleInfo = getRoleInfo(userRole)
  const RoleIcon = roleInfo.icon

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-sidebar-foreground">Evalus CRM</h1>
            <div className="flex items-center gap-1">
              <RoleIcon className={`w-3 h-3 ${roleInfo.color}`} />
              <p className="text-xs text-muted-foreground">{roleInfo.label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {userRole === "client" ? "Client Portal" : "Main Menu"}
          </h3>
          <nav className="space-y-1">
            {navigation.map((item) => {
              if (item.id === "divider") {
                return (
                  <div key="divider" className="py-1">
                    <div className="border-t border-sidebar-border"></div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 mb-2">
                      Quick Actions
                    </h4>
                  </div>
                )
              }

              const Icon = item.icon
              const handleClick = () => {
                if (item.isAction) {
                  // Handle quick actions
                  switch (item.id) {
                    case "call":
                      console.log("[v0] Make Call action triggered")
                      alert("Opening call interface...")
                      break
                    case "email-action":
                      console.log("[v0] Send Email action triggered")
                      onViewChange("emails")
                      break
                    case "meeting":
                      console.log("[v0] Schedule Meeting action triggered")
                      alert("Opening calendar to schedule meeting...")
                      break
                    default:
                      break
                  }
                } else {
                  onViewChange(item.id)
                }
              }

              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 text-left",
                    activeView === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.isAction && "h-9 text-sm hover:bg-primary/10",
                  )}
                  onClick={handleClick}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground hover:bg-sidebar-accent flex-1 mr-2"
            onClick={() => {
              console.log("[v0] Notifications clicked")
              alert("Opening notifications...")
            }}
          >
            <Bell className="w-4 h-4 mr-2" />
            <span className="truncate">Notifications</span>
          </Button>
          <ThemeToggle />
        </div>

        <div className="space-y-1">
          {(userRole === "super-admin" || userRole === "manager" || userRole === "sales-executive") && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => onViewChange("settings")}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </Button>
          )}

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-red-50 hover:text-red-600"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
