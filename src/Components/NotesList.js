import React from "react";
import Note from "./Note";
import './NotesList.css'

const NotesList = ({notes, handleDeleteNote, handleEditNote}) => {
  return(
    <div className="notes-list">
      {notes.map((note) => (
        <Note 
          key={note.id}
          note={note} 
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  )
}

export default NotesList