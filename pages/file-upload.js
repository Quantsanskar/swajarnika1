// pages/file-upload.js
import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export default function FileUpload() {
    // State management
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Filter for PDF files only
        const pdfFiles = selectedFiles.filter(file =>
            file.type === 'application/pdf'
        );

        if (pdfFiles.length !== selectedFiles.length) {
            alert('Only PDF files are allowed');
        }

        setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    };

    // Handle file removal
    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };

    // Handle file upload
    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        setUploadStatus(null);

        try {
            // Create FormData to send files
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append(`file_${index}`, file);
            });

            // Send files to backend
            const response = await fetch('/api/files/', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            // Store uploaded files info
            setUploadedFiles(prevFiles => [
                ...prevFiles,
                ...files.map((file, index) => ({
                    name: file.name,
                    size: file.size,
                    path: data.file_paths[index] || 'Unknown path',
                    id: data.file_ids[index] || `temp_${Date.now()}_${index}`,
                    uploadedAt: new Date().toISOString()
                }))
            ]);

            // Clear the files queue
            setFiles([]);
            setUploadStatus({ success: true, message: 'Files uploaded successfully!' });

            // Download files to local device
            files.forEach(file => {
                downloadFile(file);
            });

        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus({ success: false, message: error.message || 'Failed to upload files' });
        } finally {
            setUploading(false);
        }
    };

    // Function to download file to local device
    const downloadFile = (file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Navigate to chatbot
    const navigateToChatbot = () => {
        window.location.href = '/pdf-chatbot';
    };

    // Navigate back to dashboard
    const navigateToDashboard = () => {
        window.location.href = '/patient-dashboard';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <button
                            onClick={navigateToDashboard}
                            className="mr-4 p-1 rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">Upload Medical Documents</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-medium mb-2">Upload PDF Documents</h2>
                        <p className="text-gray-600">
                            Upload your medical records, test results, or any health-related documents.
                            Files will be saved to your downloads folder and securely stored in our system.
                        </p>
                    </div>

                    {/* Upload Area */}
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf"
                            multiple
                            onChange={handleFileSelect}
                        />
                        <div className="flex flex-col items-center">
                            <Upload size={48} className="text-blue-500 mb-4" />
                            <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                            <p className="text-gray-500 mb-4">or click to browse</p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                Select PDF Files
                            </button>
                        </div>
                    </div>

                    {/* Selected Files */}
                    {files.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-3">Selected Files</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <ul className="divide-y">
                                    {files.map((file, index) => (
                                        <li key={index} className="p-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <FileText size={24} className="text-blue-500 mr-3" />
                                                <div>
                                                    <p className="font-medium">{file.name}</p>
                                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className={`px-4 py-2 rounded-md ${uploading
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {uploading ? 'Uploading...' : 'Upload Files'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Upload Status */}
                    {uploadStatus && (
                        <div className={`mt-4 p-4 rounded-md ${uploadStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                            <div className="flex items-center">
                                {uploadStatus.success ? (
                                    <Check size={20} className="mr-2" />
                                ) : (
                                    <AlertCircle size={20} className="mr-2" />
                                )}
                                <p>{uploadStatus.message}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-lg font-medium mb-3">Uploaded Documents</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <ul className="divide-y">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className="p-4">
                                        <div className="flex items-center mb-2">
                                            <FileText size={20} className="text-blue-500 mr-2" />
                                            <p className="font-medium">{file.name}</p>
                                        </div>
                                        <div className="pl-7">
                                            <p className="text-sm text-gray-500">Size: {formatFileSize(file.size)}</p>
                                            <p className="text-sm text-gray-500">
                                                Uploaded: {new Date(file.uploadedAt).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Path: {file.path}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Chat with Documents Button */}
                {uploadedFiles.length > 0 && (
                    <div className="text-center">
                        <button
                            onClick={navigateToChatbot}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Chat with Your Documents
                        </button>
                        <p className="mt-2 text-sm text-gray-600">
                            Ask questions about your uploaded medical documents
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
