"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react"

interface SourceStatus {
  name: string
  status: "active" | "error" | "pending"
  lastFetch: string
  articleCount: number
  category: string
  geo: string
}

export function SourceStatus() {
  const [sources, setSources] = useState<SourceStatus[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSourceStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/sources/status")
      const data = await response.json()
      setSources(data.sources || [])
    } catch (error) {
      console.error("Failed to fetch source status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSourceStatus()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Newsletter Sources</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchSourceStatus} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(source.status)}
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-sm text-muted-foreground">Last fetch: {source.lastFetch}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{source.articleCount} articles</Badge>
                <Badge variant="outline">{source.category}</Badge>
                <Badge variant="outline">{source.geo}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
