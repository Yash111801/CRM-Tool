"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Users, UserCheck, User, Shield, BarChart3, Zap, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginProps {
  onLogin: (userType: string, userData: any) => void
}

const validUsers = [
  {
    email: "admin@evalus.com",
    password: "admin123",
    role: "super-admin",
    name: "System Administrator",
  },
  {
    email: "sarah.johnson@evalus.com",
    password: "manager123",
    role: "manager",
    name: "Sarah Johnson",
  },
  {
    email: "mike.davis@evalus.com",
    password: "sales123",
    role: "sales-executive",
    name: "Mike Davis",
  },
  {
    email: "client@company.com",
    password: "client123",
    role: "client",
    name: "John Client",
  },
  {
    email: "lisa.chen@evalus.com",
    password: "sales123",
    role: "sales-executive",
    name: "Lisa Chen",
  },
]

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const userTypes = [
    {
      id: "super-admin",
      name: "Super Admin",
      description: "Platform management and system administration",
      icon: Building2,
      color: "text-red-600",
    },
    {
      id: "manager",
      name: "Manager",
      description: "Dashboard oversight, leads, pipeline, and sales analytics",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: "sales-executive",
      name: "Sales Executive",
      description: "RFP preparation, quotes, and client communication",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      id: "client",
      name: "Client/Sponsor",
      description: "RFP submission, quote review, and approval workflow",
      icon: User,
      color: "text-purple-600",
    },
  ]

  const applicationFeatures = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with role-based access control and data encryption",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time dashboards and insights to track performance and make data-driven decisions",
    },
    {
      icon: Zap,
      title: "Streamlined Workflow",
      description: "Automated RFP processing, quote management, and seamless client collaboration",
    },
  ]

  const handleLogin = () => {
    console.log("[v0] Login attempt started with:", { selectedRole, email, password })

    if (!selectedRole || !email || !password) {
      setError("Please fill in all fields")
      console.log("[v0] Login failed - missing fields")
      return
    }

    setIsLoading(true)
    setError("")

    console.log("[v0] Validating credentials...")

    const user = validUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    console.log("[v0] User found:", user)

    if (!user) {
      setError("Invalid email or password")
      setIsLoading(false)
      console.log("[v0] Login failed - invalid credentials")
      return
    }

    if (user.role !== selectedRole) {
      setError("Selected role does not match your account permissions")
      setIsLoading(false)
      console.log("[v0] Login failed - role mismatch")
      return
    }

    const userData = {
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: getPermissions(user.role),
    }

    console.log("[v0] Login successful, calling onLogin with:", { userType: user.role, userData })
    console.log("[v0] About to call onLogin function...")

    try {
      onLogin(user.role, userData)
      console.log("[v0] onLogin called successfully")
    } catch (error) {
      console.log("[v0] Error calling onLogin:", error)
    }

    setIsLoading(false)
  }

  const getPermissions = (role: string) => {
    switch (role) {
      case "super-admin":
        return ["all"]
      case "manager":
        return ["dashboard", "leads", "deals", "analytics", "reports", "rfp", "quotes", "contacts", "communications", "emails", "settings"]
      case "sales-executive":
        return ["leads", "deals", "rfp", "quotes", "contacts", "communications", "emails"]
      case "client":
        return ["rfp", "quotes"]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center bg-gradient-to-br from-cyan-50 to-green-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Evalus CRM</CardTitle>
            <CardDescription>Select your role and sign in to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="role">User Type</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${type.color}`} />
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full"
              disabled={!selectedRole || !email || !password || isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
              <div className="text-xs space-y-1 text-slate-600">
                <div>
                  <strong>Admin:</strong> admin@evalus.com / admin123
                </div>
                <div>
                  <strong>Manager:</strong> sarah.johnson@evalus.com / manager123
                </div>
                <div>
                  <strong>Sales:</strong> mike.davis@evalus.com / sales123
                </div>
                <div>
                  <strong>Client:</strong> client@company.com / client123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Application Features */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance">Transform Your Business Operations</h1>
            <p className="text-slate-300 text-lg text-balance">Powerful CRM solution designed for modern businesses</p>
          </div>

          <div className="space-y-6">
            {applicationFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              Trusted by businesses worldwide for reliable CRM solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
