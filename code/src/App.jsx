import { useState } from 'react'
import Loginpage from './pages/Loginpage'
import Home from './pages/Home'
import ForgotPassword from './component/ForgotPassword'
import Createacc from './component/Createacc'
import BookAppointmentPage from './pages/BookPage'
import {createBrowserRouter,RouterProvider,BrowserRouter,Routes,Route} from 'react-router-dom'
import ChatconsulationPage from './pages/ChatconsulationPage'
import PatientProfile from './pages/PatientProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to include the CSS file
import LocationIQMap from './pages/LocationIQMap'
import { ProfileProvider } from './ProfileProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AirQualityDashboard from './healthtool/weather'
import NutritionDisplay from './healthtool/NutritionInfo'
import GymGuidePage from './healthtool/GymGuide'
import BMICalculator from './healthtool/BMICalculator'





function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ProfileProvider>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<BookAppointmentPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Createacc/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/Chatconsulation' element={<ChatconsulationPage/>}/>
        <Route path='/PatientProfile' element={<PatientProfile/>}/>
        <Route path='/Home' element={<Home/>} />
        <Route path='/LocationIQMap' element={<LocationIQMap/>}/>
        <Route path='/bmi' element={<BMICalculator/>}/>
        <Route path='/gymguide' element={<GymGuidePage/>}/>
        <Route path='/nutrition' element={<NutritionDisplay/>}/>
        <Route path='/weather' element={<AirQualityDashboard/>}/>
      </Routes>
      <ToastContainer/>
      
      </BrowserRouter>
    </ProfileProvider>
     </QueryClientProvider>

    </>
  )
}

export default App
