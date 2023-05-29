import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useColorTheme } from "../context/ThemeContext";
import {HiSun, HiMoon} from 'react-icons/hi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const {resetPassword} = useUserAuth();
  const { isDark, setIsDark } = useColorTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    
    try {
      const res = await resetPassword(email);
      console.log(res)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDarkMode = () => {
    setIsDark(!isDark)
  }
  
  return(
    <div className={`${isDark ? 'fp-darkmode fp' : 'fp'}`}>
      <button
        onClick={() => handleDarkMode((previousDarkMode) => !previousDarkMode)} 
        className='toggle'
      >
        {isDark ? <HiSun className={`${isDark ? 'sun-icon-darkmode ' : ''}`}/> : <HiMoon/>}
      </button>
      <div className="p-4 w-full">
        <h2 className="fp-header">
          Password Reset
        </h2>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Control 
              type="email" 
              placeholder="Email Address" 
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Reset</Button>
            </div>
            <div className="text-center">
              <Link to='/login'>Log In</Link>
            </div>
          </div>
        </Form>
      </div>
      <div className="fp-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  )
}

export default ForgotPassword