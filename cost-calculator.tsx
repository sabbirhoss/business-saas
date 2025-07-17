"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function CostCalculator() {
  const { t } = useLanguage()
  const [businessType, setBusinessType] = useState("")
  const [location, setLocation] = useState("")
  const [size, setSize] = useState("")
  const [costs, setCosts] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const businessTypes = [
    { value: "restaurant", label: t.restaurant },
    { value: "retail", label: t.retail },
    { value: "ecommerce", label: t.ecommerce },
    { value: "technology", label: t.technology },
    { value: "healthcare", label: t.healthcare },
    { value: "education", label: t.education },
    { value: "manufacturing", label: t.manufacturing },
    { value: "service", label: t.service },
  ]

  const locations = [
    { value: "dhaka", label: t.dhaka },
    { value: "chittagong", label: t.chittagong },
    { value: "sylhet", label: t.sylhet },
    { value: "rajshahi", label: t.rajshahi },
    { value: "khulna", label: t.khulna },
    { value: "barisal", label: t.barisal },
  ]

  const sizes = [
    { value: "small", label: t.small },
    { value: "medium", label: t.medium },
    { value: "large", label: t.large },
  ]

  const calculateCosts = async () => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const baseCosts = getBaseCosts(businessType, location, size)
    setCosts(baseCosts)
    setIsCalculating(false)
  }

  const getBaseCosts = (type: string, loc: string, sz: string) => {
    const locationMultiplier =
      {
        dhaka: 1.5,
        chittagong: 1.2,
        sylhet: 1.0,
        rajshahi: 0.9,
        khulna: 0.8,
        barisal: 0.7,
      }[loc] || 1.0

    const sizeMultiplier =
      {
        small: 1.0,
        medium: 2.5,
        large: 5.0,
      }[sz] || 1.0

    const baseCostsByType = {
      restaurant: {
        setup: 500000,
        equipment: 300000,
        inventory: 100000,
        license: 50000,
        rent: 50000,
        salary: 80000,
        marketing: 30000,
        utilities: 15000,
        insurance: 10000,
        other: 25000,
      },
      retail: {
        setup: 300000,
        equipment: 150000,
        inventory: 200000,
        license: 30000,
        rent: 40000,
        salary: 60000,
        marketing: 25000,
        utilities: 10000,
        insurance: 8000,
        other: 20000,
      },
      ecommerce: {
        setup: 100000,
        equipment: 80000,
        inventory: 150000,
        license: 20000,
        rent: 20000,
        salary: 50000,
        marketing: 40000,
        utilities: 5000,
        insurance: 5000,
        other: 15000,
      },
      technology: {
        setup: 200000,
        equipment: 250000,
        inventory: 50000,
        license: 40000,
        rent: 60000,
        salary: 120000,
        marketing: 35000,
        utilities: 8000,
        insurance: 12000,
        other: 30000,
      },
      healthcare: {
        setup: 800000,
        equipment: 500000,
        inventory: 100000,
        license: 100000,
        rent: 80000,
        salary: 150000,
        marketing: 20000,
        utilities: 20000,
        insurance: 25000,
        other: 40000,
      },
      education: {
        setup: 400000,
        equipment: 200000,
        inventory: 50000,
        license: 60000,
        rent: 70000,
        salary: 100000,
        marketing: 15000,
        utilities: 12000,
        insurance: 15000,
        other: 25000,
      },
      manufacturing: {
        setup: 1000000,
        equipment: 800000,
        inventory: 300000,
        license: 80000,
        rent: 100000,
        salary: 120000,
        marketing: 25000,
        utilities: 30000,
        insurance: 30000,
        other: 50000,
      },
      service: {
        setup: 150000,
        equipment: 100000,
        inventory: 30000,
        license: 25000,
        rent: 30000,
        salary: 70000,
        marketing: 20000,
        utilities: 8000,
        insurance: 8000,
        other: 15000,
      },
    }

    const baseCosts = baseCostsByType[type as keyof typeof baseCostsByType] || baseCostsByType.service

    const adjustedCosts = Object.entries(baseCosts).reduce((acc, [key, value]) => {
      acc[key] = Math.round(value * locationMultiplier * sizeMultiplier)
      return acc
    }, {} as any)

    const oneTimeCosts = adjustedCosts.setup + adjustedCosts.equipment + adjustedCosts.inventory + adjustedCosts.license
    const monthlyCosts =
      adjustedCosts.rent +
      adjustedCosts.salary +
      adjustedCosts.marketing +
      adjustedCosts.utilities +
      adjustedCosts.insurance +
      adjustedCosts.other
    const yearlyCosts = monthlyCosts * 12
    const totalFirstYear = oneTimeCosts + yearlyCosts

    return {
      breakdown: adjustedCosts,
      summary: {
        oneTime: oneTimeCosts,
        monthly: monthlyCosts,
        yearly: yearlyCosts,
        totalFirstYear,
      },
    }
  }

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-green-600" />
            <span>{t.businessCostCalculator}</span>
          </CardTitle>
          <CardDescription>{t.costCalculatorDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">{t.businessSize} *</Label>
              <Select onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSize} />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((sz) => (
                    <SelectItem key={sz.value} value={sz.value}>
                      {sz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculateCosts}
            disabled={isCalculating || !businessType || !location || !size}
            className="w-full"
            size="lg"
          >
            {isCalculating ? (
              <>
                <Calculator className="h-4 w-4 mr-2 animate-pulse" />
                {t.calculating}
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                {t.calculateCosts}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {costs && (
        <div className="space-y-6">
          {/* Cost Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.oneTimeCosts}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(costs.summary.oneTime)}</div>
                <p className="text-xs text-muted-foreground">{t.initialInvestment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.monthlyCosts}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(costs.summary.monthly)}</div>
                <p className="text-xs text-muted-foreground">{t.recurringExpenses}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.yearlyCosts}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(costs.summary.yearly)}</div>
                <p className="text-xs text-muted-foreground">{t.annualOperating}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.firstYearTotal}</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(costs.summary.totalFirstYear)}</div>
                <p className="text-xs text-muted-foreground">{t.totalInvestmentNeeded}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{t.detailedCostBreakdown}</CardTitle>
              <CardDescription>{t.costBreakdownDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.costCategory}</TableHead>
                    <TableHead>{t.type}</TableHead>
                    <TableHead className="text-right">{t.amount}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t.setupCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(costs.breakdown.setup)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.equipmentCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.equipment)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.inventoryCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.inventory)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.licenseCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.license)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.rentCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(costs.breakdown.rent)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.salaryCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(costs.breakdown.salary)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.marketingCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.marketing)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.utilityCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.utilities)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.insuranceCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.insurance)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.otherCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(costs.breakdown.other)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t.recommendations}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900">{t.fundingAdvice}</h4>
                <p className="text-blue-800 text-sm mt-1">
                  {t.fundingAdviceText.replace("{amount}", formatCurrency(costs.summary.totalFirstYear * 1.2))}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900">{t.costOptimization}</h4>
                <p className="text-green-800 text-sm mt-1">{t.costOptimizationText}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-900">{t.riskManagement}</h4>
                <p className="text-yellow-800 text-sm mt-1">{t.riskManagementText}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
