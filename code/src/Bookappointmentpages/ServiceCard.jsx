import React from "react"
import { motion } from "framer-motion"

export default function ServiceCard({ id, name, icon, description, isSelected, onSelect }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative w-full p-6 rounded-2xl transition-all duration-200 ${
        isSelected
          ? "bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-inner"
          : "bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl border border-blue-100"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </motion.button>
  )
}

