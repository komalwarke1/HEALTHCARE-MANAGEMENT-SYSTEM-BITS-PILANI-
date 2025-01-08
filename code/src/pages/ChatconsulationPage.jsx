import React from 'react'
import Navbar from '../component/Navbar'
import ChatLayout from '../component/ChatLayout'
import Footer1 from '../component/Footer'
import { useAuth } from '../AuthContext'
import LoginPrompt from '../component/LoginPrompt'



const ChatconsultationPage = () => {
  const {isLogin} = useAuth();
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1">
      {isLogin?(<ChatLayout />):(<LoginPrompt/>)}
      </div>
      
    </main>
  )
}

export default ChatconsultationPage