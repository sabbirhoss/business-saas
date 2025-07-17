"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Download, RefreshCw, Loader2, Code } from "lucide-react"
import { useAuth } from "./auth-context"

export function WebsiteBuilder() {
  const { t, usePremiumFeature, isSubscribed, freeTrialDaysLeft, freeTrialUsesLeft } = useAuth()
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [websiteTemplate, setWebsiteTemplate] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [generatedWebsiteHtml, setGeneratedWebsiteHtml] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPremiumLock, setShowPremiumLock] = useState(false)

  const canUsePremiumFeature = usePremiumFeature()

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

  const templates = [
    { value: "modern", label: t.templateModern },
    { value: "creative", label: t.templateCreative },
    { value: "ecommerce", label: t.templateEcommerce },
    { value: "minimal", label: t.templateMinimal },
  ]

  const colorSchemes = [
    { value: "blue", label: t.blue, primary: "#3B82F6", secondary: "#1E40AF", accent: "#DBEAFE" },
    { value: "green", label: t.green, primary: "#10B981", secondary: "#059669", accent: "#D1FAE5" },
    { value: "purple", label: t.purple, primary: "#8B5CF6", secondary: "#7C3AED", accent: "#EDE9FE" },
    { value: "red", label: t.red, primary: "#EF4444", secondary: "#DC2626", accent: "#FEE2E2" },
  ]

  const handleGenerateWebsite = async () => {
    if (!canUsePremiumFeature) {
      setShowPremiumLock(true)
      return
    }

    setIsGenerating(true)
    setShowPremiumLock(false)
    setGeneratedWebsiteHtml(null)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const html = generateWebsiteHtml(businessName, industry, websiteTemplate, colorScheme)
    setGeneratedWebsiteHtml(html)
    setIsGenerating(false)
  }

  const generateWebsiteHtml = (name: string, ind: string, tmpl: string, color: string) => {
    const selectedColors = colorSchemes.find((c) => c.value === color) || colorSchemes[0]
    const primaryColor = selectedColors.primary
    const secondaryColor = selectedColors.secondary
    const accentColor = selectedColors.accent

    let content = ""
    let heroSection = ""
    let featuresSection = ""
    let aboutSection = ""
    let contactSection = ""

    switch (tmpl) {
      case "modern":
        heroSection = `
          <div style="background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 60px 20px; text-align: center;">
            <h1 style="font-size: 3em; margin-bottom: 10px;">${name}</h1>
            <p style="font-size: 1.2em;">Modern solutions for your ${ind} business.</p>
            <button style="background-color: ${accentColor}; color: ${secondaryColor}; padding: 10px 20px; border: none; border-radius: 5px; margin-top: 20px; cursor: pointer;">Learn More</button>
          </div>
        `
        featuresSection = `
          <div style="padding: 40px 20px; text-align: center; background-color: #f8f8f8;">
            <h2 style="font-size: 2em; margin-bottom: 30px; color: ${primaryColor};">Our Features</h2>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
              <div style="width: 30%; min-width: 250px; margin: 10px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: white;">
                <h3 style="color: ${secondaryColor};">Feature 1</h3>
                <p>Description of feature one.</p>
              </div>
              <div style="width: 30%; min-width: 250px; margin: 10px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: white;">
                <h3 style="color: ${secondaryColor};">Feature 2</h3>
                <p>Description of feature two.</p>
              </div>
              <div style="width: 30%; min-width: 250px; margin: 10px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: white;">
                <h3 style="color: ${secondaryColor};">Feature 3</h3>
                <p>Description of feature three.</p>
              </div>
            </div>
          </div>
        `
        break
      case "creative":
        heroSection = `
          <div style="background-color: ${primaryColor}; color: white; padding: 80px 20px; text-align: center;">
            <h1 style="font-size: 3.5em; margin-bottom: 15px; font-family: 'Georgia', serif;">${name}</h1>
            <p style="font-size: 1.3em; font-style: italic;">Unleash your creativity in ${ind}.</p>
            <button style="background-color: ${accentColor}; color: ${primaryColor}; padding: 12px 25px; border: none; border-radius: 30px; margin-top: 30px; cursor: pointer; font-weight: bold;">Get Started</button>
          </div>
        `
        aboutSection = `
          <div style="padding: 50px 20px; text-align: center; background-color: ${accentColor}; color: ${secondaryColor};">
            <h2 style="font-size: 2.2em; margin-bottom: 20px;">About Us</h2>
            <p style="max-width: 800px; margin: 0 auto; line-height: 1.6;">We are a passionate team dedicated to bringing innovative solutions to the ${ind} industry. Our mission is to provide exceptional quality and service.</p>
          </div>
        `
        break
      case "ecommerce":
        heroSection = `
          <div style="background-color: ${primaryColor}; color: white; padding: 70px 20px; text-align: center;">
            <h1 style="font-size: 3.2em; margin-bottom: 10px;">Shop at ${name}</h1>
            <p style="font-size: 1.1em;">Your one-stop shop for all ${ind} products.</p>
            <button style="background-color: ${accentColor}; color: ${primaryColor}; padding: 10px 20px; border: none; border-radius: 5px; margin-top: 20px; cursor: pointer;">Browse Products</button>
          </div>
        `
        featuresSection = `
          <div style="padding: 40px 20px; text-align: center; background-color: #f8f8f8;">
            <h2 style="font-size: 2em; margin-bottom: 30px; color: ${primaryColor};">Popular Products</h2>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
              <div style="width: 30%; min-width: 250px; margin: 10px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: white;">
                <img src="/placeholder.svg?height=100&width=100" alt="Product" style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px;">
                <h3 style="color: ${secondaryColor};">Product A</h3>
                <p>$29.99</p>
              </div>
              <div style="width: 30%; min-width: 250px; margin: 10px; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: white;">
                <img src="/placeholder.svg?height=100&width=100" alt="Product" style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px;">
                <h3 style="color: ${secondaryColor};">Product B</h3>
                <p>$49.99</p>
              </div>
            </div>
          </div>
        `
        break
      case "minimal":
        heroSection = `
          <div style="background-color: white; color: ${primaryColor}; padding: 60px 20px; text-align: center; border-bottom: 1px solid #eee;">
            <h1 style="font-size: 2.8em; margin-bottom: 10px; font-weight: 300;">${name}</h1>
            <p style="font-size: 1.1em; color: ${secondaryColor};">Simple. Clean. Effective.</p>
          </div>
        `
        aboutSection = `
          <div style="padding: 40px 20px; text-align: center; background-color: #fdfdfd;">
            <h2 style="font-size: 1.8em; margin-bottom: 20px; color: ${primaryColor};">Our Story</h2>
            <p style="max-width: 700px; margin: 0 auto; line-height: 1.7; color: ${secondaryColor};">We believe in clarity and purpose. Our approach to ${ind} is to strip away the unnecessary and focus on what truly matters, delivering a seamless experience.</p>
          </div>
        `
        break
    }

    contactSection = `
      <div style="background-color: ${secondaryColor}; color: white; padding: 50px 20px; text-align: center;">
        <h2 style="font-size: 2em; margin-bottom: 20px;">Contact Us</h2>
        <p>Email: info@${name.toLowerCase().replace(/\s/g, "")}.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    `

    content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${name}</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
              h1, h2, h3 { margin: 0; }
              p { margin: 0; }
              button { cursor: pointer; }
          </style>
      </head>
      <body>
          ${heroSection}
          ${featuresSection}
          ${aboutSection}
          ${contactSection}
      </body>
      </html>
    `
    return content
  }

  const downloadHtml = () => {
    if (generatedWebsiteHtml) {
      const blob = new Blob([generatedWebsiteHtml], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${businessName.toLowerCase().replace(/\s/g, "-")}-website.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const isTrialExhausted = !isSubscribed && (freeTrialDaysLeft <= 0 || freeTrialUsesLeft <= 0)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span>{t.websiteBuilder}</span>
          </CardTitle>
          <CardDescription>{t.websiteBuilderDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="websiteName">{t.websiteName} *</Label>
              <Input
                id="websiteName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={t.websiteNamePlaceholder}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="websiteTemplate">{t.websiteTemplate} *</Label>
              <Select onValueChange={setWebsiteTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectTemplate} />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tmpl) => (
                    <SelectItem key={tmpl.value} value={tmpl.value}>
                      {tmpl.label}
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
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: color.primary }} />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerateWebsite}
            disabled={
              isGenerating || !businessName || !industry || !websiteTemplate || !colorScheme || isTrialExhausted
            }
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.websiteGenerating}
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                {t.generateWebsite}
              </>
            )}
          </Button>
          {showPremiumLock && (
            <div className="text-center text-red-600 text-sm mt-4">
              {isSubscribed
                ? ""
                : freeTrialDaysLeft <= 0
                  ? t.trialTimeExpired
                  : freeTrialUsesLeft <= 0
                    ? t.trialLimitReached
                    : t.premiumFeatureLocked}
            </div>
          )}
        </CardContent>
      </Card>

      {generatedWebsiteHtml && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t.generatedWebsite}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleGenerateWebsite}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t.regenerate}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadHtml}>
                  <Download className="h-4 w-4 mr-2" />
                  {t.downloadWebsite}
                </Button>
              </div>
            </CardTitle>
            <CardDescription>{t.websiteGeneratedDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-sm font-mono flex items-center justify-between">
                <span>{t.websitePreview}</span>
                <Code className="h-4 w-4 text-gray-500" />
              </div>
              <iframe
                srcDoc={generatedWebsiteHtml}
                title="Generated Website Preview"
                className="w-full h-[400px] border-t"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
