"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calculator, Edit, Download, Trash2 } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

const mockPlans = [
  {
    id: 1,
    name: "Tech Startup Business Plan",
    type: "business",
    status: "completed",
    lastModified: "2024-01-15",
    description: "Comprehensive business plan for a SaaS startup",
  },
  {
    id: 2,
    name: "Restaurant Financial Plan",
    type: "financial",
    status: "draft",
    lastModified: "2024-01-14",
    description: "5-year financial projections for restaurant business",
  },
  {
    id: 3,
    name: "E-commerce Business Plan",
    type: "business",
    status: "completed",
    lastModified: "2024-01-13",
    description: "Business plan for online retail platform",
  },
  {
    id: 4,
    name: "Manufacturing Financial Plan",
    type: "financial",
    status: "in-progress",
    lastModified: "2024-01-12",
    description: "Financial analysis for manufacturing expansion",
  },
]

export function PlansList() {
  const { t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t.completed
      case "in-progress":
        return t.inProgress
      case "draft":
        return t.draft
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recentPlans}</CardTitle>
        <CardDescription>{t.recentPlansDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPlans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {plan.type === "business" ? (
                    <FileText className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Calculator className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getStatusColor(plan.status)}>{getStatusText(plan.status)}</Badge>
                    <span className="text-xs text-gray-500">
                      {t.lastModified}: {plan.lastModified}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
