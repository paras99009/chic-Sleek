
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './_auth/AuthLayout'
import SignInForm from './_auth/Forms/SignInForm'
import SignUpForm from './_auth/Forms/SignUpForm'
import RootLayout from './_root/RootLayout'
import Home from './pages/Home'
import Create from './pages/Create'
import Explore from './pages/Explore'
import Saved from './pages/Saved'
import AiChat from './components/AiChat'
import NearBy from './pages/NearBy'
import AboutUs from './pages/AboutUs'
import Admin from './pages/Admin'


function App() {

  return (
    <>

    <Routes>

   <Route element={<AuthLayout/>}>
      <Route path="/sign-in" element={<SignInForm/>} />
      <Route path="/sign-up" element={<SignUpForm/>} />
      </Route>



   <Route element={<RootLayout/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard/admin" element={<Admin/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/explore" element={<Explore/>} />
      <Route path="/saved" element={<Saved/>} />
      <Route path="/nearby" element={<NearBy/>} />
      <Route path="/ai-chat/:work" element={<AiChat/>} />
      </Route>

      </Routes>


    </>
  )
}

export default App
