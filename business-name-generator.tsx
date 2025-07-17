"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, RefreshCw, Copy, Check, Loader2 } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function BusinessNameGenerator() {
  const { t } = useLanguage()
  const [keywords, setKeywords] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [style, setStyle] = useState("")
  const [generatedNames, setGeneratedNames] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedName, setCopiedName] = useState("")

  const businessTypes = [
    { value: "restaurant", label: t.restaurant },
    { value: "retail", label: t.retail },
    { value: "ecommerce", label: t.ecommerce },
    { value: "technology", label: t.technology },
    { value: "healthcare", label: t.healthcare },
    { value: "education", label: t.education },
    { value: "service", label: t.service },
    { value: "fitness", label: t.fitness },
    { value: "beauty", label: t.beauty },
    { value: "consulting", label: t.consulting },
  ]

  const nameStyles = [
    { value: "modern", label: t.modern },
    { value: "classic", label: t.classic },
    { value: "creative", label: t.creative },
    { value: "professional", label: t.professional },
    { value: "playful", label: t.playful },
    { value: "luxury", label: t.luxury },
  ]

  const generateNames = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const names = generateBusinessNames(keywords, businessType, style)
    setGeneratedNames(names)
    setIsGenerating(false)
  }

  const generateBusinessNames = (keywords: string, type: string, style: string) => {
    const keywordList = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k)
    const baseNames = []

    // Generate names based on business type and style
    const namePatterns = {
      modern: ["Tech", "Pro", "Digital", "Smart", "Next", "Future", "Sync", "Flow"],
      classic: ["Royal", "Premium", "Elite", "Grand", "Supreme", "Prime", "Golden", "Sterling"],
      creative: ["Spark", "Bloom", "Vibe", "Zen", "Pixel", "Craft", "Studio", "Lab"],
      professional: ["Solutions", "Services", "Group", "Associates", "Partners", "Corp", "Consulting"],
      playful: ["Happy", "Bright", "Fun", "Joy", "Smile", "Bounce", "Fizz", "Pop"],
      luxury: ["Platinum", "Diamond", "Prestige", "Exclusive", "Signature", "Boutique", "Luxe"],
    }

    const suffixes = {
      restaurant: ["Kitchen", "Bistro", "Cafe", "Grill", "Diner", "Eatery"],
      retail: ["Store", "Shop", "Market", "Boutique", "Emporium", "Gallery"],
      ecommerce: ["Online", "Direct", "Express", "Hub", "Mart", "Store"],
      technology: ["Tech", "Systems", "Solutions", "Labs", "Digital", "Software"],
      healthcare: ["Health", "Care", "Medical", "Clinic", "Wellness", "Center"],
      fitness: ["Fitness", "Gym", "Studio", "Training", "Health", "Wellness"],
      beauty: ["Beauty", "Salon", "Spa", "Studio", "Cosmetics", "Glamour"],
      consulting: ["Consulting", "Advisory", "Solutions", "Partners", "Group"],
    }

    const patterns = namePatterns[style as keyof typeof namePatterns] || namePatterns.modern
    const typeSuffixes = suffixes[type as keyof typeof suffixes] || suffixes.retail

    // Generate names using keywords
    keywordList.forEach((keyword) => {
      patterns.forEach((pattern) => {
        baseNames.push(`${keyword} ${pattern}`)
        baseNames.push(`${pattern} ${keyword}`)
      })

      typeSuffixes.forEach((suffix) => {
        baseNames.push(`${keyword} ${suffix}`)
        baseNames.push(`${keyword}${suffix}`)
      })
    })

    // Generate creative combinations
    if (keywordList.length >= 2) {
      baseNames.push(`${keywordList[0]}${keywordList[1]}`)
      baseNames.push(`${keywordList[0]} & ${keywordList[1]}`)
    }

    // Add some random creative names
    const creativeNames = [
      "InnovateLab",
      "NextGen Solutions",
      "BrightPath",
      "SwiftFlow",
      "PurePeak",
      "VitalCore",
      "FlexiTech",
      "ZenithPro",
      "CrystalClear",
      "PowerHouse",
      "BlueOcean",
      "GreenLeaf",
      "RedRocket",
      "SilverLine",
      "GoldRush",
    ]

    baseNames.push(...creativeNames.slice(0, 5))

    // Return top 20 unique names with additional info
    return [...new Set(baseNames)].slice(0, 20).map((name) => ({
      name,
      domain: `${name.toLowerCase().replace(/\s+/g, "")}.com`,
      available: Math.random() > 0.3, // Simulate domain availability
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      style: style,
    }))
  }

  const copyToClipboard = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopiedName(name)
      setTimeout(() => setCopiedName(""), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const getStarRating = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span>{t.businessNameGenerator}</span>
          </CardTitle>
          <CardDescription>{t.nameGeneratorDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">{t.keywords} *</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder={t.keywordsPlaceholder}
              />
              <p className="text-xs text-gray-500">{t.keywordsHint}</p>
            </div>

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
              <Label htmlFor="style">{t.nameStyle} *</Label>
              <Select onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStyle} />
                </SelectTrigger>
                <SelectContent>
                  {nameStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateNames}
            disabled={isGenerating || !keywords || !businessType || !style}
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
                <Lightbulb className="h-4 w-4 mr-2" />
                {t.generateNames}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedNames.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t.generatedNames}
              <Button variant="outline" size="sm" onClick={generateNames}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.regenerate}
              </Button>
            </CardTitle>
            <CardDescription>{t.generatedNamesDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedNames.map((nameData, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{nameData.name}</h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nameData.name)}>
                      {copiedName === nameData.name ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.domain}:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs">{nameData.domain}</span>
                        <Badge variant={nameData.available ? "default" : "secondary"}>
                          {nameData.available ? t.available : t.taken}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.rating}:</span>
                      <span className="text-yellow-500">{getStarRating(nameData.rating)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.style}:</span>
                      <Badge variant="outline">{nameStyles.find((s) => s.value === nameData.style)?.label}</Badge>
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
