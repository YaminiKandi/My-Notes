import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useColorTheme } from "../context/ThemeContext";
import {HiSun, HiMoon} from 'react-icons/hi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const {logIn, googleSignIn} = useUserAuth();
  const { isDark, setIsDark } = useColorTheme();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    
    try {
      await logIn(email, password);
      navigate('/home')
    } catch (err) {
      setError('Invalid Email or Password')
    }
  }

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      await googleSignIn();
      navigate('/home')
    } catch (err) {
      setError('Cannot connect through Google SignIn')
    }
  }
  const handleDarkMode = () => {
    setIsDark(!isDark)
  }

  return(
    <div className={`${isDark ? 'login-darkmode login' : 'login'}`}>
      <button
        onClick={() => handleDarkMode((previousDarkMode) => !previousDarkMode)} 
        className='toggle'
      >
        {isDark ? <HiSun className={`${isDark ? 'sun-icon-darkmode ' : ''}`}/> : <HiMoon/>}
      </button>
      <div className="p-4 w-full">
        <h2 className='login-header'>
          YK Notes
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
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Control 
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Log In</Button>
          </div>
        </Form>
        <hr/>
        <div>
          <GoogleButton 
            className="g-btn" 
            type="dark" 
            onClick={handleGoogleSignIn}
          />
          <Link className="f-password" to='/forgot-password'>Forgot Password?</Link>
        </div>
      </div>
      <div className="login-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  )
}

export default Login