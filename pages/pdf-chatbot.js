"use client"

// pages/pdf-chatbot.js
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, FileText, Bot, User, X } from "lucide-react"

export default function PdfChatbot() {
    // State management
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your medical document assistant. I can answer questions about your uploaded medical documents. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    const messagesEndRef = useRef(null)

    // Fetch uploaded files on component mount
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                // In a real implementation, this would be an API call to your backend
                // For now, we'll use dummy data
                const dummyFiles = [
                    {
                        id: 1,
                        name: "Medical History.pdf",
                        path: "/downloads/Medical History.pdf",
                        uploadedAt: "2025-03-10T10:30:00Z",
                    },
                    { id: 2, name: "Lab Results.pdf", path: "/downloads/Lab Results.pdf", uploadedAt: "2025-03-20T14:15:00Z" },
                    { id: 3, name: "Prescription.pdf", path: "/downloads/Prescription.pdf", uploadedAt: "2025-03-25T09:45:00Z" },
                ]

                setUploadedFiles(dummyFiles)
            } catch (error) {
                console.error("Error fetching uploaded files:", error)
            }
        }

        fetchUploadedFiles()
    }, [])

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Handle file selection for context
    const handleFileSelect = (fileId) => {
        setSelectedFiles((prevSelected) => {
            if (prevSelected.includes(fileId)) {
                return prevSelected.filter((id) => id !== fileId)
            } else {
                return [...prevSelected, fileId]
            }
        })
    }

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        // Add user message to chat
        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, userMessage])
        setInputMessage("")
        setIsLoading(true)

        try {
            // Get selected file names for context
            const selectedFileNames = selectedFiles
                .map((fileId) => {
                    const file = uploadedFiles.find((f) => f.id === fileId)
                    return file ? file.name : ""
                })
                .filter(Boolean)

            // In a real implementation, this would be an API call to your backend
            // For now, we'll simulate a response after a delay
            setTimeout(() => {
                // Simulate AI response
                const botResponse = {
                    id: messages.length + 2,
                    text: generateBotResponse(inputMessage, selectedFileNames),
                    sender: "bot",
                    timestamp: new Date(),
                }

                setMessages((prevMessages) => [...prevMessages, botResponse])
                setIsLoading(false)
            }, 1500)

            // Actual API call would look something like this:
            /*
            const response = await fetch('/api/ai/pdf-chat/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: inputMessage,
                file_ids: selectedFiles
              }),
            });
            
            if (response.ok) {
              const data = await response.json();
              const botResponse = {
                id: messages.length + 2,
                text: data.answer,
                sender: 'bot',
                timestamp: new Date()
              };
              
              setMessages(prevMessages => [...prevMessages, botResponse]);
            } else {
              // Handle error
              console.error('Error getting AI response');
            }
            
            setIsLoading(false);
            */
        } catch (error) {
            console.error("Error sending message:", error)
            setIsLoading(false)
        }
    }

    // Simple function to generate responses for demo purposes
    const generateBotResponse = (userMessage, selectedFiles) => {
        const lowerCaseMessage = userMessage.toLowerCase()
        const filesContext = selectedFiles.length > 0 ? `Based on your ${selectedFiles.join(", ")}, ` : ""

        if (selectedFiles.length === 0) {
            return "Please select at least one document from the sidebar for me to analyze and provide relevant information."
        }

        if (lowerCaseMessage.includes("blood") || lowerCaseMessage.includes("test result")) {
            return `${filesContext}your blood test from March 20, 2025 shows normal values for most parameters. Your hemoglobin is 14.2 g/dL (normal range: 13.5-17.5 g/dL), white blood cell count is 7.2 × 10^9/L (normal range: 4.5-11.0 × 10^9/L), and platelets are 250 × 10^9/L (normal range: 150-450 × 10^9/L). Your cholesterol is slightly elevated at 215 mg/dL (recommended: <200 mg/dL). Your doctor has recommended dietary changes to address this.`
        } else if (lowerCaseMessage.includes("medication") || lowerCaseMessage.includes("prescription")) {
            return `${filesContext}you are currently prescribed Amoxicillin 500mg to be taken twice daily with food for 10 days (March 15-25, 2025). This was prescribed for a bacterial respiratory infection. You should complete the full course even if symptoms improve. Side effects may include nausea, diarrhea, or rash. Contact your doctor if you experience severe side effects.`
        } else if (lowerCaseMessage.includes("diagnosis") || lowerCaseMessage.includes("condition")) {
            return `${filesContext}you were diagnosed with acute bronchitis on March 15, 2025. The condition is expected to resolve within 2-3 weeks with proper medication and rest. Your doctor noted that your symptoms included cough, mild fever, and fatigue. Follow-up is recommended if symptoms persist beyond 3 weeks.`
        } else if (lowerCaseMessage.includes("history") || lowerCaseMessage.includes("record")) {
            return `${filesContext}your medical history shows you have seasonal allergies (diagnosed 2018), had appendectomy surgery (2019), and have a family history of hypertension. You have no known drug allergies. Your last comprehensive health check was on January 10, 2025, which showed all vital signs within normal ranges.`
        } else {
            return `${filesContext}I've analyzed your documents. Your overall health status appears to be good with the exception of the recent bronchitis diagnosis and slightly elevated cholesterol. Your doctor has prescribed appropriate medication and recommended follow-up in 4 weeks. Is there something specific about your medical documents you'd like to know more about?`
        }
    }

    // Format timestamp
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Navigate back to file upload
    const navigateToFileUpload = () => {
        window.location.href = "/file-upload"
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button onClick={navigateToFileUpload} className="mr-4 p-1 rounded-full hover:bg-gray-100">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">Medical Document Assistant</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto flex">
                {/* Sidebar - Document List */}
                <div className="w-64 bg-white shadow-md p-4 hidden md:block">
                    <h2 className="font-medium mb-4">Your Documents</h2>
                    <p className="text-sm text-gray-600 mb-2">Select documents to provide context for your questions:</p>

                    <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                            <div
                                key={file.id}
                                className={`p-2 rounded-md flex items-center cursor-pointer ${selectedFiles.includes(file.id) ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                                    }`}
                                onClick={() => handleFileSelect(file.id)}
                            >
                                <input type="checkbox" checked={selectedFiles.includes(file.id)} onChange={() => { }} className="mr-2" />
                                <FileText size={16} className="text-blue-500 mr-2" />
                                <div className="text-sm truncate">{file.name}</div>
                            </div>
                        ))}
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600">
                            {selectedFiles.length} document{selectedFiles.length !== 1 ? "s" : ""} selected
                        </div>
                    )}
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Mobile Document Selection */}
                    <div className="md:hidden bg-white p-4 border-b">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-medium">Selected Documents</h2>
                            <button className="text-sm text-blue-600" onClick={() => setSelectedFiles([])}>
                                Clear All
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {selectedFiles.length === 0 ? (
                                <p className="text-sm text-gray-500">No documents selected</p>
                            ) : (
                                uploadedFiles
                                    .filter((file) => selectedFiles.includes(file.id))
                                    .map((file) => (
                                        <div
                                            key={file.id}
                                            className="bg-blue-50 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
                                        >
                                            <span className="truncate max-w-[150px]">{file.name}</span>
                                            <button
                                                className="ml-1"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleFileSelect(file.id)
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div
                                            className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${message.sender === "user" ? "ml-3 bg-blue-100" : "mr-3 bg-gray-100"}`}
                                        >
                                            {message.sender === "user" ? (
                                                <User size={20} className="text-blue-600" />
                                            ) : (
                                                <Bot size={20} className="text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <div
                                                className={`rounded-2xl px-4 py-2 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                            </div>
                                            <p className={`text-xs mt-1 ${message.sender === "user" ? "text-right" : ""} text-gray-500`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex max-w-[80%]">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                                            <Bot size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="rounded-2xl px-4 py-2 bg-gray-100 text-gray-800">
                                                <div className="flex space-x-2">
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "0ms" }}
                                                    ></div>
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "150ms" }}
                                                    ></div>
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "300ms" }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white">
                        <div className="flex items-end">
                            <div className="flex-1">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about your medical documents..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows="2"
                                ></textarea>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading || selectedFiles.length === 0}
                                className={`ml-2 p-2 rounded-full ${!inputMessage.trim() || isLoading || selectedFiles.length === 0
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        {selectedFiles.length === 0 && (
                            <p className="text-xs text-red-500 mt-2">
                                Please select at least one document from the sidebar to provide context for your questions.
                            </p>
                        )}
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            This AI assistant analyzes your medical documents to provide relevant information. For medical
                            emergencies, please contact your doctor directly.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

