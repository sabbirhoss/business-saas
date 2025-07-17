"use client"

import { useState } from "react" // Import useEffect
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  FileText,
  Globe,
  TrendingUp,
  Building,
  Palette,
  ImageIcon,
  Lightbulb,
  CheckCircle,
  Laptop,
  User,
  LogOut,
} from "lucide-react"
import { BusinessPlanGenerator } from "./components/business-plan-generator"
import { WorldwideCostCalculator } from "./components/worldwide-cost-calculator"
import { LanguageSelector } from "./components/language-selector"
import { BusinessTemplates } from "./components/business-templates"
import { LogoDesigner } from "./components/logo-designer"
import { BannerDesigner } from "./components/banner-designer"
import { BusinessNameGenerator } from "./components/business-name-generator"
import { ProsConsAnalyzer } from "./components/pros-cons-analyzer"
import { useLanguage } from "./hooks/use-language"
import { AuthProvider, useAuth } from "./components/auth-context" // Import AuthProvider and useAuth
import { LoginSignupForm } from "./components/login-signup-form" // Import LoginSignupForm
import { SubscriptionManager } from "./components/subscription-manager" // Import SubscriptionManager
import { WebsiteBuilder } from "./components/website-builder" // Import WebsiteBuilder

// Create a wrapper component to use useAuth hook
function AppContent() {
  const [activeTab, setActiveTab] = useState("generator")
  const { t, language } = useLanguage()
  const { isLoggedIn, logout, usePremiumFeature, isSubscribed, freeTrialDaysLeft, freeTrialUsesLeft } = useAuth()

  // Function to check if a feature is locked
  const isFeatureLocked = () => {
    return !isSubscribed && (freeTrialDaysLeft <= 0 || freeTrialUsesLeft <= 0)
  }

  // Component to display when a premium feature is locked
  const PremiumLockedMessage = () => (
    <Card className="text-center py-16">
      <CardHeader>
        <Laptop className="h-16 w-16 mx-auto mb-4 text-red-600" />
        <h3 className="text-2xl font-bold mb-4">{t.premiumFeatureLocked}</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isSubscribed
            ? ""
            : freeTrialDaysLeft <= 0
              ? t.trialTimeExpired
              : freeTrialUsesLeft <= 0
                ? t.trialLimitReached
                : t.premiumFeatureLocked}
        </p>
        <Button onClick={() => setActiveTab("account")} className="mt-4">
          {t.subscribeNow}
        </Button>
      </CardHeader>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GlobalBiz Pro
                </h1>
                <p className="text-sm text-gray-600">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {language.toUpperCase()}
              </Button>
              {isLoggedIn && (
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {!isLoggedIn ? (
        <LoginSignupForm />
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t.heroTitle}</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{t.instantPlans}</CardTitle>
                    <CardDescription>{t.instantPlansDesc}</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{t.worldwideCosts}</CardTitle>
                    <CardDescription>{t.worldwideCostsDesc}</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Palette className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{t.designTools}</CardTitle>
                    <CardDescription>{t.designToolsDesc}</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{t.smartAnalysis}</CardTitle>
                    <CardDescription>{t.smartAnalysisDesc}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Main Application */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 max-w-5xl mx-auto">
                {" "}
                {/* Adjusted grid-cols */}
                <TabsTrigger value="generator" className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.planGenerator}</span>
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center space-x-1">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.costCalculator}</span>
                </TabsTrigger>
                <TabsTrigger value="proscons" className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.prosConsAnalysis}</span>
                </TabsTrigger>
                <TabsTrigger value="names" className="flex items-center space-x-1">
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.nameGenerator}</span>
                </TabsTrigger>
                <TabsTrigger value="logo" className="flex items-center space-x-1">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.logoDesign}</span>
                </TabsTrigger>
                <TabsTrigger value="banner" className="flex items-center space-x-1">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.bannerDesign}</span>
                </TabsTrigger>
                <TabsTrigger value="website" className="flex items-center space-x-1">
                  {" "}
                  {/* New Tab */}
                  <Laptop className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.websiteBuilder}</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.templates}</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center space-x-1">
                  {" "}
                  {/* New Tab */}
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.account}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generator">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <BusinessPlanGenerator />}
              </TabsContent>

              <TabsContent value="calculator">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <WorldwideCostCalculator />}
              </TabsContent>

              <TabsContent value="proscons">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <ProsConsAnalyzer />}
              </TabsContent>

              <TabsContent value="names">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <BusinessNameGenerator />}
              </TabsContent>

              <TabsContent value="logo">{isFeatureLocked() ? <PremiumLockedMessage /> : <LogoDesigner />}</TabsContent>

              <TabsContent value="banner">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <BannerDesigner />}
              </TabsContent>

              <TabsContent value="website">
                {" "}
                {/* New TabsContent */}
                {isFeatureLocked() ? <PremiumLockedMessage /> : <WebsiteBuilder />}
              </TabsContent>

              <TabsContent value="templates">
                {isFeatureLocked() ? <PremiumLockedMessage /> : <BusinessTemplates />}
              </TabsContent>

              <TabsContent value="account">
                {" "}
                {/* New TabsContent */}
                <SubscriptionManager />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </div>
  )
}

// Main export function to wrap AppContent with AuthProvider
export default function HomePage() {
  const { t, languages } = useLanguage() // Get translations from useLanguage

  return (
    <AuthProvider translations={t}>
      <AppContent />
    </AuthProvider>
  )
}
