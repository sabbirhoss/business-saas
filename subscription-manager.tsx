"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, DollarSign, Loader2, CreditCard, Banknote } from "lucide-react"
import { useAuth } from "./auth-context"
import { Badge } from "@/components/ui/badge"

export function SubscriptionManager() {
  const { isSubscribed, freeTrialDaysLeft, freeTrialUsesLeft, subscribe, t } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState("")
  const [paymentMessageType, setPaymentMessageType] = useState<"success" | "error" | "">("")

  const handleSubscribe = async () => {
    if (!selectedPaymentMethod) {
      setPaymentMessage(t.selectPaymentMethod)
      setPaymentMessageType("error")
      return
    }

    setIsProcessingPayment(true)
    setPaymentMessage("")
    setPaymentMessageType("")

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success/failure
    if (Math.random() > 0.1) {
      // 90% success rate
      subscribe()
      setPaymentMessage(t.paymentSuccess)
      setPaymentMessageType("success")
    } else {
      setPaymentMessage(t.paymentFailed)
      setPaymentMessageType("error")
    }
    setIsProcessingPayment(false)
  }

  const getTrialStatusBadge = () => {
    if (isSubscribed) {
      return <Badge className="bg-green-500 text-white">{t.subscribed}</Badge>
    }
    if (freeTrialDaysLeft <= 0) {
      return <Badge variant="destructive">{t.trialExpired}</Badge>
    }
    if (freeTrialUsesLeft <= 0) {
      return <Badge variant="destructive">{t.usesExhausted}</Badge>
    }
    return <Badge variant="secondary">{t.freeTrial}</Badge>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>{t.subscriptionManager}</span>
          </CardTitle>
          <CardDescription>{t.subscriptionManagerDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t.currentStatus}</h3>
            <div className="flex items-center space-x-4">
              {getTrialStatusBadge()}
              {!isSubscribed && freeTrialDaysLeft > 0 && freeTrialUsesLeft > 0 && (
                <p className="text-sm text-gray-600">
                  {t.trialDaysLeft}: {freeTrialDaysLeft} | {t.trialUsesLeft}: {freeTrialUsesLeft}
                </p>
              )}
            </div>
          </div>

          {!isSubscribed && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.choosePlan}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer ${
                    selectedPlan === "monthly" ? "border-blue-500 ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  <CardHeader>
                    <CardTitle>{t.monthlyPlan}</CardTitle>
                    <CardDescription>{t.monthlyPrice}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {t.instantPlans}</li>
                      <li>• {t.worldwideCosts}</li>
                      <li>• {t.designTools}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer ${
                    selectedPlan === "yearly" ? "border-blue-500 ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedPlan("yearly")}
                >
                  <CardHeader>
                    <CardTitle>{t.yearlyPlan}</CardTitle>
                    <CardDescription>{t.yearlyPrice}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {t.instantPlans}</li>
                      <li>• {t.worldwideCosts}</li>
                      <li>• {t.designTools}</li>
                      <li>• {t.smartAnalysis}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t.paymentMethod}</h3>
                <Select onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectPaymentMethod} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkash">
                      <div className="flex items-center space-x-2">
                        <Banknote className="h-4 w-4" />
                        <span>{t.bkash}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="credit_card">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{t.creditCard}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="paypal">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{t.paypal}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMessage && (
                <div
                  className={`text-center text-sm ${
                    paymentMessageType === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {paymentMessage}
                </div>
              )}

              <Button
                onClick={handleSubscribe}
                className="w-full"
                disabled={isProcessingPayment || !selectedPaymentMethod}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.paymentProcessing}
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    {t.payNow}
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
