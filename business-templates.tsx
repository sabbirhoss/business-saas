"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  Utensils,
  Laptop,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Dumbbell,
  Scissors,
  Car,
  Home,
  Plane,
} from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function BusinessTemplates() {
  const { t } = useLanguage()

  const templates = [
    {
      id: "restaurant",
      name: t.restaurant,
      description: t.restaurantDesc,
      icon: Utensils,
      difficulty: t.medium,
      investment: "$25,000 - $150,000",
      timeToStart: "2-6 months",
      profitMargin: "15-25%",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "retail",
      name: t.retail,
      description: t.retailDesc,
      icon: Store,
      difficulty: t.easy,
      investment: "$15,000 - $100,000",
      timeToStart: "1-4 months",
      profitMargin: "20-40%",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "ecommerce",
      name: t.ecommerce,
      description: t.ecommerceDesc,
      icon: ShoppingCart,
      difficulty: t.easy,
      investment: "$5,000 - $50,000",
      timeToStart: "2-8 weeks",
      profitMargin: "25-50%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "technology",
      name: t.technology,
      description: t.technologyDesc,
      icon: Laptop,
      difficulty: t.hard,
      investment: "$10,000 - $200,000",
      timeToStart: "3-12 months",
      profitMargin: "30-70%",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "healthcare",
      name: t.healthcare,
      description: t.healthcareDesc,
      icon: Stethoscope,
      difficulty: t.hard,
      investment: "$50,000 - $500,000",
      timeToStart: "6-18 months",
      profitMargin: "20-35%",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "education",
      name: t.education,
      description: t.educationDesc,
      icon: GraduationCap,
      difficulty: t.medium,
      investment: "$20,000 - $200,000",
      timeToStart: "3-8 months",
      profitMargin: "25-40%",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      id: "fitness",
      name: t.fitness,
      description: t.fitnessDesc,
      icon: Dumbbell,
      difficulty: t.medium,
      investment: "$30,000 - $150,000",
      timeToStart: "2-6 months",
      profitMargin: "20-35%",
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    {
      id: "beauty",
      name: t.beauty,
      description: t.beautyDesc,
      icon: Scissors,
      difficulty: t.medium,
      investment: "$15,000 - $80,000",
      timeToStart: "1-4 months",
      profitMargin: "30-50%",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: "automotive",
      name: t.automotive,
      description: t.automotiveDesc,
      icon: Car,
      difficulty: t.hard,
      investment: "$50,000 - $300,000",
      timeToStart: "4-12 months",
      profitMargin: "15-30%",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      id: "realestate",
      name: t.realestate,
      description: t.realestateDesc,
      icon: Home,
      difficulty: t.medium,
      investment: "$10,000 - $100,000",
      timeToStart: "1-6 months",
      profitMargin: "25-60%",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "travel",
      name: t.travel,
      description: t.travelDesc,
      icon: Plane,
      difficulty: t.medium,
      investment: "$15,000 - $75,000",
      timeToStart: "2-6 months",
      profitMargin: "20-40%",
      color: "text-sky-600",
      bgColor: "bg-sky-100",
    },
    {
      id: "consulting",
      name: t.consulting,
      description: t.consultingDesc,
      icon: Briefcase,
      difficulty: t.easy,
      investment: "$2,000 - $20,000",
      timeToStart: "2-8 weeks",
      profitMargin: "40-80%",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case t.easy:
        return "bg-green-100 text-green-800"
      case t.medium:
        return "bg-yellow-100 text-yellow-800"
      case t.hard:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.businessTemplates}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.templatesDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${template.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${template.color}`} />
                  </div>
                  <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.investment}:</span>
                    <span className="font-semibold">{template.investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.timeToStart}:</span>
                    <span className="font-semibold">{template.timeToStart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.profitMargin}:</span>
                    <span className="font-semibold text-green-600">{template.profitMargin}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="text-xs" size="sm">
                    {t.generatePlan}
                  </Button>
                  <Button variant="outline" className="text-xs bg-transparent" size="sm">
                    {t.calculateCosts}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
