"use client"

import { useState } from "react"
import { Login } from "@/components/auth/login"
import { Sidebar } from "@/components/crm/sidebar"
import { Dashboard } from "@/components/crm/dashboard"
import { LeadManagement } from "@/components/crm/lead-management"
import { DealPipeline } from "@/components/crm/deal-pipeline"
import { ContactManagement } from "@/components/crm/contact-management"
import { Analytics as AnalyticsPage } from "@/components/crm/analytics"
import { Settings } from "@/components/crm/settings"
import { EmailSystem } from "@/components/crm/email-system"
import { CommunicationTracking } from "@/components/crm/communication-tracking"
import { RFPManagement } from "@/components/crm/rfp-management"
import { QuoteManagement } from "@/components/crm/quote-management"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [activeView, setActiveView] = useState("dashboard")

  console.log("[v0] Current user state:", user)
  console.log("[v0] Should show login?", !user)

  const handleLogin = (userType: string, userData: any) => {
    console.log("[v0] handleLogin called with:", { userType, userData })
    console.log("[v0] Current user state before update:", user)
    console.log("[v0] Setting user state...")

    setUser(userData)
    setActiveView("dashboard")

    console.log("[v0] User state update called")
    console.log("[v0] New user data set:", userData)

    setTimeout(() => {
      console.log("[v0] User state after update:", user)
    }, 100)
  }

  const handleLogout = () => {
    console.log("[v0] User logged out")
    setUser(null)
    setActiveView("dashboard")
  }

  const handleViewChange = (view: string) => {
    console.log("[v0] Navigation clicked:", view)
    console.log("[v0] Current activeView:", activeView)
    setActiveView(view)
    console.log("[v0] New activeView set to:", view)
  }

  const renderActiveView = () => {
    console.log("[v0] Rendering view:", activeView, "for role:", user?.role)

    // Check permissions
    if (!user?.permissions.includes("all") && !user?.permissions.includes(activeView)) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this section.</p>
        </div>
      )
    }

    switch (activeView) {
      case "dashboard":
        return <Dashboard userRole={user?.role} />
      case "leads":
        return <LeadManagement userRole={user?.role} />
      case "deals":
        return <DealPipeline userRole={user?.role} />
      case "contacts":
        return <ContactManagement userRole={user?.role} />
      case "emails":
        return <EmailSystem userRole={user?.role} />
      case "communications":
        return <CommunicationTracking userRole={user?.role} />
      case "analytics":
        return <AnalyticsPage userRole={user?.role} />
      case "rfp":
        return <RFPManagement userRole={user?.role} />
      case "quotes":
        return <QuoteManagement userRole={user?.role} />
      case "settings":
        return <Settings userRole={user?.role} />
      default:
        console.log("[v0] Unknown view, defaulting to dashboard:", activeView)
        return <Dashboard userRole={user?.role} />
    }
  }

  if (!user) {
    console.log("[v0] Showing login page - user is null")
    return <Login onLogin={handleLogin} />
  }

  console.log("[v0] Showing main app - user exists:", user)
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} userRole={user?.role} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        <div className="hidden">Current view: {activeView}</div>
        {renderActiveView()}
      </main>
    </div>
  )
}
