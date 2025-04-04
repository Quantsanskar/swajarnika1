// utils/api.js
// This file would contain API functions to interact with your Django backend

// Base API URL
const API_BASE_URL = "/api"

// Helper function for making API requests
async function apiRequest(endpoint, method = "GET", data = null) {
    const url = `${API_BASE_URL}${endpoint}`
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
    }

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options)

        // Handle non-2xx responses
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "An error occurred")
        }

        // For 204 No Content responses
        if (response.status === 204) {
            return null
        }

        return await response.json()
    } catch (error) {
        console.error("API request failed:", error)
        throw error
    }
}

// Authentication functions
export const authAPI = {
    doctorLogin: (email, password) => {
        return apiRequest("/doctors/login/", "POST", { email, password })
    },

    patientLogin: (phone, password) => {
        return apiRequest("/patients/login/", "POST", { phone, password })
    },

    logout: () => {
        return apiRequest("/logout/", "POST")
    },

    registerDoctor: (doctorData) => {
        return apiRequest("/doctors/register/", "POST", doctorData)
    },

    registerPatient: (patientData) => {
        return apiRequest("/patients/register/", "POST", patientData)
    },

    getPatientProfile: () => {
        return apiRequest("/patients/profile/", "GET")
    },
}

// Visit related functions
export const visitAPI = {
    createVisit: (visitData) => {
        return apiRequest("/visits/", "POST", visitData)
    },

    getPatientVisits: (patientId) => {
        return apiRequest(`/visits/?patient=${patientId}`, "GET")
    },

    getVisitDetails: (visitId) => {
        return apiRequest(`/visits/${visitId}/`, "GET")
    },
}

// File upload functions
export const fileAPI = {
    uploadFile: (formData) => {
        // For file uploads, we need a different approach
        return fetch(`${API_BASE_URL}/files/`, {
            method: "POST",
            body: formData, // FormData for file uploads
            credentials: "include",
        }).then((response) => {
            if (!response.ok) {
                throw new Error("File upload failed")
            }
            return response.json()
        })
    },

    getPatientFiles: (patientId) => {
        return apiRequest(`/files/?patient=${patientId}`, "GET")
    },
}

// AI interaction functions
export const aiAPI = {
    interactWithAI: (patientId, question) => {
        return apiRequest("/ai/interact/", "POST", {
            patient_id: patientId,
            question: question,
        })
    },
}

// Test and medication functions
export const medicalAPI = {
    getPatientTests: (patientId) => {
        return apiRequest(`/tests/?patient=${patientId}`, "GET")
    },

    getPatientMedications: (patientId) => {
        return apiRequest(`/medications/?patient=${patientId}`, "GET")
    },
}

export default {
    auth: authAPI,
    visits: visitAPI,
    files: fileAPI,
    ai: aiAPI,
    medical: medicalAPI,
}

