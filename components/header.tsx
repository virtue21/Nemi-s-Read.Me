"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail, ChevronDown, User, LogOut } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface HeaderProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  geoFilter: string
  onGeoFilterChange: (geo: string) => void
  frequencyFilter: string
  onFrequencyFilterChange: (frequency: string) => void
}

const categories = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "tech-for-non-techs", label: "Tech for Non-Techs" },
  { id: "stablecoins", label: "Stablecoins" },
  { id: "business", label: "Business" },
]

export function Header({
  activeCategory,
  onCategoryChange,
  geoFilter,
  onGeoFilterChange,
  frequencyFilter,
  onFrequencyFilterChange,
}: HeaderProps) {
  const [email, setEmail] = useState("")
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load connected email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("nemi-connected-email")
    if (savedEmail) {
      setConnectedEmail(savedEmail)
    }
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save email to localStorage and state
        localStorage.setItem("nemi-connected-email", email)
        setConnectedEmail(email)
        setEmail("")
        setIsDialogOpen(false)

        toast({
          title: "Successfully subscribed!",
          description: "You'll receive daily notifications for Nemi's Read.Me",
        })
      } else {
        toast({
          title: "Subscription failed",
          description: data.error || "Please try again later",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Please check your internet connection and try again",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDisconnectEmail = () => {
    localStorage.removeItem("nemi-connected-email")
    setConnectedEmail(null)
    toast({
      title: "Email disconnected",
      description: "You've been unsubscribed from daily notifications",
    })
  }

  const truncateEmail = (email: string) => {
    if (email.length <= 20) return email
    const [username, domain] = email.split("@")
    if (username.length > 10) {
      return `${username.substring(0, 8)}...@${domain}`
    }
    return email
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Nemi's Read.Me
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeCategory === category.id
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {geoFilter === "all"
                    ? "All Regions"
                    : geoFilter === "nigeria"
                      ? "Nigeria"
                      : geoFilter === "africa"
                        ? "Africa"
                        : "Global"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onGeoFilterChange("all")}>All Regions</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGeoFilterChange("nigeria")}>Nigeria 🇳🇬</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGeoFilterChange("africa")}>Africa 🌍</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onGeoFilterChange("global")}>Global 🌐</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {frequencyFilter === "all" ? "All" : frequencyFilter === "daily" ? "Daily" : "Weekly"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onFrequencyFilterChange("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFrequencyFilterChange("daily")}>Daily 🔄</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFrequencyFilterChange("weekly")}>Weekly 📆</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />

          {/* Email Connection Button/Dropdown */}
          {connectedEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                >
                  <User className="mr-2 h-4 w-4" />
                  {truncateEmail(connectedEmail)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">Connected Email</p>
                  <p className="text-xs text-muted-foreground break-all">{connectedEmail}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDisconnectEmail} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Disconnect Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Connect Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Subscribe to Nemi's Read.Me</DialogTitle>
                  <DialogDescription>Get daily notifications when your newsletter has been updated.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Subscribe for Daily Updates"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  )
}
