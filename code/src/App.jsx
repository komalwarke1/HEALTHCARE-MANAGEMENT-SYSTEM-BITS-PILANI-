import { useState } from 'react'
import Loginpage from './pages/Loginpage'
import Home from './pages/Home'
import ForgotPassword from './component/ForgotPassword'
import Createacc from './component/Createacc'
import BookAppointmentPage from './pages/BookPage'
import {createBrowserRouter,RouterProvider,BrowserRouter,Routes,Route} from 'react-router-dom'
import ChatconsulationPage from './pages/ChatconsulationPage'
import PatientProfile from './pages/PatientProfile'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<BookAppointmentPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Createacc/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/Chatconsulation' element={<ChatconsulationPage/>}/>
        <Route path='/PatientProfile' element={<PatientProfile/>}/>
      </Routes>
    </BrowserRouter>
    
     

    </>
  )
}

export default App
