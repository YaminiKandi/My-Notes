import React, { useState, useEffect } from "react";
import './AddNoteModal.css'
import { useColorTheme } from "../context/ThemeContext";

const AddNoteModal = ({onCancel, onSubmit, currentEditingNote}) => {
  
  const [selectedColor, setSelectedColor] = useState('#E6E0E9')
  const [showColorsModal, setShowColorsModal] = useState(false)
  const [error, setError] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')
  const [currentId, setCurrentId] = useState('')
  const { isDark } = useColorTheme();
  
  useEffect(() => {
    if (!currentEditingNote) return
    if (currentEditingNote.title ) {
      setCurrentTitle(currentEditingNote.title)
    }
    if (currentEditingNote.description) {
      setCurrentDescription(currentEditingNote.description)
    }
    if (currentEditingNote.id) {
      setCurrentId(currentEditingNote.id)
    }
    if (currentEditingNote.color){
      setSelectedColor(currentEditingNote.color)
    }
     // eslint-disable-next-line
  }, [])

  const colors = [
    '#E6E0E9', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb',
    '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#5f6368',
  ]

  const handleSelectedColor = (event, color) => {
    event.preventDefault()
    setSelectedColor(color)
    setShowColorsModal(false)
  }

  const handleAddNoteModal = (event) => {
    event.preventDefault()
    if(currentTitle.trim().length === 0 || currentDescription.trim().length === 0) {
      setError('Title and Description are required')
      return
    }
    onSubmit(currentTitle, currentDescription, selectedColor, currentId)
  }

  const handleTextArea = (event) => {
    let newHeight = Math.max(event.target.scrollHeight, 30);
    const el = document.querySelector('.addnote-modal-container')
    el.style.height = `${newHeight + 160.4}px`
  }

  const handleShowColorsModal = (e) => {
    e.preventDefault()
    setShowColorsModal(true)
  }

  return(
    <div className="addnote-modal-wrapper">
      <div className="addnote-modal-container" style={{ backgroundColor: selectedColor }}>
        <form className="form">
          <input 
            type="text"
            value={currentTitle}
            onChange={(event) => setCurrentTitle(event.target.value)}
            placeholder="Enter Title"
            className="addnote-modal-title"
          ></input>
          
          <div className="addnote-modal-desc-wrapper">
            <textarea
              value={currentDescription}
              onChange={(event) => setCurrentDescription(event.target.value)}
              placeholder="Enter Description"
              className="addnote-modal-description"
              onKeyUp={handleTextArea}
            ></textarea>
            {error && (<p className="addnote-modal-error">{error}</p>)}
          </div>

          <div className={`${isDark ? 'addnote-modal-footer-darkmode addnote-modal-footer' : 'addnote-modal-footer'}`}>
            <div
              className={'modal-colors-list-item selected-color-button'}
              style={{backgroundColor: selectedColor}}
              onClick={handleShowColorsModal}
            />
            
            <div className="addnote-modal-btns">
              <button 
                className="addnote-modal-cancelbtn"
                onClick={onCancel}
              >Cancel</button>

              <button
                className="addnote-modal-addnotebtn"
                onClick={handleAddNoteModal}
              >Save</button>
            </div>
          </div>

          {showColorsModal && (<div className="addnote-modal-colors">
            {colors.map((color) => (
              <button
                key={color}
                className={(selectedColor === color ? 'selected-color' : '' ) + ' modal-colors-list-item'}
                style={{backgroundColor: color}}
                onClick={(event) => handleSelectedColor(event, color) }
              ></button>
            ))}
          </div>)}
        </form>
      </div>
    </div>
  )
}

export default AddNoteModal