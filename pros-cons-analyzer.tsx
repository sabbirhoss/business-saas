"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function ProsConsAnalyzer() {
  const { t } = useLanguage()
  const [businessType, setBusinessType] = useState("")
  const [location, setLocation] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const businessTypes = [
    { value: "restaurant", label: t.restaurant },
    { value: "retail", label: t.retail },
    { value: "ecommerce", label: t.ecommerce },
    { value: "technology", label: t.technology },
    { value: "healthcare", label: t.healthcare },
    { value: "education", label: t.education },
    { value: "manufacturing", label: t.manufacturing },
    { value: "service", label: t.service },
    { value: "fitness", label: t.fitness },
    { value: "beauty", label: t.beauty },
    { value: "automotive", label: t.automotive },
    { value: "realestate", label: t.realestate },
    { value: "travel", label: t.travel },
  ]

  const locations = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "UAE",
    "India",
    "Bangladesh",
    "Pakistan",
    "China",
    "Brazil",
    "Mexico",
    "South Africa",
    "Nigeria",
    "Kenya",
    "Egypt",
    "Turkey",
  ]

  const analyzeBusinessIdea = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const businessAnalysis = generateAnalysis(businessType, location)
    setAnalysis(businessAnalysis)
    setIsAnalyzing(false)
  }

  const generateAnalysis = (type: string, loc: string) => {
    const prosConsData = {
      restaurant: {
        pros: [t.restaurantPros1, t.restaurantPros2, t.restaurantPros3, t.restaurantPros4, t.restaurantPros5],
        cons: [t.restaurantCons1, t.restaurantCons2, t.restaurantCons3, t.restaurantCons4, t.restaurantCons5],
        score: 7.2,
        difficulty: t.medium,
        timeToProfit: "8-18 months",
        successRate: "65%",
      },
      retail: {
        pros: [t.retailPros1, t.retailPros2, t.retailPros3, t.retailPros4, t.retailPros5],
        cons: [t.retailCons1, t.retailCons2, t.retailCons3, t.retailCons4, t.retailCons5],
        score: 7.8,
        difficulty: t.medium,
        timeToProfit: "6-12 months",
        successRate: "72%",
      },
      ecommerce: {
        pros: [t.ecommercePros1, t.ecommercePros2, t.ecommercePros3, t.ecommercePros4, t.ecommercePros5],
        cons: [t.ecommerceCons1, t.ecommerceCons2, t.ecommerceCons3, t.ecommerceCons4, t.ecommerceCons5],
        score: 8.5,
        difficulty: t.easy,
        timeToProfit: "3-8 months",
        successRate: "78%",
      },
      technology: {
        pros: [t.technologyPros1, t.technologyPros2, t.technologyPros3, t.technologyPros4, t.technologyPros5],
        cons: [t.technologyCons1, t.technologyCons2, t.technologyCons3, t.technologyCons4, t.technologyCons5],
        score: 8.8,
        difficulty: t.hard,
        timeToProfit: "12-24 months",
        successRate: "45%",
      },
      healthcare: {
        pros: [t.healthcarePros1, t.healthcarePros2, t.healthcarePros3, t.healthcarePros4, t.healthcarePros5],
        cons: [t.healthcareCons1, t.healthcareCons2, t.healthcareCons3, t.healthcareCons4, t.healthcareCons5],
        score: 8.2,
        difficulty: t.hard,
        timeToProfit: "18-36 months",
        successRate: "82%",
      },
      fitness: {
        pros: [t.fitnessPros1, t.fitnessPros2, t.fitnessPros3, t.fitnessPros4, t.fitnessPros5],
        cons: [t.fitnessCons1, t.fitnessCons2, t.fitnessCons3, t.fitnessCons4, t.fitnessCons5],
        score: 7.5,
        difficulty: t.medium,
        timeToProfit: "6-15 months",
        successRate: "68%",
      },
    }

    return prosConsData[type as keyof typeof prosConsData] || prosConsData.retail
  }

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-green-600"
    if (score >= 7.0) return "text-yellow-600"
    return "text-red-600"
  }

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>{t.prosConsAnalyzer}</span>
          </CardTitle>
          <CardDescription>{t.prosConsAnalyzerDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessType">{t.businessType} *</Label>
              <Select onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectBusinessType} />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t.location} *</Label>
              <Select onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectLocation} />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={analyzeBusinessIdea}
            disabled={isAnalyzing || !businessType || !location}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                {t.analyzeBusinessIdea}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-6">
          {/* Business Score */}
          <Card>
            <CardHeader>
              <CardTitle>{t.businessViabilityScore}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600">{t.overallScore}</p>
                  <p className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}/10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.difficulty}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(analysis.difficulty)}`}
                  >
                    {analysis.difficulty}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.timeToProfit}</p>
                  <p className="text-lg font-semibold">{analysis.timeToProfit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.successRate}</p>
                  <p className="text-lg font-semibold text-blue-600">{analysis.successRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t.whyStartBusiness}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {analysis.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <XCircle className="h-5 w-5" />
                  <span>{t.potentialChallenges}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {analysis.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>{t.recommendations}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.score >= 8.0 && (
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900">{t.highlyRecommended}</h4>
                    <p className="text-green-800 text-sm mt-1">{t.highlyRecommendedText}</p>
                  </div>
                )}
                {analysis.score >= 6.0 && analysis.score < 8.0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-900">{t.moderatelyRecommended}</h4>
                    <p className="text-yellow-800 text-sm mt-1">{t.moderatelyRecommendedText}</p>
                  </div>
                )}
                {analysis.score < 6.0 && (
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-900">{t.notRecommended}</h4>
                    <p className="text-red-800 text-sm mt-1">{t.notRecommendedText}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
