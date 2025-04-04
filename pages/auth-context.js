"use client"

// contexts/auth-context.js
import { createContext, useState, useContext, useEffect } from "react"
import { authAPI } from "../utils/api"

// Create context
const AuthContext = createContext(null)

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // For patient users, try to get profile
                const profile = await authAPI.getPatientProfile()
                if (profile) {
                    setCurrentUser({
                        ...profile,
                        isPatient: true,
                        isDoctor: false,
                    })
                }
            } catch (err) {
                // Not logged in or not a patient
                console.log("User not authenticated or not a patient")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    // Login functions
    const doctorLogin = async (email, password) => {
        setLoading(true)
        setError(null)
        try {
            const response = await authAPI.doctorLogin(email, password)
            setCurrentUser({
                ...response,
                isDoctor: true,
                isPatient: false,
            })
            return response
        } catch (err) {
            setError(err.message || "Login failed")
            throw err
        } finally {
            setLoading(false)
        }
    }

    const patientLogin = async (phone, password) => {
        setLoading(true)
        setError(null)
        try {
            const response = await authAPI.patientLogin(phone, password)
            setCurrentUser({
                ...response,
                isPatient: true,
                isDoctor: false,
            })
            return response
        } catch (err) {
            setError(err.message || "Login failed")
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            await authAPI.logout()
            setCurrentUser(null)
        } catch (err) {
            setError(err.message || "Logout failed")
        } finally {
            setLoading(false)
        }
    }

    // Register functions
    const registerDoctor = async (doctorData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await authAPI.registerDoctor(doctorData)
            return response
        } catch (err) {
            setError(err.message || "Registration failed")
            throw err
        } finally {
            setLoading(false)
        }
    }

    const registerPatient = async (patientData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await authAPI.registerPatient(patientData)
            return response
        } catch (err) {
            setError(err.message || "Registration failed")
            throw err
        } finally {
            setLoading(false)
        }
    }

    // Context value
    const value = {
        currentUser,
        loading,
        error,
        doctorLogin,
        patientLogin,
        logout,
        registerDoctor,
        registerPatient,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

