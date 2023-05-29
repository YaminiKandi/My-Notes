import React from "react";
import './Header.css'
import {HiSun, HiMoon} from 'react-icons/hi'
import { useColorTheme } from "../context/ThemeContext";

const Header = ({handleDarkMode, darkMode}) => {
  const { isDark } = useColorTheme();

  return(
    <div className="header">
      <div className="header-left">
        <div className="header-logo"></div>
        <h1>Notes</h1>
      </div>
      <button 
        onClick={() => handleDarkMode((previousDarkMode) => !previousDarkMode)} 
        className={`${isDark ? 'toggle-darkmode toggle' : 'toggle'}`}
      >
        {darkMode ? <HiSun className={`${isDark ? 'sun-icon-darkmode ' : ''}`}/> : <HiMoon/>}
      </button>
    </div>
  )
}

export default Header