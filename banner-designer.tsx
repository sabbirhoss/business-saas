"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Download, RefreshCw, Loader2 } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function BannerDesigner() {
  const { t } = useLanguage()
  const [businessName, setBusinessName] = useState("")
  const [tagline, setTagline] = useState("")
  const [bannerType, setBannerType] = useState("")
  const [style, setStyle] = useState("")
  const [colorScheme, setColorScheme] = useState("")
  const [banners, setBanners] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const bannerTypes = [
    { value: "social", label: t.socialMedia, dimensions: "1200x630" },
    { value: "website", label: t.websiteHeader, dimensions: "1920x400" },
    { value: "facebook", label: t.facebookCover, dimensions: "820x312" },
    { value: "linkedin", label: t.linkedinBanner, dimensions: "1584x396" },
    { value: "youtube", label: t.youtubeBanner, dimensions: "2560x1440" },
    { value: "instagram", label: t.instagramPost, dimensions: "1080x1080" },
  ]

  const bannerStyles = [
    { value: "modern", label: t.modern },
    { value: "professional", label: t.professional },
    { value: "creative", label: t.creative },
    { value: "minimalist", label: t.minimalist },
    { value: "bold", label: t.bold },
    { value: "elegant", label: t.elegant },
  ]

  const colorSchemes = [
    { value: "blue", label: t.blue, primary: "#3B82F6", secondary: "#1E40AF", accent: "#DBEAFE" },
    { value: "green", label: t.green, primary: "#10B981", secondary: "#059669", accent: "#D1FAE5" },
    { value: "purple", label: t.purple, primary: "#8B5CF6", secondary: "#7C3AED", accent: "#EDE9FE" },
    { value: "red", label: t.red, primary: "#EF4444", secondary: "#DC2626", accent: "#FEE2E2" },
    { value: "orange", label: t.orange, primary: "#F97316", secondary: "#EA580C", accent: "#FED7AA" },
    { value: "teal", label: t.teal, primary: "#14B8A6", secondary: "#0D9488", accent: "#CCFBF1" },
  ]

  const generateBanners = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const generatedBanners = createBannerDesigns(businessName, tagline, bannerType, style, colorScheme)
    setBanners(generatedBanners)
    setIsGenerating(false)
  }

  const createBannerDesigns = (name: string, tag: string, type: string, st: string, color: string) => {
    const selectedColors = colorSchemes.find((c) => c.value === color) || colorSchemes[0]
    const bannerInfo = bannerTypes.find((b) => b.value === type) || bannerTypes[0]

    return [
      {
        id: 1,
        name: `${name} - ${st} Banner 1`,
        design: createGradientBanner(name, tag, selectedColors, st),
        type: bannerInfo.label,
        dimensions: bannerInfo.dimensions,
      },
      {
        id: 2,
        name: `${name} - ${st} Banner 2`,
        design: createMinimalBanner(name, tag, selectedColors, st),
        type: bannerInfo.label,
        dimensions: bannerInfo.dimensions,
      },
      {
        id: 3,
        name: `${name} - ${st} Banner 3`,
        design: createGeometricBanner(name, tag, selectedColors, st),
        type: bannerInfo.label,
        dimensions: bannerInfo.dimensions,
      },
      {
        id: 4,
        name: `${name} - ${st} Banner 4`,
        design: createTextFocusBanner(name, tag, selectedColors, st),
        type: bannerInfo.label,
        dimensions: bannerInfo.dimensions,
      },
    ]
  }

  const createGradientBanner = (name: string, tagline: string, colors: any, style: string) => {
    return (
      <div
        className="w-full h-32 flex flex-col justify-center items-center text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold mb-1">{name}</h1>
          {tagline && <p className="text-sm opacity-90">{tagline}</p>}
        </div>
        <div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20"
          style={{ backgroundColor: colors.accent }}
        ></div>
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: colors.accent }}
        ></div>
      </div>
    )
  }

  const createMinimalBanner = (name: string, tagline: string, colors: any, style: string) => {
    return (
      <div
        className="w-full h-32 flex flex-col justify-center items-center relative"
        style={{ backgroundColor: colors.accent }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>
            {name}
          </h1>
          {tagline && (
            <p className="text-sm" style={{ color: colors.secondary }}>
              {tagline}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: colors.primary }}></div>
      </div>
    )
  }

  const createGeometricBanner = (name: string, tagline: string, colors: any, style: string) => {
    return (
      <div
        className="w-full h-32 flex items-center justify-between px-8 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="text-white z-10">
          <h1 className="text-2xl font-bold mb-1">{name}</h1>
          {tagline && <p className="text-sm opacity-90">{tagline}</p>}
        </div>
        <div
          className="absolute right-0 top-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16"
          style={{ backgroundColor: colors.secondary }}
        ></div>
        <div
          className="absolute right-8 top-4 w-16 h-16 transform rotate-45"
          style={{ backgroundColor: colors.accent, opacity: 0.3 }}
        ></div>
      </div>
    )
  }

  const createTextFocusBanner = (name: string, tagline: string, colors: any, style: string) => {
    return (
      <div
        className="w-full h-32 flex flex-col justify-center items-center bg-white border-2"
        style={{ borderColor: colors.primary }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-black mb-1" style={{ color: colors.primary }}>
            {name}
          </h1>
          {tagline && (
            <p className="text-sm font-medium" style={{ color: colors.secondary }}>
              {tagline}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-blue-600" />
            <span>{t.bannerDesigner}</span>
          </CardTitle>
          <CardDescription>{t.bannerDesignerDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="tagline">{t.tagline}</Label>
              <Input
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder={t.taglinePlaceholder}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bannerType">{t.bannerType} *</Label>
              <Select onValueChange={setBannerType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectBannerType} />
                </SelectTrigger>
                <SelectContent>
                  {bannerTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label} ({type.dimensions})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">{t.bannerStyle} *</Label>
              <Select onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStyle} />
                </SelectTrigger>
                <SelectContent>
                  {bannerStyles.map((style) => (
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
            onClick={generateBanners}
            disabled={isGenerating || !businessName || !bannerType || !style || !colorScheme}
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
                <ImageIcon className="h-4 w-4 mr-2" />
                {t.generateBanners}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {banners.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t.generatedBanners}
              <Button variant="outline" size="sm" onClick={generateBanners}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.regenerate}
              </Button>
            </CardTitle>
            <CardDescription>{t.generatedBannersDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="mb-4 border rounded overflow-hidden">{banner.design}</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{banner.name}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>{banner.type}</span>
                      <span>{banner.dimensions}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      {t.download}
                    </Button>
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
