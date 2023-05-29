import React from "react";
import './AddNoteButton.css'
import {AiOutlinePlus} from 'react-icons/ai'

const AddNoteButton = ({handleAddNoteModal}) => {
  return(
    <div>
      <button 
        className="add-note-button"
        onClick={handleAddNoteModal}
      >
        <AiOutlinePlus/>
        Add Note
      </button>
    </div>
  )
}

export default AddNoteButton