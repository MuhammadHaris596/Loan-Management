import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Signup } from './page/auth/signup.jsx'
import { BrowserRouter,Routes,Route } from 'react-router'
import { Login } from './page/auth/login.jsx'
import { Dashboard } from './page/dashboard.jsx'
import { MyDashoard } from './page/myDashboard.jsx'
import { LoanView } from './page/auth/LoanView.jsx'
import { Profile } from './page/profile.jsx'
import LoanApplication from './page/loanApplication.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Routes>


    <Route path='/' element={<App />}  />
    <Route path='/home' element={<App />}  />
      <Route path='/signup' element={<Signup />}  />
      <Route path='/login' element={<Login />}  />
      {/* <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/homedashboard" element={<MyDashoard/>}/>
      <Route path="/profile" element={<Profile/>}/> */}


      <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<MyDashoard />} /> 
          <Route path="LoanView" element={<LoanView />} /> 
          <Route path="LoanApplication" element={<LoanApplication />} /> 
          <Route path="profile" element={<Profile />} /> 
          


        </Route>
    

    </Routes>
</BrowserRouter>
  </StrictMode>,
)
