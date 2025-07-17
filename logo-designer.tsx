"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Download, RefreshCw, Loader2 } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function LogoDesigner() {
  const { t } = useLanguage()
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [style, setStyle] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [logos, setLogos] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const industries = [
    { value: "restaurant", label: t.restaurant },
    { value: "retail", label: t.retail },
    { value: "technology", label: t.technology },
    { value: "healthcare", label: t.healthcare },
    { value: "education", label: t.education },
    { value: "fitness", label: t.fitness },
    { value: "beauty", label: t.beauty },
    { value: "consulting", label: t.consulting },
  ]

  const logoStyles = [
    { value: "modern", label: t.modern },
    { value: "classic", label: t.classic },
    { value: "minimalist", label: t.minimalist },
    { value: "bold", label: t.bold },
    { value: "elegant", label: t.elegant },
    { value: "playful", label: t.playful },
  ]

  const colorSchemes = [
    { value: "blue", label: t.blue, colors: ["#3B82F6", "#1E40AF"] },
    { value: "green", label: t.green, colors: ["#10B981", "#059669"] },
    { value: "purple", label: t.purple, colors: ["#8B5CF6", "#7C3AED"] },
    { value: "red", label: t.red, colors: ["#EF4444", "#DC2626"] },
    { value: "orange", label: t.orange, colors: ["#F97316", "#EA580C"] },
    { value: "teal", label: t.teal, colors: ["#14B8A6", "#0D9488"] },
    { value: "pink", label: t.pink, colors: ["#EC4899", "#DB2777"] },
    { value: "gray", label: t.gray, colors: ["#6B7280", "#4B5563"] },
  ]

  const generateLogos = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const generatedLogos = createLogoDesigns(businessName, industry, style, colorScheme)
    setLogos(generatedLogos)
    setIsGenerating(false)
  }

  const createLogoDesigns = (name: string, ind: string, st: string, color: string) => {
    const selectedColors = colorSchemes.find((c) => c.value === color)?.colors || ["#3B82F6", "#1E40AF"]
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return [
      {
        id: 1,
        type: "text",
        design: createTextLogo(name, selectedColors[0], st),
        name: `${name} - Text Logo`,
        style: st,
      },
      {
        id: 2,
        type: "initials",
        design: createInitialsLogo(initials, selectedColors[0], selectedColors[1]),
        name: `${name} - Initials Logo`,
        style: st,
      },
      {
        id: 3,
        type: "icon",
        design: createIconLogo(name, ind, selectedColors[0]),
        name: `${name} - Icon Logo`,
        style: st,
      },
      {
        id: 4,
        type: "badge",
        design: createBadgeLogo(name, selectedColors[0], selectedColors[1]),
        name: `${name} - Badge Logo`,
        style: st,
      },
      {
        id: 5,
        type: "modern",
        design: createModernLogo(name, selectedColors[0]),
        name: `${name} - Modern Logo`,
        style: st,
      },
      {
        id: 6,
        type: "geometric",
        design: createGeometricLogo(initials, selectedColors[0], selectedColors[1]),
        name: `${name} - Geometric Logo`,
        style: st,
      },
    ]
  }

  const createTextLogo = (name: string, color: string, style: string) => {
    const fontSize = style === "bold" ? "text-2xl" : style === "elegant" ? "text-xl" : "text-lg"
    const fontWeight = style === "bold" ? "font-black" : style === "elegant" ? "font-light" : "font-semibold"

    return (
      <div className="flex items-center justify-center h-24 w-full">
        <span className={`${fontSize} ${fontWeight}`} style={{ color }}>
          {name}
        </span>
      </div>
    )
  }

  const createInitialsLogo = (initials: string, primaryColor: string, secondaryColor: string) => {
    return (
      <div className="flex items-center justify-center h-24 w-full">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          {initials}
        </div>
      </div>
    )
  }

  const createIconLogo = (name: string, industry: string, color: string) => {
    const getIndustryIcon = (ind: string) => {
      switch (ind) {
        case "restaurant":
          return "🍽️"
        case "retail":
          return "🛍️"
        case "technology":
          return "💻"
        case "healthcare":
          return "🏥"
        case "education":
          return "📚"
        case "fitness":
          return "💪"
        case "beauty":
          return "💄"
        default:
          return "⭐"
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-24 w-full space-y-1">
        <div className="text-2xl">{getIndustryIcon(industry)}</div>
        <span className="text-sm font-semibold" style={{ color }}>
          {name}
        </span>
      </div>
    )
  }

  const createBadgeLogo = (name: string, primaryColor: string, secondaryColor: string) => {
    return (
      <div className="flex items-center justify-center h-24 w-full">
        <div
          className="px-4 py-2 rounded-full border-2 text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
          }}
        >
          {name}
        </div>
      </div>
    )
  }

  const createModernLogo = (name: string, color: string) => {
    return (
      <div className="flex items-center justify-center h-24 w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded" style={{ backgroundColor: color }} />
          <span className="text-lg font-medium" style={{ color }}>
            {name}
          </span>
        </div>
      </div>
    )
  }

  const createGeometricLogo = (initials: string, primaryColor: string, secondaryColor: string) => {
    return (
      <div className="flex items-center justify-center h-24 w-full">
        <div className="relative">
          <div className="w-16 h-16 transform rotate-45" style={{ backgroundColor: primaryColor }} />
          <div className="absolute inset-0 w-16 h-16 flex items-center justify-center text-white font-bold text-lg transform -rotate-45">
            {initials}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-purple-600" />
            <span>{t.logoDesigner}</span>
          </CardTitle>
          <CardDescription>{t.logoDesignerDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">{t.businessName} *</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={t.businessNamePlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">{t.industry} *</Label>
              <Select onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectIndustry} />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">{t.logoStyle} *</Label>
              <Select onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStyle} />
                </SelectTrigger>
                <SelectContent>
                  {logoStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorScheme">{t.colorScheme} *</Label>
              <Select onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectColor} />
                </SelectTrigger>
                <SelectContent>
                  {colorSchemes.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: color.colors[0] }} />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateLogos}
            disabled={isGenerating || !businessName || !industry || !style || !colorScheme}
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
                <Palette className="h-4 w-4 mr-2" />
                {t.generateLogos}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {logos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t.generatedLogos}
              <Button variant="outline" size="sm" onClick={generateLogos}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.regenerate}
              </Button>
            </CardTitle>
            <CardDescription>{t.generatedLogosDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logos.map((logo) => (
                <div key={logo.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 rounded-lg mb-4">{logo.design}</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{logo.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 capitalize">{logo.type}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        {t.download}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
