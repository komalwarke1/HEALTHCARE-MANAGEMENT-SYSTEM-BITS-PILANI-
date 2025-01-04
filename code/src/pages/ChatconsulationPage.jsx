import React from 'react'
import Navbar from '../component/Navbar'
import ChatLayout from '../component/ChatLayout'
import Footer1 from '../component/Footer'



const ChatconsultationPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
        <ChatLayout />
      </div>
      
    </main>
  )
}

export default ChatconsultationPage