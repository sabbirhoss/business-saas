"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Download, Eye } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function BusinessPlanForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    executiveSummary: "",
    marketAnalysis: "",
    products: "",
    marketing: "",
    operations: "",
    management: "",
    financials: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving business plan:", formData)
    // Here you would typically save to a database
  }

  const handleExport = () => {
    console.log("Exporting business plan:", formData)
    // Here you would generate PDF or other format
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t.createBusinessPlan}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {t.save}
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t.export}
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              {t.preview}
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{t.businessPlanDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">{t.basicInfo}</TabsTrigger>
            <TabsTrigger value="market">{t.marketAnalysis}</TabsTrigger>
            <TabsTrigger value="strategy">{t.strategy}</TabsTrigger>
            <TabsTrigger value="operations">{t.operations}</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t.companyName}</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder={t.enterCompanyName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">{t.industry}</Label>
                <Select onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectIndustry} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">{t.technology}</SelectItem>
                    <SelectItem value="retail">{t.retail}</SelectItem>
                    <SelectItem value="healthcare">{t.healthcare}</SelectItem>
                    <SelectItem value="finance">{t.finance}</SelectItem>
                    <SelectItem value="education">{t.education}</SelectItem>
                    <SelectItem value="manufacturing">{t.manufacturing}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="executiveSummary">{t.executiveSummary}</Label>
              <Textarea
                id="executiveSummary"
                value={formData.executiveSummary}
                onChange={(e) => handleInputChange("executiveSummary", e.target.value)}
                placeholder={t.executiveSummaryPlaceholder}
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="marketAnalysis">{t.marketAnalysis}</Label>
              <Textarea
                id="marketAnalysis"
                value={formData.marketAnalysis}
                onChange={(e) => handleInputChange("marketAnalysis", e.target.value)}
                placeholder={t.marketAnalysisPlaceholder}
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="products">{t.productsServices}</Label>
              <Textarea
                id="products"
                value={formData.products}
                onChange={(e) => handleInputChange("products", e.target.value)}
                placeholder={t.productsServicesPlaceholder}
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="marketing">{t.marketingStrategy}</Label>
              <Textarea
                id="marketing"
                value={formData.marketing}
                onChange={(e) => handleInputChange("marketing", e.target.value)}
                placeholder={t.marketingStrategyPlaceholder}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="management">{t.managementTeam}</Label>
              <Textarea
                id="management"
                value={formData.management}
                onChange={(e) => handleInputChange("management", e.target.value)}
                placeholder={t.managementTeamPlaceholder}
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="operations">{t.operationalPlan}</Label>
              <Textarea
                id="operations"
                value={formData.operations}
                onChange={(e) => handleInputChange("operations", e.target.value)}
                placeholder={t.operationalPlanPlaceholder}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="financials">{t.financialProjections}</Label>
              <Textarea
                id="financials"
                value={formData.financials}
                onChange={(e) => handleInputChange("financials", e.target.value)}
                placeholder={t.financialProjectionsPlaceholder}
                rows={6}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
