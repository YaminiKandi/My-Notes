import React from "react"
import {AiOutlineDelete} from 'react-icons/ai'
import {TbEdit} from 'react-icons/tb'
import './Note.css'

const Note = ({note, handleDeleteNote, handleEditNote}) => {
  return(
    <div 
      className="note"
      style={{backgroundColor: note.color}}
    >
      <h3 className="note-title">{note.title}</h3>
      <div className="note-description-container">
        <p className="note-description">{note.description}</p>
      </div>
      <div className="note-footer">
        <div className="note-date">{note.date}</div>
        <TbEdit className="edit-icon" onClick={() => handleEditNote(note.id)}/>
        <AiOutlineDelete className="delete-icon" onClick={() => handleDeleteNote(note.id)} />
      </div>
    </div>
  )
}

export default Note