import React from 'react';
import './App.css';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { ColorThemeContextProvider } from './context/ThemeContext'
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import MyNotes from './Components/MyNotes';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  return(
    <ColorThemeContextProvider>
      <div className='App'>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/home' element={<ProtectedRoute><MyNotes/></ProtectedRoute>}/>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          </Routes>
        </UserAuthContextProvider>
      </div>
    </ColorThemeContextProvider>
  )
}

export default App;
