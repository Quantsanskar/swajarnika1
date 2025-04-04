// pages/chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Paperclip, Bot, User } from 'lucide-react';

export default function Chatbot() {
    // State management
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your health assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [patientData, setPatientData] = useState({
        id: 1,
        name: 'John Doe'
    });

    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message to chat
        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // In a real implementation, this would be an API call to your backend
            // For now, we'll simulate a response after a delay
            setTimeout(() => {
                // Simulate AI response
                const botResponse = {
                    id: messages.length + 2,
                    text: generateBotResponse(inputMessage),
                    sender: 'bot',
                    timestamp: new Date()
                };

                setMessages(prevMessages => [...prevMessages, botResponse]);
                setIsLoading(false);
            }, 1500);

            // Actual API call would look something like this:
            /*
            const response = await fetch('/api/ai/interact/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                patient_id: patientData.id,
                question: inputMessage
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
            console.error('Error sending message:', error);
            setIsLoading(false);
        }
    };

    // Simple function to generate responses for demo purposes
    const generateBotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('medication') || lowerCaseMessage.includes('medicine')) {
            return "Based on your recent visit, you were prescribed Amoxicillin 500mg to be taken twice daily with food. Remember to complete the full course even if you start feeling better. If you experience any side effects like rash or diarrhea, please contact your doctor immediately.";
        } else if (lowerCaseMessage.includes('test') || lowerCaseMessage.includes('result')) {
            return "Your recent blood test showed normal values for most parameters. However, your doctor noted that your cholesterol levels are slightly elevated and recommended dietary changes. Would you like more specific information about your test results?";
        } else if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('visit')) {
            return "Your next scheduled appointment is on April 15, 2025 at 10:30 AM with Dr. Sarah Johnson. Would you like me to remind you about this appointment closer to the date?";
        } else if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('pain') || lowerCaseMessage.includes('feel')) {
            return "I'm sorry to hear you're not feeling well. Based on your symptoms, it would be best to consult with your doctor. Would you like me to provide information about when you should seek immediate medical attention?";
        } else {
            return "Thank you for your question. I'm analyzing your medical history and recent visits to provide you with the most accurate information. Is there anything specific about your health condition or treatment plan you'd like to know more about?";
        }
    };

    // Format timestamp
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        // In a real implementation, this would upload the file to your server
        console.log('File selected:', e.target.files[0]);

        // For demo purposes, we'll just add a message about the file
        if (e.target.files[0]) {
            const fileName = e.target.files[0].name;
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: messages.length + 1,
                    text: `I've uploaded a file: ${fileName}`,
                    sender: 'user',
                    timestamp: new Date()
                }
            ]);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Navigate back to dashboard
    const navigateToDashboard = () => {
        window.location.href = '/patient-dashboard';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button
                            onClick={navigateToDashboard}
                            className="mr-4 p-1 rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft size={20} className="text-black" />
                        </button>
                        <h1 className="text-2xl font-semibold text-black">Health Assistant</h1>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
                <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col overflow-hidden">
                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'ml-3 bg-blue-100' : 'mr-3 bg-gray-100'}`}>
                                            {message.sender === 'user' ? (
                                                <User size={20} className="text-blue-600" />
                                            ) : (
                                                <Bot size={20} className="text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <div className={`rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                            </div>
                                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right' : ''} text-gray-500`}>
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
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
                    <div className="border-t p-4">
                        <div className="flex items-end">
                            <label htmlFor="file-upload" className="cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-500">
                                <Paperclip size={20} />
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                            <div className="flex-1 mx-2">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
                                    rows="2"
                                ></textarea>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className={`p-2 rounded-full ${!inputMessage.trim() || isLoading ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            This AI assistant provides information based on your medical records. For emergencies, please contact your doctor directly.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
