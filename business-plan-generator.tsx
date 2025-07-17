"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download, Eye, Sparkles, DollarSign } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function BusinessPlanGenerator() {
  const { t } = useLanguage()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    location: "",
    targetMarket: "",
    budget: "",
    experience: "",
  })

  const businessTypes = [
    { value: "restaurant", label: t.restaurant },
    { value: "retail", label: t.retail },
    { value: "ecommerce", label: t.ecommerce },
    { value: "technology", label: t.technology },
    { value: "healthcare", label: t.healthcare },
    { value: "education", label: t.education },
    { value: "manufacturing", label: t.manufacturing },
    { value: "service", label: t.service },
    { value: "consulting", label: t.consulting },
    { value: "agriculture", label: t.agriculture },
    { value: "fitness", label: t.fitness },
    { value: "beauty", label: t.beauty },
    { value: "automotive", label: t.automotive },
    { value: "realestate", label: t.realestate },
    { value: "travel", label: t.travel },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateBusinessPlan = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const plan = {
      executiveSummary: generateExecutiveSummary(),
      marketAnalysis: generateMarketAnalysis(),
      productsServices: generateProductsServices(),
      marketingStrategy: generateMarketingStrategy(),
      operationalPlan: generateOperationalPlan(),
      managementTeam: generateManagementTeam(),
      financialProjections: generateFinancialProjections(),
      riskAnalysis: generateRiskAnalysis(),
      costBreakdown: generateCostBreakdown(),
      whyStartBusiness: generateWhyStartBusiness(),
      potentialChallenges: generatePotentialChallenges(),
    }

    setGeneratedPlan(plan)
    setIsGenerating(false)
  }

  const generateExecutiveSummary = () => {
    const businessTypeText =
      businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType
    return `${formData.businessName} ${t.executiveSummaryTemplate
      .replace("{businessType}", businessTypeText)
      .replace("{location}", formData.location)
      .replace("{targetMarket}", formData.targetMarket)
      .replace("{budget}", formData.budget)}`
  }

  const generateCostBreakdown = () => {
    const businessType = formData.businessType
    const baseCosts = {
      restaurant: {
        setup: "$15,000 - $50,000",
        equipment: "$20,000 - $80,000",
        inventory: "$5,000 - $15,000",
        licenses: "$2,000 - $8,000",
        rent: "$3,000 - $12,000/month",
        staff: "$8,000 - $25,000/month",
        marketing: "$1,000 - $5,000/month",
        utilities: "$800 - $2,500/month",
        insurance: "$500 - $2,000/month",
        other: "$1,000 - $3,000/month",
      },
      retail: {
        setup: "$10,000 - $30,000",
        equipment: "$5,000 - $25,000",
        inventory: "$15,000 - $50,000",
        licenses: "$1,000 - $5,000",
        rent: "$2,000 - $8,000/month",
        staff: "$4,000 - $15,000/month",
        marketing: "$800 - $3,000/month",
        utilities: "$400 - $1,200/month",
        insurance: "$300 - $1,000/month",
        other: "$500 - $2,000/month",
      },
      ecommerce: {
        setup: "$5,000 - $15,000",
        equipment: "$3,000 - $10,000",
        inventory: "$10,000 - $30,000",
        licenses: "$500 - $2,000",
        rent: "$500 - $2,000/month",
        staff: "$3,000 - $12,000/month",
        marketing: "$2,000 - $8,000/month",
        utilities: "$200 - $500/month",
        insurance: "$200 - $800/month",
        other: "$500 - $1,500/month",
      },
      technology: {
        setup: "$8,000 - $25,000",
        equipment: "$10,000 - $40,000",
        inventory: "$2,000 - $8,000",
        licenses: "$2,000 - $10,000",
        rent: "$2,000 - $8,000/month",
        staff: "$15,000 - $50,000/month",
        marketing: "$2,000 - $10,000/month",
        utilities: "$300 - $1,000/month",
        insurance: "$500 - $2,000/month",
        other: "$1,000 - $4,000/month",
      },
    }

    const costs = baseCosts[businessType as keyof typeof baseCosts] || baseCosts.retail

    return `
    **${t.estimatedCosts}:**
    
    **${t.oneTimeCosts}:**
    • ${t.setupCosts}: ${costs.setup}
    • ${t.equipmentCosts}: ${costs.equipment}
    • ${t.inventoryCosts}: ${costs.inventory}
    • ${t.licenseCosts}: ${costs.licenses}
    
    **${t.monthlyCosts}:**
    • ${t.rentCosts}: ${costs.rent}
    • ${t.staffCosts}: ${costs.staff}
    • ${t.marketingCosts}: ${costs.marketing}
    • ${t.utilityCosts}: ${costs.utilities}
    • ${t.insuranceCosts}: ${costs.insurance}
    • ${t.otherCosts}: ${costs.other}
    `
  }

  const generateWhyStartBusiness = () => {
    const businessType = formData.businessType
    const reasons = {
      restaurant: [t.restaurantPros1, t.restaurantPros2, t.restaurantPros3, t.restaurantPros4],
      retail: [t.retailPros1, t.retailPros2, t.retailPros3, t.retailPros4],
      ecommerce: [t.ecommercePros1, t.ecommercePros2, t.ecommercePros3, t.ecommercePros4],
      technology: [t.technologyPros1, t.technologyPros2, t.technologyPros3, t.technologyPros4],
    }

    const businessReasons = reasons[businessType as keyof typeof reasons] || reasons.retail
    return businessReasons.map((reason, index) => `${index + 1}. ${reason}`).join("\n")
  }

  const generatePotentialChallenges = () => {
    const businessType = formData.businessType
    const challenges = {
      restaurant: [t.restaurantCons1, t.restaurantCons2, t.restaurantCons3, t.restaurantCons4],
      retail: [t.retailCons1, t.retailCons2, t.retailCons3, t.retailCons4],
      ecommerce: [t.ecommerceCons1, t.ecommerceCons2, t.ecommerceCons3, t.ecommerceCons4],
      technology: [t.technologyCons1, t.technologyCons2, t.technologyCons3, t.technologyCons4],
    }

    const businessChallenges = challenges[businessType as keyof typeof challenges] || challenges.retail
    return businessChallenges.map((challenge, index) => `${index + 1}. ${challenge}`).join("\n")
  }

  const generateMarketAnalysis = () => {
    return t.marketAnalysisTemplate
      .replace(
        "{businessType}",
        businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
      )
      .replace("{location}", formData.location)
  }

  const generateProductsServices = () => {
    return t.productsServicesTemplate.replace(
      "{businessType}",
      businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
    )
  }

  const generateMarketingStrategy = () => {
    return t.marketingStrategyTemplate
      .replace("{targetMarket}", formData.targetMarket)
      .replace(
        "{businessType}",
        businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
      )
  }

  const generateOperationalPlan = () => {
    return t.operationalPlanTemplate
      .replace(
        "{businessType}",
        businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
      )
      .replace("{location}", formData.location)
  }

  const generateManagementTeam = () => {
    return t.managementTeamTemplate.replace("{experience}", formData.experience)
  }

  const generateFinancialProjections = () => {
    return t.financialProjectionsTemplate
      .replace("{budget}", formData.budget)
      .replace(
        "{businessType}",
        businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
      )
  }

  const generateRiskAnalysis = () => {
    return t.riskAnalysisTemplate.replace(
      "{businessType}",
      businessTypes.find((bt) => bt.value === formData.businessType)?.label || formData.businessType,
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>{t.aiBusinessPlanGenerator}</span>
          </CardTitle>
          <CardDescription>{t.aiGeneratorDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">{t.businessName} *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder={t.businessNamePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">{t.businessType} *</Label>
              <Select onValueChange={(value) => handleInputChange("businessType", value)}>
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
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder={t.locationPlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">{t.initialBudget} *</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder={t.budgetPlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetMarket">{t.targetMarket} *</Label>
              <Input
                id="targetMarket"
                value={formData.targetMarket}
                onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                placeholder={t.targetMarketPlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">{t.experience}</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder={t.experiencePlaceholder}
              />
            </div>
          </div>

          <Button
            onClick={generateBusinessPlan}
            disabled={isGenerating || !formData.businessName || !formData.businessType}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.generating}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {t.generatePlan}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t.generatedBusinessPlan}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  {t.preview}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t.downloadPDF}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">{t.executiveSummary}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.executiveSummary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                {t.costBreakdown}
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{generatedPlan.costBreakdown}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-semibold mb-3 text-green-800">{t.whyStartBusiness}</h3>
                <pre className="text-sm text-green-700 whitespace-pre-wrap">{generatedPlan.whyStartBusiness}</pre>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-semibold mb-3 text-red-800">{t.potentialChallenges}</h3>
                <pre className="text-sm text-red-700 whitespace-pre-wrap">{generatedPlan.potentialChallenges}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.marketAnalysis}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.marketAnalysis}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.productsServices}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.productsServices}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.marketingStrategy}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.marketingStrategy}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.operationalPlan}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.operationalPlan}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.managementTeam}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.managementTeam}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.financialProjections}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.financialProjections}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">{t.riskAnalysis}</h3>
              <p className="text-gray-700 leading-relaxed">{generatedPlan.riskAnalysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
