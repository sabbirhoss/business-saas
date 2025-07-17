"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Download, Calculator, TrendingUp } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

export function FinancialPlanForm() {
  const { t } = useLanguage()
  const [financialData, setFinancialData] = useState({
    initialInvestment: 0,
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    growthRate: 5,
    projectionYears: 3,
  })

  const [projections, setProjections] = useState<any[]>([])

  const handleInputChange = (field: string, value: number) => {
    setFinancialData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateProjections = () => {
    const newProjections = []
    const currentRevenue = financialData.monthlyRevenue * 12
    const currentExpenses = financialData.monthlyExpenses * 12

    for (let year = 1; year <= financialData.projectionYears; year++) {
      const revenue = currentRevenue * Math.pow(1 + financialData.growthRate / 100, year - 1)
      const expenses = currentExpenses * Math.pow(1.03, year - 1) // 3% expense growth
      const profit = revenue - expenses
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0

      newProjections.push({
        year,
        revenue: Math.round(revenue),
        expenses: Math.round(expenses),
        profit: Math.round(profit),
        margin: Math.round(margin * 100) / 100,
      })
    }

    setProjections(newProjections)
  }

  const handleSave = () => {
    console.log("Saving financial plan:", financialData, projections)
  }

  const handleExport = () => {
    console.log("Exporting financial plan:", financialData, projections)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t.createFinancialPlan}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {t.save}
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t.export}
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{t.financialPlanDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inputs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inputs">{t.inputs}</TabsTrigger>
            <TabsTrigger value="projections">{t.projections}</TabsTrigger>
            <TabsTrigger value="analysis">{t.analysis}</TabsTrigger>
          </TabsList>

          <TabsContent value="inputs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">{t.initialInvestment}</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  value={financialData.initialInvestment}
                  onChange={(e) => handleInputChange("initialInvestment", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRevenue">{t.monthlyRevenue}</Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  value={financialData.monthlyRevenue}
                  onChange={(e) => handleInputChange("monthlyRevenue", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">{t.monthlyExpenses}</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={financialData.monthlyExpenses}
                  onChange={(e) => handleInputChange("monthlyExpenses", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growthRate">{t.growthRate} (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  value={financialData.growthRate}
                  onChange={(e) => handleInputChange("growthRate", Number(e.target.value))}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectionYears">{t.projectionYears}</Label>
                <Input
                  id="projectionYears"
                  type="number"
                  value={financialData.projectionYears}
                  onChange={(e) => handleInputChange("projectionYears", Number(e.target.value))}
                  placeholder="3"
                  min="1"
                  max="10"
                />
              </div>
            </div>
            <Button onClick={calculateProjections} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              {t.calculateProjections}
            </Button>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            {projections.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.year}</TableHead>
                      <TableHead>{t.revenue}</TableHead>
                      <TableHead>{t.expenses}</TableHead>
                      <TableHead>{t.profit}</TableHead>
                      <TableHead>{t.profitMargin}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projections.map((projection) => (
                      <TableRow key={projection.year}>
                        <TableCell>{projection.year}</TableCell>
                        <TableCell>${projection.revenue.toLocaleString()}</TableCell>
                        <TableCell>${projection.expenses.toLocaleString()}</TableCell>
                        <TableCell className={projection.profit >= 0 ? "text-green-600" : "text-red-600"}>
                          ${projection.profit.toLocaleString()}
                        </TableCell>
                        <TableCell className={projection.margin >= 0 ? "text-green-600" : "text-red-600"}>
                          {projection.margin}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noProjections}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {projections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t.breakEvenAnalysis}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{t.breakEvenMonth}</p>
                      <p className="text-2xl font-bold">
                        {financialData.monthlyRevenue > financialData.monthlyExpenses
                          ? Math.ceil(
                              financialData.initialInvestment /
                                (financialData.monthlyRevenue - financialData.monthlyExpenses),
                            )
                          : "N/A"}{" "}
                        {t.months}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t.roi}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{t.threeYearROI}</p>
                      <p className="text-2xl font-bold text-green-600">
                        {financialData.initialInvestment > 0
                          ? Math.round(
                              (projections.reduce((sum, p) => sum + p.profit, 0) / financialData.initialInvestment) *
                                100 *
                                100,
                            ) / 100
                          : 0}
                        %
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noAnalysis}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
