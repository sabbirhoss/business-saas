"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, TrendingUp, AlertCircle, Globe } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function WorldwideCostCalculator() {
  const { t } = useLanguage()
  const [businessType, setBusinessType] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
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
    { value: "fitness", label: t.fitness },
    { value: "beauty", label: t.beauty },
  ]

  const countries = [
    { value: "usa", label: "United States", currency: "USD", multiplier: 1.0 },
    { value: "uk", label: "United Kingdom", currency: "GBP", multiplier: 0.8 },
    { value: "canada", label: "Canada", currency: "CAD", multiplier: 1.3 },
    { value: "australia", label: "Australia", currency: "AUD", multiplier: 1.4 },
    { value: "germany", label: "Germany", currency: "EUR", multiplier: 0.85 },
    { value: "france", label: "France", currency: "EUR", multiplier: 0.85 },
    { value: "japan", label: "Japan", currency: "JPY", multiplier: 110 },
    { value: "singapore", label: "Singapore", currency: "SGD", multiplier: 1.35 },
    { value: "uae", label: "UAE", currency: "AED", multiplier: 3.67 },
    { value: "india", label: "India", currency: "INR", multiplier: 75 },
    { value: "bangladesh", label: "Bangladesh", currency: "BDT", multiplier: 85 },
    { value: "pakistan", label: "Pakistan", currency: "PKR", multiplier: 220 },
    { value: "china", label: "China", currency: "CNY", multiplier: 6.5 },
    { value: "brazil", label: "Brazil", currency: "BRL", multiplier: 5.2 },
    { value: "mexico", label: "Mexico", currency: "MXN", multiplier: 20 },
    { value: "south_africa", label: "South Africa", currency: "ZAR", multiplier: 15 },
    { value: "nigeria", label: "Nigeria", currency: "NGN", multiplier: 410 },
    { value: "kenya", label: "Kenya", currency: "KES", multiplier: 110 },
    { value: "egypt", label: "Egypt", currency: "EGP", multiplier: 30 },
    { value: "turkey", label: "Turkey", currency: "TRY", multiplier: 18 },
  ]

  const cities = {
    usa: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"],
    uk: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Bristol"],
    canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton"],
    australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast"],
    germany: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Stuttgart"],
    france: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes"],
    japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka"],
    singapore: ["Singapore City", "Jurong", "Tampines", "Woodlands", "Sengkang"],
    uae: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    india: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"],
    bangladesh: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal"],
    pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
    china: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou"],
    brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
    mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
    south_africa: ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"],
    nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
    kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
    egypt: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said"],
    turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  }

  const sizes = [
    { value: "small", label: t.small, multiplier: 1.0 },
    { value: "medium", label: t.medium, multiplier: 2.5 },
    { value: "large", label: t.large, multiplier: 5.0 },
  ]

  const calculateCosts = async () => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const selectedCountry = countries.find((c) => c.value === country)
    const selectedSize = sizes.find((s) => s.value === size)

    if (!selectedCountry || !selectedSize) return

    const baseCosts = getBaseCosts(businessType)
    const adjustedCosts = adjustCostsForLocation(baseCosts, selectedCountry, selectedSize)

    setCosts({
      breakdown: adjustedCosts,
      currency: selectedCountry.currency,
      country: selectedCountry.label,
      city: city,
      summary: calculateSummary(adjustedCosts),
    })
    setIsCalculating(false)
  }

  const getBaseCosts = (type: string) => {
    const baseCostsByType = {
      restaurant: {
        setup: 25000,
        equipment: 40000,
        inventory: 8000,
        license: 5000,
        rent: 6000,
        salary: 15000,
        marketing: 2500,
        utilities: 1200,
        insurance: 800,
        other: 2000,
      },
      retail: {
        setup: 15000,
        equipment: 12000,
        inventory: 25000,
        license: 3000,
        rent: 4000,
        salary: 8000,
        marketing: 2000,
        utilities: 800,
        insurance: 600,
        other: 1500,
      },
      ecommerce: {
        setup: 8000,
        equipment: 6000,
        inventory: 15000,
        license: 1500,
        rent: 1500,
        salary: 6000,
        marketing: 4000,
        utilities: 400,
        insurance: 400,
        other: 1200,
      },
      technology: {
        setup: 12000,
        equipment: 20000,
        inventory: 3000,
        license: 5000,
        rent: 5000,
        salary: 25000,
        marketing: 3500,
        utilities: 600,
        insurance: 1000,
        other: 2500,
      },
      healthcare: {
        setup: 50000,
        equipment: 80000,
        inventory: 10000,
        license: 15000,
        rent: 8000,
        salary: 20000,
        marketing: 2000,
        utilities: 1500,
        insurance: 2500,
        other: 4000,
      },
      fitness: {
        setup: 20000,
        equipment: 35000,
        inventory: 5000,
        license: 3000,
        rent: 5000,
        salary: 10000,
        marketing: 2000,
        utilities: 1000,
        insurance: 1200,
        other: 1800,
      },
      beauty: {
        setup: 15000,
        equipment: 25000,
        inventory: 8000,
        license: 2000,
        rent: 3500,
        salary: 8000,
        marketing: 1500,
        utilities: 600,
        insurance: 800,
        other: 1200,
      },
    }

    return baseCostsByType[type as keyof typeof baseCostsByType] || baseCostsByType.retail
  }

  const adjustCostsForLocation = (baseCosts: any, country: any, size: any) => {
    const cityMultiplier = getCityMultiplier(city)
    const totalMultiplier = country.multiplier * size.multiplier * cityMultiplier

    return Object.entries(baseCosts).reduce((acc, [key, value]) => {
      acc[key] = Math.round((value as number) * totalMultiplier)
      return acc
    }, {} as any)
  }

  const getCityMultiplier = (cityName: string) => {
    const majorCities = ["New York", "London", "Tokyo", "Singapore City", "Dubai", "Mumbai", "Sydney", "Paris"]
    const mediumCities = ["Chicago", "Manchester", "Toronto", "Melbourne", "Berlin", "Delhi", "Brisbane"]

    if (majorCities.includes(cityName)) return 1.5
    if (mediumCities.includes(cityName)) return 1.2
    return 1.0
  }

  const calculateSummary = (breakdown: any) => {
    const oneTime = breakdown.setup + breakdown.equipment + breakdown.inventory + breakdown.license
    const monthly =
      breakdown.rent +
      breakdown.salary +
      breakdown.marketing +
      breakdown.utilities +
      breakdown.insurance +
      breakdown.other
    const yearly = monthly * 12
    const totalFirstYear = oneTime + yearly

    return { oneTime, monthly, yearly, totalFirstYear }
  }

  const formatCurrency = (amount: number, currency: string) => {
    const symbols = {
      USD: "$",
      GBP: "£",
      EUR: "€",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      SGD: "S$",
      AED: "AED",
      INR: "₹",
      BDT: "৳",
      PKR: "₨",
      CNY: "¥",
      BRL: "R$",
      MXN: "$",
      ZAR: "R",
      NGN: "₦",
      KES: "KSh",
      EGP: "E£",
      TRY: "₺",
    }
    const symbol = symbols[currency as keyof typeof symbols] || currency
    return `${symbol}${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span>{t.worldwideBusinessCostCalculator}</span>
          </CardTitle>
          <CardDescription>{t.worldwideCostCalculatorDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Label htmlFor="country">{t.country} *</Label>
              <Select
                onValueChange={(value) => {
                  setCountry(value)
                  setCity("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCountry} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label} ({country.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t.city} *</Label>
              <Select onValueChange={setCity} disabled={!country}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCity} />
                </SelectTrigger>
                <SelectContent>
                  {country &&
                    cities[country as keyof typeof cities]?.map((cityName) => (
                      <SelectItem key={cityName} value={cityName}>
                        {cityName}
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
            disabled={isCalculating || !businessType || !country || !city || !size}
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
          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>{t.locationInfo}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">{t.country}</p>
                  <p className="text-lg font-semibold">{costs.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.city}</p>
                  <p className="text-lg font-semibold">{costs.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.currency}</p>
                  <p className="text-lg font-semibold">{costs.currency}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.oneTimeCosts}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(costs.summary.oneTime, costs.currency)}
                </div>
                <p className="text-xs text-muted-foreground">{t.initialInvestment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.monthlyCosts}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(costs.summary.monthly, costs.currency)}
                </div>
                <p className="text-xs text-muted-foreground">{t.recurringExpenses}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.yearlyCosts}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(costs.summary.yearly, costs.currency)}
                </div>
                <p className="text-xs text-muted-foreground">{t.annualOperating}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.firstYearTotal}</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(costs.summary.totalFirstYear, costs.currency)}
                </div>
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
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.setup, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.equipmentCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.equipment, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.inventoryCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.inventory, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.licenseCosts}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.oneTime}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.license, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.rentCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.rent, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.salaryCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.salary, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.marketingCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.marketing, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.utilityCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.utilities, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.insuranceCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.insurance, costs.currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t.otherCosts}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t.monthly}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(costs.breakdown.other, costs.currency)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
