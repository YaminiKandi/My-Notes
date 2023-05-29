import React, { useState } from "react";
import './Search.css'
import { MdSearch } from "react-icons/md";
import {RxCross2} from 'react-icons/rx'
import { useColorTheme } from "../context/ThemeContext";


const Search = ({handleSearchNote}) => {
  const [searchValue, setSearchValue] = useState('')
  const {isDark} = useColorTheme();


  const handleSearchChange = (value) => {
    setSearchValue(value)
    handleSearchNote(value)
  }
  const handleClear = () => {
    handleSearchChange('')
    const inputEl = document.querySelector('.search-input')
    inputEl.value = ''
  }
  return(
    <div className={`${isDark ? 'search search-darkmode' : "search"}`}>
      <MdSearch className={`${isDark ? 'search-icon search-icon-darkmode' : "search-icon"}`}></MdSearch>
      <input 
        type="text"
        placeholder="Search" 
        className={`${isDark ? 'search-input search-input-darkmode' : "search-input"}`}
        onChange={(event) => handleSearchChange(event.target.value)}
      ></input>
      <div className="cross-icon-div">
        {searchValue && (<RxCross2 className={`${isDark ? 'cross-icon cross-icon-darkmode' : "cross-icon"}`} onClick={handleClear}/>)}
      </div>
    </div>
  )
}

export default Search