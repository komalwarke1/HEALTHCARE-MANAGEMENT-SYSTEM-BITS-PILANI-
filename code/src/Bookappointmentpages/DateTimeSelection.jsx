import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TimeSlot from "./TimeSlot"

const timeSlots = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: false },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
]

export default function DateTimeSelection({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isDateDisabled = (date) => {
    return date.getDay() === 0 || date.getDay() === 6 || date < new Date()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Select Date</h2>
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-4">
          {" "}
          {/* Update 1 */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
              {" "}
              {/* Update 2 */}
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold">
              {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
              {" "}
              {/* Update 2 */}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {[...Array(firstDayOfMonth).keys()].map((i) => (
              <div key={`empty-${i}`} />
            ))}
            {[...Array(daysInMonth).keys()].map((i) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
              const isDisabled = isDateDisabled(date)
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: isDisabled ? 1 : 1.1 }}
                  whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  onClick={() => !isDisabled && setSelectedDate(date)}
                  disabled={isDisabled}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    //Update 4
                    isSelected
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white transform scale-110" //Update 3 & 4
                      : isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-blue-100 hover:scale-110" //Update 3 & 4
                  }`}
                >
                  {i + 1}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Select Time</h2>
        <div className="grid grid-cols-2 gap-3 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4">
          {" "}
          {/* Update 5 */}
          {timeSlots.map(({ time, available }) => (
            <TimeSlot
              key={time}
              time={time}
              isSelected={selectedTime === time}
              isAvailable={available}
              onSelect={() => setSelectedTime(time)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

