import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useColorTheme } from "../context/ThemeContext";
import {HiSun, HiMoon} from 'react-icons/hi'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const {signUp} = useUserAuth();
  const { isDark, setIsDark } = useColorTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    
    try {
      await signUp(email, password);
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }
  const handleDarkMode = () => {
    setIsDark(!isDark)
  }
  return(
    <div className={`${isDark ? 'signup-darkmode signup' : 'signup'}`}>
      <button
        onClick={() => handleDarkMode((previousDarkMode) => !previousDarkMode)} 
        className='toggle'
      >
        {isDark ? <HiSun className={`${isDark ? 'sun-icon-darkmode ' : ''}`}/> : <HiMoon/>}
      </button>
      <div className="p-4 w-full">
        <h2 className="signup-header">
          YK Notes
        </h2>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Control 
              type="email" 
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Control
              type="password" 
              placeholder="Password" 
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Sign Up</Button>
          </div>
        </Form>
      </div>
      <div className="signup-login">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  )
}

export default Signup
