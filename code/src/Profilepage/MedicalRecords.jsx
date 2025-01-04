import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';
import { Modal } from './Modal';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { FileIcon, Trash2, Eye, UploadIcon as FileUpload, Activity, Pill, Stethoscope, Syringe, ChevronDown, ChevronUp } from 'lucide-react';

const HistoryItem = ({ date, title, description, icon: Icon, expanded, onToggle }) => (
  <Card className="mb-4">
    <div className="p-4">
      <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 bg-white mr-4">
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <time className="text-sm font-normal text-gray-500">{date}</time>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mt-4 text-base font-normal text-gray-700">{description}</p>
        </motion.div>
      )}
    </div>
  </Card>
);

const MedicalReportCard = ({ title, date, doctor, content, documents, onDeleteDocument, onViewDocument }) => (
  <Card className="mb-4">
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2 text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600 mb-1">Date: {date}</p>
      <p className="text-sm text-gray-600 mb-3">Doctor: {doctor}</p>
      <p className="text-gray-700 mb-4">{content}</p>
      {documents.length > 0 && (
        <div>
          <h5 className="text-lg font-semibold mb-2 text-gray-700">Attached Documents:</h5>
          <ul className="space-y-2">
            {documents.map((doc, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-700">{doc.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDocument(doc)}
                    aria-label="View document"
                  >
                    <Eye className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteDocument(index)}
                    aria-label="Delete document"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </Card>
);

const AddReportForm = ({ onClose, onAddReport }) => {
  const [documents, setDocuments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReport = {
      title: formData.get('title'),
      date: formData.get('date'),
      doctor: formData.get('doctor'),
      content: formData.get('content'),
      documents: documents,
    };
    onAddReport(newReport);
    onClose();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Medical Report</h2>
      <Input label="Title" id="title" name="title" required />
      <Input label="Date" id="date" name="date" type="date" required />
      <Input label="Doctor" id="doctor" name="doctor" required />
      <Textarea label="Report Content" id="content" name="content" required />
      <div>
        <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
          Attach Documents
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            id="documents"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="documents"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <FileUpload className="h-5 w-5" />
            <span>Upload Files</span>
          </label>
          <span className="text-sm text-gray-600">
            {documents.length} file(s) selected
          </span>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Report</Button>
      </div>
    </form>
  );
};

export const MedicalRecords = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [reports, setReports] = useState([
    {
      title: 'Annual Check-up',
      date: '2025-02-15',
      doctor: 'Dr. Johnson',
      content: 'Patient is in good health. Blood pressure and cholesterol levels are within normal range.',
      documents: [
        { name: 'blood_test_results.pdf' },
        { name: 'chest_xray.jpg' },
      ],
    },
    {
      title: 'Cardiology Consultation',
      date: '2025-03-10',
      doctor: 'Dr. Smith',
      content: 'ECG results show normal sinus rhythm. No signs of cardiac abnormalities.',
      documents: [
        { name: 'ecg_report.pdf' },
      ],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);

  const handleAddReport = (newReport) => {
    setReports([...reports, newReport]);
  };

  const handleDeleteDocument = (reportIndex, documentIndex) => {
    const updatedReports = [...reports];
    updatedReports[reportIndex].documents.splice(documentIndex, 1);
    setReports(updatedReports);
  };

  const handleViewDocument = (document) => {
    setViewingDocument(document);
  };

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const medicalHistory = [
    {
      date: 'March 2025',
      title: 'Diagnosed with Hypertension',
      description: 'Prescribed lifestyle changes and medication to manage blood pressure.',
      icon: Activity,
    },
    {
      date: 'November 2024',
      title: 'Appendectomy',
      description: 'Underwent successful laparoscopic appendectomy.',
      icon: Stethoscope,
    },
    {
      date: 'June 2024',
      title: 'Started Allergy Immunotherapy',
      description: 'Began a series of allergy shots to reduce sensitivity to specific allergens.',
      icon: Syringe,
    },
    {
      date: 'January 2024',
      title: 'Annual Physical Examination',
      description: 'Routine check-up showed all vitals within normal range.',
      icon: Stethoscope,
    },
    {
      date: 'September 2023',
      title: 'Prescribed Medication for Migraines',
      description: 'Started on preventive medication to reduce frequency of migraine attacks.',
      icon: Pill,
    },
  ];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Medical Records</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Report</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Medical History</h3>
          {medicalHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HistoryItem
                {...item}
                expanded={expandedItems[index]}
                onToggle={() => toggleExpanded(index)}
              />
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Medical Reports</h3>
          <AnimatePresence>
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MedicalReportCard
                  {...report}
                  onDeleteDocument={(documentIndex) => handleDeleteDocument(index, documentIndex)}
                  onViewDocument={handleViewDocument}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddReportForm onClose={() => setIsAddModalOpen(false)} onAddReport={handleAddReport} />
      </Modal>
      <Modal isOpen={!!viewingDocument} onClose={() => setViewingDocument(null)}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Viewing Document</h2>
          <p className="mb-4 text-gray-700">Filename: {viewingDocument?.name}</p>
          <div className="bg-gray-200 p-8 rounded flex items-center justify-center">
            <p className="text-gray-500">Document preview would be displayed here.</p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setViewingDocument(null)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

