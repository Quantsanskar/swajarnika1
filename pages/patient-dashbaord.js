// pages/patient-dashboard.js
import React, { useState, useEffect } from 'react';
import { User, FileText, Calendar, Pill, FilePlus, MessageSquare, Eye, Download, ChevronRight } from 'lucide-react';

export default function PatientDashboard() {
    // State management
    const [activeTab, setActiveTab] = useState('visits');
    const [patientData, setPatientData] = useState({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        gender: 'Male',
        dob: '1985-05-15',
        phone: '(555) 123-4567',
        address: '123 Main St, New York, NY',
        doctor: {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialization: 'General Physician',
            hospital: 'City General Hospital'
        }
    });

    // Dummy data for patient details
    const dummyVisits = [
        { id: 1, date: '2025-03-15', reason: 'Regular check-up', diagnosis: 'Healthy', treatment_plan: 'Continue current lifestyle', status: 'approved' },
        { id: 2, date: '2025-02-28', reason: 'Flu symptoms', diagnosis: 'Seasonal flu', treatment_plan: 'Rest and medication', status: 'approved' }
    ];

    const dummyTests = [
        { id: 1, name: 'Blood Test', date: '2025-03-25', result: 'Normal', notes: 'All parameters within range' },
        { id: 2, name: 'X-Ray', date: '2025-03-20', result: 'Abnormal', notes: 'Follow-up required' }
    ];

    const dummyMedications = [
        { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', startDate: '2025-03-15', endDate: '2025-03-25', reason: 'Bacterial infection', instructions: 'Take with food', missed_dose_instructions: 'Take as soon as you remember unless it\'s almost time for your next dose' },
        { id: 2, name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', startDate: '2025-03-15', endDate: 'Ongoing', reason: 'Pain relief', instructions: 'Take with food or milk', missed_dose_instructions: 'Take only when needed for pain' }
    ];

    const dummyFiles = [
        { id: 1, name: 'Medical History.pdf', uploaded: '2025-03-10', size: '1.2MB' },
        { id: 2, name: 'Lab Results.pdf', uploaded: '2025-03-20', size: '3.5MB' }
    ];

    // Function to handle chatbot navigation
    const navigateToChatbot = () => {
        window.location.href = '/chatbot';
    };

    // Component for the patient details view
    const renderTabContent = () => {
        switch (activeTab) {
            case 'visits':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">My Visits</h3>
                        </div>

                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 border-b">Date</th>
                                    <th className="text-left py-2 border-b">Reason</th>
                                    <th className="text-left py-2 border-b">Diagnosis</th>
                                    <th className="text-left py-2 border-b">Status</th>
                                    <th className="text-left py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyVisits.map(visit => (
                                    <tr key={visit.id}>
                                        <td className="py-2 border-b">{visit.date}</td>
                                        <td className="py-2 border-b">{visit.reason}</td>
                                        <td className="py-2 border-b">{visit.diagnosis}</td>
                                        <td className="py-2 border-b">
                                            <span className={`px-2 py-1 rounded-full text-xs ${visit.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {visit.status === 'approved' ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-2 border-b">
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'tests':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">My Tests</h3>
                        </div>

                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 border-b">Name</th>
                                    <th className="text-left py-2 border-b">Date</th>
                                    <th className="text-left py-2 border-b">Result</th>
                                    <th className="text-left py-2 border-b">Notes</th>
                                    <th className="text-left py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyTests.map(test => (
                                    <tr key={test.id}>
                                        <td className="py-2 border-b">{test.name}</td>
                                        <td className="py-2 border-b">{test.date}</td>
                                        <td className="py-2 border-b">
                                            <span className={`px-2 py-1 rounded-full text-xs ${test.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {test.result}
                                            </span>
                                        </td>
                                        <td className="py-2 border-b">{test.notes}</td>
                                        <td className="py-2 border-b">
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'medications':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">My Medications</h3>
                        </div>

                        <div className="grid gap-4">
                            {dummyMedications.map(med => (
                                <div key={med.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-lg">{med.name}</h4>
                                        <span className="text-sm text-gray-500">{med.startDate} to {med.endDate}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Dosage</p>
                                            <p>{med.dosage}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Frequency</p>
                                            <p>{med.frequency}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Reason</p>
                                            <p>{med.reason}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Instructions</p>
                                            <p>{med.instructions}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-sm text-gray-500">If you miss a dose:</p>
                                        <p className="text-sm">{med.missed_dose_instructions}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'files':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">My Files</h3>
                        </div>

                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 border-b">Name</th>
                                    <th className="text-left py-2 border-b">Uploaded</th>
                                    <th className="text-left py-2 border-b">Size</th>
                                    <th className="text-left py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyFiles.map(file => (
                                    <tr key={file.id}>
                                        <td className="py-2 border-b">{file.name}</td>
                                        <td className="py-2 border-b">{file.uploaded}</td>
                                        <td className="py-2 border-b">{file.size}</td>
                                        <td className="py-2 border-b">
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                                                <Eye size={16} />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800">
                                                <Download size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h1>
                    <button
                        onClick={navigateToChatbot}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <MessageSquare size={18} className="mr-2" />
                        Health Assistant
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">{patientData.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{patientData.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p>{patientData.gender}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p>{patientData.dob}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p>{patientData.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Address</p>
                            <p>{patientData.address}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg mb-6">
                        <h3 className="font-medium mb-2">Your Doctor</h3>
                        <div className="flex items-center">
                            <div className="bg-blue-100 rounded-full p-3 mr-4">
                                <User size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium">{patientData.doctor.name}</p>
                                <p className="text-sm text-gray-600">{patientData.doctor.specialization}</p>
                                <p className="text-sm text-gray-600">{patientData.doctor.hospital}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="border-b mb-6">
                        <div className="flex space-x-6">
                            <button
                                className={`pb-2 px-1 ${activeTab === 'visits' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('visits')}
                            >
                                Visits
                            </button>
                            <button
                                className={`pb-2 px-1 ${activeTab === 'tests' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('tests')}
                            >
                                Tests
                            </button>
                            <button
                                className={`pb-2 px-1 ${activeTab === 'medications' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('medications')}
                            >
                                Medication
                            </button>
                            <button
                                className={`pb-2 px-1 ${activeTab === 'files' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('files')}
                            >
                                Files
                            </button>
                        </div>
                    </div>

                    {renderTabContent()}
                </div>
            </main>
        </div>
    );
}
