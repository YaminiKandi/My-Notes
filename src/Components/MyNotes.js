import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import AddNoteButton from "./AddNoteButton";
import NotesList from "./NotesList";
import AddNoteModal from "./AddNoteModal";
import { addData, deleteData, getData} from './Firestore'
import {useUserAuth} from '../context/UserAuthContext';
import { Alert } from "react-bootstrap";
import { useColorTheme } from "../context/ThemeContext";

const MyNotes = () => {
  const [notes, setNotes] = useState([])

  const [searchText, setSearchText] = useState('')
  const [showAddNoteModal, setShowAddNoteModal] = useState()
  const [currentEditingNote, setCurrentEditingNote] = useState(null)
  const [error, setError] = useState('')
  const {user} = useUserAuth();
  const {isDark, setIsDark} = useColorTheme();

  const getUserNotesList = async() => {
    try {
      const userNotes = await getData(user);
      setNotes(Object.values(userNotes));
    } catch (err) {
      setError('Unable to access the user data')
    }
  }

  useEffect(() => {
    getUserNotesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteNote = async(id) => {
    try {
      await deleteData(user, id);
      const newNotes = notes.filter((note) => note.id !== id)
      setNotes(newNotes)
    } catch(err) {
      setError('Unable to delete note')
    }
  }

  const addNewNote = async (newNote) => {
    try {
      await addData({
        [newNote.id]: newNote
      }, user);
      const updatedNotes = [...notes, newNote]
      setNotes(updatedNotes)
    } catch (err) {
      setError('Unable to add a new note')
    }
  }

  const updateNote = async (updatedNote) => {
    try {
      await addData({
        [updatedNote.id]: updatedNote
      }, user)
      const newNotes = notes.map((note) => {
        if (note.id === updatedNote.id) {
          return {
            ...note,
            title: updatedNote.title,
            description: updatedNote.description,
            color: updatedNote.color
          }
        } else {
          return note
        }
      })
      setNotes(newNotes)
    } catch (err) {
      setError('Unable to update note')
    }
  } 

  const toggleAddNoteModal = () => {
    setShowAddNoteModal(!showAddNoteModal)
  }

  const handleNewAddNote = (title, description, color, id) => {
    const date = id || Date.now();
    const newNote = {
      id: date,
      title,
      description,
      color,
      date: new Date(date).toLocaleDateString()
    }
    if (id) {
      updateNote(newNote)
      setCurrentEditingNote(null)
    } else {
      addNewNote(newNote)
    }
    toggleAddNoteModal()
  }

  const handleEditNote = (id) => {
    setCurrentEditingNote(notes.find((note) => note.id === id))
    toggleAddNoteModal()
  }

  return (
    <div className={`${isDark ? 'dark-mode app' : 'app'}`}>
      <Header handleDarkMode={() => setIsDark(!isDark)} darkMode={isDark}/>
      <div className='section-2'>
        <Search handleSearchNote={setSearchText}/>
        <AddNoteButton handleAddNoteModal={toggleAddNoteModal}></AddNoteButton>
      </div>
      <div className='notes-list-wrapper'>
        {error && 
          <Alert variant="danger">{error}</Alert>
        }
        <NotesList 
          notes={notes.filter((note) => 
            note.description.toLowerCase().includes(searchText.toLowerCase()) ||
            note.title.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleDeleteNote={deleteNote}
          handleEditNote={handleEditNote}
        />
      </div>
      {showAddNoteModal && (<AddNoteModal currentEditingNote={currentEditingNote} onCancel={toggleAddNoteModal} onSubmit={handleNewAddNote}/>)}
    </div>
  );
}
export default MyNotes