"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-context"
import { Loader2 } from "lucide-react"

export function LoginSignupForm() {
  const { login, signup, t } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (action: "login" | "signup") => {
    setIsLoading(true)
    setMessage("")
    setMessageType("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (username && password) {
      if (action === "login") {
        // Simulate successful login for any non-empty credentials
        login(username)
        setMessage(t.loginSuccess)
        setMessageType("success")
      } else {
        // Simulate successful signup for any non-empty credentials
        signup(username)
        setMessage(t.signupSuccess)
        setMessageType("success")
      }
    } else {
      setMessage(t.invalidCredentials)
      setMessageType("error")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isSigningUp ? t.signup : t.login}</CardTitle>
          <CardDescription>{isSigningUp ? t.signupSuccess : t.loginSuccess}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">{t.username}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t.enterUsername}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t.enterPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && (
            <div className={`text-center text-sm ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
          <Button
            onClick={() => handleSubmit(isSigningUp ? "signup" : "login")}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isSigningUp ? t.signup : t.login}
              </>
            ) : isSigningUp ? (
              t.signup
            ) : (
              t.login
            )}
          </Button>
          <Button
            variant="link"
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="w-full text-sm"
            disabled={isLoading}
          >
            {isSigningUp ? t.login : t.signup}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
