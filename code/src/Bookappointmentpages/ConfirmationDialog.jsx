import React from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { CheckCircle2 } from "lucide-react"

export default function ConfirmationDialog({ isOpen, onClose, appointmentDetails }) {
  if (!isOpen || !appointmentDetails) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">Appointment Confirmed!</h2>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <div className="text-center space-y-2">
            <p className="font-semibold">{appointmentDetails.patientName}</p>
            <p>{format(appointmentDetails.date, "MMMM d, yyyy")}</p>
            <p>{appointmentDetails.time}</p>
            <p className="font-medium">Doctor: {appointmentDetails.doctorName}</p>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {appointmentDetails.service}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg hover:from-blue-700 hover:to-green-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  )
}

