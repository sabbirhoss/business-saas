"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  isSubscribed: boolean
  freeTrialDaysLeft: number
  freeTrialUsesLeft: number
  login: (username: string) => void
  signup: (username: string) => void
  logout: () => void
  usePremiumFeature: () => boolean
  subscribe: () => void
  t: any // For translations
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const FREE_TRIAL_DAYS = 3
const FREE_TRIAL_USES = 5

export function AuthProvider({ children, translations }: { children: React.ReactNode; translations: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [freeTrialDaysLeft, setFreeTrialDaysLeft] = useState(FREE_TRIAL_DAYS)
  const [freeTrialUsesLeft, setFreeTrialUsesLeft] = useState(FREE_TRIAL_USES)
  const [trialStartTime, setTrialStartTime] = useState<number | null>(null)

  // Load state from localStorage on mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const storedSubscribed = localStorage.getItem("isSubscribed") === "true"
    const storedTrialDaysLeft = Number.parseInt(localStorage.getItem("freeTrialDaysLeft") || `${FREE_TRIAL_DAYS}`, 10)
    const storedTrialUsesLeft = Number.parseInt(localStorage.getItem("freeTrialUsesLeft") || `${FREE_TRIAL_USES}`, 10)
    const storedTrialStartTime = Number.parseInt(localStorage.getItem("trialStartTime") || "0", 10)

    setIsLoggedIn(storedLoggedIn)
    setIsSubscribed(storedSubscribed)
    setFreeTrialDaysLeft(storedTrialDaysLeft)
    setFreeTrialUsesLeft(storedTrialUsesLeft)
    setTrialStartTime(storedTrialStartTime || null)

    // Check trial expiration daily
    const interval = setInterval(
      () => {
        if (storedTrialStartTime && !storedSubscribed) {
          const elapsedDays = Math.floor((Date.now() - storedTrialStartTime) / (1000 * 60 * 60 * 24))
          const remainingDays = FREE_TRIAL_DAYS - elapsedDays
          if (remainingDays <= 0) {
            setFreeTrialDaysLeft(0)
            localStorage.setItem("freeTrialDaysLeft", "0")
          } else {
            setFreeTrialDaysLeft(remainingDays)
            localStorage.setItem("freeTrialDaysLeft", remainingDays.toString())
          }
        }
      },
      1000 * 60 * 60 * 24,
    ) // Check every 24 hours

    return () => clearInterval(interval)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn))
    localStorage.setItem("isSubscribed", String(isSubscribed))
    localStorage.setItem("freeTrialDaysLeft", String(freeTrialDaysLeft))
    localStorage.setItem("freeTrialUsesLeft", String(freeTrialUsesLeft))
    if (trialStartTime) {
      localStorage.setItem("trialStartTime", String(trialStartTime))
    }
  }, [isLoggedIn, isSubscribed, freeTrialDaysLeft, freeTrialUsesLeft, trialStartTime])

  const login = useCallback(
    (username: string) => {
      // Simulate login
      setIsLoggedIn(true)
      // If not subscribed and no trial started, start trial
      if (!isSubscribed && !trialStartTime) {
        setTrialStartTime(Date.now())
        setFreeTrialDaysLeft(FREE_TRIAL_DAYS)
        setFreeTrialUsesLeft(FREE_TRIAL_USES)
      }
    },
    [isSubscribed, trialStartTime],
  )

  const signup = useCallback((username: string) => {
    // Simulate signup
    setIsLoggedIn(true)
    setIsSubscribed(false) // Ensure not subscribed on signup
    setTrialStartTime(Date.now())
    setFreeTrialDaysLeft(FREE_TRIAL_DAYS)
    setFreeTrialUsesLeft(FREE_TRIAL_USES)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    // Do not reset subscription/trial on logout, only on signup or explicit reset
  }, [])

  const usePremiumFeature = useCallback(() => {
    if (isSubscribed) {
      return true
    }
    if (freeTrialDaysLeft > 0 && freeTrialUsesLeft > 0) {
      setFreeTrialUsesLeft((prev) => prev - 1)
      return true
    }
    return false
  }, [isSubscribed, freeTrialDaysLeft, freeTrialUsesLeft])

  const subscribe = useCallback(() => {
    setIsSubscribed(true)
    setFreeTrialDaysLeft(0) // End trial if subscribed
    setFreeTrialUsesLeft(0)
  }, [])

  const value = React.useMemo(
    () => ({
      isLoggedIn,
      isSubscribed,
      freeTrialDaysLeft,
      freeTrialUsesLeft,
      login,
      signup,
      logout,
      usePremiumFeature,
      subscribe,
      t: translations,
    }),
    [
      isLoggedIn,
      isSubscribed,
      freeTrialDaysLeft,
      freeTrialUsesLeft,
      login,
      signup,
      logout,
      usePremiumFeature,
      subscribe,
      translations,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
