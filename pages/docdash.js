// pages/doctor-dashboard.js
import React, { useState } from 'react';
import { 
  ChevronRight, 
  Plus, 
  User, 
  FileText, 
  Calendar, 
  Pill, 
  FilePlus, 
  Search,
  Edit,
  Trash,
  Eye,
  EyeOff
} from 'lucide-react';

export default function DoctorDashboard() {
  // State management
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', gender: 'Male', dob: '1985-05-15', phone: '(555) 123-4567', email: 'john.doe@example.com', address: '123 Main St, New York, NY' },
    { id: 2, name: 'Jane Smith', gender: 'Female', dob: '1990-08-22', phone: '(555) 987-6543', email: 'jane.smith@example.com', address: '456 Park Ave, Boston, MA' },
    { id: 3, name: 'Robert Johnson', gender: 'Male', dob: '1975-11-30', phone: '(555) 246-8135', email: 'robert.j@example.com', address: '789 Oak Dr, Chicago, IL' },
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tests');
  const [showPassword, setShowPassword] = useState(false);
  
  // Dummy data for patient details
  const dummyTests = [
    { id: 1, name: 'Blood Test', date: '2025-03-25', result: 'Normal', notes: 'All parameters within range' },
    { id: 2, name: 'X-Ray', date: '2025-03-20', result: 'Abnormal', notes: 'Follow-up required' }
  ];
  
  const dummyMedications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', startDate: '2025-03-15', endDate: '2025-03-25' },
    { id: 2, name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', startDate: '2025-03-15', endDate: 'Ongoing' }
  ];
  
  const dummyFiles = [
    { id: 1, name: 'Medical History.pdf', uploaded: '2025-03-10', size: '1.2MB' },
    { id: 2, name: 'Lab Results.pdf', uploaded: '2025-03-20', size: '3.5MB' }
  ];
  
  const dummyVisits = [
    { id: 1, date: '2025-03-15', reason: 'Regular check-up', notes: 'Patient doing well' },
    { id: 2, date: '2025-02-28', reason: 'Flu symptoms', notes: 'Prescribed antibiotics' }
  ];
  
  // Form state for adding new patient
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    password: ''
  });
  
  // Filtered patients based on search
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle adding new patient
  const handleAddPatient = () => {
    const id = patients.length + 1;
    setPatients([...patients, { id, ...newPatient }]);
    setNewPatient({
      name: '',
      email: '',
      gender: '',
      dob: '',
      phone: '',
      address: '',
      password: ''
    });
    setShowAddPatientModal(false);
  };

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };
  
  // Component for the Add Patient modal
  const AddPatientModal = () => {
    if (!showAddPatientModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Add New Patient</h2>
            <button 
              onClick={() => setShowAddPatientModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.dob}
                onChange={(e) => setNewPatient({...newPatient, dob: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newPatient.password}
                  onChange={(e) => setNewPatient({...newPatient, password: e.target.value})}
                />
                <button 
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                rows="3"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              onClick={() => setShowAddPatientModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleAddPatient}
            >
              Add Patient
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Component for the patient details view
  const PatientDetails = () => {
    if (!selectedPatient) return null;
    
    const renderTabContent = () => {
      switch (activeTab) {
        case 'tests':
          return (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tests</h3>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <Plus size={16} className="mr-1" />
                  Add Test
                </button>
              </div>
              
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 border-b">Name</th>
                    <th className="text-left py-2 border-b">Date</th>
                    <th className="text-left py-2 border-b">Result</th>
                    <th className="text-left py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyTests.map(test => (
                    <tr key={test.id}>
                      <td className="py-2 border-b">{test.name}</td>
                      <td className="py-2 border-b">{test.date}</td>
                      <td className="py-2 border-b">{test.result}</td>
                      <td className="py-2 border-b">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 mr-2">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash size={16} />
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
                <h3 className="text-lg font-medium">Medications</h3>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <Plus size={16} className="mr-1" />
                  Add Medication
                </button>
              </div>
              
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 border-b">Name</th>
                    <th className="text-left py-2 border-b">Dosage</th>
                    <th className="text-left py-2 border-b">Frequency</th>
                    <th className="text-left py-2 border-b">Period</th>
                    <th className="text-left py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyMedications.map(med => (
                    <tr key={med.id}>
                      <td className="py-2 border-b">{med.name}</td>
                      <td className="py-2 border-b">{med.dosage}</td>
                      <td className="py-2 border-b">{med.frequency}</td>
                      <td className="py-2 border-b">{med.startDate} to {med.endDate}</td>
                      <td className="py-2 border-b">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 mr-2">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case 'files':
          return (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Files</h3>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <Plus size={16} className="mr-1" />
                  Upload File
                </button>
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
                        <button className="text-red-600 hover:text-red-800">
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case 'visits':
          return (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Visits</h3>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <Plus size={16} className="mr-1" />
                  Add Visit
                </button>
              </div>
              
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2 border-b">Date</th>
                    <th className="text-left py-2 border-b">Reason</th>
                    <th className="text-left py-2 border-b">Notes</th>
                    <th className="text-left py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyVisits.map(visit => (
                    <tr key={visit.id}>
                      <td className="py-2 border-b">{visit.date}</td>
                      <td className="py-2 border-b">{visit.reason}</td>
                      <td className="py-2 border-b">{visit.notes}</td>
                      <td className="py-2 border-b">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 mr-2">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash size={16} />
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{selectedPatient.name}</h2>
          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            Password: ********
            <button 
              className="ml-2 text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{selectedPatient.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p>{selectedPatient.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p>{selectedPatient.dob}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{selectedPatient.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p>{selectedPatient.address}</p>
          </div>
        </div>
        
        <div className="border-b mb-6">
          <div className="flex space-x-6">
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
            <button
              className={`pb-2 px-1 ${activeTab === 'visits' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('visits')}
            >
              Visits
            </button>
          </div>
        </div>
        
        {renderTabContent()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Doctor Dashboard</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar - Patient List */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Patient List</h2>
              <button 
                className="rounded-full bg-blue-600 text-white p-1 hover:bg-blue-700"
                onClick={() => setShowAddPatientModal(true)}
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-2 top-3 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {filteredPatients.map(patient => (
                <div 
                  key={patient.id}
                  className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${selectedPatient && selectedPatient.id === patient.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.phone}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-3">
            {selectedPatient ? (
              <PatientDetails />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-full">
                <User size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">No Patient Selected</h2>
                <p className="text-gray-500 mb-6">Select a patient from the list or add a new one</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                  onClick={() => setShowAddPatientModal(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Patient
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add Patient Modal */}
      <AddPatientModal />
    </div>
  );
}